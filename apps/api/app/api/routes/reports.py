from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db_session
from app.schemas.report import PreviewRequest, PreviewResponse, ReportDetailResponse, ReportListItem
from app.services.repository import get_report_detail, list_reports_for_demo_user, persist_preview_report
from app.services.saju import build_preview

router = APIRouter()


@router.post("/preview", response_model=PreviewResponse)
def generate_preview(
    payload: PreviewRequest,
    session: Session = Depends(get_db_session),
) -> PreviewResponse:
    preview = build_preview(payload)
    return persist_preview_report(session, payload, preview)


@router.get("/history", response_model=list[ReportListItem])
def list_report_history(session: Session = Depends(get_db_session)) -> list[ReportListItem]:
    return list_reports_for_demo_user(session)


@router.get("/{report_id}", response_model=ReportDetailResponse)
def get_report_detail_route(
    report_id: str,
    session: Session = Depends(get_db_session),
) -> ReportDetailResponse:
    return get_report_detail(session, report_id)
