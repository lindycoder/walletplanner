import React from 'react';
import { shallow } from 'enzyme';
import TransactionsView from '../TransactionsView';

describe('TransactionsView', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            transactions: [
                {"amount": 1000, "description": "desc1", "category": "cat1"},
                {"amount": 2000, "description": "desc2", "category": "cat1"},
            ]
        };
        wrapper = shallow(<TransactionsView {...props} />);
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
