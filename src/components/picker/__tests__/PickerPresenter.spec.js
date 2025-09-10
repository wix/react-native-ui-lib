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
});
