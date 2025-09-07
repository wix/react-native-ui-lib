import React, { useState, useCallback } from 'react';
import { render } from '@testing-library/react-native';
import Checkbox from "../index";
import { CheckboxDriver } from "../Checkbox.driver";
const testID = 'checkbox';
const checkboxRef = React.createRef();
const onValueChange = jest.fn();
const onChangeValidity = jest.fn();
function TestCase(props) {
  const {
    value,
    onValueChange,
    ...others
  } = props;
  const [_value, _setValue] = useState(value);
  const _onValueChange = useCallback(newValue => {
    _setValue(newValue);
    onValueChange?.(newValue);
  }, [_setValue, onValueChange]);
  return <Checkbox {...others} onValueChange={_onValueChange} value={_value} testID={testID} ref={checkboxRef} />;
}
describe('Checkbox renderer test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('Value', () => {
    it('Default value is false', async () => {
      const props = {
        onValueChange
      };
      const renderTree = render(<TestCase {...props} />);
      const driver = CheckboxDriver({
        renderTree,
        testID
      });
      await driver.press();
      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onValueChange).toHaveBeenCalledWith(true);
    });
    it.each`
      checkboxInitialValue | checkboxExpectedValue
      ${false}             | ${true}
      ${true}              | ${false}
    `('Send value ($checkboxInitialValue)', async ({
      checkboxInitialValue,
      checkboxExpectedValue
    }) => {
      const props = {
        onValueChange,
        value: checkboxInitialValue
      };
      const renderTree = render(<TestCase {...props} />);
      const driver = CheckboxDriver({
        renderTree,
        testID
      });
      await driver.press();
      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onValueChange).toHaveBeenCalledWith(checkboxExpectedValue);
    });
  });
  describe('Press', () => {
    it('Multiple clicks', async () => {
      const props = {
        onValueChange
      };
      const renderTree = render(<TestCase {...props} />);
      const driver = CheckboxDriver({
        renderTree,
        testID
      });
      await driver.press();
      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onValueChange).toHaveBeenCalledWith(true);
      await driver.press();
      expect(onValueChange.mock.calls).toEqual([[true], [false]]);
      await driver.press();
      expect(onValueChange.mock.calls).toEqual([[true], [false], [true]]);
    });
    it.each`
      checkboxInitialValue
      ${false}
      ${true}
    `('Disabled (value = $checkboxInitialValue)', async ({
      checkboxInitialValue
    }) => {
      const props = {
        onValueChange,
        value: checkboxInitialValue,
        disabled: true
      };
      const renderTree = render(<TestCase {...props} />);
      const driver = CheckboxDriver({
        renderTree,
        testID
      });
      await driver.press();
      expect(onValueChange).not.toHaveBeenCalled();
    });
  });
  describe('Validation', () => {
    describe('onChangeValidity', () => {
      it('should not been called', async () => {
        const props = {
          onChangeValidity
        };
        const renderTree = render(<TestCase {...props} />);
        const driver = CheckboxDriver({
          renderTree,
          testID
        });
        await driver.press();
        expect(onChangeValidity).not.toHaveBeenCalled();
      });
      it('should been called with required prop', async () => {
        const props = {
          onChangeValidity,
          required: true
        };
        const renderTree = render(<TestCase {...props} />);
        const driver = CheckboxDriver({
          renderTree,
          testID
        });
        await driver.press();
        expect(onChangeValidity).toHaveBeenCalled();
        expect(onChangeValidity).toHaveBeenCalledWith(true);
      });
      it('should not been called after invoking validate()', async () => {
        const props = {
          required: true,
          onChangeValidity
        };
        const renderTree = render(<TestCase {...props} />);
        //eslint-disable-next-line
        CheckboxDriver({
          renderTree,
          testID
        });

        //@ts-ignore
        checkboxRef.current.validate();
        expect(onChangeValidity).not.toHaveBeenCalled();
      });
      it('should not been called after invoking validate() and value changed to true if required is false', async () => {
        const props = {
          onChangeValidity
        };
        const renderTree = render(<TestCase {...props} />);
        const driver = CheckboxDriver({
          renderTree,
          testID
        });
        checkboxRef.current?.validate();
        await driver.press();
        expect(onChangeValidity).not.toHaveBeenCalled();
      });
      it('should been called after invoking validate() and value changed to true', async () => {
        const props = {
          required: true,
          onChangeValidity
        };
        const renderTree = render(<TestCase {...props} />);
        const driver = CheckboxDriver({
          renderTree,
          testID
        });
        checkboxRef.current?.validate();
        await driver.press();
        expect(onChangeValidity).toHaveBeenCalledWith(true);
      });
      it('should been called after invoking validate() and value changed to true and then false', async () => {
        const props = {
          required: true,
          onChangeValidity
        };
        const renderTree = render(<TestCase {...props} />);
        const driver = CheckboxDriver({
          renderTree,
          testID
        });
        checkboxRef.current?.validate();
        await driver.press();
        await driver.press();
        expect(onChangeValidity).toHaveBeenCalledWith(false);
      });
      it.each([false, true])('should return validity from validate function - initial %s', async initialValue => {
        const props = {
          required: true,
          onChangeValidity,
          value: initialValue
        };
        const renderTree = render(<TestCase {...props} />);
        const driver = CheckboxDriver({
          renderTree,
          testID
        });
        expect(checkboxRef.current?.validate()).toBe(initialValue);
        await driver.press();
        expect(checkboxRef.current?.validate()).toBe(!initialValue);
      });
    });
    describe('isValid', () => {
      it('should be valid if initial value is false', async () => {
        const props = {};
        const renderTree = render(<TestCase {...props} />);
        //eslint-disable-next-line
        CheckboxDriver({
          renderTree,
          testID
        });
        const isValid = checkboxRef.current?.isValid();
        expect(isValid).toBe(true);
      });
      it('should be valid if initial value is true', async () => {
        const props = {
          value: true
        };
        const renderTree = render(<TestCase {...props} />);
        //eslint-disable-next-line
        CheckboxDriver({
          renderTree,
          testID
        });
        const isValid = checkboxRef.current?.isValid();
        expect(isValid).toBe(true);
      });
      it('should be valid if initial value is true and is required', async () => {
        const props = {
          value: true,
          required: true
        };
        const renderTree = render(<TestCase {...props} />);
        //eslint-disable-next-line
        CheckboxDriver({
          renderTree,
          testID
        });
        const isValid = checkboxRef.current?.isValid();
        expect(isValid).toBe(true);
      });
      it('should be invalid if initial value is false and is required', async () => {
        const props = {
          required: true
        };
        const renderTree = render(<TestCase {...props} />);
        //eslint-disable-next-line
        CheckboxDriver({
          renderTree,
          testID
        });
        const isValid = checkboxRef.current?.isValid();
        expect(isValid).toBe(false);
      });
      it('should be invalid after validate when initial value is false', async () => {
        const props = {
          required: true
        };
        const renderTree = render(<TestCase {...props} />);
        //eslint-disable-next-line
        CheckboxDriver({
          renderTree,
          testID
        });
        let isValid = checkboxRef.current?.isValid();
        expect(isValid).toBe(false);
        checkboxRef.current?.validate();
        isValid = checkboxRef.current?.isValid();
        expect(isValid).toBe(false);
      });
      it('should be valid after validate when initial value is true', async () => {
        const props = {
          value: true,
          required: true
        };
        const renderTree = render(<TestCase {...props} />);
        //eslint-disable-next-line
        CheckboxDriver({
          renderTree,
          testID
        });
        let isValid = checkboxRef.current?.isValid();
        expect(isValid).toBe(true);
        checkboxRef.current?.validate();
        isValid = checkboxRef.current?.isValid();
        expect(isValid).toBe(true);
      });
      it('should be valid after validate and value changed to true', async () => {
        const props = {
          required: true
        };
        const renderTree = render(<TestCase {...props} />);
        const driver = CheckboxDriver({
          renderTree,
          testID
        });
        let isValid = checkboxRef.current?.isValid();
        expect(isValid).toBe(false);
        checkboxRef.current?.validate();
        await driver.press();
        isValid = checkboxRef.current?.isValid();
        expect(isValid).toBe(true);
      });
      it('should be invalid after validate and value changed to false', async () => {
        const props = {
          value: true,
          required: true
        };
        const renderTree = render(<TestCase {...props} />);
        const driver = CheckboxDriver({
          renderTree,
          testID
        });
        let isValid = checkboxRef.current?.isValid();
        expect(isValid).toBe(true);
        checkboxRef.current?.validate();
        await driver.press();
        isValid = checkboxRef.current?.isValid();
        expect(isValid).toBe(false);
      });
      it('should be invalid after validate and value changed to true and then false', async () => {
        const props = {
          required: true
        };
        const renderTree = render(<TestCase {...props} />);
        const driver = CheckboxDriver({
          renderTree,
          testID
        });
        let isValid = checkboxRef.current?.isValid();
        expect(isValid).toBe(false);
        checkboxRef.current?.validate();
        await driver.press();
        isValid = checkboxRef.current?.isValid();
        expect(isValid).toBe(true);
        await driver.press();
        isValid = checkboxRef.current?.isValid();
        expect(isValid).toBe(false);
      });
    });
    describe('label', () => {
      it('should have passed label', async () => {
        const text = 'Blue';
        const props = {
          label: text
        };
        const renderTree = render(<TestCase {...props} />);
        const driver = CheckboxDriver({
          renderTree,
          testID
        });
        const label = driver.getLabel();
        expect(label).toEqual(text);
      });
    });
  });
});