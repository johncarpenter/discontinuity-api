from fastapi.testclient import TestClient
import pytest

from app import app

client = TestClient(app)


def test_discontinuity_demo(get_valid_bearer_token):
    response = client.post(
        "/discontinuity/site/query",
        headers={"Authorization": f"Bearer {get_valid_bearer_token}"},
        json={"query": "Who made this site?"},
    )

    print(response.json())
    assert response.status_code == 200
