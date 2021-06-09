import _ from 'lodash';
import { Appearance, StyleSheet } from 'react-native';
import { Typography, Colors, BorderRadiuses, Spacings, ThemeManager } from "../style";
export const FLEX_KEY_PATTERN = /^flex(G|S)?(-\d*)?$/;
export const PADDING_KEY_PATTERN = new RegExp(`padding[LTRBHV]?-([0-9]*|${Spacings.getKeysPattern()})`);
export const MARGIN_KEY_PATTERN = new RegExp(`margin[LTRBHV]?-([0-9]*|${Spacings.getKeysPattern()})`);
export const ALIGNMENT_KEY_PATTERN = /(left|top|right|bottom|center|centerV|centerH|spread)/;
export const POSITION_KEY_PATTERN = /^abs([F|L|R|T|B|V|H])?$/;
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
export function extractColorValue(props) {
  const scheme = Appearance.getColorScheme() || 'light';
  const schemeColors = Colors.schemes[scheme];
  const allColorsKeys = [..._.keys(Colors), ..._.keys(schemeColors)];

  const colorPropsKeys = _.chain(props).keys().filter(key => _.includes(allColorsKeys, key)).value();

  const colorKey = _.findLast(colorPropsKeys, colorKey => props[colorKey] === true);

  return schemeColors[colorKey] || Colors[colorKey];
}
export function extractBackgroundColorValue(props) {
  let backgroundColor;
  const scheme = Appearance.getColorScheme() || 'light';
  const schemeColors = Colors.schemes[scheme];
  const keys = Object.keys(props);

  const bgProp = _.findLast(keys, prop => Colors.getBackgroundKeysPattern().test(prop) && !!props[prop]);

  if (props[bgProp]) {
    const key = bgProp.replace(Colors.getBackgroundKeysPattern(), '');
    backgroundColor = schemeColors[key] || Colors[key];
  }

  return backgroundColor;
}
export function extractTypographyValue(props) {
  const typographyPropsKeys = _.chain(props).keys().filter(key => Typography.getKeysPattern().test(key)).value();

  let typography;

  _.forEach(typographyPropsKeys, key => {
    if (props[key] === true) {
      typography = { ...typography,
        ...Typography[key]
      };
    }
  });

  return typography;
}
export function extractPaddingValues(props) {
  const paddings = {};

  const paddingPropsKeys = _.chain(props).keys().filter(key => PADDING_KEY_PATTERN.test(key)).value();

  _.forEach(paddingPropsKeys, key => {
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

  const marginPropsKeys = _.chain(props).keys().filter(key => MARGIN_KEY_PATTERN.test(key)).value();

  _.forEach(marginPropsKeys, key => {
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

  const positionProp = _.findLast(keys, prop => POSITION_KEY_PATTERN.test(prop) && !!props[prop]);

  if (positionProp) {
    const positionVariationKey = _.split(positionProp, 'abs')[1];

    if (positionVariationKey) {
      const positionVariation = POSITION_CONVERSIONS[positionVariationKey];
      const styleKey = `absolute${positionVariation}`;
      return styles[styleKey];
    }

    return styles.absolute;
  }
}
export function extractFlexStyle(props) {
  const keys = Object.keys(props);
  const flexProp = keys.find(item => FLEX_KEY_PATTERN.test(item));

  if (flexProp && props[flexProp] === true) {
    const [flexKey, flexValue] = flexProp.split('-');
    const convertedFlexKey = STYLE_KEY_CONVERTERS[flexKey];
    const flexValueAsNumber = _.isEmpty(flexValue) ? 1 : Number(flexValue);
    return {
      [convertedFlexKey]: flexValueAsNumber
    };
  }
} //@ts-ignore

export function extractAccessibilityProps(props = this.props) {
  return _.pickBy(props, (_value, key) => {
    return /.*ccessib.*/.test(key);
  });
} //@ts-ignore

export function extractAnimationProps(props = this.props) {
  return _.pick(props, ['animation', 'duration', 'delay', 'direction', 'easing', 'iterationCount', 'transition', 'onAnimationBegin', 'onAnimationEnd', 'useNativeDriver']);
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
  const patterns = [FLEX_KEY_PATTERN, PADDING_KEY_PATTERN, MARGIN_KEY_PATTERN, ALIGNMENT_KEY_PATTERN, Colors.getBackgroundKeysPattern()];

  const modifierProps = _.pickBy(props, (_value, key) => {
    const isModifier = _.find(patterns, pattern => pattern.test(key));

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

  const ownProps = _.chain(props).pickBy((_value, key) => _.includes(Object.keys(ownPropTypes), key)).omit(ignoreProps).value();

  return ownProps;
}
export function extractComponentProps(component, props, ignoreProps = []) {
  const componentPropTypes = component.propTypes;

  const componentProps = _.chain(props).pickBy((_value, key) => _.includes(Object.keys(componentPropTypes), key)).omit(ignoreProps).value();

  return componentProps;
} //@ts-ignore

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

  return { ...themeProps,
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
  position: true
}, props) {
  //@ts-ignore
  const boundProps = props || this.props;
  const style = {};

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

  return style; // clean empty objects and undefined
  // (!) This change is currently breaking UI layout for some reason - worth investigating
  // return _.omitBy(style, value => _.isUndefined(value) || (_.isPlainObject(value) && _.isEmpty(value)));
}
export function getAlteredModifiersOptions(currentProps, nextProps) {
  const ignoredKeys = ['children', 'forwardedRef', 'style', 'testID'];

  const allKeys = _.union([..._.keys(currentProps), ..._.keys(nextProps)]).filter(key => !ignoredKeys.includes(key));

  const changedKeys = _.filter(allKeys, key => !_.isEqual(currentProps[key], nextProps[key]));

  const options = {};

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