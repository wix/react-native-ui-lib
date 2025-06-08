import * as uut from '../PickerPresenter';

describe('components/PickerPresenter', () => {
  it('should isItemSelected, handle single mode', () => {
    expect(uut.isItemSelected('value', 'value')).toBe(true);
    expect(uut.isItemSelected('value', 'value2')).toBe(false);
  });

  it('should isItemSelected, handle multi mode', () => {
    expect(uut.isItemSelected('value', ['value', 'value1', 'value3'])).toBe(true);
    expect(uut.isItemSelected('value', ['value1', 'value2', 'value3'])).toBe(false);
    expect(uut.isItemSelected('value', [])).toBe(false);
    expect(uut.isItemSelected('value', undefined)).toBe(false);
  });

  // describe('getItemValue', () => {
  //   it('should return item value when item has value prop', () => {
  //     expect(uut.getItemValue({value: {value: 'item value'}})).toBe('item value');
  //   });

  //   it('should return item value for multiple values', () => {
  //     const itemProps = {value: [{value: '1'}, {value: '2'}, {value: '3'}]};
  //     expect(uut.getItemValue(itemProps)).toEqual(['1', '2', '3']);
  //   });

  //   it('should return item value when item has getItemValue prop', () => {
  //     const itemProps = {value: {name: 'value', age: 12}, getItemValue: item => item.name};
  //     expect(uut.getItemValue(itemProps)).toBe('value');
  //   });

  //   it('should return item value for multiple values when item has getItemValue prop', () => {
  //     const itemProps = {value: [{name: 'david'}, {name: 'sarah'}, {name: 'jack'}], getItemValue: item => item.name};
  //     expect(uut.getItemValue(itemProps)).toEqual(['david', 'sarah', 'jack']);
  //   });

  //   it('should support backward compatibility for when child item value was not an object', () => {
  //     const itemProps = {value: 'item-value'};
  //     expect(uut.getItemValue(itemProps)).toEqual('item-value');
  //   });
  // });

  describe('getItemLabel', () => {
    it('should return item label when no custom getItemLabel function is provided', () => {
      expect(uut.getItemLabel('JavaScript', 'js', undefined)).toEqual('JavaScript');
    });

    it('should return custom label when getItemLabel function is provided', () => {
      const customGetItemLabel = (value) => `Custom: ${value}`;
      expect(uut.getItemLabel('JavaScript', 'js', customGetItemLabel)).toEqual('Custom: js');
    });

    it('should return original label when getItemLabel function returns undefined', () => {
      const customGetItemLabel = () => undefined;
      expect(uut.getItemLabel('JavaScript', 'js', customGetItemLabel)).toEqual('JavaScript');
    });
  });
});
