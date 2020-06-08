import _ from 'lodash';
import {StyleSheet} from 'react-native';
import {Typography, Colors, BorderRadiuses, Spacings, ThemeManager} from '../style';
import {BorderRadiusesLiterals} from '../style/borderRadiuses';
import TypographyPresets from '../style/typographyPresets';
import {SpacingLiterals} from '../style/spacings';
import {colorsPalette} from '../style/colorsPalette';
export const FLEX_KEY_PATTERN = /^flex(G|S)?(-\d*)?$/;
export const PADDING_KEY_PATTERN = new RegExp(`padding[LTRBHV]?-([0-9]*|${Spacings.getKeysPattern()})`);
export const MARGIN_KEY_PATTERN = new RegExp(`margin[LTRBHV]?-([0-9]*|${Spacings.getKeysPattern()})`);
export const ALIGNMENT_KEY_PATTERN = /(left|top|right|bottom|center|centerV|centerH|spread)/;
export const POSITION_KEY_PATTERN = /^abs([F|L|R|T|B|V|H])?$/;

export interface AlteredOptions {
  flex?: boolean;
  alignments?: boolean;
  paddings?: boolean;
  margins?: boolean;
  backgroundColor?: boolean;
  position?: boolean;
}

export interface ExtractedStyle {
  color?: ReturnType<typeof extractColorValue>;
  typography?: ReturnType<typeof extractTypographyValue>;
  backgroundColor?: ReturnType<typeof extractBackgroundColorValue>;
  borderRadius?: ReturnType<typeof extractBorderRadiusValue>;
  paddings?: ReturnType<typeof extractPaddingValues>;
  margins?: ReturnType<typeof extractMarginValues>;
  alignments?: ReturnType<typeof extractAlignmentsValues>;
  flexStyle?: ReturnType<typeof extractFlexStyle>;
  positionStyle?: ReturnType<typeof extractPositionStyle>;
}

const PADDING_VARIATIONS = {
  padding: 'padding',
  paddingL: 'paddingLeft',
  paddingT: 'paddingTop',
  paddingR: 'paddingRight',
  paddingB: 'paddingBottom',
  paddingH: 'paddingHorizontal',
  paddingV: 'paddingVertical'
} as const;

const MARGIN_VARIATIONS = {
  margin: 'margin',
  marginL: 'marginLeft',
  marginT: 'marginTop',
  marginR: 'marginRight',
  marginB: 'marginBottom',
  marginH: 'marginHorizontal',
  marginV: 'marginVertical'
} as const;

const STYLE_KEY_CONVERTERS = {
  flex: 'flex',
  flexG: 'flexGrow',
  flexS: 'flexShrink'
} as const;


export type PaddingLiterals = keyof typeof PADDING_VARIATIONS;
export type NativePaddingKeyType = typeof PADDING_VARIATIONS[PaddingLiterals];
export type MarginLiterals = keyof typeof MARGIN_VARIATIONS;
export type NativeMarginModifierKeyType = typeof MARGIN_VARIATIONS[MarginLiterals];
export type FlexLiterals = keyof typeof STYLE_KEY_CONVERTERS;
export type NativeFlexModifierKeyType = typeof STYLE_KEY_CONVERTERS[FlexLiterals];
export type ColorLiterals = keyof typeof colorsPalette;
export type TypographyLiterals = keyof typeof TypographyPresets;
export type BorderRadiusLiterals = keyof typeof BorderRadiusesLiterals;
export type AlignmentLiterals =
| 'row' | 'spread'
| 'center' | 'centerH' | 'centerV'
| 'left' | 'right' | 'top' | 'bottom';
export type PositionLiterals = 'absF' | 'absL' | 'absR' | 'absT' | 'absB' | 'absV' | 'absH';

export type Modifier<T extends string> = Partial<Record<T, boolean>>
export type CustomModifier = {[key: string]: boolean};

