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
      "description": "stuff",
      "category": "cat1"
    };

    fetch.once("", { status: 201 });

    await server.addTransaction(transaction);

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('/api/transactions')
    expect(fetch.mock.calls[0][1]).toEqual({
      method: 'POST',
      body: JSON.stringify({
        "amount": 1000,
        "description": "stuff",
        "category": "cat1"
      })
    })
  });

});