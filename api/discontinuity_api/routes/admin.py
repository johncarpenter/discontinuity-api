from fastapi.params import Depends
from fastapi import HTTPException, Depends
from discontinuity_api.database import WorkspaceDb, ApiKeyDb
from discontinuity_api.models import Workspace, ApiKey
from discontinuity_api.database import get_db
from discontinuity_api.utils import JWTBearer, hasPermission
from sqlalchemy.orm import Session


from typing import List
from fastapi import APIRouter, HTTPException
import os

## Refresh tokens aren't implemented yet


router = APIRouter(prefix="/admin", tags=["admin"], include_in_schema=False)


@router.get(
    "/workspace/list", response_model=List[Workspace], response_model_exclude_none=True
)
def list_workspaces(workspace=Depends(JWTBearer()), session: Session = Depends(get_db)):
    hasPermission(workspace=workspace, permission="admin")

    workspacesDb = session.query(WorkspaceDb).all()

    workspaces = []
    for workspaceDb in workspacesDb:
        w = Workspace(id=workspaceDb.id, name=workspaceDb.name)
        w.api_keys = []
        for apiKey in workspaceDb.api_keys:
            w.api_keys.append(
                ApiKey(
                    id=apiKey.id,
                    client_id=apiKey.client_id,
                    permissions=apiKey.permissions.split(","),
                )
            )

        workspaces.append(w)
    session.close()
    print(workspaces)

    return workspaces


@router.post(
    "/workspace/{id}/key", response_model=Workspace, response_model_exclude_none=True
)
def generate_api_key(
    id: int,
    permissions: str = "user",
    workspace=Depends(JWTBearer()),
    session: Session = Depends(get_db),
):
    hasPermission(workspace=workspace, permission="admin")

    p = [x.strip() for x in permissions.split(",")]

    if "admin" in p:
        raise HTTPException(status_code=400, detail="Invalid permissions")

    workspaceDb = session.query(WorkspaceDb).filter(WorkspaceDb.id == id).first()
    if workspaceDb is None:
        raise HTTPException(status_code=404, detail="Workspace not found")

    api_key = ApiKeyDb(
        client_id=os.urandom(16).hex(),
        client_secret=os.urandom(16).hex(),
        permissions=",".join(p),
    )
    workspaceDb.api_keys.append(api_key)
    session.add(api_key)
    session.commit()

    return Workspace(
        id=workspaceDb.id,
        name=workspaceDb.name,
        api_keys=[
            ApiKey(
                id=api_key.id,
                client_secret=api_key.client_secret,
                client_id=api_key.client_id,
                permissions=p,
            )
        ],
    )


@router.post("/workspace", response_model=Workspace, response_model_exclude_none=True)
def create_workspace(
    name: str, workspace=Depends(JWTBearer()), session: Session = Depends(get_db)
):
    hasPermission(workspace=workspace, permission="admin")

    # Check if the name already exists
    workspaceDb = session.query(WorkspaceDb).filter(WorkspaceDb.name == name).first()
    if workspaceDb is not None:
        raise HTTPException(status_code=400, detail="Workspace name already exists")

    workspacedb = WorkspaceDb(name=name)
    session.add(workspacedb)
    session.commit()
    return Workspace(id=workspacedb.id, name=workspacedb.name)


@router.delete("/workspace/{id}")
def delete_workspace(
    id: int, workspace=Depends(JWTBearer()), session: Session = Depends(get_db)
):
    hasPermission(workspace=workspace, permission="admin")

    # We should probably archive this workspace instead of deleting it

    workspace = session.query(WorkspaceDb).filter(WorkspaceDb.id == id).first()

    if workspace is None:
        raise HTTPException(status_code=404, detail="Workspace not found")

    session.delete(workspace)
    session.commit()

    return {}


@router.delete("/workspace/{id}/key/{apikey_id}")
def delete_workspace(
    id: int,
    api_key: int,
    workspace=Depends(JWTBearer()),
    session: Session = Depends(get_db),
):
    hasPermission(workspace=workspace, permission="admin")

    workspace = session.query(WorkspaceDb).filter(WorkspaceDb.id == id).first()

    if workspace is None:
        raise HTTPException(status_code=404, detail="Workspace not found")

    api_key = session.query(ApiKeyDb).filter(ApiKeyDb.id == api_key).first()

    if api_key is None:
        raise HTTPException(status_code=404, detail="Api key not found")

    session.delete(api_key)
    session.commit()

    return {}
