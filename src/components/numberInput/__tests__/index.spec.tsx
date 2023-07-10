import React from 'react';
import NumberInput from '../index';
import {NumberInputDriver} from '../NumberInput.driver';

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
  it('Should update number when fractionDigits changes', async () => {
    const component = <TestCase/>;
    const numberInputDriver = new NumberInputDriver({component, testID: 'field'});
    expect(await numberInputDriver.exists()).toBe(true);
    numberInputDriver.changeText('1234567');
    expect(await numberInputDriver.getText()).toEqual('12,345.67');
    // TODO: add changing fractionDigits once we support rerender in our drivers


    // const renderTree = render(<TestCase/>);
    // const input = renderTree.getByTestId('field');
    // fireEvent(input, 'focus');
    // fireEvent.changeText(input, '1234567');
    // fireEvent(input, 'blur');
    // renderTree.getByDisplayValue('1,234.67');
    // renderTree.rerender(<TestCase fractionDigits={3}/>);
    // renderTree.getByDisplayValue('123.457');
  });
});
