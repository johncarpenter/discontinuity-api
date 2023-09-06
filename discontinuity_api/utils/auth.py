from discontinuity_api.models import Token, Workspace
from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

import os
import time
from typing import Dict
import jwt

from discontinuity_api.database import get_workspace, get_db

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = "HS256"


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(
            JWTBearer, self
        ).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(
                    status_code=403, detail="Invalid authentication scheme."
                )
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(
                    status_code=403, detail="Invalid token or expired token."
                )

            apikeyId = decodeJWT(credentials.credentials)["id"]

            session = next(get_db())
            workspace: workspace = get_workspace(session=session, api_key_id=apikeyId)
            return workspace

        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")

    def verify_jwt(self, jwtoken: str) -> bool:
        isTokenValid: bool = False

        try:
            payload = decodeJWT(jwtoken)
        except:
            payload = None
        if payload:
            isTokenValid = True
        return isTokenValid


def signJWT(id: str, expires: int = 3600) -> Token:
    payload = {"id": id, "expires": time.time() + expires}
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return Token(access_token=token)


def decodeJWT(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded_token if decoded_token["expires"] >= time.time() else None
    except:
        return {}


def hasPermission(workspace: Workspace, permission):
    if workspace.api_keys is None or len(workspace.api_keys) == 0:
        raise HTTPException(status_code=401, detail="Unable to access resource")

    if (
        workspace.api_keys[0].permissions is None
        or len(workspace.api_keys[0].permissions) == 0
    ):
        raise HTTPException(status_code=401, detail="Unable to access resource")

    if "admin" in workspace.api_keys[0].permissions:
        return True

    if permission in workspace.api_keys[0].permissions:
        return True

    raise HTTPException(status_code=401, detail="Unable to access resource")
