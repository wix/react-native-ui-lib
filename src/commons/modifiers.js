import _isEqual from "lodash/isEqual";
import _keys from "lodash/keys";
import _union from "lodash/union";
import _isFunction from "lodash/isFunction";
import _omit from "lodash/omit";
import _flow from "lodash/flow";
import _find from "lodash/find";
import _pick from "lodash/pick";
import _pickBy from "lodash/pickBy";
import _isEmpty from "lodash/isEmpty";
import _split from "lodash/split";
import _filter from "lodash/filter";
import _includes from "lodash/includes";
import _forEach from "lodash/forEach";
import _findLast from "lodash/findLast";
import { StyleSheet } from 'react-native';
import { Typography, Colors, BorderRadiuses, Spacings, ThemeManager } from "../style";
export const FLEX_KEY_PATTERN = /^flex(G|S)?(-\d*)?$/;
export const PADDING_KEY_PATTERN = new RegExp(`padding[LTRBHV]?-([0-9]*|${Spacings.getKeysPattern()})`);
export const MARGIN_KEY_PATTERN = new RegExp(`margin[LTRBHV]?-([0-9]*|${Spacings.getKeysPattern()})`);
export const ALIGNMENT_KEY_PATTERN = /(left|top|right|bottom|center|centerV|centerH|spread)/;
export const POSITION_KEY_PATTERN = /^abs([F|L|R|T|B|V|H])?$/;
const BACKGROUND_COLOR_KEYS_PATTERN = Colors.getBackgroundKeysPattern();
export const GAP_KEY_PATTERN = new RegExp(`gap-([0-9]*|${Spacings.getKeysPattern()})`);
const PADDING_VARIATIONS = {
  padding: 'padding',
  paddingL: 'paddingLeft',
  paddingT: 'paddingTop',
  paddingR: 'paddingRight',
  paddingB: 'paddingBottom',
  paddingH: 'paddingHorizontal',
  paddingV: 'paddingVertical'
};
const MARGIN_VARIATIONS = {
  margin: 'margin',
  marginL: 'marginLeft',
  marginT: 'marginTop',
  marginR: 'marginRight',
  marginB: 'marginBottom',
  marginH: 'marginHorizontal',
  marginV: 'marginVertical'
};
const STYLE_KEY_CONVERTERS = {
  flex: 'flex',
  flexG: 'flexGrow',
  flexS: 'flexShrink'
};

// TODO: migrate other modifiers to the same new structure as Margin modifier, using template literals

// TODO: This caused issue with with some typings that inherit this type
// export type MarginModifiers = Partial<{[key: `${MarginLiterals}-${number}`]: boolean}>;

