from typing import Literal

from pydantic import BaseModel, HttpUrl


SocialProvider = Literal["kakao", "google", "apple"]


class SocialAuthStartRequest(BaseModel):
    provider: SocialProvider
    redirect_uri: HttpUrl


class SocialAuthStartResponse(BaseModel):
    provider: SocialProvider
    authorization_url: HttpUrl

