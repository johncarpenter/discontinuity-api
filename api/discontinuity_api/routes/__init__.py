from .auth import router as auth_router
from .admin import router as admin_router
from .discontinuity import router as discontinuity_router
from .workspace import router as workspace_router
from .user import router as user_router

__all__ = ["admin_router", "auth_router", "discontinuity_router", "workspace_router", "user_router"]