export function extractColorValue(props) {
  const colorPropsKeys = Object.keys(props).filter(key => Colors[key] !== undefined);
  const colorKey = _findLast(colorPropsKeys, colorKey => props[colorKey] === true);
  return Colors[colorKey];
}
export function extractBackgroundColorValue(props) {
  let backgroundColor;
  const keys = Object.keys(props);
  const bgProp = _findLast(keys, prop => BACKGROUND_COLOR_KEYS_PATTERN.test(prop) && !!props[prop]);
  if (props[bgProp]) {
    const key = bgProp.replace(BACKGROUND_COLOR_KEYS_PATTERN, '');
    backgroundColor = Colors[key];
  }
  return backgroundColor;
}
export function extractTypographyValue(props) {
  const typographyPropsKeys = Object.keys(props).filter(key => Typography[key] !== undefined);
  let typography;
  _forEach(typographyPropsKeys, key => {
    if (props[key] === true) {
      typography = {
        ...typography,
        ...Typography[key]
      };
    }
  });
  return typography;
}
export function extractPaddingValues(props) {
  const paddings = {};
  const paddingPropsKeys = Object.keys(props).filter(key => PADDING_KEY_PATTERN.test(key));
  _forEach(paddingPropsKeys, key => {
    if (props[key] === true) {
      const [paddingKey, paddingValue] = key.split('-');
      const paddingVariation = PADDING_VARIATIONS[paddingKey];
      if (!isNaN(Number(paddingValue))) {
        paddings[paddingVariation] = Number(paddingValue);
      } else if (Spacings.getKeysPattern().test(paddingValue)) {
        paddings[paddingVariation] = Spacings[paddingValue];
      }
    }
  });
  return paddings;
}
export function extractMarginValues(props) {
  const margins = {};
  const marginPropsKeys = Object.keys(props).filter(key => MARGIN_KEY_PATTERN.test(key));
  _forEach(marginPropsKeys, key => {
    if (props[key] === true) {
      const [marginKey, marginValue] = key.split('-');
      const paddingVariation = MARGIN_VARIATIONS[marginKey];
      if (!isNaN(Number(marginValue))) {
        margins[paddingVariation] = Number(marginValue);
      } else if (Spacings.getKeysPattern().test(marginValue)) {
        margins[paddingVariation] = Spacings[marginValue];
      }
    }
  });
  return margins;
}
export function extractGapValues(props) {
  const gapPropsKeys = Object.keys(props).filter(key => GAP_KEY_PATTERN.test(key));
  // Taking only the last one
  const gapModifier = _findLast(gapPropsKeys, key => props[key] === true);
  if (gapModifier) {
    const [, gapValue] = gapModifier.split('-');
    const parsedNumber = Number(gapValue);
    if (!isNaN(parsedNumber)) {
      return parsedNumber;
    } else if (Spacings.getKeysPattern().test(gapValue)) {
      return Spacings[gapValue];
    }
  }
}
export function extractAlignmentsValues(props) {
  const {
    row,
    center
  } = props;
  const alignments = {};
  const alignmentRules = {};
  if (row) {
    alignments.flexDirection = 'row';
    alignmentRules.justifyContent = ['left', 'right', 'centerH', 'spread'];
    alignmentRules.alignItems = ['top', 'bottom', 'centerV'];
  } else {
    alignmentRules.justifyContent = ['top', 'bottom', 'centerV', 'spread'];
    alignmentRules.alignItems = ['left', 'right', 'centerH'];
  }
  _forEach(alignmentRules, (positions, attribute) => {
    _forEach(positions, position => {
      if (props[position]) {
        if (_includes(['top', 'left'], position)) {
          alignments[attribute] = 'flex-start';
        } else if (_includes(['bottom', 'right'], position)) {
          alignments[attribute] = 'flex-end';
        } else if (_includes(['centerH', 'centerV'], position)) {
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
export function extractPositionStyle(props) {
  const POSITION_CONVERSIONS = {
    F: 'Fill',
    T: 'Top',
    B: 'Bottom',
    L: 'Left',
    R: 'Right',
    H: 'Horizontal',
    V: 'Vertical'
  };
  const keys = Object.keys(props);
  const positionProps = _filter(keys, prop => POSITION_KEY_PATTERN.test(prop) && !!props[prop]);
  let style = {};
  _forEach(positionProps, positionProp => {
    const positionVariationKey = _split(positionProp, 'abs')[1];
    if (positionVariationKey) {
      const positionVariation = POSITION_CONVERSIONS[positionVariationKey];
      const styleKey = `absolute${positionVariation}`;
      style = {
        ...style,
        ...styles[styleKey]
      };
    }
    style = {
      ...style,
      ...styles.absolute
    };
  });
  return _isEmpty(style) ? undefined : style;
}
export function extractFlexStyle(props) {
  const keys = Object.keys(props);
  const flexProp = keys.find(item => FLEX_KEY_PATTERN.test(item));
  if (flexProp && props[flexProp] === true) {
    const [flexKey, flexValue] = flexProp.split('-');
    const convertedFlexKey = STYLE_KEY_CONVERTERS[flexKey];
    const flexValueAsNumber = _isEmpty(flexValue) ? 1 : Number(flexValue);
    return {
      [convertedFlexKey]: flexValueAsNumber
    };
  }
}

//@ts-ignore
export function extractAccessibilityProps(props = this.props) {
  return _pickBy(props, (_value, key) => {
    return /.*ccessib.*/.test(key);
  });
}

//@ts-ignore
export function extractAnimationProps(props = this.props) {
  return _pick(props, ['animation', 'duration', 'delay', 'direction', 'easing', 'iterationCount', 'transition', 'onAnimationBegin', 'onAnimationEnd', 'useNativeDriver']);
}
export function extractBorderRadiusValue(props) {
  let borderRadius;
  const keys = Object.keys(props);
  const radiusProp = keys.find(prop => BorderRadiuses.getKeysPattern().test(prop) && props[prop]);
  if (radiusProp) {
    borderRadius = BorderRadiuses[radiusProp];
  }
  return borderRadius;
}
export function extractModifierProps(props) {
  const patterns = [FLEX_KEY_PATTERN, PADDING_KEY_PATTERN, MARGIN_KEY_PATTERN, ALIGNMENT_KEY_PATTERN, GAP_KEY_PATTERN, Colors.getBackgroundKeysPattern()];
  const modifierProps = _pickBy(props, (_value, key) => {
    const isModifier = _find(patterns, pattern => pattern.test(key));
    return !!isModifier;
  });
  return modifierProps;
}

/**
 * TODO:
 * @deprecated switch to Modifiers#extractComponentProps
 */
export function extractOwnProps(props, ignoreProps) {
  //@ts-ignore
  const ownPropTypes = this.propTypes;
  const ownProps = _flow(props => _pickBy(props, (_value, key) => _includes(Object.keys(ownPropTypes), key)), props => _omit(props, ignoreProps))(props);
  return ownProps;
}
export function extractComponentProps(component, props, ignoreProps = []) {
  const componentPropTypes = component.propTypes;
  const componentProps = _flow(props => _pickBy(props, (_value, key) => _includes(Object.keys(componentPropTypes), key)), props => _omit(props, ignoreProps))(props);
  return componentProps;
}

//@ts-ignore
export function getThemeProps(props = this.props, context = this.context, componentDisplayName = '') {
  const componentName =
  //@ts-ignore
  componentDisplayName || this.displayName || this.constructor.displayName || this.constructor.name;
  let themeProps;
  if (_isFunction(ThemeManager.components[componentName])) {
    themeProps = ThemeManager.components[componentName](props, context);
  } else {
    themeProps = ThemeManager.components[componentName];
  }
  let forcedThemeProps;
  if (_isFunction(ThemeManager.forcedThemeComponents[componentName])) {
    forcedThemeProps = ThemeManager.forcedThemeComponents[componentName](props, context);
  } else {
    forcedThemeProps = ThemeManager.forcedThemeComponents[componentName];
  }
  return {
    ...themeProps,
    ...props,
    ...forcedThemeProps
  };
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
  position: true,
  gap: false
}, props) {
  //@ts-ignore
  const boundProps = props || this.props;
  const style = {};
  if (!_find(boundProps, prop => prop === true)) {
    return style;
  }
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
  if (options.gap) {
    style.gap = extractGapValues(boundProps);
  }
  return style;
  // clean empty objects and undefined
  // (!) This change is currently breaking UI layout for some reason - worth investigating
  // return _.omitBy(style, value => _.isUndefined(value) || (_.isPlainObject(value) && _.isEmpty(value)));
}
export function getAlteredModifiersOptions(currentProps, nextProps) {
  const ignoredKeys = ['children', 'forwardedRef', 'style', 'testID'];
  const allKeys = _union([..._keys(currentProps), ..._keys(nextProps)]).filter(key => !ignoredKeys.includes(key));
  const changedKeys = _filter(allKeys, key => !_isEqual(currentProps[key], nextProps[key]));
  const options = {};
  if (_find(changedKeys, key => FLEX_KEY_PATTERN.test(key))) {
    options.flex = true;
  }
  if (_find(changedKeys, key => PADDING_KEY_PATTERN.test(key))) {
    options.paddings = true;
  }
  if (_find(changedKeys, key => MARGIN_KEY_PATTERN.test(key))) {
    options.margins = true;
  }
  if (_find(changedKeys, key => ALIGNMENT_KEY_PATTERN.test(key))) {
    options.alignments = true;
  }
  if (_find(changedKeys, key => Colors.getBackgroundKeysPattern().test(key))) {
    options.backgroundColor = true;
  }
  if (_find(changedKeys, key => POSITION_KEY_PATTERN.test(key))) {
    options.position = true;
  }
  return options;
}
const styles = StyleSheet.create({
  absolute: {
    position: 'absolute'
  },
  absoluteFill: StyleSheet.absoluteFillObject,
  absoluteTop: {
    position: 'absolute',
    top: 0
  },
  absoluteBottom: {
    position: 'absolute',
    bottom: 0
  },
  absoluteLeft: {
    position: 'absolute',
    left: 0
  },
  absoluteRight: {
    position: 'absolute',
    right: 0
  },
  absoluteVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0
  },
  absoluteHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0
  }
});