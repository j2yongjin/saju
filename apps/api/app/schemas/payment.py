from typing import Literal

from pydantic import BaseModel, HttpUrl, PositiveInt


ProductCode = Literal["basic_saju", "compatibility_bundle"]


class CheckoutRequest(BaseModel):
    product_code: ProductCode
    amount: PositiveInt
    report_id: str | None = None


class CheckoutResponse(BaseModel):
    checkout_id: str
    purchase_id: str
    provider: Literal["toss_payments"]
    status: Literal["pending"]
    checkout_url: HttpUrl
