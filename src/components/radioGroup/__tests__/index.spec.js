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

    const {getByTestId} = render(<RadioGroupTestComponent {...props}/>);

    getByTestId(testIDs.radioGroup);

    const radioButtonUp = getByTestId(testIDs.radioButtonUp);
    fireEvent.press(radioButtonUp);
    expect(onValueChangeMock).toHaveBeenCalledTimes(1);
    expect(onValueChangeMock).toHaveBeenCalledWith('up');
  });

  it('Press on disabled radio button', async () => {
    const props = {onValueChangeMock, shouldDisable: true};

    const {getByTestId} = render(<RadioGroupTestComponent {...props}/>);

    getByTestId(testIDs.radioGroup);

    const radioButtonUp = getByTestId(testIDs.radioButtonUp);
    fireEvent.press(radioButtonUp);
    expect(onValueChangeMock).not.toHaveBeenCalled();
  });

  it('Press on selected radio button', async () => {
    const props = {onValueChangeMock, initialValue: 'up'};

    const {getByTestId} = render(<RadioGroupTestComponent {...props}/>);

    getByTestId(testIDs.radioGroup);

    const radioButtonUp = getByTestId(testIDs.radioButtonUp);
    fireEvent.press(radioButtonUp);
    expect(onValueChangeMock).toHaveBeenCalledTimes(1);
    expect(onValueChangeMock).toHaveBeenCalledWith('up');
  });

  it('Press multiple radio buttons', async () => {
    const props = {onValueChangeMock};

    const {getByTestId} = render(<RadioGroupTestComponent {...props}/>);

    getByTestId(testIDs.radioGroup);

    const radioButtonUp = getByTestId(testIDs.radioButtonUp);
    fireEvent.press(radioButtonUp);
    expect(onValueChangeMock).toHaveBeenCalledTimes(1);
    expect(onValueChangeMock).toHaveBeenCalledWith('up');
    const radioButtonDown = getByTestId(testIDs.radioButtonDown);
    fireEvent.press(radioButtonDown);
    expect(onValueChangeMock).toHaveBeenCalledTimes(2);
    expect(onValueChangeMock.mock.calls).toEqual([['up'], ['down']]);
    const radioButtonLeft = getByTestId(testIDs.radioButtonLeft);
    fireEvent.press(radioButtonLeft);
    expect(onValueChangeMock).toHaveBeenCalledTimes(3);
    expect(onValueChangeMock.mock.calls).toEqual([['up'], ['down'], ['left']]);
    const radioButtonRight = getByTestId(testIDs.radioButtonRight);
    fireEvent.press(radioButtonRight);
    expect(onValueChangeMock).toHaveBeenCalledTimes(4);
    expect(onValueChangeMock.mock.calls).toEqual([['up'], ['down'], ['left'], ['right']]);
  });
});
