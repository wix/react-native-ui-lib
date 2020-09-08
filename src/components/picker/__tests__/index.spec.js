import {Picker} from '../index';

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
      let uut = new Picker({value: countries[2]});
      expect(uut.getLabelValueText()).toEqual(countries[2].label);
      uut = new Picker({value: countries[3]});
      expect(uut.getLabelValueText()).toEqual(countries[3].label);
    });

    it('should get label out of an array of items', () => {
      const uut = new Picker({value: [countries[2], countries[4]]});
      expect(uut.getLabelValueText()).toEqual(`${countries[2].label}, ${countries[4].label}`);
    });
  });

  describe('handlePickerOnPress', () => {
    it('should get label out of an array of items', () => {
      const onPress = jest.fn(() => {});
      const uut = new Picker({value: countries[0], onPress});
      uut.toggleExpandableModal = jest.fn(uut.toggleExpandableModal);

      uut.handlePickerOnPress();
      expect(onPress).toHaveBeenCalled();
      expect(uut.toggleExpandableModal).toHaveBeenCalled();
    });
  });
});
