from __future__ import annotations

from datetime import datetime
from uuid import uuid4

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


def generate_id(prefix: str) -> str:
    return f"{prefix}_{uuid4().hex[:12]}"


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=lambda: generate_id("usr"))
    social_provider: Mapped[str] = mapped_column(String(32))
    social_provider_user_id: Mapped[str] = mapped_column(String(128), unique=True, index=True)
    display_name: Mapped[str] = mapped_column(String(120))
    locale: Mapped[str] = mapped_column(String(12), default="ko-KR")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    profiles: Mapped[list["SajuProfile"]] = relationship(back_populates="user")
    reports: Mapped[list["Report"]] = relationship(back_populates="user")
    purchases: Mapped[list["Purchase"]] = relationship(back_populates="user")
    inquiries: Mapped[list["Inquiry"]] = relationship(back_populates="user")


class SajuProfile(Base):
    __tablename__ = "saju_profiles"

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=lambda: generate_id("spf"))
    user_id: Mapped[str | None] = mapped_column(ForeignKey("users.id"), nullable=True, index=True)
    birth_date_encrypted: Mapped[str] = mapped_column(Text)
    birth_time_encrypted: Mapped[str] = mapped_column(Text)
    calendar_mode: Mapped[str] = mapped_column(String(16))
    gender: Mapped[str] = mapped_column(String(16))
    label: Mapped[str | None] = mapped_column(String(120), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)

    user: Mapped[User | None] = relationship(back_populates="profiles")
    reports: Mapped[list["Report"]] = relationship(back_populates="source_profile")


class CompatibilityProfile(Base):
    __tablename__ = "compatibility_profiles"

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=lambda: generate_id("cpf"))
    user_id: Mapped[str | None] = mapped_column(ForeignKey("users.id"), nullable=True, index=True)
    primary_profile_id: Mapped[str] = mapped_column(ForeignKey("saju_profiles.id"), index=True)
    partner_birth_date_encrypted: Mapped[str] = mapped_column(Text)
    partner_birth_time_encrypted: Mapped[str] = mapped_column(Text)
    partner_calendar_mode: Mapped[str] = mapped_column(String(16))
    partner_gender: Mapped[str] = mapped_column(String(16))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)


class Report(Base):
    __tablename__ = "reports"

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=lambda: generate_id("rpt"))
    user_id: Mapped[str | None] = mapped_column(ForeignKey("users.id"), nullable=True, index=True)
    report_type: Mapped[str] = mapped_column(String(32), index=True)
    source_profile_id: Mapped[str | None] = mapped_column(
        ForeignKey("saju_profiles.id"),
        nullable=True,
        index=True,
    )
    compatibility_profile_id: Mapped[str | None] = mapped_column(
        ForeignKey("compatibility_profiles.id"),
        nullable=True,
        index=True,
    )
    status: Mapped[str] = mapped_column(String(32), default="preview_ready")
    preview_text: Mapped[str] = mapped_column(Text)
    structured_traits_json: Mapped[str] = mapped_column(Text)
    full_interpretation_text: Mapped[str | None] = mapped_column(Text, nullable=True)
    llm_provider: Mapped[str | None] = mapped_column(String(64), nullable=True)
    llm_model: Mapped[str | None] = mapped_column(String(120), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)

    user: Mapped[User | None] = relationship(back_populates="reports")
    source_profile: Mapped[SajuProfile | None] = relationship(back_populates="reports")
    purchases: Mapped[list["Purchase"]] = relationship(back_populates="report")


class Purchase(Base):
    __tablename__ = "purchases"

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=lambda: generate_id("pur"))
    user_id: Mapped[str | None] = mapped_column(ForeignKey("users.id"), nullable=True, index=True)
    report_id: Mapped[str | None] = mapped_column(ForeignKey("reports.id"), nullable=True, index=True)
    provider: Mapped[str] = mapped_column(String(64), default="toss_payments")
    provider_payment_id: Mapped[str | None] = mapped_column(String(128), nullable=True)
    amount: Mapped[int] = mapped_column(Integer)
    currency: Mapped[str] = mapped_column(String(8), default="KRW")
    status: Mapped[str] = mapped_column(String(32), default="pending")
    refunded_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)

    user: Mapped[User | None] = relationship(back_populates="purchases")
    report: Mapped[Report | None] = relationship(back_populates="purchases")


class Inquiry(Base):
    __tablename__ = "inquiries"

    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=lambda: generate_id("inq"))
    user_id: Mapped[str | None] = mapped_column(ForeignKey("users.id"), nullable=True, index=True)
    category: Mapped[str] = mapped_column(String(32))
    title: Mapped[str] = mapped_column(String(180))
    body: Mapped[str] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(32), default="open")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)

    user: Mapped[User | None] = relationship(back_populates="inquiries")

