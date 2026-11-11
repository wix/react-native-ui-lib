import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {render} from '@testing-library/react-native';
import {Constants} from '../../../commons/new';
import {Spacings} from '../../../style';
import useKeyboardHeight from '../../../hooks/useKeyboardHeight';
import FloatingButton from '../index';

jest.mock('../../../hooks/useKeyboardHeight', () => ({__esModule: true, default: jest.fn(() => 0)}));

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
  return render(insets ? <SafeAreaContextPackage.SafeAreaInsetsContext.Provider value={insets}>{tree}</SafeAreaContextPackage.SafeAreaInsetsContext.Provider> : tree);
};

const contentPaddingBottom = (renderTree: ReturnType<typeof render>) =>
  (StyleSheet.flatten(renderTree.getByTestId(`${TEST_ID}.content`).props.style) as ViewStyle).paddingBottom;

describe('FloatingButton with Liquid Glass', () => {
  let liquidGlass: jest.SpyInstance;

  beforeEach(() => {
    liquidGlass = jest.spyOn(Constants, 'isLiquidGlass', 'get').mockReturnValue(true);
    (useKeyboardHeight as jest.Mock).mockReturnValue(0);
  });

  afterEach(() => {
    liquidGlass.mockRestore();
  });

  it('should add the bottom safe-area inset', () => {
    expect(contentPaddingBottom(renderButton())).toBe(Spacings.s8 + INSETS.bottom);
  });

  it('should add the bottom safe-area inset to bottomMargin', () => {
    expect(contentPaddingBottom(renderButton({bottomMargin: 10}))).toBe(10 + INSETS.bottom);
  });

  it('should not add the inset while the keyboard is visible', () => {
    (useKeyboardHeight as jest.Mock).mockReturnValue(300);
    expect(contentPaddingBottom(renderButton())).toBe(Spacings.s8);
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
