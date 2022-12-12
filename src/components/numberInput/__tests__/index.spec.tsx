import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import NumberInput from '../index';

const onChangeNumber = () => {};

const defaultProps = {
  testID: 'field',
  placeholder: 'Placeholder',
  centered: true,
  onChangeNumber
};

const TestCase = props => {
  return <NumberInput {...defaultProps} {...props}/>;
};

describe('NumberInput', () => {
  it('Should update number when fractionDigits changes', () => {
    const renderTree = render(<TestCase/>);
    const input = renderTree.getByTestId('field');
    fireEvent(input, 'focus');
    fireEvent.changeText(input, '123.4567');
    fireEvent(input, 'blur');
    renderTree.getByDisplayValue('123.46');
    renderTree.rerender(<TestCase fractionDigits={3}/>);
    renderTree.getByDisplayValue('123.457');
  });
});
