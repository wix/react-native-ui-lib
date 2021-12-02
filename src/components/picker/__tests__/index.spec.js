import React, {useState} from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Picker, {Picker as _Picker} from '../index';

const countries = [
  {label: 'Israel', value: 'IL'},
  {label: 'United States', value: 'US'},
  {label: 'Germany', value: 'DE'},
  {label: 'Italy', value: 'IT'},
  {label: 'Spain', value: 'ES '}
];

describe('Picker', () => {
  describe('getLabel', () => {
    it('should get label of a simple item', () => {
      let uut = new _Picker({value: countries[2]});
      expect(uut.getLabelValueText()).toEqual(countries[2].label);
      uut = new _Picker({value: countries[3]});
      expect(uut.getLabelValueText()).toEqual(countries[3].label);
    });

    it('should get label out of an array of items', () => {
      const uut = new _Picker({value: [countries[2], countries[4]]});
      expect(uut.getLabelValueText()).toEqual(`${countries[2].label}, ${countries[4].label}`);
    });
  });

  describe('Picker - Render Tests', () => {
    it('should open picker overlay after pressing the picker', () => {
      const renderTree = render(<TestCase/>);
      const picker = renderTree.getByTestId('picker');
      const pickerOverlay = renderTree.getByTestId('picker.overlay');
      expect(pickerOverlay.props.visible).toBe(false);
      fireEvent.press(picker);
      expect(pickerOverlay.props.visible).toBe(true);
    });
    
    it('should not open picker overlay after pressing when picker is disabled', () => {
      const renderTree = render(<TestCase editable={false}/>);
      const picker = renderTree.getByTestId('picker');
      const pickerOverlay = renderTree.getByTestId('picker.overlay');
      expect(pickerOverlay.props.visible).toBe(false);
      fireEvent.press(picker);
      expect(pickerOverlay.props.visible).toBe(false);
    });
  });
});

const TestCase = props => {
  const [value, setValue] = useState(props.value);
  return (
    <Picker testID="picker" {...props} onChange={setValue} value={value}>
      {countries.map(country => {
        return <Picker.Item key={country.value} value={country.value} label={country.label}/>;
      })}
    </Picker>
  );
};
