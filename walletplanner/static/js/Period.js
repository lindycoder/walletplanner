export default class Period {
    constructor({openingBalance, range, transactions}) {
        this.openingBalance = openingBalance;
        this.range = range;
        this.transactions = transactions;
    }

    getClosingBalance() {
        return this.transactions.reduce((total, e) => total + e.amount, this.openingBalance);
    }
}

export class InitialPeriod extends Period{
    constructor(openingBalance) {
        super({openingBalance: openingBalance});
    }

    getClosingBalance() {
        return this.openingBalance;
    }
}
