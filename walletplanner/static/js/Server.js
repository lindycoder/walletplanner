class Server {
  constructor(apiCatalog) {
    this.apiCatalog = apiCatalog;
  }

  async addTransaction(transaction) {
    return fetch(this.apiCatalog.transactions, {
      method: 'POST',
      body: JSON.stringify(transaction)
    });
    // .then(response => res)
    // .catch((error) => {});
  }
}


export default Server;
