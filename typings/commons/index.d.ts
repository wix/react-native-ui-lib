import * as React from 'react';
import {ColorName} from '../style/colors';
import {TypographyName} from '../style/typography';
import {BorderRadiusName} from '../style/borderRadiuses';
import {BaseComponentPaddingModifier, BaseComponentMarginModifier} from './spacings';

export class UIComponent extends React.PureComponent {}
export function forwardRef<T, P>(
  WrappedComponent: React.RefForwardingComponent<T, P>
): React.RefForwardingComponent<T, P>;
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

export class BaseComponent<P = {}, S = {}, SS = any> extends React.Component<P & BaseComponentModifiers, S, SS> {}
export class PureBaseComponent<P = {}, S = {}, SS = any> extends React.PureComponent<P & BaseComponentModifiers, S, SS> {}
