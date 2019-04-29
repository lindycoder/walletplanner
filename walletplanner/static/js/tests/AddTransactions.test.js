import React from 'react';
import { shallow } from 'enzyme';
import AddTransactions from '../AddTransactions';

describe('AddTransactions', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            server: {addTransaction: jest.fn() }
        };
        wrapper = shallow(<AddTransactions {...props} />);
    });

    it('should invoke onChange when the input text changes', () => {
        wrapper.find('button').simulate('click');
        expect(props.server.addTransaction).toHaveBeenCalledWith({
            "amount": 0,
            "description": "",
            "category": ""
         });
    });
});
