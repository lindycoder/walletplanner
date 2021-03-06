import pytest

from tests.flexermock import flexermock
from walletplanner.adapters import TransactionSource
from walletplanner.models import Transaction
from walletplanner.transactions import Transactions


@pytest.fixture
def transaction_source():
    return flexermock(TransactionSource)


@pytest.fixture
def transactions(transaction_source):
    return Transactions(
        transaction_source=transaction_source
    )


def test_add_transaction(transactions, transaction_source):
    transaction = Transaction(100)
    transaction_source.should_receive("save").once().with_args(transaction)

    transactions.add_transaction(transaction)

def test_get_transaction(transactions, transaction_source):
    returned = [Transaction(100), Transaction(200)]
    transaction_source.should_receive("get_all").and_return(returned)

    assert transactions.get_all() == returned
