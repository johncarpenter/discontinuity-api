from fastapi.testclient import TestClient
import pytest
from discontinuity_api.vector.base import get_faiss_vector_db

from app import app

client = TestClient(app)


def test_user_login(mock_clerk_login):

    mock_clerk_login.return_value = {"accountId": "testaccount", "organization": "org_name", "type": "INDIVIDUAL"}
    response = client.get(
        "/user/me",
        headers={"Authorization": f"Bearer mocked"},
    )

    print(response.json())
    assert response.status_code == 200

def test_workspaces( mock_clerk_login):    
    mock_clerk_login.return_value = {"accountId": "testaccount", "organization": "org_name", "type": "INDIVIDUAL"}
    response = client.get(
        "/user/workspaces",
        headers={"Authorization": f"Bearer mocked"},
    )

    print(response.json())
    assert response.status_code == 200
    assert response.json() == [{'id': 'testing', 'name': 'testing', 'slug': 'test', 'api_keys': None, 'flows': None}]


def test_workspaces_text( mock_clerk_login):    
    mock_clerk_login.return_value = {"accountId": "testaccount", "organization": "org_name", "type": "INDIVIDUAL"}
    response = client.post(
        "/user/workspaces/testing/text",
        headers={"Authorization": f"Bearer mocked"},
        json={"content": "test content", "metadata": {"test": "test"}}
    )

    print(response.json())
    assert response.status_code == 201


def test_workspaces_text_unauthorized( mock_clerk_login):    
    mock_clerk_login.return_value = {"accountId": "testOtheraccount", "organization": "org_name", "type": "INDIVIDUAL"}
    response = client.post(
        "/user/workspaces/testing/text",
        headers={"Authorization": f"Bearer mocked"},
        json={"content": "test content", "metadata": {"test": "test"}}
    )

    print(response.json())
    assert response.status_code == 404


def test_workspaces_url( mock_clerk_login):    
    mock_clerk_login.return_value = {"accountId": "testaccount", "organization": "org_name", "type": "INDIVIDUAL"}
    response = client.post(
        "/user/workspaces/testing/url",
        headers={"Authorization": f"Bearer mocked"},
        json={"url": "https://discontinuity.ai", "metadata": {"test": "test"}}
    )

    print(response.json())
    assert response.status_code == 201

def test_workspaces_url_javascript_url( mock_clerk_login):    
    mock_clerk_login.return_value = {"accountId": "testaccount", "organization": "org_name", "type": "INDIVIDUAL"}
    response = client.post(
        "/user/workspaces/testing/url",
        headers={"Authorization": f"Bearer mocked"},
        json={"url": "https://medium.com/@johncarpenter/react-model-enhancing-ai-capabilities-through-multi-step-decision-making-7ae864d654ca", "metadata": {"test": "test"}}
    )

    print(response.json())
    assert response.status_code == 201

