import React, {useState, useCallback} from 'react';
import Checkbox, {CheckboxProps, CheckboxRef} from '../index';
import {CheckboxDriver} from '../Checkbox.driver';

const testID = 'checkbox';
const checkboxRef = React.createRef<CheckboxRef>();
const onValueChange = jest.fn();
const onChangeValidity = jest.fn();

const TestCase = (props: CheckboxProps) => {
  const {value, onValueChange, ...others} = props;

  const [_value, _setValue] = useState(value);
  const _onValueChange = useCallback(
    (newValue: boolean) => {
      _setValue(newValue);
      onValueChange?.(newValue);
    },
    [_setValue, onValueChange]
  );

  return <Checkbox {...others} onValueChange={_onValueChange} value={_value} testID={testID} ref={checkboxRef}/>;
};

describe('Checkbox renderer test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => CheckboxDriver.clear());

  describe('Value', () => {
    it('Default value is false', async () => {
      const props = {onValueChange};
      const component = <TestCase {...props}/>;
      const driver = new CheckboxDriver({component, testID});

      await driver.press();

      expect(onValueChange).toHaveBeenCalledTimes(1);
      expect(onValueChange).toHaveBeenCalledWith(true);
    });

    it.each`
      checkboxInitialValue | checkboxExpectedValue
      ${false}             | ${true}
      ${true}              | ${false}
    `(
      'Send value ($checkboxInitialValue)',
      async ({
        checkboxInitialValue,
        checkboxExpectedValue
      }: {
        checkboxInitialValue: boolean;
        checkboxExpectedValue: boolean;
      }) => {
        const props = {onValueChange, value: checkboxInitialValue};
        const component = <TestCase {...props}/>;
        const driver = new CheckboxDriver({component, testID});

        await driver.press();

        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith(checkboxExpectedValue);
      }
    );
  });

  describe('Press', () => {
    it('Multiple clicks', async () => {
      const props = {onValueChange};
      const component = <TestCase {...props}/>;
      const driver = new CheckboxDriver({component, testID});

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
    `('Disabled (value = $checkboxInitialValue)', async ({checkboxInitialValue}: {checkboxInitialValue: boolean}) => {
      const props = {onValueChange, value: checkboxInitialValue, disabled: true};
      const component = <TestCase {...props}/>;
      const driver = new CheckboxDriver({component, testID});

      await driver.press();

      expect(onValueChange).not.toHaveBeenCalled();
    });
  });

  describe('Validation', () => {
    describe('onChangeValidity', () => {
      it('should not been called', async () => {
        const props = {onChangeValidity};
        const component = <TestCase {...props}/>;
        const driver = new CheckboxDriver({component, testID});
        await driver.press();

        expect(onChangeValidity).not.toHaveBeenCalled();
      });
      it('should not been called with required prop', async () => {
        const props = {onChangeValidity, required: true};
        const component = <TestCase {...props}/>;
        const driver = new CheckboxDriver({component, testID});
        await driver.press();

        expect(onChangeValidity).not.toHaveBeenCalled();
      });

      it('should not been called after invoking validate()', async () => {
        const props = {required: true, onChangeValidity};
        const component = <TestCase {...props}/>;
        //eslint-disable-next-line
        const driver = new CheckboxDriver({component, testID});

        checkboxRef.current?.validate();

        expect(onChangeValidity).not.toHaveBeenCalled();
      });

      it('should not been called after invoking validate() and value changed to true if required is false', async () => {
        const props = {onChangeValidity};
        const component = <TestCase {...props}/>;
        const driver = new CheckboxDriver({component, testID});

        checkboxRef.current?.validate();
        await driver.press();

        expect(onChangeValidity).not.toHaveBeenCalled();
      });

      it('should been called after invoking validate() and value changed to true', async () => {
        const props = {required: true, onChangeValidity};
        const component = <TestCase {...props}/>;
        const driver = new CheckboxDriver({component, testID});

        checkboxRef.current?.validate();
        await driver.press();

        expect(onChangeValidity).toHaveBeenCalledWith(true);
      });

      it('should been called after invoking validate() and value changed to true and then false', async () => {
        const props = {required: true, onChangeValidity};
        const component = <TestCase {...props}/>;
        const driver = new CheckboxDriver({component, testID});

        checkboxRef.current?.validate();
        await driver.press();
        await driver.press();

        expect(onChangeValidity).toHaveBeenCalledWith(false);
      });
    });

    describe('isValid', () => {
      it('should be valid if initial value is false', async () => {
        const props = {};
        const component = <TestCase {...props}/>;
        //eslint-disable-next-line
        const driver = new CheckboxDriver({component, testID});

        const isValid = checkboxRef.current?.isValid();

        expect(isValid).toBe(true);
      });

      it('should be valid if initial value is true', async () => {
        const props = {value: true};
        const component = <TestCase {...props}/>;
        //eslint-disable-next-line
        const driver = new CheckboxDriver({component, testID});

        const isValid = checkboxRef.current?.isValid();

        expect(isValid).toBe(true);
      });

      it('should be valid if initial value is true and is required', async () => {
        const props = {value: true, required: true};
        const component = <TestCase {...props}/>;
        //eslint-disable-next-line
        const driver = new CheckboxDriver({component, testID});

        const isValid = checkboxRef.current?.isValid();

        expect(isValid).toBe(true);
      });

      it('should be invalid if initial value is false and is required', async () => {
        const props = {required: true};
        const component = <TestCase {...props}/>;
        //eslint-disable-next-line
        const driver = new CheckboxDriver({component, testID});

        const isValid = checkboxRef.current?.isValid();

        expect(isValid).toBe(false);
      });

      it('should be invalid after validate when initial value is false', async () => {
        const props = {required: true};
        const component = <TestCase {...props}/>;
        //eslint-disable-next-line
        const driver = new CheckboxDriver({component, testID});

        let isValid = checkboxRef.current?.isValid();
        expect(isValid).toBe(false);

        checkboxRef.current?.validate();
        isValid = checkboxRef.current?.isValid();

        expect(isValid).toBe(false);
      });

      it('should be valid after validate when initial value is true', async () => {
        const props = {value: true, required: true};
        const component = <TestCase {...props}/>;
        //eslint-disable-next-line
        const driver = new CheckboxDriver({component, testID});

        let isValid = checkboxRef.current?.isValid();
        expect(isValid).toBe(true);

        checkboxRef.current?.validate();
        isValid = checkboxRef.current?.isValid();

        expect(isValid).toBe(true);
      });

      it('should be valid after validate and value changed to true', async () => {
        const props = {required: true};
        const component = <TestCase {...props}/>;
        const driver = new CheckboxDriver({component, testID});

        let isValid = checkboxRef.current?.isValid();
        expect(isValid).toBe(false);

        checkboxRef.current?.validate();
        await driver.press();
        isValid = checkboxRef.current?.isValid();

        expect(isValid).toBe(true);
      });

      it('should be invalid after validate and value changed to false', async () => {
        const props = {value: true, required: true};
        const component = <TestCase {...props}/>;
        const driver = new CheckboxDriver({component, testID});

        let isValid = checkboxRef.current?.isValid();
        expect(isValid).toBe(true);

        checkboxRef.current?.validate();
        await driver.press();
        isValid = checkboxRef.current?.isValid();

        expect(isValid).toBe(false);
      });

      it('should be invalid after validate and value changed to true and then false', async () => {
        const props = {required: true};
        const component = <TestCase {...props}/>;
        const driver = new CheckboxDriver({component, testID});

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
  });
});
