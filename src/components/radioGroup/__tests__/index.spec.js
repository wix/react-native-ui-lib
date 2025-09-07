import React from 'react';
import RadioGroup from "../index";
import RadioButton from "../../radioButton/index";
import { RadioGroupDriver } from "../RadioGroup.driver";
const testID = 'radioGroup';
const testIDs = {
  radioButtonUp: 'radioButtonUp',
  radioButtonDown: 'radioButtonDown',
  radioButtonLeft: 'radioButtonLeft',
  radioButtonRight: 'radioButtonRight'
};
const onValueChangeMock = jest.fn();
const RadioGroupTestComponent = props => {
  const {
    shouldDisable,
    ...others
  } = props;
  return <RadioGroup {...others} onValueChange={onValueChangeMock} testID={testID}>
      <RadioButton value={'up'} label={'Up'} disabled={shouldDisable} testID={testIDs.radioButtonUp} />
      <RadioButton value={'down'} label={'Down'} testID={testIDs.radioButtonDown} />
      <RadioButton value={'left'} label={'Left'} testID={testIDs.radioButtonLeft} />
      <RadioButton value={'right'} label={'Right'} testID={testIDs.radioButtonRight} />
    </RadioGroup>;
};
describe('RadioGroup renderer test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => RadioGroupDriver.clear());
  it('Press on radio button', async () => {
    const props = {
      onValueChangeMock
    };
    const component = <RadioGroupTestComponent {...props} />;
    const driver = new RadioGroupDriver({
      component,
      testID,
      testIDs
    });
    await driver.pressOn(testIDs.radioButtonUp);
    expect(onValueChangeMock).toHaveBeenCalledTimes(1);
    expect(onValueChangeMock).toHaveBeenCalledWith('up');
  });
  it('Press on disabled radio button', async () => {
    const props = {
      onValueChangeMock,
      shouldDisable: true
    };
    const component = <RadioGroupTestComponent {...props} />;
    const driver = new RadioGroupDriver({
      component,
      testID,
      testIDs
    });
    await driver.pressOn(testIDs.radioButtonUp);
    expect(onValueChangeMock).not.toHaveBeenCalled();
  });
  it('Press on selected radio button', async () => {
    const props = {
      onValueChangeMock,
      initialValue: 'up'
    };
    const component = <RadioGroupTestComponent {...props} />;
    const driver = new RadioGroupDriver({
      component,
      testID,
      testIDs
    });
    await driver.pressOn(testIDs.radioButtonUp);
    expect(onValueChangeMock).toHaveBeenCalledTimes(1);
    expect(onValueChangeMock).toHaveBeenCalledWith('up');
  });
  it('Press multiple radio buttons', async () => {
    const props = {
      onValueChangeMock
    };
    const component = <RadioGroupTestComponent {...props} />;
    const driver = new RadioGroupDriver({
      component,
      testID,
      testIDs
    });
    await driver.pressOn(testIDs.radioButtonUp);
    expect(onValueChangeMock).toHaveBeenCalledTimes(1);
    expect(onValueChangeMock).toHaveBeenCalledWith('up');
    await driver.pressOn(testIDs.radioButtonDown);
    expect(onValueChangeMock).toHaveBeenCalledTimes(2);
    expect(onValueChangeMock.mock.calls).toEqual([['up'], ['down']]);
    await driver.pressOn(testIDs.radioButtonLeft);
    expect(onValueChangeMock).toHaveBeenCalledTimes(3);
    expect(onValueChangeMock.mock.calls).toEqual([['up'], ['down'], ['left']]);
    await driver.pressOn(testIDs.radioButtonRight);
    expect(onValueChangeMock).toHaveBeenCalledTimes(4);
    expect(onValueChangeMock.mock.calls).toEqual([['up'], ['down'], ['left'], ['right']]);
  });
});