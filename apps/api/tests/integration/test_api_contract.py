import os
from pathlib import Path

from fastapi.testclient import TestClient

from app.main import create_application

TEST_DB_PATH = Path("test_api_contract.sqlite3")
os.environ["DATABASE_URL"] = f"sqlite+pysqlite:///{TEST_DB_PATH}"

client = TestClient(create_application())


def test_healthcheck_returns_ok() -> None:
    response = client.get("/api/v1/health")

    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_preview_returns_locked_categories() -> None:
    response = client.post(
        "/api/v1/reports/preview",
        json={
            "report_type": "basic_saju",
            "primary_profile": {
                "birth_date": "1994-03-16",
                "birth_time": "08:30:00",
                "calendar_mode": "solar",
                "gender": "female",
            },
        },
    )

    assert response.status_code == 200
    data = response.json()
    assert data["locked_categories"]
    assert "Career" in data["locked_categories"]
    assert data["report_id"]


def test_compatibility_preview_requires_partner_profile() -> None:
    response = client.post(
        "/api/v1/reports/preview",
        json={
            "report_type": "compatibility",
            "primary_profile": {
                "birth_date": "1994-03-16",
                "birth_time": "08:30:00",
                "calendar_mode": "solar",
                "gender": "female",
            },
        },
    )

    assert response.status_code == 422


def test_checkout_returns_pending_session() -> None:
    response = client.post(
        "/api/v1/payments/checkout",
        json={
            "product_code": "basic_saju",
            "amount": 12900,
        },
    )

    assert response.status_code == 200
    assert response.json()["status"] == "pending"
    assert response.json()["purchase_id"]


def test_history_returns_persisted_reports() -> None:
    client.post(
        "/api/v1/reports/preview",
        json={
            "report_type": "basic_saju",
            "primary_profile": {
                "birth_date": "1994-03-16",
                "birth_time": "08:30:00",
                "calendar_mode": "solar",
                "gender": "female",
            },
        },
    )

    response = client.get("/api/v1/reports/history")

    assert response.status_code == 200
    assert len(response.json()) >= 1


def test_support_inquiry_is_created() -> None:
    response = client.post(
        "/api/v1/support/inquiries",
        json={
            "category": "payment",
            "title": "Need refund status",
            "body": "Payment succeeded but I need an update on the refund path.",
        },
    )

    assert response.status_code == 200
    assert response.json()["status"] == "open"
