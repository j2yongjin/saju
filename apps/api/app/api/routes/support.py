from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db_session
from app.schemas.support import InquiryCreateRequest, InquiryResponse
from app.services.repository import create_inquiry_record

router = APIRouter()


@router.post("/inquiries", response_model=InquiryResponse)
def create_inquiry(
    payload: InquiryCreateRequest,
    session: Session = Depends(get_db_session),
) -> InquiryResponse:
    return create_inquiry_record(session, payload)

