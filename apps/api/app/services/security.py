from cryptography.fernet import Fernet

from app.core.config import get_settings

settings = get_settings()
_cipher = Fernet(settings.resolved_sensitive_data_key.encode("utf-8"))


def encrypt_sensitive_value(value: str) -> str:
    return _cipher.encrypt(value.encode("utf-8")).decode("utf-8")

