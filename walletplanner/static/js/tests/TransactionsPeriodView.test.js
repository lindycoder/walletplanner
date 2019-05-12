import React from 'react';
import {shallow} from 'enzyme';
import TransactionsPeriodView from '../TransactionsPeriodView';
import {moment} from '../utils';

describe('TransactionsPeriodView', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            period: moment.range(moment("2019-02-01"), moment("2019-02-15")),
            transactions: [
                {"amount": 1000, "date": moment("2019-02-06"), "description": "Current period 1", "category": null},
                {"amount": 1000, "date": moment("2019-02-08"), "description": "Current period 2", "category": null},
            ]
        };
        wrapper = shallow(<TransactionsPeriodView {...props} />);
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correctly amounts in the correct column', () => {
        expect(wrapper.find(".transaction-view-date").text()).toBe("2019-02-01");
        expect(wrapper.find(".transactions > TransactionBadge")).toHaveLength(2);

        expect(wrapper.find(".transactions-total").text()).toBe('20.00$');
    });
});
