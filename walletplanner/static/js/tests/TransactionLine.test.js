import React from 'react';
import { shallow } from 'enzyme';
import TransactionLine from '../TransactionLine';

describe('TransactionLine', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            transaction: {
               "amount": 10,
               "description": "desc1",
               "category": "cat1"
            },
            onChange: jest.fn()
        };
        wrapper = shallow(<TransactionLine {...props} />);
    });

    it('should render an initial value', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should invoke onChange when the input text changes', () => {
        wrapper.find('CurrencyInput').first().simulate('changeEvent');
        expect(props.onChange).toHaveBeenCalledWith(props.transaction);
    });
});
