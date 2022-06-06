import React from 'react';
import ActionSheet, {ActionSheetProps} from '../index';
import {ActionSheetDriver} from '../ActionSheet.driver';

const testID = 'ACTION_SHEET_TEST_ID';
const title = 'dummy_title';
const options: ActionSheetProps['options'] = [
  {
    label: 'option1',
    onPress: jest.fn(),
    testID: 'TEST_ID_OPTION_1'
  },
  {
    label: 'option2',
    onPress: jest.fn(),
    testID: 'TEST_ID_OPTION_2'
  }
];
const optionsTestIds = options.map((option) => option.testID);
const onDismissMock = jest.fn();

const ActionSheetTestComponent = (props: Omit<ActionSheetProps, 'visible'>) => (
  <ActionSheet
    {...props}
    testID={testID}
    visible
  />
);

describe('ActionSheet renderer test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => ActionSheetDriver.clear());

  it('Should render action sheet', async () => {
    const component = <ActionSheetTestComponent/>;
    const driver = new ActionSheetDriver({component, testID});
    const isActionSheetRendered = await driver.exists();
    expect(isActionSheetRendered).toBe(true);
  });

  it('Should render title', async () => {
    const component = <ActionSheetTestComponent title={title}/>;
    const driver = new ActionSheetDriver({component, testID});
    const renderedTitle = await driver.getTitle();
    expect(renderedTitle).toBe(title);
  });

  it('Should render currect amount of actions with labels', async () => {
    const component = <ActionSheetTestComponent options={options}/>;
    const driver = new ActionSheetDriver({component, testID, optionsTestIds});
    const actionDrivers = await driver.getActionDrivers();
    expect(actionDrivers.length).toBe(2);
    const actions = await Promise.all(actionDrivers.map(async (actionDriver) => ({
      hasRendered: await actionDriver.exists(),
      renderedLabel: await actionDriver.getLabel()
    })));
    expect(actions[0]).toEqual({
      hasRendered: true,
      renderedLabel: options[0].label
    });
    expect(actions[1]).toEqual({
      hasRendered: true,
      renderedLabel: options[1].label
    });
    
  });

  it('Should dismiss after action pressed', async () => {
    const component = <ActionSheetTestComponent onDismiss={onDismissMock} options={options}/>;
    const driver = new ActionSheetDriver({component, testID, optionsTestIds});
    const actionDrivers = await driver.getActionDrivers();
    await actionDrivers[0].press();
    expect(options[0].onPress).toHaveBeenCalledTimes(1);
    expect(options[1].onPress).toHaveBeenCalledTimes(0);
    expect(onDismissMock).toHaveBeenCalledTimes(1);
  });
});
