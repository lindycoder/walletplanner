import React from 'react';
import { shallow } from 'enzyme';
import EchoInput from '../EchoInput';

describe('EchoInput', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            value: 'test-value',
            onChange: jest.fn(),
            onSubmit: jest.fn(),
        };
        wrapper = shallow(<EchoInput {...props} />);
    });

    it('should render an initial value', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render a new value when updated', () => {
        wrapper.setProps({value: 'new-test-value'});
        expect(wrapper).toMatchSnapshot();
    });

    it('should invoke onSubmit when the submit button is clicked', () => {
        wrapper.find('form').simulate('submit');
        expect(props.onSubmit).toHaveBeenCalled();
    });

    it('should invoke onChange when the input text changes', () => {
        wrapper.find('input').simulate('change');
        expect(props.onChange).toHaveBeenCalled();
    });
});
