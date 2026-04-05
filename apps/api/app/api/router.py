from fastapi import APIRouter

from app.api.routes import auth, health, payments, reports, support

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(reports.router, prefix="/reports", tags=["reports"])
api_router.include_router(payments.router, prefix="/payments", tags=["payments"])
api_router.include_router(support.router, prefix="/support", tags=["support"])
