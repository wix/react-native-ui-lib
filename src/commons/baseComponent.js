import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import _ from 'lodash';
import {Typography, Colors, BorderRadiuses, Spacings, ThemeManager} from '../style';
import {DocsGenerator} from '../helpers';

const FLEX_KEY_PATTERN = /^flex(G|S)?(-\d*)?$/;
const PADDING_KEY_PATTERN = new RegExp(`padding[LTRBHV]?-([0-9]*|${Spacings.getKeysPattern()})`);
const MARGIN_KEY_PATTERN = new RegExp(`margin[LTRBHV]?-([0-9]*|${Spacings.getKeysPattern()})`);
const ALIGNMENT_KEY_PATTERN = /(left|top|right|bottom|center|centerV|centerH|spread)/;

export default function baseComponent(usePure) {
  const parent = usePure ? React.PureComponent : React.Component;
  class BaseComponent extends parent {
    static propTypes = {
      ..._.mapValues(Typography, () => PropTypes.bool),
      ..._.mapValues(Colors, () => PropTypes.bool),
      useNativeDriver: PropTypes.bool,
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
        ...this.buildStyleOutOfModifiers(),
      };
    }

    componentWillReceiveProps(nextProps) {
      this.updateModifiers(this.props, nextProps);
    }

    getThemeProps() {
      const componentName = this.constructor.displayName || this.constructor.name;
      let themeProps;
      if (_.isFunction(ThemeManager.components[componentName])) {
        themeProps = ThemeManager.components[componentName](this.props, this.context);
      } else {
        themeProps = ThemeManager.components[componentName];
      }
      return {...themeProps, ...this.props};
    }

    getSnippet() {
      return DocsGenerator.generateSnippet(DocsGenerator.extractComponentInfo(this));
    }

    updateModifiers(currentProps, nextProps) {
      const allKeys = _.union([..._.keys(currentProps), ..._.keys(nextProps)]);
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

      if (!_.isEmpty(options)) {
        this.setState({
          ...this.buildStyleOutOfModifiers(options, nextProps),
        });
      }
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
      const props = this.getThemeProps();
      const allColorsKeys = _.keys(Colors);
      const colorPropsKeys = _.chain(props).keys().filter(key => _.includes(allColorsKeys, key)).value();
      
      
      const color = _.findLast(colorPropsKeys, colorKey => props[colorKey] === true);
      return Colors[color];
    }

    // todo: refactor this and use BACKGROUND_KEY_PATTERN
    extractBackgroundColorValue(props = this.props) {
      let backgroundColor;
      _.forEach(Colors, (value, key) => {
        if (props[`background-${key}`] === true || props[`bg-${key}`] === true) {
          backgroundColor = value;
        }
      });

      return backgroundColor;
    }

    extractBorderRadiusValue(props = this.props) {
      const borderRadiusPropsKeys = _.chain(props)
        .keys()
        .filter(key => BorderRadiuses.getKeysPattern().test(key))
        .value();
      let borderRadius;
      _.forEach(borderRadiusPropsKeys, (key) => {
        if (props[key] === true) {
          borderRadius = BorderRadiuses[key];
        }
      });

      return borderRadius;
    }

    extractPaddingValues(props = this.props) {
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

      _.forEach(paddingPropsKeys, (key) => {
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

    extractMarginValues(props = this.props) {
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

      _.forEach(marginPropsKeys, (key) => {
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

    extractAlignmentsValues(props = this.props) {
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
        _.forEach(positions, (position) => {
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

    extractFlexStyle(props = this.props) {
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

    buildStyleOutOfModifiers(
      options = {
        backgroundColor: true,
        borderRadius: true,
        paddings: true,
        margins: true,
        alignments: true,
        flex: true,
      },
      props = this.props,
    ) {
      const style = {};

      if (options.backgroundColor) {
        style.backgroundColor = this.extractBackgroundColorValue(props);
      }
      if (options.borderRadius) {
        style.borderRadius = this.extractBorderRadiusValue(props);
      }
      if (options.paddings) {
        style.paddings = this.extractPaddingValues(props);
      }
      if (options.margins) {
        style.margins = this.extractMarginValues(props);
      }
      if (options.alignments) {
        style.alignments = this.extractAlignmentsValues(props);
      }
      if (options.flex) {
        style.flexStyle = this.extractFlexStyle(props);
      }

      return style;
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

    setRef = r => this.view = r;
    getRef = () => this.view;
    measureInWindow = (...args) => this.getRef().measureInWindow(...args);
    measure = (...args) => this.getRef().measure(...args); // TODO: do we need this
  }

  return BaseComponent;
}
