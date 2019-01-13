import PropTypes from 'prop-types';
import React from 'react';
import {View as RNView, StyleSheet, ViewPropTypes, SafeAreaView} from 'react-native';
import {BaseComponent} from '../../commons';
import * as Constants from '../../helpers/Constants';

/**
 * @description: Wrapper component for React Native View component
 * @extends: View
 * @extendslink: https://facebook.github.io/react-native/docs/view.html
 * @modifiers: margins, paddings, alignments, background, borderRadius
 */
export default class View extends BaseComponent {
  static displayName = 'View';

  static propTypes = {
    ...ViewPropTypes,
    ...BaseComponent.propTypes,
    /**
     * if true, will render as SafeAreaView
     */
    useSafeArea: PropTypes.bool,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  // TODO: do we need this?
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps); // eslint-disable-line
  }

  renderView() {
    const {backgroundColor, borderRadius, paddings, margins, alignments, flexStyle} = this.state;
    const {useSafeArea, style, left, top, right, bottom, flex: propsFlex, ...others} = this.getThemeProps();
    const Element = (useSafeArea && Constants.isIOS) ? SafeAreaView : RNView;

    return (
      <Element
        {...others}
        style={[
          this.styles.container,
          backgroundColor && {backgroundColor},
          borderRadius && {borderRadius},
          flexStyle,
          paddings,
          margins,
          alignments,
          style,
        ]}
        ref={this.setRef}
      >
        {this.props.children}
      </Element>
    );
  }

  render() {
    return this.renderView();
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {},
  });
}
