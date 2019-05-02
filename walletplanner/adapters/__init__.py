from abc import ABC, abstractmethod

from walletplanner.models import Transaction


class TransactionSource(ABC):
    @abstractmethod
    def save(self, transaction: Transaction):
        pass

    @abstractmethod
    def get_all(self):
        pass
