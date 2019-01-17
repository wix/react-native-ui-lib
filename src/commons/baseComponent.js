import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import _ from 'lodash';
import {Typography, Colors, ThemeManager} from '../style';
import {DocsGenerator} from '../helpers';
import * as Modifiers from './modifiers';

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
      if (_.find(changedKeys, key => Modifiers.FLEX_KEY_PATTERN.test(key))) {
        options.flex = true;
      }

      if (_.find(changedKeys, key => Modifiers.PADDING_KEY_PATTERN.test(key))) {
        options.paddings = true;
      }

      if (_.find(changedKeys, key => Modifiers.MARGIN_KEY_PATTERN.test(key))) {
        options.margins = true;
      }

      if (_.find(changedKeys, key => Modifiers.ALIGNMENT_KEY_PATTERN.test(key))) {
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
      return Modifiers.extractTypographyValue(this.props);
    }

    extractColorValue() {
      const props = this.getThemeProps();
      const allColorsKeys = _.keys(Colors);
      const colorPropsKeys = _.chain(props)
        .keys()
        .filter(key => _.includes(allColorsKeys, key))
        .value();

      const color = _.findLast(colorPropsKeys, colorKey => props[colorKey] === true);
      return Colors[color];
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
        style.backgroundColor = Modifiers.extractBackgroundColorValue(props);
      }
      if (options.borderRadius) {
        style.borderRadius = Modifiers.extractBorderRadiusValue(props);
      }
      if (options.paddings) {
        style.paddings = Modifiers.extractPaddingValues(props);
      }
      if (options.margins) {
        style.margins = Modifiers.extractMarginValues(props);
      }
      if (options.alignments) {
        style.alignments = Modifiers.extractAlignmentsValues(props);
      }
      if (options.flex) {
        style.flexStyle = Modifiers.extractFlexStyle(props);
      }

      return style;
    }

    extractTextProps(props) {
      return _.pick(props, [..._.keys(Typography), ..._.keys(Colors), 'color']);
    }

    extractModifierProps() {
      return Modifiers.extractModifierProps(this.props);
    }

    setRef = r => (this.view = r);
    getRef = () => this.view;
    measureInWindow = (...args) => this.getRef().measureInWindow(...args);
    measure = (...args) => this.getRef().measure(...args); // TODO: do we need this
  }

  return BaseComponent;
}
