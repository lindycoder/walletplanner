from dataclasses import dataclass
from datetime import date


@dataclass
class Transaction:
    amount: int
    date: date = None
    description: str = None
    category: str = None

    id: str = None
