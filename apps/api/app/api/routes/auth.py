from fastapi import APIRouter

from app.schemas.auth import SocialAuthStartRequest, SocialAuthStartResponse

router = APIRouter()


@router.post("/social/start", response_model=SocialAuthStartResponse)
def start_social_auth(payload: SocialAuthStartRequest) -> SocialAuthStartResponse:
    authorization_url = (
        f"https://auth.example.com/{payload.provider}"
        f"?redirect_uri={payload.redirect_uri}"
    )
    return SocialAuthStartResponse(provider=payload.provider, authorization_url=authorization_url)

