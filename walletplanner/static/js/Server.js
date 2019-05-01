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
      body: JSON.stringify(transaction)
    });
    // .then(response => res)
    // .catch((error) => {});
  }
}


export default Server;
