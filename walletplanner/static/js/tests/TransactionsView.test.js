import React from 'react';
import {shallow} from 'enzyme';
import TransactionsView from '../TransactionsView';
import {StaticMonthly} from '../Periodicity';
import {moment} from '../utils';

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

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly amounts in the correct column', () => {
        let periods = wrapper.find("TransactionsPeriodView");
        expect(periods).toHaveLength(9, "Periods should be 3 before, current plus 5 next");

        expect(periods.at(0).props().transactions).toEqual([props.transactions[1]]);
        expect(periods.at(1).props().transactions).toEqual([props.transactions[2]]);
        expect(periods.at(2).props().transactions).toEqual([props.transactions[3]]);
        expect(periods.at(3).props().transactions).toEqual([props.transactions[4], props.transactions[5]]);
        expect(periods.at(4).props().transactions).toEqual([props.transactions[6]]);
        expect(periods.at(5).props().transactions).toEqual([]);
        expect(periods.at(6).props().transactions).toEqual([]);
        expect(periods.at(7).props().transactions).toEqual([]);
        expect(periods.at(8).props().transactions).toEqual([props.transactions[7]]);
    });
});
