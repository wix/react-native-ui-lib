import * as uut from '../../../../src/components/picker/PickerPresenter';

describe('components/PickerPresenter', () => {
  it('should isItemSelected, handle single mode', () => {
    expect(uut.isItemSelected('value', 'value')).toBe(true);
    expect(uut.isItemSelected('value1', 'value2')).toBe(false);
  });

  it('should isItemSelected, handle multi mode', () => {
    expect(uut.isItemSelected('value', ['value'])).toBe(true);
    expect(uut.isItemSelected('value', ['value', 'value1', 'value2'])).toBe(true);
    expect(uut.isItemSelected('value1', ['value2'])).toBe(false);
    expect(uut.isItemSelected('value1', [])).toBe(false);
    expect(uut.isItemSelected('value1', ['value2', 'value3'])).toBe(false);
  });
});
