import React from 'react';
import {View as RNView, StyleSheet, ViewPropTypes} from 'react-native';
import {BaseComponent} from '../../commons';

/**
 * @description: Wrapper component for React Native View component
 * @extends: View
 * @modifiers: margins, paddings, alignments, background, borderRadius
 */
export default class View extends BaseComponent {
  static displayName = 'View';

  static propTypes = {
    ...ViewPropTypes,
    ...BaseComponent.propTypes,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps); // eslint-disable-line
  }

  render() {
    const {backgroundColor, borderRadius, paddings, margins, alignments, flexStyle} = this.state;
    const {style, left, top, right, bottom, flex: propsFlex, ...others} = this.props;

    return (
      <RNView
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
        ref={r => (this.view = r)}
      >
        {this.props.children}
      </RNView>
    );
  }

  measure(...args) {
    this.view.measure(...args);
  }

  measureInWindow(...args) {
    this.view.measureInWindow(...args);
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {},
  });
}
