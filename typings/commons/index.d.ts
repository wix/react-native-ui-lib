import * as React from 'react';
// import {ColorName} from '../../generatedTypes/style/colors.d';
import {BaseComponentPaddingModifier, BaseComponentMarginModifier} from './spacings';

type TypographyName = 'fixme';
type ColorName = 'fixme';
export class UIComponent<P = {}, S = {}, SS = any> extends React.PureComponent<P, S, SS> {}
export function forwardRef<T, P>(
  WrappedComponent: React.ComponentType<T, P>
): React.ComponentType<T, P>;
export function asBaseComponent<P>(WrappedComponent: React.ComponentType<P>): React.ComponentType<P>;

export type BaseComponentColorModifierVariations = ColorName;
export type BaseComponentColorModifiers = Partial<Record<BaseComponentColorModifierVariations, boolean>>;

export type BaseComponentTypographyModifierVariations = TypographyName;
export type BaseComponentTypographyModifiers = Partial<Record<BaseComponentTypographyModifierVariations, boolean>>;

export type BaseComponentAlignmentModifierVariations =
  | 'row' | 'spread'
  | 'center' | 'centerH' | 'centerV'
  | 'left' | 'right' | 'top' | 'bottom';
export type BaseComponentAlignmentModifiers = Partial<Record<BaseComponentAlignmentModifierVariations, boolean>>;

export type BaseComponentFlexStyleModifierVariations =
  | 'flex' | 'flex-1' | 'flex-2' | 'flex-3' | 'flex-4' | 'flex-5'
  | 'flexG' | 'flexG-1' | 'flexG-2' | 'flexG-3' | 'flexG-4' | 'flexG-5'
  | 'flexS' | 'flexS-1' | 'flexS-2' | 'flexS-3' | 'flexS-4' | 'flexS-5';
export type BaseComponentFlexStyleModifiers = Partial<Record<BaseComponentFlexStyleModifierVariations, boolean>>;

export type BaseComponentBorderRadiusModifierVariations = TypographyName;
export type BaseComponentBorderRadiusModifiers = Partial<Record<BaseComponentBorderRadiusModifierVariations, boolean>>;

export type BaseComponentModifiers =
  & BaseComponentColorModifiers
  & BaseComponentTypographyModifiers
  & BaseComponentAlignmentModifiers
  & BaseComponentPaddingModifier
  & BaseComponentMarginModifier
  & BaseComponentFlexStyleModifiers
  & BaseComponentBorderRadiusModifiers;

export class BaseComponent<P = {}, S = {}, SS = any> extends React.Component<P & BaseComponentModifiers, S, SS> {
  static propTypes?: any;
  static defaultProps?: Partial<P>;

  // TODO: There's more methods here, need to create more precise types
  getThemeProps: () => P & ThemeProps;
  extractAccessibilityProps: () => AccessibilityProps;
}

export type _B = Partial<Record<BaseComponentColorModifierVariations, boolean>>;

export class PureBaseComponent<P = {}, S = {}, SS = any> extends React.PureComponent<P & _B, S, SS> {
  static propTypes?: any;
  static defaultProps?: Partial<P>;

  // TODO: There's more methods here, need to create more precise types
  getThemeProps: () => P & ThemeProps;
  extractAccessibilityProps: () => AccessibilityProps;
}

