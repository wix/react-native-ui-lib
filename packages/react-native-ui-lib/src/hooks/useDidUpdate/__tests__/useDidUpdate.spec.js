import {renderHook} from '@testing-library/react-hooks';
import useDidUpdate from '../index';

describe('useDidUpdate hook tests', () => {
  it('Expect action to not be called when the dependencies array value hasn\'t change', () => {
    const action = jest.fn();
    const dependencies = [false, 'false'];
    const {rerender} = renderHook(() => useDidUpdate(action, dependencies));

    rerender();
    rerender();
    rerender();
    expect(action.mock.calls.length).toBe(0);
  });

  it('Expect action to be called when dependencies array has change', () => {
    const action = jest.fn();
    let dependencies = [false, 'YES YES', 1];
    const {rerender} = renderHook(() => useDidUpdate(action, dependencies));

    dependencies = [false, 'NO NO', 1];
    rerender();
    expect(action.mock.calls.length).toBe(1);
  });

  it('Expect action to be called when dependencies array has change', () => {
    const action = jest.fn();
    let dependencies = [false, 'YES YES', 1];
    const {rerender} = renderHook(() => useDidUpdate(action, dependencies));

    dependencies = [false, 'NO NO', 1];
    rerender();
    expect(action.mock.calls.length).toBe(1);
  });

  it('Expect action to be called when dependencies array has change', () => {
    const action = jest.fn();
    let dependencies = [false, 'YES YES', 1];
    const {rerender} = renderHook(() => useDidUpdate(action, dependencies));

    dependencies = [false, 'NO NO', 1];
    rerender();
    expect(action.mock.calls.length).toBe(1);
  });

  it('Expect action to be called when object value in dependencies array has change', () => {
    const action = jest.fn();
    let dependencies = [false, [1, 2], {name: 'AAA', address: {number: 10}}];
    const {rerender} = renderHook(() => useDidUpdate(action, dependencies));

    dependencies = [false, [1, 2], {name: 'BBB'}];
    rerender();
    expect(action.mock.calls.length).toBe(1);
    
    dependencies = [false, [1, 2], {name: 'AAA', address: {number: 20}}];
    rerender();
    expect(action.mock.calls.length).toBe(2);
  });

  it('Expect action to be called when value in array dependencies array has change', () => {
    const action = jest.fn();
    let dependencies = [false, [1, [2]], {name: 'AAA'}];
    const {rerender} = renderHook(() => useDidUpdate(action, dependencies));

    dependencies = [false, [1, [3]], {name: 'AAA', address: {number: 20}}];
    rerender();
    expect(action.mock.calls.length).toBe(1);
  });

  it('Expect action not to be called when value in array dependencies array has not change value just reference', () => {
    const action = jest.fn();
    let dependencies = [false];
    const {rerender} = renderHook(() => useDidUpdate(action, dependencies));

    dependencies = [false];
    rerender();
    expect(action.mock.calls.length).toBe(0);
  });

});