export type TypographyModifiers = Modifier<TypographyLiterals> | CustomModifier;
export type ColorsModifiers = Modifier<ColorLiterals> | CustomModifier;
export type BackgroundColorModifier = Modifier<'bg'>;
export type AlignmentModifiers = Modifier<AlignmentLiterals>;
export type PositionModifiers = Modifier<PositionLiterals>;
export type PaddingModifiers = Modifier<PaddingLiterals>;
export type MarginModifiers = Modifier<MarginLiterals>;
export type FlexModifiers = Modifier<FlexLiterals>;
export type BorderRadiusModifiers = Modifier<BorderRadiusLiterals>;

export type ContainerModifiers =
  AlignmentModifiers &
  PositionModifiers &
  PaddingModifiers &
  MarginModifiers &
  FlexModifiers &
  BorderRadiusModifiers &
  BackgroundColorModifier;


export function extractColorValue(props: Dictionary<any>) {
  // const props = this.getThemeProps();
  const allColorsKeys: Array<keyof typeof Colors> = _.keys(Colors);
  const colorPropsKeys = _.chain(props)
    .keys()
    .filter(key => _.includes(allColorsKeys, key))
    .value();
  const color = _.findLast(colorPropsKeys, colorKey => props[colorKey] === true)!;
  return Colors[color];
}

export function extractBackgroundColorValue(props: Dictionary<any>) {
  let backgroundColor;

  const keys = Object.keys(props);
  const bgProp = _.findLast(keys, prop => Colors.getBackgroundKeysPattern().test(prop) && !!props[prop])!;
  if (props[bgProp]) {
    const key = bgProp.replace(Colors.getBackgroundKeysPattern(), '');
    backgroundColor = Colors[key];
  }

  return backgroundColor;
}
export function extractTypographyValue(props: Dictionary<any>): object | undefined {
  const typographyPropsKeys = _.chain(props)
    .keys()
    .filter(key => Typography.getKeysPattern().test(key))
    .value() as unknown as Array<keyof typeof TypographyPresets>;
  let typography;
  _.forEach(typographyPropsKeys, key => {
    if (props[key] === true) {
      typography = Typography[key];
    }
  });

  return typography;
}

export function extractPaddingValues(props: Dictionary<any>) {
  const paddings: Partial<Record<NativePaddingKeyType, number>> = {};
  const paddingPropsKeys = _.chain(props)
    .keys()
    .filter(key => PADDING_KEY_PATTERN.test(key))
    .value();

  _.forEach(paddingPropsKeys, key => {
    if (props[key] === true) {
      const [paddingKey, paddingValue] = key.split('-') as [keyof typeof PADDING_VARIATIONS, string];
      const paddingVariation = PADDING_VARIATIONS[paddingKey];
      if (!isNaN(Number(paddingValue))) {
        paddings[paddingVariation] = Number(paddingValue);
      } else if (Spacings.getKeysPattern().test(paddingValue)) {
        paddings[paddingVariation] = Spacings[paddingValue as keyof typeof SpacingLiterals];
      }
    }
  });

  return paddings;
}

export function extractMarginValues(props: Dictionary<any>) {
  const margins: Partial<Record<NativeMarginModifierKeyType, number>> = {};
  const marginPropsKeys = _.chain(props)
    .keys()
    .filter(key => MARGIN_KEY_PATTERN.test(key))
    .value();

  _.forEach(marginPropsKeys, key => {
    if (props[key] === true) {
      const [marginKey, marginValue] = key.split('-') as [keyof typeof MARGIN_VARIATIONS, string];
      const paddingVariation = MARGIN_VARIATIONS[marginKey];
      if (!isNaN(Number(marginValue))) {
        margins[paddingVariation] = Number(marginValue);
      } else if (Spacings.getKeysPattern().test(marginValue)) {
        margins[paddingVariation] = Spacings[marginValue as keyof typeof SpacingLiterals];
      }
    }
  });

  return margins;
}

