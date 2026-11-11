import React from 'react';
import {SafeAreaView, View as RNView} from 'react-native';
import {render} from '@testing-library/react-native';
import {Constants} from '../../../commons/new';
import {LogService} from '../../../services';
import View from '../index';

jest.mock('../../../optionalDependencies', () => {
  const actualOptional = jest.requireActual('../../../optionalDependencies');
  const {View: MockView} = jest.requireActual('react-native');
  const MockReact = jest.requireActual('react');
  const ContextSafeAreaView = (props: object) => MockReact.createElement(MockView, props);
  ContextSafeAreaView.displayName = 'ContextSafeAreaView';
  return {...actualOptional, SafeAreaContextPackage: {SafeAreaView: ContextSafeAreaView}};
});

const {SafeAreaContextPackage} = jest.requireMock('../../../optionalDependencies');

describe('View useSafeArea with Liquid Glass', () => {
  let liquidGlass: jest.SpyInstance;

  beforeEach(() => {
    liquidGlass = jest.spyOn(Constants, 'isLiquidGlass', 'get').mockReturnValue(true);
  });

  afterEach(() => {
    liquidGlass.mockRestore();
  });

  it('should use the position-aware SafeAreaView when the view sets no padding', () => {
    const {UNSAFE_queryByType} = render(<View useSafeArea testID="view"/>);
    expect(UNSAFE_queryByType(SafeAreaView)).toBeTruthy();
    expect(UNSAFE_queryByType(SafeAreaContextPackage.SafeAreaView)).toBeNull();
  });

  it.each([
    ['a padding modifier', {'paddingT-16': true}],
    ['a padding style', {style: {paddingHorizontal: 10}}],
    ['edges', {edges: ['top']}],
    ['mode', {mode: 'margin'}]
  ])('should keep the safe-area-context SafeAreaView with %s', (_name, props) => {
    const {UNSAFE_queryByType} = render(<View useSafeArea testID="view" {...props}/>);
    expect(UNSAFE_queryByType(SafeAreaContextPackage.SafeAreaView)).toBeTruthy();
    expect(UNSAFE_queryByType(SafeAreaView)).toBeNull();
  });

  it('should keep the safe-area-context SafeAreaView when Liquid Glass is off', () => {
    liquidGlass.mockReturnValue(false);
    const {UNSAFE_queryByType} = render(<View useSafeArea testID="view"/>);
    expect(UNSAFE_queryByType(SafeAreaContextPackage.SafeAreaView)).toBeTruthy();
    expect(UNSAFE_queryByType(SafeAreaView)).toBeNull();
  });

  it('should keep the container chosen at mount when the flag changes', () => {
    liquidGlass.mockReturnValue(false);
    const {UNSAFE_queryByType, rerender} = render(<View useSafeArea testID="view"/>);
    expect(UNSAFE_queryByType(SafeAreaView)).toBeNull();
    liquidGlass.mockReturnValue(true);
    rerender(<View useSafeArea testID="view"/>);
    expect(UNSAFE_queryByType(SafeAreaView)).toBeNull();
    expect(UNSAFE_queryByType(SafeAreaContextPackage.SafeAreaView)).toBeTruthy();
  });

  it('should warn when padding is added after mount to a position-aware view', () => {
    const warn = jest.spyOn(LogService, 'warn').mockImplementation(() => {});
    const {rerender} = render(<View useSafeArea testID="view"/>);
    expect(warn).not.toHaveBeenCalled();
    rerender(<View useSafeArea testID="view" style={{paddingBottom: 20}}/>);
    expect(warn).toHaveBeenCalledTimes(1);
    warn.mockRestore();
  });

  it.each([
    ['animated', {animated: true}],
    ['reanimated', {reanimated: true}]
  ])('should keep the safe-area-context SafeAreaView for an %s view', (_name, props) => {
    const {UNSAFE_queryByType} = render(<View useSafeArea testID="view" {...props}/>);
    expect(UNSAFE_queryByType(SafeAreaView)).toBeNull();
    expect(UNSAFE_queryByType(SafeAreaContextPackage.SafeAreaView)).toBeTruthy();
  });

  it('should not remount its children when padding toggles', () => {
    const mounts = jest.fn();
    const Child = () => {
      React.useEffect(() => mounts(), []);
      return null;
    };
    const {rerender} = render(<View useSafeArea testID="view"><Child/></View>);
    rerender(<View useSafeArea testID="view" style={{paddingBottom: 20}}><Child/></View>);
    rerender(<View useSafeArea testID="view"><Child/></View>);
    expect(mounts).toHaveBeenCalledTimes(1);
  });

  it('should render a plain view without useSafeArea', () => {
    const {UNSAFE_queryByType} = render(<View testID="view"/>);
    expect(UNSAFE_queryByType(SafeAreaView)).toBeNull();
    expect(UNSAFE_queryByType(RNView)).toBeTruthy();
  });
});
