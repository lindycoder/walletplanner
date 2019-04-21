import pytest

import walletplanner


@pytest.fixture
def client():
    """Flask test client"""
    walletplanner.app.testing = True
    return walletplanner.app.test_client()


def test_api_echo(client):
    """Should echo the URL parameter"""
    resp = client.get('/api/echo/test-value')
    assert resp.get_json() == {'value': 'test-value'}


def test_api_echo_empty(client):
    """Should return a 404 error"""
    resp = client.get('/api/echo')
    assert resp.status_code == 404
