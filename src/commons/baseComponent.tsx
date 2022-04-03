import React, {ComponentType} from 'react';
// import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import _ from 'lodash';
import {Colors} from '../style';
import * as Modifiers from './modifiers';

export default function baseComponent(usePure: boolean): ComponentType {
  const parent = usePure ? React.PureComponent : React.Component;
  class BaseComponent extends parent {
    // static propTypes = {
    //   ..._.mapValues(Typography, () => PropTypes.bool),
    //   ..._.mapValues(Colors, () => PropTypes.bool),
    //   useNativeDriver: PropTypes.bool,
    // };

    styles: any;
    view: any;

    static extractOwnProps = Modifiers.extractOwnProps;

    constructor(props: any) {
      super(props);
      if (!this.styles) {
        this.generateStyles();
      }

      this.state = {
        ...this.buildStyleOutOfModifiers()
      };
    }

    // TODO: remove this after migrating all components to use asBaseComponent HOC
    UNSAFE_componentWillReceiveProps(nextProps: any) {
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
      return _.pick(this.getThemeProps(), [
        'animation',
        'duration',
        'delay',
        'direction',
        'easing',
        'iterationCount',
        'transition',
        'onAnimationBegin',
        'onAnimationEnd',
        'useNativeDriver'
      ]);
    }

    extractModifierProps() {
      return Modifiers.extractModifierProps(this.getThemeProps());
    }

    // TODO: stop using this and remove it
    extractContainerStyle(props: any) {
      let containerStyle = {};
      if (props.containerStyle) {
        containerStyle = _.pickBy(props.containerStyle, (_value, key) => {
          return key.includes('margin') || _.includes(['alignSelf', 'transform'], key);
        });
      }

      return containerStyle;
    }

    updateModifiers(currentProps: any, nextProps: any) {
      const ignoredKeys = ['children', 'forwardedRef', 'style', 'testID'];
      const allKeys = _.union([..._.keys(currentProps), ..._.keys(nextProps)]).filter(key => !ignoredKeys.includes(key));
      const changedKeys = _.filter(allKeys, key => !_.isEqual(currentProps[key], nextProps[key]));

      const options: any = {};
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
    },
    props = this.getThemeProps()) {
      const style: any = {};

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
    setRef = (r: any) => (this.view = r);
    getRef = () => this.view;
    measureInWindow = (...args: any) => this.getRef().measureInWindow(...args);
    measure = (...args: any) => this.getRef().measure(...args); // TODO: do we need this
  }

  return BaseComponent;
}