export function extractAlignmentsValues(props: Dictionary<any>) {
  const {row, center} = props;
  const alignments: any = {};

  const alignmentRules: any = {};
  if (row) {
    alignments.flexDirection = 'row';
    alignmentRules.justifyContent = ['left', 'right', 'centerH', 'spread'];
    alignmentRules.alignItems = ['top', 'bottom', 'centerV'];
  } else {
    alignmentRules.justifyContent = ['top', 'bottom', 'centerV', 'spread'];
    alignmentRules.alignItems = ['left', 'right', 'centerH'];
  }

  _.forEach(alignmentRules, (positions, attribute) => {
    _.forEach(positions, position => {
      if (props[position]) {
        if (_.includes(['top', 'left'], position)) {
          alignments[attribute] = 'flex-start';
        } else if (_.includes(['bottom', 'right'], position)) {
          alignments[attribute] = 'flex-end';
        } else if (_.includes(['centerH', 'centerV'], position)) {
          alignments[attribute] = 'center';
        } else if (position === 'spread') {
          alignments[attribute] = 'space-between';
        }
      }
    });
  });

  if (center) {
    alignments.justifyContent = 'center';
    alignments.alignItems = 'center';
  }

  return alignments;
}

export function extractPositionStyle(props: Dictionary<any>) {
  const POSITION_CONVERSIONS = {
    F: 'Fill',
    T: 'Top',
    B: 'Bottom',
    L: 'Left',
    R: 'Right',
    H: 'Horizontal',
    V: 'Vertical'
  } as const;

  const keys = Object.keys(props);
  const positionProp = _.findLast(keys, prop => POSITION_KEY_PATTERN.test(prop) && !!props[prop]);
  if (positionProp) {
    const positionVariationKey = _.split(positionProp, 'abs')[1] as keyof typeof POSITION_CONVERSIONS;
    if (positionVariationKey) {
      const positionVariation = POSITION_CONVERSIONS[positionVariationKey];
      const styleKey = `absolute${positionVariation}` as keyof typeof styles;
      return styles[styleKey];
    }
    return styles.absolute;
  }
}

export function extractFlexStyle(props: Dictionary<any>): Partial<Record<NativeFlexModifierKeyType, number>> | undefined {
  const keys = Object.keys(props);
  const flexProp = keys.find(item => FLEX_KEY_PATTERN.test(item));
  if (flexProp && props[flexProp] === true) {
    let [flexKey, flexValue] = flexProp.split('-') as [keyof typeof STYLE_KEY_CONVERTERS, string];
    const convertedFlexKey = STYLE_KEY_CONVERTERS[flexKey];
    const flexValueAsNumber = _.isEmpty(flexValue) ? 1 : Number(flexValue);

    return {[convertedFlexKey]: flexValueAsNumber};
  }
}

//@ts-ignore
export function extractAccessibilityProps(props: any = this.props) {
  return _.pickBy(props, (_value, key) => {
    return /.*ccessib.*/.test(key);
  });
}

export function extractBorderRadiusValue(props: Dictionary<any>) {
  let borderRadius;

  const keys = Object.keys(props);
  const radiusProp = keys.find(prop => BorderRadiuses.getKeysPattern().test(prop) && props[prop]) as BorderRadiusLiterals;
  if (radiusProp) {
    borderRadius = BorderRadiuses[radiusProp];
  }

  return borderRadius;
}

export function extractModifierProps(props: Dictionary<any>) {
  const patterns = [
    FLEX_KEY_PATTERN,
    PADDING_KEY_PATTERN,
    MARGIN_KEY_PATTERN,
    ALIGNMENT_KEY_PATTERN,
    Colors.getBackgroundKeysPattern()
  ];
  const modifierProps = _.pickBy(props, (_value, key) => {
    const isModifier = _.find(patterns, pattern => pattern.test(key));
    return !!isModifier;
  });

  return modifierProps;
}

export function extractOwnProps(props: Dictionary<any>, ignoreProps: string[]) {
  //@ts-ignore
  const ownPropTypes = this.propTypes;
  const ownProps = _.chain(props)
    .pickBy((_value, key) => _.includes(Object.keys(ownPropTypes), key))
    .omit(ignoreProps)
    .value();

  return ownProps;
}

