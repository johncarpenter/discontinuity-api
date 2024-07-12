from fastapi.params import Depends
from fastapi import HTTPException, Depends
from discontinuity_api.models import ClientIdSecret, ApiKey
from discontinuity_api.database import find_api_key, get_db
from discontinuity_api.utils import signJWT, JWTBearer
from sqlalchemy.orm import Session

from fastapi import APIRouter, HTTPException
import os
import logging


logger = logging.getLogger(__name__)
## Refresh tokens aren't implemented yet


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/token")
def login(client: ClientIdSecret, session: Session = Depends(get_db)):
    logger.info("Login attempt for client_id: %s", client.client_id)

    apiKey: ApiKey = find_api_key(
        session=session, client_id=client.client_id, client_secret=client.client_secret
    )

    # Should we be adding a salt here? 
    if apiKey is not None:
        return signJWT(apiKey.id, expires=365*24*60*60)  # 1 year ex

    raise HTTPException(status_code=403, detail="Invalid credentials")


@router.get("/me")
def protected(workspace=Depends(JWTBearer())):
    return {"workspace": workspace.name, "scope": workspace.api_keys[0].permissions}
