import {moment} from "../../utils"

export default class FakeServer {

  constructor() {
    this.transactions = [];
  }

  async addTransaction(transaction) {
    this.transactions.push(transaction);
  }

  async getTransactions() {
    return this.transactions.map(transaction => {
        return {
          amount: transaction.amount,
          date: moment(transaction.date),
          description: transaction.description,
          category: transaction.category
        }
    });
  }
}