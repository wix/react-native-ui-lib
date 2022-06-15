import React from 'react';
import {RadioButtonDriver} from '../RadioButton.driver';
import {Assets, RadioButton, RadioButtonProps} from '../../../index';

const testID = 'checkbox';

const TestCase = (props: RadioButtonProps) => {
  return <RadioButton {...props} testID={testID}/>;
};
describe('RadioButton renderer test', () => {
  afterEach(() => RadioButtonDriver.clear());

  it('should render a RadioButton', async () => {
    const component = <TestCase/>;
    const driver = new RadioButtonDriver({component, testID});

    expect(await driver.exists()).toBeTruthy();
  });

  it('should render a RadioButton with label', async () => {
    const component = <TestCase label={'test'}/>;
    const driver = new RadioButtonDriver({component, testID});

    expect(await driver.hasLabel()).toBeTruthy();
  });

  it('should render a RadioButton with icon', async () => {
    const component = <TestCase iconSource={Assets.icons.x}/>;
    const driver = new RadioButtonDriver({component, testID});

    expect(await driver.hasIcon()).toBeTruthy();
  });

  it('should render a RadioButton with label and icon', async () => {
    const component = <TestCase label={'test'} iconSource={Assets.icons.x}/>;
    const driver = new RadioButtonDriver({component, testID});

    expect(await driver.hasLabel()).toBeTruthy();
    expect(await driver.hasIcon()).toBeTruthy();
  });
});
