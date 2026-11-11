import React from 'react';
import {Keyboard, StyleSheet, ViewStyle} from 'react-native';
import {act, render} from '@testing-library/react-native';
import {Constants} from '../../../commons/new';
import {Spacings} from '../../../style';
import FloatingButton from '../index';

jest.mock('../../../optionalDependencies', () => {
  const actualOptional = jest.requireActual('../../../optionalDependencies');
  const MockReact = jest.requireActual('react');
  return {...actualOptional, SafeAreaContextPackage: {SafeAreaInsetsContext: MockReact.createContext(null)}};
});

const {SafeAreaContextPackage} = jest.requireMock('../../../optionalDependencies');
const INSETS = {top: 62, right: 0, bottom: 83, left: 0};
const TEST_ID = 'floating_button';

const renderButton = (props: object = {}, insets: object | null = INSETS) => {
  const tree = <FloatingButton visible hoisted={false} button={{label: 'First'}} testID={TEST_ID} {...props}/>;
  const {SafeAreaInsetsContext} = SafeAreaContextPackage;
  return render(insets ? <SafeAreaInsetsContext.Provider value={insets}>{tree}</SafeAreaInsetsContext.Provider> : tree);
};

const contentPaddingBottom = (renderTree: ReturnType<typeof render>) =>
  (StyleSheet.flatten(renderTree.getByTestId(`${TEST_ID}.content`).props.style) as ViewStyle).paddingBottom;

describe('FloatingButton with Liquid Glass', () => {
  let liquidGlass: jest.SpyInstance;
  let keyboardListeners: Record<string, () => void>;

  beforeEach(() => {
    liquidGlass = jest.spyOn(Constants, 'isLiquidGlass', 'get').mockReturnValue(true);
    keyboardListeners = {};
    jest.spyOn(Keyboard, 'addListener').mockImplementation(((event: string, listener: () => void) => {
      keyboardListeners[event] = listener;
      return {remove: jest.fn()};
    }) as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should add the bottom safe-area inset', () => {
    expect(contentPaddingBottom(renderButton())).toBe(Spacings.s8 + INSETS.bottom);
  });

  it('should add the bottom safe-area inset to bottomMargin', () => {
    expect(contentPaddingBottom(renderButton({bottomMargin: 10}))).toBe(10 + INSETS.bottom);
  });

  it('should drop the inset as the keyboard starts to show and restore it as it starts to hide', () => {
    const renderTree = renderButton();
    act(() => keyboardListeners.keyboardWillShow());
    expect(contentPaddingBottom(renderTree)).toBe(Spacings.s8);
    act(() => keyboardListeners.keyboardWillHide());
    expect(contentPaddingBottom(renderTree)).toBe(Spacings.s8 + INSETS.bottom);
  });

  it('should not listen to the keyboard when Liquid Glass is off', () => {
    liquidGlass.mockReturnValue(false);
    renderButton();
    expect(keyboardListeners.keyboardWillShow).toBeUndefined();
    expect(keyboardListeners.keyboardWillHide).toBeUndefined();
  });

  it('should not add an inset outside a safe area provider', () => {
    expect(contentPaddingBottom(renderButton({}, null))).toBe(Spacings.s8);
  });

  it('should not add the inset when Liquid Glass is off', () => {
    liquidGlass.mockReturnValue(false);
    expect(contentPaddingBottom(renderButton())).toBe(Spacings.s8);
  });

  it('should render nothing without buttons outside a safe area provider', () => {
    const renderTree = render(<FloatingButton visible testID={TEST_ID}/>);
    expect(renderTree.queryByTestId(`${TEST_ID}.content`)).toBeNull();
  });
});
