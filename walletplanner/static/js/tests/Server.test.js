import Server from "../Server";

describe('Server', () => {
  let server;

  beforeEach(() => {
    server = new Server({
      transactions: "/api/transactions"
    });

    fetch.resetMocks();
  });

  it('Should add a transaction ', async () => {
    const transaction = {
      "amount": 1000,
      "date": new Date("2019-02-01"),
      "description": "stuff",
      "category": "cat1"
    };

    fetch.once("", { status: 201 });

    await server.addTransaction(transaction);

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('/api/transactions')
    expect(fetch.mock.calls[0][1]).toEqual({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "amount": 1000,
        "date": "2019-02-01",
        "description": "stuff",
        "category": "cat1"
      })
    })
  });

  it('Should get the transaction ', async () => {
    const transactions = [{
      "amount": 1000,
      "date": "2019-02-01",
      "description": "stuff",
      "category": "cat1"
    }];

    fetch.once(JSON.stringify(transactions), { status: 200 });

    let returnedTransactions = await server.getTransactions();

    expect(returnedTransactions).toEqual([{
        "amount": 1000,
        "date": new Date("2019-02-01"),
        "description": "stuff",
        "category": "cat1"
    }]);

    expect(fetch.mock.calls[0][0]).toEqual('/api/transactions')
  });

});
