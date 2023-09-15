from fastapi.testclient import TestClient
import pytest

from app import app

client = TestClient(app)

def test_winefolly_demo(get_valid_bearer_token):
    response = client.post("/elevate/demo/winefolly",
                          headers={"Authorization": f"Bearer {get_valid_bearer_token}"},
                          json={"query": "What are some italian varieties?"})     

    print(response.json())                     
    assert response.status_code == 200



