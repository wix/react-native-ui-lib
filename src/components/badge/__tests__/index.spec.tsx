import React from 'react';
import {View} from 'react-native';
import Badge, {BadgeProps} from '../index';
import {BadgeDriver} from '../Badge.driver';

const testID = 'BADGE_TEST_ID';
const customComponentTestId = 'CUSTOM_COMPONENT';
const icon = {uri: 'dummy'};
const onPressMock = jest.fn();

const CustomComponent = () => (
  <View 
    testID={customComponentTestId}
  />
);

const BadgeTestComponent = (props: BadgeProps) => (
  <Badge
    {...props}
    testID={testID}
  />
);

describe('Badge renderer test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => BadgeDriver.clear());

  it('Should render badge', async () => {
    const component = <BadgeTestComponent/>;
    const driver = new BadgeDriver({component, testID});
    const isBadgeRendered = await driver.exists();
    expect(isBadgeRendered).toBe(true);
  });

  it('Should render label', async () => {
    const component = <BadgeTestComponent label={'label'}/>;
    const driver = new BadgeDriver({component, testID});
    const isLabelRendered = await driver.hasLabel();
    expect(isLabelRendered).toBe(true);
  });

  it('Should render custom component', async () => {
    const component = <BadgeTestComponent customElement={<CustomComponent/>}/>;
    const driver = new BadgeDriver({component, testID, customComponentTestId});
    const isCustomComponentRendered = await driver.hasCustomComponent();
    expect(isCustomComponentRendered).toBe(true);
  });

  it('Should render icon', async () => {
    const component = <BadgeTestComponent icon={icon}/>;
    const driver = new BadgeDriver({component, testID});
    const isIconRendered = await driver.hasIcon();
    expect(isIconRendered).toBe(true);
  });

  it('Should press badge', async () => {
    const component = <BadgeTestComponent onPress={onPressMock}/>;
    const driver = new BadgeDriver({component, testID});
    await driver.press();
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
