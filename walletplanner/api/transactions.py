from datetime import date

from flask import Blueprint, request, jsonify

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
        date=date.fromisoformat(data["date"]),
        description=data["description"],
        category=data["category"]
    ))

    return "", 201


@blueprint.route('', methods=['GET'], strict_slashes=False)
def get_transaction():
    return jsonify([
        {
            "amount": t.amount,
            "date": t.date.isoformat() if t.date is not None else None,
            "description": t.description,
            "category": t.category
        } for t in blueprint.core_transactions.get_all()
     ])
