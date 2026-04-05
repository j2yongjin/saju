from datetime import date, time
from typing import Literal

from pydantic import BaseModel, Field


CalendarMode = Literal["solar", "lunar"]
Gender = Literal["male", "female", "other"]
ReportType = Literal["basic_saju", "compatibility"]


class BirthProfileInput(BaseModel):
    birth_date: date
    birth_time: time
    calendar_mode: CalendarMode
    gender: Gender


class PreviewRequest(BaseModel):
    report_type: ReportType
    primary_profile: BirthProfileInput
    partner_profile: BirthProfileInput | None = None


class PreviewResponse(BaseModel):
    request_id: str
    report_id: str | None = None
    preview_summary: str
    locked_categories: list[str]
    recommended_products: list[str]


class ReportSection(BaseModel):
    title: str
    body: str


class ReportDetailResponse(BaseModel):
    report_id: str
    report_type: ReportType
    preview_summary: str
    status: str
    sections: list[ReportSection] = Field(default_factory=list)


class ReportListItem(BaseModel):
    report_id: str
    report_type: ReportType
    title: str
    created_at: str
