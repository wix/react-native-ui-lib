import React, {useState} from 'react';
import {act, render, waitFor} from '@testing-library/react-native';
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
  return PickerDriver({renderTree: render(<TestCase {...props}/>), testID});
};

const onPress = jest.fn();
const onDismiss = jest.fn();
// const onShow = jest.fn();

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
      expect(driver.isOpen()).toBeFalsy();
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
        expect(driver.isOpen()).toBeFalsy();
        driver.open();
        expect(driver.isOpen()).toBeTruthy();
        driver.selectItem(countries[2].label);
        expect(driver.isOpen()).toBeFalsy();
        expect(driver.getValue()).toEqual(countries[2].label);
      });

      it('Should select multiple items', () => {
        const driver = getDriver({mode: 'MULTI'});
        expect(driver.getValue()).toEqual('');
        expect(driver.isOpen()).toBeFalsy();
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
      expect(driver.isOpen()).toBeFalsy();
      driver.open();
      expect(driver.isOpen()).toBeTruthy();
      driver.cancel();
      expect(driver.isOpen()).toBeFalsy();
      expect(onPress).toHaveBeenCalled();
    });

    describe('Test pickerModalProps', () => {
      it('Test onDismiss', () => {
        const driver = getDriver({
          pickerModalProps: {
            onDismiss
          }
        });
        expect(driver.isOpen()).toBeFalsy();
        driver.open();
        expect(driver.isOpen()).toBeTruthy();
        driver.cancel();
        expect(driver.isOpen()).toBeFalsy();
        expect(onDismiss).toHaveBeenCalledTimes(2); // TODO: this should be 1
      });

      // TODO: this test is not passing yet
      // it('Test onShow passed via pickerModalProps', async () => {
      //   const driver = getDriver({
      //     pickerModalProps: {
      //       onShow
      //     }
      //   });
      //   expect(driver.isOpen()).toBeFalsy();
      //   jest.useFakeTimers();
      //   expect(driver.isOpen()).toBeTruthy();
      //   expect(onShow).toHaveBeenCalled();
      // });

      it('Test Modal TopBar', () => {
        const driver = getDriver({mode: 'MULTI', topBarProps: {cancelLabel: 'Cancel'}});
        expect(driver.isOpen()).toBeFalsy();
        driver.open();
        expect(driver.isOpen()).toBeTruthy();
        driver.selectItem(countries[2].label);
        driver.selectItem(countries[4].label);
        driver.done();
        expect(driver.isOpen()).toBeFalsy();
        expect(driver.getValue()).toEqual(`${countries[2].label}, ${countries[4].label}`);
        driver.open();
        expect(driver.isOpen()).toBeTruthy();
        driver.cancel();
        expect(driver.getValue()).toEqual(`${countries[2].label}, ${countries[4].label}`);
        expect(driver.isOpen()).toBeFalsy();
      });
    });
  });

  // TODO: this is a work in progress, the tests are not passing yet
  describe.skip('Dialog', () => {
    describe('Test value', () => {
      it('Get correct value of a single item', () => {
        const driver = getDriver({
          useDialog: true,
          customPickerProps: {migrateDialog: true},
          value: countries[2].value
        });
        expect(driver.getValue()).toEqual(countries[2].label);
      });

      it('Get correct value of multiple selected items', () => {
        const driver = getDriver({
          useDialog: true,
          customPickerProps: {migrateDialog: true},
          value: [countries[2].value, countries[4].value]
        });
        expect(driver.getValue()).toEqual(`${countries[2].label}, ${countries[4].label}`);
      });
    });

    describe('Test open', () => {
      it('Should open when enabled', async () => {
        const driver = getDriver({useDialog: true, customPickerProps: {migrateDialog: true}});

        expect(driver.isOpen()).toBeFalsy();
        // driver.open();
        // expect(driver.isOpen()).toBeTruthy();
        jest.useFakeTimers();
        act(() => driver.open());
        jest.runAllTimers();
        // advanceAnimationByTime(10000);
        // await new Promise(r => setTimeout(r, 1000));
        await waitFor(() => expect(driver.isOpen()).toBeTruthy());
      });

      it('Should not open when disabled', () => {
        const driver = getDriver({useDialog: true, customPickerProps: {migrateDialog: true}, editable: false});

        expect(driver.isOpen()).toBeFalsy();
        driver.open();
        expect(driver.isOpen()).toBeFalsy();
      });
    });

    it('Test close', () => {
      const driver = getDriver({useDialog: true, customPickerProps: {migrateDialog: true}});

      expect(driver.isOpen()).toBeFalsy();
      driver.open();
      expect(driver.isOpen()).toBeTruthy();
      driver.cancel();
      expect(driver.isOpen()).toBeFalsy();
    });

    describe('Test selection', () => {
      it('Should select a single item', () => {
        const driver = getDriver({useDialog: true, customPickerProps: {migrateDialog: true}});
        expect(driver.getValue()).toEqual(undefined);
        expect(driver.isOpen()).toBeFalsy();
        driver.open();
        expect(driver.isOpen()).toBeTruthy();
        driver.selectItem(countries[2].label);
        expect(driver.isOpen()).toBeFalsy();
        expect(driver.getValue()).toEqual(countries[2].label);
      });

      it('Should select multiple items', () => {
        const driver = getDriver({useDialog: true, customPickerProps: {migrateDialog: true}, mode: 'MULTI'});
        expect(driver.getValue()).toEqual(undefined);
        expect(driver.isOpen()).toBeFalsy();
        driver.open();
        expect(driver.isOpen()).toBeTruthy();
        driver.selectItem(countries[2].label);
        driver.selectItem(countries[4].label);
        driver.done();
        expect(driver.getValue()).toEqual(`${countries[2].label}, ${countries[4].label}`);
      });
    });

    it('Test onDismiss', () => {
      const driver = getDriver({
        useDialog: true,
        customPickerProps: {migrateDialog: true},
        pickerModalProps: {
          onDismiss
        }
      });

      expect(driver.isOpen()).toBeFalsy();
      driver.open();
      expect(driver.isOpen()).toBeTruthy();
      driver.cancel();
      expect(driver.isOpen()).toBeFalsy();
      expect(onDismiss).toHaveBeenCalledTimes(2); // TODO: this should be 1
    });
  });

  // TODO: add tests for WheelPicker as well
  // describe.skip('WheelPicker', () => {
  // });
});
