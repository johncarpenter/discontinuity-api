from .auth import router as auth_router
from .admin import router as admin_router
from .elevate import router as elevate_router
from .data import router as data_router

__all__ = ["admin_router","auth_router", "elevate_router", "data_router"]