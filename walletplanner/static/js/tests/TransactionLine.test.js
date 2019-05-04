import React from 'react';
import { shallow } from 'enzyme';
import { moment } from '../utils';
import TransactionLine from '../TransactionLine';

describe('TransactionLine', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            transaction: {
               "amount": 10,
               "date": moment("2019-01-02"),
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
        wrapper.find('CurrencyInput').first().simulate('changeEvent', null, "100.00", 100.0);
        expect(props.onChange).toHaveBeenCalledWith(props.transaction);
        expect(props.transaction.amount).toBe(10000);
    });

    it('should invoke onChange when the date picker changes', () => {
        wrapper.find('DatePicker').first().simulate('change', new Date("2019-05-01T04:00:00.000Z"));
        expect(props.onChange).toHaveBeenCalledWith(props.transaction);
        expect(props.transaction.date.isSame(moment("2019-05-01"))).toBe(true);
    });
});

describe('TransactionLine without OnChange', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            transaction: {
               "amount": 10,
               "description": "desc1",
               "category": "cat1"
            }
        };
        wrapper = shallow(<TransactionLine {...props} />);
    });

    it('should not fail when a change occurs without an onchange prop', () => {
        wrapper.find('CurrencyInput').first().simulate('changeEvent');
    });
});
