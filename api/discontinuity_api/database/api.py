from typing import List
from discontinuity_api.models.organization import OrganizationType
from discontinuity_api.models.prompt import Prompt
from discontinuity_api.models.llmmodel import LLMModel
from .dbmodels import ApiKeyDb, FileDb, FlowDb, PromptDb, WorkspaceDb, LLMModelDb, OrganizationDb
from discontinuity_api.models import ApiKey, Workspace, Flow, File, Organization
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



def get_organization(session: Session, owner_id: str) -> Workspace:
    organization = (
        session.query(OrganizationDb)
        .filter(OrganizationDb.clerk_id == owner_id)
        .first()
    )

    # throw an error?
    if organization is None:
        return None
    
    if owner_id.startswith("org_"):
        return Organization(id=organization.id , name=organization.name, type=OrganizationType.ORGANIZATION)
    else:
        return Organization(id=organization.id , name="Individual", type=OrganizationType.INDIVIDUAL)

## This will retrieve the workspaces for either the user account or the organization
def get_workspaces_for_account(session: Session, owner_id: str) -> list[Workspace]:
    workspaces = (
        session.query(WorkspaceDb)
        .filter(WorkspaceDb.ownerId == owner_id)
        .all()
    )

    if workspaces is None:
        return None
    
    return [
        Workspace(
            id=workspace.id,
            name=workspace.name,
            slug=workspace.slug,
        )
        for workspace in workspaces]


def get_workspace_for_account(session: Session, workspace_id:str, owner_id: str) -> list[Workspace]:
    workspace = (
        session.query(WorkspaceDb)
        .filter(WorkspaceDb.ownerId == owner_id, WorkspaceDb.id == workspace_id)
        .first()
    )

    if workspace is None:
        return None
    
    return Workspace(
            id=workspace.id,
            name=workspace.name,
            slug=workspace.slug,
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
        ]
    )

def getFlow(session: Session, flow_id: str) -> Workspace:
    flow = (
        session.query(FlowDb)
        .join(WorkspaceDb)
        .filter(FlowDb.id == flow_id)
        .first()
    )

    if flow is None:
        return None
    
    return Flow(
        id=flow.id,
        name=flow.name,
        description=flow.description,
        apikey=flow.apikey,
        endpoint=flow.endpoint,
    )

def getLLMModel(session: Session, model_id: str)-> LLMModel:
    model = (
        session.query(LLMModelDb)
        .filter(LLMModelDb.id == model_id)
        .first()
    )

    if model is None:
        return None
    
    return LLMModel(
        id=model.id,
        name=model.name,
        apikey=model.apikey,
        source=model.source,
    )

def getPrompt(session: Session, prompt_id: str)-> Prompt:
    prompt = (
        session.query(PromptDb)
        .filter(PromptDb.id == prompt_id)
        .first()
    )

    if prompt is None:
        return None
    
    return Prompt(
        id=prompt.id,
        name=prompt.name,
        prompt=prompt.prompt
    )

def getFiles(session: Session, workspace_id: str, filenames: List[str]) -> List[File]:
    files = (
        session.query(FileDb)
        .filter(FileDb.workspaceId == workspace_id, FileDb.filename.in_(filenames))
        .all()
    )

    if files is None:
        return None
    
    return files

