import React from 'react';
import Chip, {ChipProps} from '../index';
import {ChipDriver} from '../Chip.driver';

const testID = 'CHIP_TEST_ID';
const icon = {uri: 'dummy'};
const onDismissMock = jest.fn();

const ChipTestComponent = (props: ChipProps) => (
  <Chip
    {...props}
    testID={testID}
  />
);

describe('Chip renderer test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => ChipDriver.clear());

  it('Should render chip', async () => {
    const component = <ChipTestComponent/>;
    const driver = new ChipDriver({component, testID});
    const isChipRendered = await driver.exists();
    expect(isChipRendered).toBe(true);
  });

  it('Should render label', async () => {
    const component = <ChipTestComponent label={'label'}/>;
    const driver = new ChipDriver({component, testID});
    const isLabelRendered = await driver.hasLabel();
    expect(isLabelRendered).toBe(true);
  });

  it('Should render only left icon', async () => {
    const component = <ChipTestComponent iconSource={icon}/>;
    const driver = new ChipDriver({component, testID});
    const isLeftIconRendered = await driver.hasLeftIcon();
    const isRightButtonRendered = await driver.hasRightIcon();
    expect(isLeftIconRendered).toBe(true);
    expect(isRightButtonRendered).toBe(false);
  });

  it('Should render only right icon', async () => {
    const component = <ChipTestComponent rightIconSource={icon}/>;
    const driver = new ChipDriver({component, testID});
    const isLeftIconRendered = await driver.hasLeftIcon();
    const isRightButtonRendered = await driver.hasRightIcon();
    expect(isLeftIconRendered).toBe(false);
    expect(isRightButtonRendered).toBe(true);
  });

  it('Should render two icons', async () => {
    const component = <ChipTestComponent rightIconSource={icon} iconSource={icon}/>;
    const driver = new ChipDriver({component, testID});
    const isLeftIconRendered = await driver.hasLeftIcon();
    const isRightButtonRendered = await driver.hasRightIcon();
    expect(isLeftIconRendered).toBe(true);
    expect(isRightButtonRendered).toBe(true);
  });

  it('Should dismiss chip', async () => {
    const component = <ChipTestComponent onDismiss={onDismissMock}/>;
    const driver = new ChipDriver({component, testID});
    const hasDismiss = await driver.hasDismissIcon();
    expect(hasDismiss).toBe(true);
    await driver.dismiss();
    expect(onDismissMock).toHaveBeenCalledTimes(1);
  });
});
