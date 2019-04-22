from flask import Blueprint, request

from walletplanner.models import Transaction
from walletplanner.transactions import Transactions


class TransactionsBlueprint(Blueprint):
    core_transactions: Transactions = None


blueprint = TransactionsBlueprint('transactions', __name__)


@blueprint.record
def bootstrap(setup_state):
    blueprint.core_transactions = setup_state.app.config["di.transactions"]


@blueprint.route('', methods=['POST'], strict_slashes=False)
def add_transaction():
    data = request.json

    blueprint.core_transactions.add_transaction(Transaction(
        amount=int(data["amount"]),
        description=data["description"],
        category=data["category"]
    ))

    return "", 201
