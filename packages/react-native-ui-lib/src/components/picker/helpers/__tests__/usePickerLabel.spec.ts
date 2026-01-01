import {renderHook} from '@testing-library/react-native';
import usePickerLabel from '../usePickerLabel';

const colors = [
  {value: 'red', label: 'Red'},
  {
    value: 'green',
    label: 'Green',
    listItemProps: {subtitle: 'Subtitle'}
  },
  {
    value: 'blue',
    label: 'Blue',
    listItemProps: {
      subtitleLines: 2,
      subtitle: 'Subtitle with\n2 lines of text'
    }
  },
  {value: 'purple', label: 'Purple', disabled: true},
  {value: 'yellow', label: 'Yellow'},
  {value: 'grey', label: 'Grey'}
];

describe('usePickerLabel hook tests', () => {
  const makeSUT = ({
    value,
    items,
    getLabel
    // accessibilityLabel,
    // accessibilityHint,
    // placeholder
  }) => {
    return renderHook(() =>
      usePickerLabel({
        value,
        items,
        getLabel
        // accessibilityLabel,
        // accessibilityHint,
        // placeholder
      }));
  };

  it('expect label to equal an empty string when value is undefined', () => {
    const sut = makeSUT({items: colors, value: undefined, getLabel: undefined});
    expect(sut.result.current.label).toEqual('');
  });

  it('expect label to equal an empty string when value is null', () => {
    const sut = makeSUT({items: colors, value: null, getLabel: undefined});
    expect(sut.result.current.label).toEqual('');
  });

  it('expect label to equal returned string when getLabel passed', () => {
    const sut = makeSUT({items: colors, value: null, getLabel: () => 'Some label'});
    expect(sut.result.current.label).toEqual('Some label');
  });

  it('expect label to equal array of values when value is array', () => {
    const sut = makeSUT({items: colors, value: ['red', 'green'], getLabel: undefined});
    expect(sut.result.current.label).toEqual('Red, Green');
  });

  it('expect label to equal selected item label when value equals item value', () => {
    const sut = makeSUT({items: colors, value: 'red', getLabel: undefined});
    expect(sut.result.current.label).toEqual('Red');
  });

  it('expect label to equal empty string when no items passed', () => {
    const sut = makeSUT({items: undefined, value: 'Some string', getLabel: undefined});
    expect(sut.result.current.label).toEqual('');
  });
});
