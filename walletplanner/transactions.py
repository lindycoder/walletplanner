from walletplanner.models import Transaction


class Transactions:
    def __init__(self, transaction_source):
        self.transaction_source = transaction_source

    def add_transaction(self, transaction: Transaction):
        self.transaction_source.save(transaction)

    def get_all(self):
        return self.transaction_source.get_all()