import React, {useCallback} from 'react';
import {render} from '@testing-library/react-native';
import Checkbox from '../../checkbox';
import NestedCheckbox, {NestedCheckboxProps} from '../index';
import {NestedCheckboxDriver} from '../NestedCheckbox.driver';

const testID = 'nestedCheckbox';
const childTestIDs = ['first', 'second', 'third'];
const onValueChange = jest.fn();
const onValueChange1 = jest.fn();
const onValueChange2 = jest.fn();
const onValueChange3 = jest.fn();

function TestCase(props: NestedCheckboxProps) {
  const {value, ...others} = props;

  const _onValueChange = useCallback((value: boolean) => {
    onValueChange?.(value);
  }, [onValueChange]);

  const _onValueChange1 = useCallback((value: boolean) => {
    onValueChange1?.(value);
  }, [onValueChange1]);
  const _onValueChange2 = useCallback((value: boolean) => {
    onValueChange2?.(value);
  }, [onValueChange2]);
  const _onValueChange3 = useCallback((value: boolean) => {
    onValueChange3?.(value);
  }, [onValueChange3]);

  return (
    <NestedCheckbox value={value} onValueChange={_onValueChange} testID={testID} {...others}>
      <Checkbox onValueChange={_onValueChange1} testID={childTestIDs[0]}/>
      <Checkbox onValueChange={_onValueChange2} testID={childTestIDs[1]}/>
      <Checkbox onValueChange={_onValueChange3} testID={childTestIDs[2]}/>
    </NestedCheckbox>
  );
};

describe('NestedCheckbox renderer test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // afterEach(() => NestedCheckboxDriver.clear());

  it('Default value is false', async () => {
    const props = {label: 'Select all'};
    const renderTree = render(<TestCase {...props}/>);
    const driver = NestedCheckboxDriver({renderTree, testID});

    const state = driver.getState();
    expect(state).toEqual('unchecked');
  });

  it('Default value is false and pressing it will change the value to true', async () => {
    const props = {label: 'Select all'};
    const renderTree = render(<TestCase {...props}/>);
    const driver = NestedCheckboxDriver({renderTree, testID});

    let state = driver.getState();
    expect(state).toEqual('unchecked');

    await driver.press();

    state = driver.getState();
    expect(state).toEqual('checked');

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  // it('Press on first child checkbox', async () => {
  //   const props = {};
  //   const renderTree = render(<TestCase {...props}/>); // wrong!!!
  //   const driver = NestedCheckboxDriver({renderTree, testID: childTestIDs[0]});

  //   await driver.press();

  //   // const currentValue = driver.getValue(); //undefined
  //   // expect(currentValue).toEqual(true);

  //   expect(onValueChange).not.toHaveBeenCalled();
  //   expect(onValueChange1).toHaveBeenCalledTimes(1);
  //   expect(onValueChange1).toHaveBeenCalledWith(true);
  // });

});
