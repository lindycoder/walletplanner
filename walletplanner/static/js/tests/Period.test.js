import Period from "../Period";

describe('Period', () => {
    let period;

    describe('closingBalance', () => {

        it('Should add all transactions ', () => {
            period = new Period({
                openingBalance: 1000, transactions: [
                    {amount: 100},
                    {amount: 200},
                ]
            });

            expect(period.getClosingBalance()).toBe(1300);
        });
    });
});
