import React, {useState} from 'react';
import Picker from '../index';
import {PickerDriver} from '../Picker.driver';

const countries = [
  {label: 'Israel', value: 'IL'},
  {label: 'United States', value: 'US'},
  {label: 'Germany', value: 'DE'},
  {label: 'Italy', value: 'IT'},
  {label: 'Spain', value: 'ES '}
];
const testID = 'picker';

describe('Picker', () => {
  describe('getLabel', () => {
    it('should get label of a simple item', async () => {
      const driver = new PickerDriver({component: <TestCase value={countries[2]}/>, testID});

      expect(await driver.getByDisplayValue(countries[2].label)).toBeDefined();
      expect(await driver.getByDisplayValue(countries[3].label)).not.toBeDefined();
    });

    it('should get label out of an array of items', async () => {
      const driver = new PickerDriver({component: <TestCase value={[countries[2], countries[4]]}/>, testID});

      expect(await driver.getByDisplayValue(`${countries[2].label}, ${countries[4].label}`)).toBeDefined();
    });
  });

  describe('Picker - Render Tests', () => {
    it('should open picker overlay after pressing the picker', async () => {
      const driver = new PickerDriver({component: <TestCase/>, testID});

      expect((await driver.getPickerOverlayProps()).visible).toBe(false);

      await driver.press();

      expect((await driver.getPickerOverlayProps()).visible).toBe(true);
    });

    it('should not open picker overlay after pressing when picker is disabled', async () => {
      const driver = new PickerDriver({component: <TestCase editable={false}/>, testID});

      expect((await driver.getPickerOverlayProps()).visible).toBe(false);

      await driver.press();

      expect((await driver.getPickerOverlayProps()).visible).toBe(false);
    });
  });
});

const TestCase = (props: any) => {
  const [value, setValue] = useState(props.value);
  return (
    <Picker testID={testID} {...props} onChange={setValue} value={value}>
      {countries.map(country => {
        return <Picker.Item key={country.value} value={country.value} label={country.label}/>;
      })}
    </Picker>
  );
};
