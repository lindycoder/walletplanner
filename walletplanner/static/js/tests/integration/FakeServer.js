export default class FakeServer {

  constructor() {
    this.transactions = [];
  }

  async addTransaction(transaction) {
    this.transactions.push(transaction);
  }

  async getTransactions() {
    return JSON.parse(JSON.stringify(this.transactions));
  }
}