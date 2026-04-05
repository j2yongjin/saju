from uuid import uuid4

from fastapi import HTTPException, status

from app.schemas.report import PreviewRequest, PreviewResponse


LOCKED_CATEGORIES = [
    "Personality",
    "Romance",
    "Compatibility",
    "Career",
    "Wealth",
    "Health caution",
    "Major luck cycles",
]

ELEMENT_LABELS = ["wood", "fire", "earth", "metal", "water"]


def build_preview(payload: PreviewRequest) -> PreviewResponse:
    if payload.report_type == "compatibility" and payload.partner_profile is None:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Compatibility preview requires a partner profile.",
        )

    seed = (
        payload.primary_profile.birth_date.month
        + payload.primary_profile.birth_date.day
        + payload.primary_profile.birth_time.hour
    ) % len(ELEMENT_LABELS)
    dominant_element = ELEMENT_LABELS[seed]
    rhythm = "measured and deliberate" if seed % 2 == 0 else "responsive and adaptive"

    if payload.report_type == "compatibility":
        summary = (
            "This pair preview suggests a "
            f"{rhythm} relationship rhythm with a {dominant_element}-weighted tone. "
            "The free paragraph should create trust, while the paid reading expands into emotional "
            "fit, timing, and tension points."
        )
        products = ["compatibility_bundle"]
    else:
        summary = (
            "This preview suggests a "
            f"{rhythm} decision style with a {dominant_element}-weighted chart pattern. "
            "The full reading should expand beyond the summary into personality, career, wealth, "
            "and long-cycle interpretation."
        )
        products = ["basic_saju", "compatibility_bundle"]

    return PreviewResponse(
        request_id=f"prv_{uuid4().hex[:12]}",
        preview_summary=summary,
        locked_categories=LOCKED_CATEGORIES,
        recommended_products=products,
    )

