import _ from 'lodash';
import {Typography, Colors, BorderRadiuses, Spacings, ThemeManager} from '../style';

export const FLEX_KEY_PATTERN = /^flex(G|S)?(-\d*)?$/;
export const PADDING_KEY_PATTERN = new RegExp(`padding[LTRBHV]?-([0-9]*|${Spacings.getKeysPattern()})`);
export const MARGIN_KEY_PATTERN = new RegExp(`margin[LTRBHV]?-([0-9]*|${Spacings.getKeysPattern()})`);
export const ALIGNMENT_KEY_PATTERN = /(left|top|right|bottom|center|centerV|centerH|spread)/;

export function extractColorValue(props) {
  // const props = this.getThemeProps();
  const allColorsKeys = _.keys(Colors);
  const colorPropsKeys = _.chain(props)
    .keys()
    .filter(key => _.includes(allColorsKeys, key))
    .value();

  const color = _.findLast(colorPropsKeys, colorKey => props[colorKey] === true);
  return Colors[color];
}

// todo: refactor this and use BACKGROUND_KEY_PATTERN
export function extractBackgroundColorValue(props) {
  let backgroundColor;
  _.forEach(Colors, (value, key) => {
    if (props[`background-${key}`] === true || props[`bg-${key}`] === true) {
      backgroundColor = value;
    }
  });

  return backgroundColor;
}

export function extractTypographyValue(props) {
  const typographyPropsKeys = _.chain(props)
    .keys(props)
    .filter(key => Typography.getKeysPattern().test(key))
    .value();
  let typography;
  _.forEach(typographyPropsKeys, key => {
    if (props[key] === true) {
      typography = Typography[key];
    }
  });

  return typography;
}

export function extractPaddingValues(props) {
  const PADDING_VARIATIONS = {
    padding: 'padding',
    paddingL: 'paddingLeft',
    paddingT: 'paddingTop',
    paddingR: 'paddingRight',
    paddingB: 'paddingBottom',
    paddingH: 'paddingHorizontal',
    paddingV: 'paddingVertical',
  };
  const paddings = {};
  const paddingPropsKeys = _.chain(props)
    .keys()
    .filter(key => PADDING_KEY_PATTERN.test(key))
    .value();

  _.forEach(paddingPropsKeys, key => {
    if (props[key] === true) {
      const [paddingKey, paddingValue] = key.split('-');
      const paddingVariation = PADDING_VARIATIONS[paddingKey];
      if (!isNaN(paddingValue)) {
        paddings[paddingVariation] = Number(paddingValue);
      } else if (Spacings.getKeysPattern().test(paddingValue)) {
        paddings[paddingVariation] = Spacings[paddingValue];
      }
    }
  });

  return paddings;
}

export function extractMarginValues(props) {
  const MARGIN_VARIATIONS = {
    margin: 'margin',
    marginL: 'marginLeft',
    marginT: 'marginTop',
    marginR: 'marginRight',
    marginB: 'marginBottom',
    marginH: 'marginHorizontal',
    marginV: 'marginVertical',
  };

  const margins = {};
  const marginPropsKeys = _.chain(props)
    .keys()
    .filter(key => MARGIN_KEY_PATTERN.test(key))
    .value();

  _.forEach(marginPropsKeys, key => {
    if (props[key] === true) {
      const [marginKey, marginValue] = key.split('-');
      const paddingVariation = MARGIN_VARIATIONS[marginKey];
      if (!isNaN(marginValue)) {
        margins[paddingVariation] = Number(marginValue);
      } else if (Spacings.getKeysPattern().test(marginValue)) {
        margins[paddingVariation] = Spacings[marginValue];
      }
    }
  });

  return margins;
}

export function extractAlignmentsValues(props) {
  const {row, center} = props;
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

export function extractFlexStyle(props) {
  const STYLE_KEY_CONVERTERS = {
    flex: 'flex',
    flexG: 'flexGrow',
    flexS: 'flexShrink',
  };
  const flexPropKey = _.chain(props)
    .keys(props)
    .filter(key => FLEX_KEY_PATTERN.test(key))
    .last()
    .value();
  if (flexPropKey && props[flexPropKey] === true) {
    let [flexKey, flexValue] = flexPropKey.split('-');
    flexKey = STYLE_KEY_CONVERTERS[flexKey];
    flexValue = _.isEmpty(flexValue) ? 1 : Number(flexValue);

    return {[flexKey]: flexValue};
  }
}

export function extractBorderRadiusValue(props) {
  const borderRadiusPropsKeys = _.chain(props)
    .keys()
    .filter(key => BorderRadiuses.getKeysPattern().test(key))
    .value();
  let borderRadius;
  _.forEach(borderRadiusPropsKeys, key => {
    if (props[key] === true) {
      borderRadius = BorderRadiuses[key];
    }
  });

  return borderRadius;
}

export function extractModifierProps(props) {
  const patterns = [
    FLEX_KEY_PATTERN,
    PADDING_KEY_PATTERN,
    MARGIN_KEY_PATTERN,
    ALIGNMENT_KEY_PATTERN,
    Colors.getBackgroundKeysPattern(),
  ];
  const modifierProps = _.pickBy(props, (value, key) => {
    const isModifier = _.find(patterns, pattern => pattern.test(key));
    return !!isModifier;
  });

  return modifierProps;
}

export function extractOwnProps(props, ignoreProps) {
  const ownPropTypes = this.propTypes;
  const ownProps = _.chain(props)
    .pickBy((value, key) => _.includes(Object.keys(ownPropTypes), key))
    .omit(ignoreProps)
    .value();

  return ownProps;
}

export function getThemeProps(props = this.props, context = this.context) {
  const componentName = this.displayName || this.constructor.displayName || this.constructor.name;
  let themeProps;
  if (_.isFunction(ThemeManager.components[componentName])) {
    themeProps = ThemeManager.components[componentName](props, context);
  } else {
    themeProps = ThemeManager.components[componentName];
  }
  return {...themeProps, ...props};
}
