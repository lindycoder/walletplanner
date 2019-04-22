import uuid

from walletplanner.adapters import TransactionSource
from walletplanner.models import Transaction


class MemoryTransactionSource(TransactionSource):
    def save(self, transaction: Transaction):
        transaction.id = uuid.uuid4()
