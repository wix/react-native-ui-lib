import _isEmpty from "lodash/isEmpty";
import _find from "lodash/find";
import _isEqual from "lodash/isEqual";
import _filter from "lodash/filter";
import _keys from "lodash/keys";
import _union from "lodash/union";
import _includes from "lodash/includes";
import _pickBy from "lodash/pickBy";
import _pick from "lodash/pick";
import React from 'react';
// import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Colors } from "../style";
import * as Modifiers from "./modifiers";
export default function baseComponent(usePure) {
  const parent = usePure ? React.PureComponent : React.Component;
  class BaseComponent extends parent {
    // static propTypes = {
    //   ..._.mapValues(Typography, () => PropTypes.bool),
    //   ..._.mapValues(Colors, () => PropTypes.bool),
    //   useNativeDriver: PropTypes.bool,
    // };

    static extractOwnProps = Modifiers.extractOwnProps;
    constructor(props) {
      super(props);
      if (!this.styles) {
        this.generateStyles();
      }
      this.state = {
        ...this.buildStyleOutOfModifiers()
      };
    }

    // TODO: remove this after migrating all components to use asBaseComponent HOC
    UNSAFE_componentWillReceiveProps(nextProps) {
      this.updateModifiers(this.getThemeProps(), nextProps);
    }

    // TODO: stop using this and remove it
    getSnippet() {
      return null;
    }
    generateStyles() {
      this.styles = StyleSheet.create({});
    }
    getThemeProps = Modifiers.getThemeProps;
    extractAccessibilityProps = Modifiers.extractAccessibilityProps;
    extractTypographyValue() {
      return Modifiers.extractTypographyValue(this.getThemeProps());
    }
    extractColorValue = () => Modifiers.extractColorValue(this.getThemeProps());
    extractAnimationProps() {
      return _pick(this.getThemeProps(), ['animation', 'duration', 'delay', 'direction', 'easing', 'iterationCount', 'transition', 'onAnimationBegin', 'onAnimationEnd', 'useNativeDriver']);
    }
    extractModifierProps() {
      return Modifiers.extractModifierProps(this.getThemeProps());
    }

    // TODO: stop using this and remove it
    extractContainerStyle(props) {
      let containerStyle = {};
      if (props.containerStyle) {
        containerStyle = _pickBy(props.containerStyle, (_value, key) => {
          return key.includes('margin') || _includes(['alignSelf', 'transform'], key);
        });
      }
      return containerStyle;
    }
    updateModifiers(currentProps, nextProps) {
      const ignoredKeys = ['children', 'forwardedRef', 'style', 'testID'];
      const allKeys = _union([..._keys(currentProps), ..._keys(nextProps)]).filter(key => !ignoredKeys.includes(key));
      const changedKeys = _filter(allKeys, key => !_isEqual(currentProps[key], nextProps[key]));
      const options = {};
      if (_find(changedKeys, key => Modifiers.FLEX_KEY_PATTERN.test(key))) {
        options.flex = true;
      }
      if (_find(changedKeys, key => Modifiers.PADDING_KEY_PATTERN.test(key))) {
        options.paddings = true;
      }
      if (_find(changedKeys, key => Modifiers.MARGIN_KEY_PATTERN.test(key))) {
        options.margins = true;
      }
      if (_find(changedKeys, key => Modifiers.ALIGNMENT_KEY_PATTERN.test(key))) {
        options.alignments = true;
      }
      if (_find(changedKeys, key => Colors.getBackgroundKeysPattern().test(key))) {
        options.backgroundColor = true;
      }
      if (!_isEmpty(options)) {
        this.setState({
          ...this.buildStyleOutOfModifiers(options, nextProps)
        });
      }
    }
    buildStyleOutOfModifiers(options = {
      backgroundColor: true,
      borderRadius: true,
      paddings: true,
      margins: true,
      alignments: true,
      flex: true
    }, props = this.getThemeProps()) {
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

    // TODO: stop using this and remove it
    // extractTextProps(props) {
    //   return _.pick(props, [..._.keys(Typography), ..._.keys(Colors), 'color']);
    // }

    // React Native Methods
    setRef = r => this.view = r;
    getRef = () => this.view;
    measureInWindow = (...args) => this.getRef().measureInWindow(...args);
    measure = (...args) => this.getRef().measure(...args); // TODO: do we need this
  }
  return BaseComponent;
}