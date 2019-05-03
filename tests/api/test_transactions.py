from datetime import date

import pytest
from flask import Flask

from tests.flexermock import flexermock, capture
from walletplanner.models import Transaction
from walletplanner.transactions import Transactions


@pytest.fixture
def core_transactions():
    return flexermock(Transactions)


@pytest.fixture
def client(core_transactions):
    app = Flask(__name__)
    app.testing = True
    app.config["di.transactions"] = core_transactions

    from walletplanner.api.transactions import blueprint as transactions_blueprint
    app.register_blueprint(transactions_blueprint, url_prefix="/api/transactions")

    return app.test_client()


def test_add_transaction(client, core_transactions):
    core_transactions.should_receive("add_transaction").with_args(capture.transaction)

    resp = client.post('/api/transactions', json={
        "amount": "1000",
        "date": "2019-01-02",
        "description": "stuff",
        "category": "cat1"
    })

    assert resp.status_code == 201

    assert capture.transaction.amount == 1000
    assert capture.transaction.date == date(2019, 1, 2)
    assert capture.transaction.description == "stuff"
    assert capture.transaction.category == "cat1"


def test_get_transactions(client, core_transactions):
    core_transactions.should_receive("get_all").and_return([
        Transaction(100,
                    date=date(2019, 1, 2),
                    description="desc1",
                    category="cat1"),
        Transaction(200)]
    )

    resp = client.get('/api/transactions')

    assert resp.status_code == 200

    assert resp.json == [
        {
            "amount": 100,
            "date": "2019-01-02",
            "description": "desc1",
            "category": "cat1"
        },
        {
            "amount": 200,
            "date": None,
            "description": None,
            "category": None
        }]
