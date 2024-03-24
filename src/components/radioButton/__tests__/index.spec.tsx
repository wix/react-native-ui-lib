import React from 'react';
import {render} from '@testing-library/react-native';
import {RadioButtonDriver} from '../RadioButton.driver.new';
import {Assets, RadioButton, RadioButtonProps} from '../../../index';

const testID = 'checkbox';

const TestCase = (props: RadioButtonProps) => {
  return <RadioButton {...props} testID={testID}/>;
};
describe('RadioButton renderer test', () => {
  it('should render a RadioButton', async () => {
    const renderTree = render(<TestCase/>);
    const driver = RadioButtonDriver({renderTree, testID});

    expect(driver.exists()).toBeTruthy();
  });

  it('should render a RadioButton with label', async () => {
    const renderTree = render(<TestCase label={'test'}/>);
    const driver = RadioButtonDriver({renderTree, testID});

    expect(driver.hasLabel()).toBeTruthy();
  });

  it('should render a RadioButton with icon', async () => {
    const renderTree = render(<TestCase iconSource={Assets.icons.x}/>);
    const driver = RadioButtonDriver({renderTree, testID});

    expect(driver.hasIcon()).toBeTruthy();
  });

  it('should render a RadioButton with label and icon', async () => {
    const renderTree = render(<TestCase label={'test'} iconSource={Assets.icons.x}/>);
    const driver = RadioButtonDriver({renderTree, testID});

    expect(driver.hasLabel()).toBeTruthy();
    expect(driver.hasIcon()).toBeTruthy();
  });
});
