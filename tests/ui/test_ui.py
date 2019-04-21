import pytest

import walletplanner


@pytest.fixture
def client():
    """Flask test client"""
    walletplanner.app.testing = True
    return walletplanner.app.test_client()


def test_ui_index(client):
    """Should render the home page"""
    resp = client.get('/')
    assert b'<div id="root">' in resp.data
    assert b'initApp' in resp.data
