from dataclasses import dataclass


@dataclass
class Transaction:
    amount: int
    description: str
    category: str
