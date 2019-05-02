import React from 'react';
import { shallow } from 'enzyme';
import TransactionBadge from '../TransactionBadge';

describe('TransactionBadge', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            transaction: {
               "amount": 1000,
               "description": "desc1",
               "category": "cat1"
            }
        };
        wrapper = shallow(<TransactionBadge {...props} />);
    });

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render the amount correctly', () => {
        expect(wrapper.find('.transaction-badge-amount').first().text()).toBe("10.00$")
    });
});
