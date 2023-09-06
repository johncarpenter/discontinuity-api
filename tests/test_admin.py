from fastapi.testclient import TestClient
import pytest

from app import app

client = TestClient(app)

def test_admin_not_allowed(get_valid_bearer_token):
    response = client.get("/admin/workspace/list",
                          headers={"Authorization": f"Bearer {get_valid_bearer_token}"})
    assert response.status_code == 401


def test_admin_allowed(get_valid_bearer_token_admin):
    response = client.get("/admin/workspace/list",
                          headers={"Authorization": f"Bearer {get_valid_bearer_token_admin}"})
    
    
    
    assert response.status_code == 200
    workspaces = response.json()
    assert len(workspaces) == 2
    assert workspaces[0]["name"] == "testing"
    assert workspaces[1]["name"] == "admin"

