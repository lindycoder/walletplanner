import {moment} from './utils'

class Server {
  constructor(apiCatalog) {
    this.apiCatalog = apiCatalog;
  }

  async addTransaction(transaction) {
    return fetch(this.apiCatalog.transactions, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: transaction.amount,
        date: transaction.date.format("YYYY-MM-DD"),
        description: transaction.description,
        category: transaction.category
      })
    });
  }

  async getTransactions() {
    return fetch(this.apiCatalog.transactions)
        .then(response => response.json())
        .then(json => json.map(fromApi));
  }
}

function fromApi(transaction) {
    return {
      amount: transaction.amount,
      date: moment(transaction.date),
      description: transaction.description,
      category: transaction.category
    }
}


export default Server;
