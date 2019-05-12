import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('App', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        Date.now = jest.fn(() => new Date(2019, 1, 2));

        props = {
          homeUrl: '/home-url',
          echoUrl: '/echo-url',
          server: {getTransactions: jest.fn()},
        };
        wrapper = shallow(<App {...props} />);
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('On transaction added, should refresh the transaction list', async () => {
        const transactionList = [{amount: 100}, {amount: 200}];

        props.server.getTransactions.mockResolvedValue(transactionList);

        wrapper.find('AddTransactions').simulate('transactionAdded');
        await undefined;

        expect(wrapper.state().transactions).toBe(transactionList);

        expect(wrapper).toMatchSnapshot();
    });
});
