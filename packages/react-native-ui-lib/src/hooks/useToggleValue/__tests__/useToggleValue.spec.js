import {renderHook, act} from '@testing-library/react-hooks';
import useToggleValue from '../index';

describe('useOrientation hook tests', () => {
  const makeSUT = (initial, secondary) => {
    return renderHook(() => {
      return useToggleValue(initial, secondary);
    });
  };

  const getValue = (result) => {
    return result.current[0];
  };

  const getToggle = (result) => {
    return result.current[1]();
  };

  const expectValueToToggle = (a, b) => {
    const {result} = makeSUT(a, b);
    expect(getValue(result)).toEqual(a);
  
    act(() => getToggle(result));
    expect(getValue(result)).toEqual(b);
  };

  it('Initial value should be set', () => {
    const {result} = makeSUT(true, false);

    expect(getValue(result)).toEqual(true);
  });

  it('Initial value can be undefined', () => {
    const {result} = makeSUT(undefined, 'Sid');
    expect(getValue(result)).toEqual(undefined);

    act(() => getToggle(result));
    expect(getValue(result)).toEqual('Sid');
  });

  it('Initial value can be change', () => {
    const {result} = makeSUT(true, false);
    act(() => getToggle(result));
    
    expect(getValue(result)).toEqual(false);
  });

  it('Allow toggle boolean without passing a second parameter', () => {
    const {result} = makeSUT(true);
    act(() => getToggle(result));
    
    expect(getValue(result)).toEqual(false);
  });

  it('Can toggle strings', () => {
    const a = 'Ohio';
    const b = 'Texas';

    expectValueToToggle(a, b);
  });

  it('Can toggle numbers', () => {
    const a = 30;
    const b = 22;
    
    expectValueToToggle(a, b);
  });

  it('Can toggle arrays', () => {
    const a = [1, 2, 3, 4];
    const b = ['Booking', 'OneApp', 'Fed'];

    expectValueToToggle(a, b);
  });

  it('Can toggle objects', () => {
    const a = {};
    const b = {name: 'Darth', occupation: 'Father'};

    expectValueToToggle(a, b);
  });

  it('Can toggle different types', () => {
    const a = 999;
    const b = '999';

    expectValueToToggle(a, b);
  });
});
