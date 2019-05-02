import pytest

from walletplanner.adapters.memory_transaction_source import MemoryTransactionSource
from walletplanner.models import Transaction


@pytest.fixture
def transaction_source():
    return MemoryTransactionSource()


def test_save_new_transaction_adds_a_uniqueid(transaction_source):
    transaction1 = Transaction(100)
    transaction2 = Transaction(100)

    transaction_source.save(transaction1)
    transaction_source.save(transaction2)

    assert transaction1.id != transaction2.id


def test_get_transaction_returns_what_was_added(transaction_source):
    transaction1 = Transaction(100)
    transaction2 = Transaction(100)

    transaction_source.save(transaction1)
    transaction_source.save(transaction2)

    assert transaction_source.get_all() == [transaction1, transaction2]
