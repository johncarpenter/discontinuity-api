from discontinuity_api.database import (
    find_api_key,
    get_db,
    ApiKeyDb,
    WorkspaceDb,
    get_workspace,
)
from discontinuity_api.models import ApiKey


def test_find_api_key():
    session = next(get_db())

    # Add a test api key to the database
    workspace = WorkspaceDb(name="test")
    workspace.api_keys = []
    workspace.api_keys.append(
        ApiKeyDb(client_id="test2", client_secret="test", permissions="test")
    )
    session.add(workspace)
    session.commit()

    # Test that the api key is in the database
    key = find_api_key(session=session, client_id="test2", client_secret="test")

    assert key is not None
    assert key.client_id == "test2"
    assert key.client_secret == "test"
    assert key.permissions == ["test"]

    session.delete(workspace)
    session.commit()


def test_get_workspace():
    session = next(get_db())
    # Add a test api key to the database
    workspace = WorkspaceDb(name="test2")
    workspace.api_keys = []
    workspace.api_keys.append(
        ApiKeyDb(client_id="test", client_secret="test", permissions="test")
    )
    session.add(workspace)
    session.commit()

    # Test that the api key is in the database
    wk = get_workspace(session=session, api_key_id=workspace.api_keys[0].id)

    print("\nWorkspace:", wk)

    assert wk is not None
    assert wk.name == "test2"
    assert wk.api_keys[0].permissions == ["test"]

    session.delete(workspace)
    session.commit()
