import React from 'react';
import { shallow } from 'enzyme';
import AddTransactions from '../AddTransactions';
import {moment} from '../utils';

describe('AddTransactions', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        Date.now = jest.fn(() => new Date(2019, 1, 1));

        props = {
            server: {addTransaction: jest.fn() },
            onTransactionAdded: jest.fn()
        };
        wrapper = shallow(<AddTransactions {...props} />);
    });

    it('should invoke onChange when the input text changes', async () => {
        props.server.addTransaction.mockResolvedValue(null);

        wrapper.find('button').simulate('click');
        await undefined;

        expect(props.server.addTransaction).toHaveBeenCalledWith({
            "amount": 0,
            "date": expect.sameDate(moment("2019-02-01")),
            "description": "",
            "category": ""
        });
        expect(props.onTransactionAdded).toHaveBeenCalled();
    });
});


expect.extend({
  sameDate(actual, expected) {
    return {
        pass: actual.isSame(expected)
    }
  },
});