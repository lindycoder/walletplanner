import React from 'react';
import { shallow } from 'enzyme';
import TransactionsView from '../TransactionsView';
import { StaticMonthly } from '../Periodicity';
import { moment } from '../utils';

describe('TransactionsView', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            transactions: [
                {"amount": 1000, "date": moment("2018-12-10"), "description": "Before period start", "category": null},
                {"amount": 1000, "date": moment("2018-12-31"), "description": "3 periods ago", "category": null},
                {"amount": 1000, "date": moment("2019-01-01"), "description": "2 periods ago", "category": null},
                {"amount": 1000, "date": moment("2019-01-15"), "description": "1 period ago", "category": null},
                {"amount": 1000, "date": moment("2019-02-06"), "description": "Current period 1", "category": null},
                {"amount": 1000, "date": moment("2019-02-08"), "description": "Current period 2", "category": null},
                {"amount": 1000, "date": moment("2019-02-26"), "description": "Next period 2", "category": null},
                {"amount": 1000, "date": moment("2019-04-30"), "description": "In 5 periods", "category": null},
                {"amount": 1000, "date": moment("2019-05-03"), "description": "In 6 periods", "category": null},
            ],
            periodicity: new StaticMonthly([1, 15]),
            currentDate: moment("2019-02-01"),
            periodStart: -3
        };
        wrapper = shallow(<TransactionsView {...props} />);
    });

    it('should render correctly amounts in the correct column', () => {
        expect(wrapper).toMatchSnapshot();

        let periods = wrapper.find("div.transaction-view-period")
        expect(periods).toHaveLength(9, "Periods should be 3 before, current plus 5 next");

        expect(periods.at(0).find("div.transaction-view-date").text()).toBe("2018-12-15");
        expect(periods.at(0).find("TransactionBadge")).toHaveLength(1);

        expect(periods.at(1).find("div.transaction-view-date").text()).toBe("2019-01-01");
        expect(periods.at(1).find("TransactionBadge")).toHaveLength(1);

        expect(periods.at(2).find("div.transaction-view-date").text()).toBe("2019-01-15");
        expect(periods.at(2).find("TransactionBadge")).toHaveLength(1);

        expect(periods.at(3).find("div.transaction-view-date").text()).toBe("2019-02-01");
        expect(periods.at(3).find("TransactionBadge")).toHaveLength(2);

        expect(periods.at(4).find("div.transaction-view-date").text()).toBe("2019-02-15");
        expect(periods.at(4).find("TransactionBadge")).toHaveLength(1);

        expect(periods.at(5).find("div.transaction-view-date").text()).toBe("2019-03-01");
        expect(periods.at(5).find("TransactionBadge")).toHaveLength(0);

        expect(periods.at(6).find("div.transaction-view-date").text()).toBe("2019-03-15");
        expect(periods.at(6).find("TransactionBadge")).toHaveLength(0);

        expect(periods.at(7).find("div.transaction-view-date").text()).toBe("2019-04-01");
        expect(periods.at(7).find("TransactionBadge")).toHaveLength(0);

        expect(periods.at(8).find("div.transaction-view-date").text()).toBe("2019-04-15");
        expect(periods.at(8).find("TransactionBadge")).toHaveLength(1);
    });
});
