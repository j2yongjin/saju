import base64
import hashlib
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    app_name: str = "dongyangui-sinbiroun-unmyeong-api"
    environment: str = "development"
    api_v1_prefix: str = "/api/v1"
    backend_cors_origins: str = "http://localhost:3000"
    sentry_dsn: str | None = None
    database_url: str = "postgresql+psycopg://saju:saju@db:5432/saju"
    llama_api_base_url: str | None = None
    llama_api_key: str | None = None
    openai_api_key: str | None = None
    toss_client_key: str | None = None
    toss_secret_key: str | None = None
    sensitive_data_key: str | None = None
    default_locale: str = "ko-KR"
    demo_user_provider: str = "kakao"
    demo_user_provider_user_id: str = "demo-user"
    demo_user_display_name: str = "Demo User"

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.backend_cors_origins.split(",") if origin.strip()]

    @property
    def resolved_sensitive_data_key(self) -> str:
        source = self.sensitive_data_key or f"{self.app_name}-development-only-key"

        if len(source) == 44:
            return source

        digest = hashlib.sha256(source.encode("utf-8")).digest()
        return base64.urlsafe_b64encode(digest).decode("utf-8")


@lru_cache
def get_settings() -> Settings:
    return Settings()
