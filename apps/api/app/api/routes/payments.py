from uuid import uuid4

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db_session
from app.schemas.payment import CheckoutRequest, CheckoutResponse
from app.services.repository import create_checkout_record

router = APIRouter()


@router.post("/checkout", response_model=CheckoutResponse)
def create_checkout_session(
    payload: CheckoutRequest,
    session: Session = Depends(get_db_session),
) -> CheckoutResponse:
    checkout_id = f"chk_{uuid4().hex[:12]}"
    purchase, report = create_checkout_record(session, payload)
    return CheckoutResponse(
        checkout_id=checkout_id,
        purchase_id=purchase.id,
        provider="toss_payments",
        status="pending",
        checkout_url=(
            "https://pay.example.com/"
            f"{checkout_id}?product={payload.product_code}"
            f"&purchase_id={purchase.id}"
            f"{f'&report_id={report.id}' if report is not None else ''}"
        ),
    )
