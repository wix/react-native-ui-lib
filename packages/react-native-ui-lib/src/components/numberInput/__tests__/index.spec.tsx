import React from 'react';
import {render} from '@testing-library/react-native';
import {NumberInputDriver} from '../NumberInput.driver';
import NumberInput from '../index';

const TEST_ID = 'numberInput';
const onChangeNumber = () => {};

const defaultProps = {
  testID: TEST_ID,
  placeholder: 'Placeholder',
  centered: true,
  onChangeNumber
};

const TestCase = props => {
  return <NumberInput {...defaultProps} {...props}/>;
};

describe('NumberInput', () => {
  it('Should display formatted number', async () => {
    const renderTree = render(<TestCase/>);
    const numberInputDriver = NumberInputDriver({renderTree, testID: TEST_ID});
    
    expect(numberInputDriver.exists()).toBe(true);

    numberInputDriver.changeText('1234567');
    expect(await numberInputDriver.getValue()).toEqual('12,345.67');
  });

  it('Should update number when fractionDigits change', async () => {
    const renderTree = render(<TestCase/>);
    const numberInputDriver = NumberInputDriver({renderTree, testID: TEST_ID});

    numberInputDriver.changeText('1234567');
    expect(await numberInputDriver.getValue()).toEqual('12,345.67');

    renderTree.rerender(<TestCase fractionDigits={4}/>);
    expect(await numberInputDriver.getValue()).toEqual('123.4567');
  });
});
