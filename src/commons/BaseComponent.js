import {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import _ from 'lodash';
import {Typography, Colors, BorderRadiuses, Spacings, ThemeManager} from '../style';
import {DocsGenerator} from '../helpers';

const FLEX_KEY_PATTERN = /^flex(G|S)?(-\d*)?$/;
const PADDING_KEY_PATTERN = new RegExp(`padding[LTRBHV]?-([0-9]*|${Spacings.getKeysPattern()})`);
const MARGIN_KEY_PATTERN = new RegExp(`margin[LTRBHV]?-([0-9]*|${Spacings.getKeysPattern()})`);
const ALIGNMENT_KEY_PATTERN = /(left|top|right|bottom|center|centerV|centerH|spread)/;

export default class BaseComponent extends Component {
  // static displayName = 'BaseComponent';
  static propTypes = {
    ..._.mapValues(Typography, () => PropTypes.bool),
    ..._.mapValues(Colors, () => PropTypes.bool),
    useNativeDriver: PropTypes.bool,
  };

  static defaultProps = {
    useNativeDriver: true,
  };

  static extractOwnProps(props, ignoreProps) {
    const ownPropTypes = this.propTypes;
    const ownProps = _.chain(props)
      .pickBy((value, key) => _.includes(Object.keys(ownPropTypes), key))
      .omit(ignoreProps)
      .value();

    return ownProps;
  }

  constructor(props) {
    super(props);
    if (!this.styles) {
      this.generateStyles();
    }

    this.state = {
      ...this.extractStyleProps(),
    };
  }

  getThemeProps() {
    const componentName = this.constructor.displayName || this.constructor.name;
    let themeProps;
    if (_.isFunction(ThemeManager.components[componentName])) {
      themeProps = ThemeManager.components[componentName](this.props);
    } else {
      themeProps = ThemeManager.components[componentName];
    }
    return {...themeProps, ...this.props};
  }

  getSnippet() {
    return DocsGenerator.generateSnippet(DocsGenerator.extractComponentInfo(this));
  }

  generateStyles() {
    this.styles = StyleSheet.create({});
  }

  extractAnimationProps() {
    return _.pick(this.props, [
      'animation',
      'duration',
      'delay',
      'direction',
      'easing',
      'iterationCount',
      'transition',
      'onAnimationBegin',
      'onAnimationEnd',
      'useNativeDriver',
    ]);
  }

  extractContainerStyle(props) {
    let containerStyle = {};
    if (props.containerStyle) {
      containerStyle = _.pickBy(props.containerStyle, (value, key) => {
        return key.includes('margin') || _.includes(['alignSelf', 'transform'], key);
      });
    }

    return containerStyle;
  }

  extractTypographyValue() {
    const typographyPropsKeys = _.chain(this.props)
      .keys(this.props)
      .filter(key => Typography.getKeysPattern().test(key))
      .value();
    let typography;
    _.forEach(typographyPropsKeys, (key) => {
      if (this.props[key] === true) {
        typography = Typography[key];
      }
    });

    return typography;
  }

  extractColorValue() {
    let color;
    const props = this.getThemeProps();
    _.forEach(Colors, (value, key) => {
      if (props[key] === true) {
        color = value;
      }
    });

    return color;
  }

  // todo: refactor this and use BACKGROUND_KEY_PATTERN
  extractBackgroundColorValue() {
    let backgroundColor;
    _.forEach(Colors, (value, key) => {
      if (this.props[`background-${key}`] === true || this.props[`bg-${key}`] === true) {
        backgroundColor = value;
      }
    });

    return backgroundColor;
  }

  extractBorderRadiusValue() {
    const borderRadiusPropsKeys = _.chain(this.props)
      .keys(this.props)
      .filter(key => BorderRadiuses.getKeysPattern().test(key))
      .value();
    let borderRadius;
    _.forEach(borderRadiusPropsKeys, (key) => {
      if (this.props[key] === true) {
        borderRadius = BorderRadiuses[key];
      }
    });

    return borderRadius;
  }

  extractPaddingValues() {
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
    const paddingPropsKeys = _.chain(this.props)
      .keys(this.props)
      .filter(key => PADDING_KEY_PATTERN.test(key))
      .value();

    _.forEach(paddingPropsKeys, (key) => {
      if (this.props[key] === true) {
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

  extractMarginValues() {
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
    const marginPropsKeys = _.chain(this.props)
      .keys(this.props)
      .filter(key => MARGIN_KEY_PATTERN.test(key))
      .value();

    _.forEach(marginPropsKeys, (key) => {
      if (this.props[key] === true) {
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

  extractAlignmentsValues() {
    const {row, center} = this.props;
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
      _.forEach(positions, (position) => {
        if (this.props[position]) {
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

  // todo: deprecate this, use extractFlexStyle instead
  extractFlexValue() {
    const flexPropKey = _.chain(this.props)
      .keys(this.props)
      .filter(key => FLEX_KEY_PATTERN.test(key))
      .last()
      .value();
    if (flexPropKey && this.props[flexPropKey] === true) {
      const value = flexPropKey.split('-').pop();
      if (value === 'flex' || value === '') {
        return 1;
      } else if (!isNaN(value)) {
        return Number(value);
      }
    }
  }

  extractFlexStyle() {
    const STYLE_KEY_CONVERTERS = {
      flex: 'flex',
      flexG: 'flexGrow',
      flexS: 'flexShrink',
    };
    const flexPropKey = _.chain(this.props)
      .keys(this.props)
      .filter(key => FLEX_KEY_PATTERN.test(key))
      .last()
      .value();
    if (flexPropKey && this.props[flexPropKey] === true) {
      let [flexKey, flexValue] = flexPropKey.split('-');
      flexKey = STYLE_KEY_CONVERTERS[flexKey];
      flexValue = _.isEmpty(flexValue) ? 1 : Number(flexValue);

      return {[flexKey]: flexValue};
    }
  }

  extractStyleProps() {
    const backgroundColor = this.extractBackgroundColorValue();
    const borderRadius = this.extractBorderRadiusValue();
    const paddings = this.extractPaddingValues();
    const margins = this.extractMarginValues();
    const alignments = this.extractAlignmentsValues();
    // const flex = this.extractFlexValue();
    const flexStyle = this.extractFlexStyle();

    return {
      backgroundColor,
      borderRadius,
      paddings,
      margins,
      alignments,
      flexStyle,
    };
  }

  extractTextProps(props) {
    return _.pick(props, [..._.keys(Typography), ..._.keys(Colors), 'color']);
  }

  extractModifierProps() {
    const patterns = [
      FLEX_KEY_PATTERN,
      PADDING_KEY_PATTERN,
      MARGIN_KEY_PATTERN,
      ALIGNMENT_KEY_PATTERN,
      Colors.getBackgroundKeysPattern(),
    ];
    const modifierProps = _.pickBy(this.props, (value, key) => {
      const isModifier = _.find(patterns, pattern => pattern.test(key));
      return !!isModifier;
    });

    return modifierProps;
  }
}
