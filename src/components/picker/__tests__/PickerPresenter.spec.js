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

  describe('getItemValue', () => {
    it('should return item value when item has value prop', () => {
      expect(uut.getItemValue({value: {value: 'item value'}})).toBe('item value');
    });

    it('should return item value for multiple values', () => {
      const itemProps = {value: [{value: '1'}, {value: '2'}, {value: '3'}]};
      expect(uut.getItemValue(itemProps)).toEqual(['1', '2', '3']);
    });

    it('should return item value when item has getItemValue prop', () => {
      const itemProps = {value: {name: 'value', age: 12}, getItemValue: item => item.name};
      expect(uut.getItemValue(itemProps)).toBe('value');
    });

    it('should return item value for multiple values when item has getItemValue prop', () => {
      const itemProps = {value: [{name: 'david'}, {name: 'sarah'}, {name: 'jack'}], getItemValue: item => item.name};
      expect(uut.getItemValue(itemProps)).toEqual(['david', 'sarah', 'jack']);
    });

    it('should support backward compatibility for when child item value was not an object', () => {
      const itemProps = {value: 'item-value'};
      expect(uut.getItemValue(itemProps)).toEqual('item-value');
    });
  });

  describe('getItemLabel', () => {
    it('should return item label when value is not an object', () => {
      expect(uut.getItemLabel('label', 'value', undefined)).toEqual('label');
    });

    it('should return item label when value is an object', () => {
      const itemProps = {value: {value: 'value', label: 'label'}};
      expect(uut.getItemLabel(undefined, itemProps.value, undefined)).toEqual('label');
    });

    it('should return item label according to getLabel function ', () => {
      const getLabel = itemValue => `${itemValue.value} - ${itemValue.label}`;
      const itemProps = {value: {value: 'value', label: 'label'}, getLabel};
      expect(uut.getItemLabel(undefined, itemProps.value, getLabel)).toEqual('value - label');
    });
  });
});
