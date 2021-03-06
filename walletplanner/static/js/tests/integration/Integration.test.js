import React from 'react';
import { mount } from 'enzyme';
import App from '../../App';
import FakeServer from './FakeServer';

describe('App', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        Date.now = jest.fn(() => new Date(2019, 1, 2));

        props = {
          homeUrl: '/home-url',
          echoUrl: '/echo-url',
          server: new FakeServer(),
        };
        wrapper = mount(<App {...props} />);
    });

    it('should be able to add and see a transaction', async () => {
        let transactionAmountInput = wrapper.find('input.transaction-line-amount').first();
        transactionAmountInput.instance().value = '1.00';
        transactionAmountInput.simulate('change');

        wrapper.find('button').simulate('click');

        await undefined;
        wrapper.instance().forceUpdate();
        await undefined;
        wrapper.update();

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.transaction-badge-amount').text()).toBe("1.00$");
    });
});
