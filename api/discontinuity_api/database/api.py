from .dbmodels import ApiKeyDb, WorkspaceDb
from discontinuity_api.models import ApiKey, Workspace
from sqlalchemy.orm import Session


def find_api_key(session: Session, client_id: str, client_secret) -> ApiKey:
    api_key = (
        session.query(ApiKeyDb)
        .filter(
            ApiKeyDb.client_id == client_id, ApiKeyDb.client_secret == client_secret
        )
        .first()
    )

    if api_key is None:
        return None

    permissions = api_key.permissions.split(",")

    return ApiKey(
        id=api_key.id,
        client_id=api_key.client_id,
        client_secret=api_key.client_secret,
        permissions=permissions,
    )


def get_workspace(session: Session, api_key_id: int) -> Workspace:
    apikey = (
        session.query(ApiKeyDb)
        .join(WorkspaceDb)
        .filter(ApiKeyDb.id == api_key_id)
        .first()
    )

    if apikey is None or apikey.workspace is None:
        return None

    return Workspace(
        id=apikey.workspace.id,
        name=apikey.workspace.name,
        slug=apikey.workspace.slug,
        api_keys=[
            ApiKey(
                id=apikey.id,
                client_id=apikey.client_id,
                permissions=apikey.permissions.split(","),
            )
        ],
    )