//@ts-ignore
export function getThemeProps(props = this.props, context = this.context) {
  //@ts-ignore
  const componentName = this.displayName || this.constructor.displayName || this.constructor.name;

  let themeProps;
  if (_.isFunction(ThemeManager.components[componentName])) {
    themeProps = ThemeManager.components[componentName](props, context);
  } else {
    themeProps = ThemeManager.components[componentName];
  }

  let forcedThemeProps;
  if (_.isFunction(ThemeManager.forcedThemeComponents[componentName])) {
    forcedThemeProps = ThemeManager.forcedThemeComponents[componentName](props, context);
  } else {
    forcedThemeProps = ThemeManager.forcedThemeComponents[componentName];
  }
  return {...themeProps, ...props, ...forcedThemeProps};
}

export function generateModifiersStyle(options = {
  color: true,
  typography: true,
  backgroundColor: true,
  borderRadius: true,
  paddings: true,
  margins: true,
  alignments: true,
  flex: true,
  position: true
}, props: Dictionary<any>) {

  //@ts-ignore
  const boundProps = props || this.props;
  const style: ExtractedStyle = {};

  if (options.color) {
    style.color = extractColorValue(boundProps);
  }
  if (options.typography) {
    style.typography = extractTypographyValue(boundProps);
  }
  if (options.backgroundColor) {
    style.backgroundColor = extractBackgroundColorValue(boundProps);
  }
  if (options.borderRadius) {
    style.borderRadius = extractBorderRadiusValue(boundProps);
  }
  if (options.paddings) {
    style.paddings = extractPaddingValues(boundProps);
  }
  if (options.margins) {
    style.margins = extractMarginValues(boundProps);
  }
  if (options.alignments) {
    style.alignments = extractAlignmentsValues(boundProps);
  }
  if (options.flex) {
    style.flexStyle = extractFlexStyle(boundProps);
  }
  if (options.position) {
    style.positionStyle = extractPositionStyle(boundProps);
  }

  return style;
  // clean empty objects and undefined
  // (!) This change is currently breaking UI layout for some reason - worth investigating
  // return _.omitBy(style, value => _.isUndefined(value) || (_.isPlainObject(value) && _.isEmpty(value))); 
}

export function getAlteredModifiersOptions(currentProps: any, nextProps: any) {
  const ignoredKeys = ['children', 'forwardedRef', 'style', 'testID'];
  const allKeys = _.union([..._.keys(currentProps), ..._.keys(nextProps)]).filter(key => !ignoredKeys.includes(key));
  const changedKeys = _.filter(allKeys, key => !_.isEqual(currentProps[key], nextProps[key]));

  const options: AlteredOptions = {};
  if (_.find(changedKeys, key => FLEX_KEY_PATTERN.test(key))) {
    options.flex = true;
  }

  if (_.find(changedKeys, key => PADDING_KEY_PATTERN.test(key))) {
    options.paddings = true;
  }

  if (_.find(changedKeys, key => MARGIN_KEY_PATTERN.test(key))) {
    options.margins = true;
  }

  if (_.find(changedKeys, key => ALIGNMENT_KEY_PATTERN.test(key))) {
    options.alignments = true;
  }

  if (_.find(changedKeys, key => Colors.getBackgroundKeysPattern().test(key))) {
    options.backgroundColor = true;
  }

  if (_.find(changedKeys, key => POSITION_KEY_PATTERN.test(key))) {
    options.position = true;
  }

  return options;
}

const styles = StyleSheet.create({
  absolute: {position: 'absolute'},
  absoluteFill: StyleSheet.absoluteFillObject,
  absoluteTop: {position: 'absolute', top: 0},
  absoluteBottom: {position: 'absolute', bottom: 0},
  absoluteLeft: {position: 'absolute', left: 0},
  absoluteRight: {position: 'absolute', right: 0},
  absoluteVertical: {position: 'absolute', top: 0, bottom: 0},
  absoluteHorizontal: {position: 'absolute', left: 0, right: 0}
});
