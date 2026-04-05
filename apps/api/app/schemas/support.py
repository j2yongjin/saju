from typing import Literal

from pydantic import BaseModel


InquiryCategory = Literal["payment", "report", "account"]


class InquiryCreateRequest(BaseModel):
    category: InquiryCategory
    title: str
    body: str


class InquiryResponse(BaseModel):
    inquiry_id: str
    status: str
    created_at: str

