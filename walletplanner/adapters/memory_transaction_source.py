import uuid

from walletplanner.adapters import TransactionSource
from walletplanner.models import Transaction


class MemoryTransactionSource(TransactionSource):
    def __init__(self):
        self.transactions = []

    def save(self, transaction: Transaction):
        transaction.id = uuid.uuid4()
        self.transactions.append(transaction)

    def get_all(self):
        return self.transactions
