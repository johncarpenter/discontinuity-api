from discontinuity_api.models import Token, Workspace
from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

import os
import time
from typing import Dict
import jwt

from discontinuity_api.database import get_workspace, get_db, get_organization

import logging
logger = logging.getLogger(__name__)

JWT_SECRET = os.getenv("CLERK_PEM_PUBLIC_KEY")
JWT_ALGORITHM = "RS256"


class ClerkJWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(ClerkJWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(
            ClerkJWTBearer, self
        ).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(
                    status_code=403, detail="Invalid authentication scheme."
                )
            
            token = self.verify_jwt(credentials.credentials)
            if not token:
                raise HTTPException(
                    status_code=403, detail="Invalid token or expired token."
                )

            # This may not exist for individual vs team
            ownerId = token["org_id"] if "org_id" in token else token["sub"]  # user id
            session = next(get_db())
            organization = get_organization(session=session, owner_id=ownerId)

            return {"accountId": organization.id, "organization": organization.name, "type": organization.type}

        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")

    def verify_jwt(self, jwtoken: str) -> bool:

        try:
            payload = decodeJWT(jwtoken)
        except:
            payload = None
              
        return payload


def decodeJWT(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded_token if decoded_token["exp"] >= time.time() else None
    except Exception as err:
        logger.error(f"{err} Unable to decode token")
        return None


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
