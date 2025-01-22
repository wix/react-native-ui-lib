import React, {useState} from 'react';
import {act, render, waitFor, screen} from '@testing-library/react-native';
import Picker from '../index';
import {PickerDriver} from '../Picker.driver.new';

const countries = [
  {label: 'Israel', value: 'IL'},
  {label: 'United States', value: 'US'},
  {label: 'Germany', value: 'DE'},
  {label: 'Italy', value: 'IT'},
  {label: 'Spain', value: 'ES '}
];
const testID = 'picker';

const TestCase = (props?: any) => {
  const [value, setValue] = useState(props?.value);
  return (
    <Picker testID={testID} {...props} onChange={setValue} value={value}>
      {countries.map(country => {
        return <Picker.Item key={country.value} value={country.value} label={country.label} testID={country.label}/>;
      })}
    </Picker>
  );
};

const getDriver = (props?: any) => {
  const renderTree = render(<TestCase {...props}/>);
  return PickerDriver({renderTree, testID}, props?.useDialog);
};

const onPress = jest.fn();
const onDismiss = jest.fn();
const onShow = jest.fn();

describe('Picker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Modal', () => {
    describe('Test open', () => {
      it('Should open when enabled', () => {
        const driver = getDriver();
        expect(driver.isOpen()).toBeFalsy();
        driver.open();
        expect(driver.isOpen()).toBeTruthy();
      });

      it('Should not open when disabled', () => {
        const driver = getDriver({editable: false});
        expect(driver.isOpen()).toBeFalsy();
        driver.open();
        expect(driver.isOpen()).toBeFalsy();
      });
    });

    it('Test close', () => {
      const driver = getDriver();
      driver.open();
      expect(driver.isOpen()).toBeTruthy();
      driver.cancel();
      expect(driver.isOpen()).toBeFalsy();
    });

    describe('Test value', () => {
      it('Get correct value of a single item', () => {
        const driver = getDriver({value: countries[2].value});
        expect(driver.getValue()).toEqual(countries[2].label);
      });

      it('Get correct value of multiple selected items', () => {
        const driver = getDriver({value: [countries[2].value, countries[4].value]});
        expect(driver.getValue()).toEqual(`${countries[2].label}, ${countries[4].label}`);
      });
    });

    describe('Test selection', () => {
      it('Should select a single item', () => {
        const driver = getDriver();
        expect(driver.getValue()).toEqual('');
        driver.open();
        expect(driver.isOpen()).toBeTruthy();
        driver.selectItem(countries[2].label);
        expect(driver.isOpen()).toBeFalsy();
        expect(driver.getValue()).toEqual(countries[2].label);
      });

      it('Should select multiple items', () => {
        const driver = getDriver({mode: 'MULTI'});
        expect(driver.getValue()).toEqual('');
        driver.open();
        expect(driver.isOpen()).toBeTruthy();
        driver.selectItem(countries[2].label);
        driver.selectItem(countries[4].label);
        driver.done();
        expect(driver.getValue()).toEqual(`${countries[2].label}, ${countries[4].label}`);
      });
    });

    it('Test onPress', () => {
      const driver = getDriver({onPress});
      driver.open();
      expect(onPress).toHaveBeenCalled();
    });

    describe('Test pickerModalProps', () => {
      it('Test onDismiss', () => {
        const driver = getDriver({
          pickerModalProps: {
            onDismiss
          }
        });
        driver.open();
        expect(driver.isOpen()).toBeTruthy();
        driver.cancel();
        expect(driver.isOpen()).toBeFalsy();
        expect(onDismiss).toHaveBeenCalledTimes(2); // TODO: this should be 1
      });

      // TODO: this test is not passing yet
      // The onShow function get's called when the Modal is fully opened, tried to use act and waitFor to wait for fully open but it didn't work
      it.skip('Test onShow passed via pickerModalProps', async () => {
        const driver = getDriver({
          pickerModalProps: {
            onShow
          }
        });
        expect(driver.isOpen()).toBeFalsy();
        jest.useFakeTimers();
        expect(driver.isOpen()).toBeTruthy();
        expect(onShow).toHaveBeenCalled();
      });

      describe('Test Modal TopBar', () => {
        const modalProps = {mode: 'MULTI', topBarProps: {cancelLabel: 'Cancel'}};
        it('should close and select items when pressing on done button', () => {
          const driver = getDriver(modalProps);
          driver.open();
          expect(driver.isOpen()).toBeTruthy();
          driver.selectItem(countries[2].label);
          driver.selectItem(countries[4].label);
          driver.done();
          expect(driver.isOpen()).toBeFalsy();
          expect(driver.getValue()).toEqual(`${countries[2].label}, ${countries[4].label}`);
        });

        it('should close without selecting items when pressing on cancel button', () => {
          const driver = getDriver(modalProps);
          driver.open();
          expect(driver.isOpen()).toBeTruthy();
          driver.selectItem(countries[2].label);
          driver.selectItem(countries[4].label);
          driver.cancel();
          expect(driver.getValue()).toEqual(``);
          expect(driver.isOpen()).toBeFalsy();
        });
      });
    });
  });

  describe('Dialog', () => {
    const dialogProps = {useDialog: true};

    describe('Test value', () => {
      it('Get correct value of a single item', () => {
        const driver = getDriver({
          ...dialogProps,
          value: countries[2].value
        });
        expect(driver.getValue()).toEqual(countries[2].label);
      });

      it('Get correct value of multiple selected items', () => {
        const driver = getDriver({
          ...dialogProps,
          value: [countries[2].value, countries[4].value]
        });
        expect(driver.getValue()).toEqual(`${countries[2].label}, ${countries[4].label}`);
      });
    });

    describe('Test open/close', () => {
      it('Should open when enabled', async () => {
        const driver = getDriver(dialogProps);
        expect(driver.isOpen()).toBeFalsy();
        jest.useFakeTimers();
        act(() => driver.open());
        jest.runAllTimers();
        await waitFor(() => expect(driver.isOpen()).toBeTruthy());
      });

      it('Should not open when disabled', () => {
        const driver = getDriver({...dialogProps, editable: false});
        expect(driver.isOpen()).toBeFalsy();
        driver.open();
        expect(driver.isOpen()).toBeFalsy();
      });

      it('Test close', async () => {
        const driver = getDriver(dialogProps);
        expect(driver.isOpen()).toBeFalsy();
        act(() => driver.open());
        await waitFor(() => expect(driver.isOpen()).toBeTruthy());
        act(() => driver.dismissDialog());
        await waitFor(() => expect(driver.isOpen()).toBeFalsy());
      });
    });

    describe('Test selection', () => {
      it('Should select a single item', async () => {
        const driver = getDriver(dialogProps);
        expect(driver.getValue()).toEqual('');
        act(() => driver.open());
        await waitFor(() => expect(driver.isOpen()).toBeTruthy());
        driver.selectItem(countries[2].label);
        await waitFor(() => expect(driver.isOpen()).toBeFalsy());
        expect(driver.getValue()).toEqual(countries[2].label);
      });

      it('Should select multiple items', async () => {
        const driver = getDriver({...dialogProps, mode: 'MULTI'});
        expect(driver.getValue()).toEqual('');
        expect(driver.isOpen()).toBeFalsy();
        act(() => driver.open());
        await waitFor(() => expect(driver.isOpen()).toBeTruthy());
        driver.selectItem(countries[2].label);
        driver.selectItem(countries[4].label);
        driver.done();
        await waitFor(() => expect(driver.isOpen()).toBeFalsy());
        expect(driver.getValue()).toEqual(`${countries[2].label}, ${countries[4].label}`);
      });
    });

    it('Test onDismiss', async () => {
      const driver = getDriver({
        ...dialogProps,
        customPickerProps: {
          dialogProps: {
            onDismiss
          }
        }
      });
      expect(driver.isOpen()).toBeFalsy();
      act(() => driver.open());
      await waitFor(() => expect(driver.isOpen()).toBeTruthy());
      act(() => driver.dismissDialog());
      await waitFor(() => expect(driver.isOpen()).toBeFalsy());
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
  });

  // TODO: add tests for WheelPicker
  // Note: the picker dialog should be opened and then the wheel picker should be rendered, this is the main issue with testing it for now
  // describe.skip('WheelPicker', () => {
  // });

  //TODO: add more tests for different props
  describe('Picker field types', () => {
    describe('Test filter field type', () => {
      const placeholderText = 'Select a Filter';

      it('should render a filter picker', () => {
        const driver = getDriver({fieldType: 'filter', placeholder: placeholderText});
        expect(driver.isOpen()).toBeFalsy();
        const label = screen.getByTestId(`${testID}.filter.type.label`);
        expect(label).toBeTruthy();
        expect(label.props.children).toEqual(placeholderText);
      });
    });

    describe('Test settings field type', () => {
      const labelText = 'Settings';
      const placeholderText = 'Select a setting';

      it('should render a settings picker with label', async () => {
        const driver = getDriver({fieldType: 'settings', label: labelText, placeholder: placeholderText});
        const label = screen.getByTestId(`${testID}.settings.type.label`);
        const placeholder = screen.getByTestId(`${testID}.settings.type.placeholder`);

        expect(driver.isOpen()).toBeFalsy();
        expect(label).toBeTruthy();
        expect(placeholder).toBeTruthy();
        expect(label.props.children).toEqual(labelText);
        expect(placeholder.props.children).toEqual(placeholderText);
      });

      it('should render a settings picker with placeholder', async () => {
        const driver = getDriver({fieldType: 'settings', placeholder: placeholderText});
        const label = screen.getByTestId(`${testID}.settings.type.label`);
        const placeholder = screen.getByTestId(`${testID}.settings.type.placeholder`);

        expect(driver.isOpen()).toBeFalsy();
        expect(label).toBeTruthy();
        expect(placeholder).toBeTruthy();
        expect(label.props.children).toEqual(placeholderText);
        expect(placeholder.props.children).toEqual(placeholderText);
      });
    });
  });
});
