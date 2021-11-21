import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import RadioGroup from '../index';
import RadioButton from '../../radioButton/index';

const testIDs = {
  radioGroup: 'RadioGroup',
  radioButtonUp: 'radioButtonUp',
  radioButtonDown: 'radioButtonDown',
  radioButtonLeft: 'radioButtonLeft',
  radioButtonRight: 'radioButtonRight'
};
const onValueChangeMock = jest.fn();

const RadioGroupTestComponent = props => {
  const {shouldDisable, ...others} = props;
  return (
    <RadioGroup {...others} onValueChange={onValueChangeMock} testID={testIDs.radioGroup}>
      <RadioButton value={'up'} label={'Up'} disabled={shouldDisable} testID={testIDs.radioButtonUp}/>
      <RadioButton value={'down'} label={'Down'} testID={testIDs.radioButtonDown}/>
      <RadioButton value={'left'} label={'Left'} testID={testIDs.radioButtonLeft}/>
      <RadioButton value={'right'} label={'Right'} testID={testIDs.radioButtonRight}/>
    </RadioGroup>
  );
};

describe('RadioGroup renderer test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Press on radio button', async () => {
    const props = {onValueChangeMock};
    const element = <RadioGroupTestComponent {...props}/>;

    const {getByTestId} = render(element);

    const radioGroup = getByTestId(testIDs.radioGroup);
    expect(radioGroup).toBeTruthy();

    const up = getByTestId(testIDs.radioButtonUp);
    expect(up).toBeTruthy();
    fireEvent.press(up);
    expect(onValueChangeMock).toHaveBeenCalled();
    expect(onValueChangeMock).toHaveBeenCalledTimes(1);
    expect(onValueChangeMock).toHaveBeenCalledWith('up');
  });

  it('Press on disabled radio button', async () => {
    const props = {onValueChangeMock, shouldDisable: true};
    const element = <RadioGroupTestComponent {...props}/>;

    const {getByTestId} = render(element);

    const radioGroup = getByTestId(testIDs.radioGroup);
    expect(radioGroup).toBeTruthy();

    const up = getByTestId(testIDs.radioButtonUp);
    expect(up).toBeTruthy();
    fireEvent.press(up);
    expect(onValueChangeMock).not.toHaveBeenCalled();
    expect(onValueChangeMock).toHaveBeenCalledTimes(0);
  });

  it('Press on selected radio button', async () => {
    const props = {onValueChangeMock, initialValue: 'up'};
    const element = <RadioGroupTestComponent {...props}/>;

    const {getByTestId} = render(element);

    const radioGroup = getByTestId(testIDs.radioGroup);
    expect(radioGroup).toBeTruthy();

    const up = getByTestId(testIDs.radioButtonUp);
    expect(up).toBeTruthy();
    fireEvent.press(up);
    expect(onValueChangeMock).toHaveBeenCalled();
    expect(onValueChangeMock).toHaveBeenCalledTimes(1);
    expect(onValueChangeMock).toHaveBeenCalledWith('up');
  });

  it('Press multiple radio buttons', async () => {
    const props = {onValueChangeMock};
    const element = <RadioGroupTestComponent {...props}/>;

    const {getByTestId} = render(element);

    const radioGroup = getByTestId(testIDs.radioGroup);
    expect(radioGroup).toBeTruthy();

    const up = getByTestId(testIDs.radioButtonUp);
    expect(up).toBeTruthy();
    fireEvent.press(up);
    expect(onValueChangeMock).toHaveBeenCalled();
    expect(onValueChangeMock).toHaveBeenCalledTimes(1);
    expect(onValueChangeMock).toHaveBeenCalledWith('up');
    const down = getByTestId(testIDs.radioButtonDown);
    expect(down).toBeTruthy();
    fireEvent.press(down);
    expect(onValueChangeMock).toHaveBeenCalled();
    expect(onValueChangeMock).toHaveBeenCalledTimes(2);
    expect(onValueChangeMock.mock.calls).toEqual([['up'], ['down']]);
    const left = getByTestId(testIDs.radioButtonLeft);
    expect(left).toBeTruthy();
    fireEvent.press(left);
    expect(onValueChangeMock).toHaveBeenCalled();
    expect(onValueChangeMock).toHaveBeenCalledTimes(3);
    expect(onValueChangeMock.mock.calls).toEqual([['up'], ['down'], ['left']]);
    const right = getByTestId(testIDs.radioButtonRight);
    expect(right).toBeTruthy();
    fireEvent.press(right);
    expect(onValueChangeMock).toHaveBeenCalled();
    expect(onValueChangeMock).toHaveBeenCalledTimes(4);
    expect(onValueChangeMock.mock.calls).toEqual([['up'], ['down'], ['left'], ['right']]);
  });
});
