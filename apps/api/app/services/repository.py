from __future__ import annotations

import json
from datetime import datetime

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.models.entities import CompatibilityProfile, Inquiry, Purchase, Report, SajuProfile, User
from app.schemas.payment import CheckoutRequest
from app.schemas.report import PreviewRequest, PreviewResponse, ReportDetailResponse, ReportListItem, ReportSection
from app.schemas.support import InquiryCreateRequest, InquiryResponse
from app.services.security import encrypt_sensitive_value

settings = get_settings()


def ensure_demo_user(session: Session) -> User:
    statement = select(User).where(User.social_provider_user_id == settings.demo_user_provider_user_id)
    user = session.scalar(statement)

    if user is not None:
        return user

    user = User(
        social_provider=settings.demo_user_provider,
        social_provider_user_id=settings.demo_user_provider_user_id,
        display_name=settings.demo_user_display_name,
        locale=settings.default_locale,
    )
    session.add(user)
    session.flush()
    return user


def persist_preview_report(
    session: Session,
    payload: PreviewRequest,
    preview: PreviewResponse,
) -> PreviewResponse:
    user = ensure_demo_user(session)

    primary_profile = SajuProfile(
        user_id=user.id,
        birth_date_encrypted=encrypt_sensitive_value(payload.primary_profile.birth_date.isoformat()),
        birth_time_encrypted=encrypt_sensitive_value(payload.primary_profile.birth_time.isoformat()),
        calendar_mode=payload.primary_profile.calendar_mode,
        gender=payload.primary_profile.gender,
        label="Primary profile",
    )
    session.add(primary_profile)
    session.flush()

    compatibility_profile_id: str | None = None
    if payload.partner_profile is not None:
        compatibility_profile = CompatibilityProfile(
            user_id=user.id,
            primary_profile_id=primary_profile.id,
            partner_birth_date_encrypted=encrypt_sensitive_value(payload.partner_profile.birth_date.isoformat()),
            partner_birth_time_encrypted=encrypt_sensitive_value(payload.partner_profile.birth_time.isoformat()),
            partner_calendar_mode=payload.partner_profile.calendar_mode,
            partner_gender=payload.partner_profile.gender,
        )
        session.add(compatibility_profile)
        session.flush()
        compatibility_profile_id = compatibility_profile.id

    report = Report(
        user_id=user.id,
        report_type=payload.report_type,
        source_profile_id=primary_profile.id,
        compatibility_profile_id=compatibility_profile_id,
        status="preview_ready",
        preview_text=preview.preview_summary,
        structured_traits_json=json.dumps(
            {
                "locked_categories": preview.locked_categories,
                "recommended_products": preview.recommended_products,
            }
        ),
        llm_provider="llama",
        llm_model="preview-placeholder",
    )
    session.add(report)
    session.commit()
    session.refresh(report)

    return preview.model_copy(update={"report_id": report.id, "request_id": report.id})


def list_reports_for_demo_user(session: Session) -> list[ReportListItem]:
    user = ensure_demo_user(session)
    session.flush()

    statement = select(Report).where(Report.user_id == user.id).order_by(Report.created_at.desc())
    rows = session.scalars(statement).all()

    return [
        ReportListItem(
            report_id=row.id,
            report_type=row.report_type,
            title="Compatibility bundle" if row.report_type == "compatibility" else "Basic saju",
            created_at=row.created_at.isoformat(),
        )
        for row in rows
    ]


def get_report_detail(session: Session, report_id: str) -> ReportDetailResponse:
    report = session.get(Report, report_id)
    if report is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Report not found.")

    sections = [
        ReportSection(
            title="Personality",
            body=(
                "This persisted scaffold keeps the interpretation tone structured and modern. "
                "In the full implementation, deterministic saju traits should feed the narrative layer."
            ),
        ),
        ReportSection(
            title="Career",
            body=(
                "Career reading should interpret role fit, tempo, and pressure response using stable "
                "rules plus controlled language generation."
            ),
        ),
        ReportSection(
            title="Health caution",
            body=(
                "This category stays at general lifestyle caution level and must never become medical advice."
            ),
        ),
    ]

    if report.report_type == "compatibility":
        sections.insert(
            1,
            ReportSection(
                title="Compatibility",
                body=(
                    "Compatibility content should describe rhythm, complement, and friction points without "
                    "pretending to predict outcomes with certainty."
                ),
            ),
        )

    return ReportDetailResponse(
        report_id=report.id,
        report_type=report.report_type,
        preview_summary=report.preview_text,
        status=report.status,
        sections=sections,
    )


def create_checkout_record(session: Session, payload: CheckoutRequest) -> tuple[Purchase, Report | None]:
    user = ensure_demo_user(session)
    report = session.get(Report, payload.report_id) if payload.report_id else None

    purchase = Purchase(
        user_id=user.id,
        report_id=report.id if report is not None else None,
        provider="toss_payments",
        provider_payment_id=None,
        amount=payload.amount,
        currency="KRW",
        status="pending",
    )
    session.add(purchase)

    if report is not None:
        report.status = "payment_pending"

    session.commit()
    session.refresh(purchase)

    return purchase, report


def create_inquiry_record(session: Session, payload: InquiryCreateRequest) -> InquiryResponse:
    user = ensure_demo_user(session)
    inquiry = Inquiry(
        user_id=user.id,
        category=payload.category,
        title=payload.title,
        body=payload.body,
        status="open",
    )
    session.add(inquiry)
    session.commit()
    session.refresh(inquiry)

    return InquiryResponse(
        inquiry_id=inquiry.id,
        status=inquiry.status,
        created_at=_format_datetime(inquiry.created_at),
    )


def _format_datetime(value: datetime) -> str:
    return value.isoformat()

