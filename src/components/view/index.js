import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {View as RNView, ViewPropTypes, SafeAreaView} from 'react-native';
import {BaseComponent, asBaseComponent, forwardRef} from '../../commons';
import * as Constants from '../../helpers/Constants';

/**
 * @description: Wrapper component for React Native View component
 * @extends: View
 * @extendslink: https://facebook.github.io/react-native/docs/view.html
 * @modifiers: margins, paddings, alignments, background, borderRadius
 */
class View extends PureComponent {
  static displayName = 'View';

  static propTypes = {
    ...ViewPropTypes,
    // ...BaseComponent.propTypes,
    /**
     * If true, will render as SafeAreaView
     */
    useSafeArea: PropTypes.bool,
  };

  // TODO: do we need this?
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps); // eslint-disable-line
  }

  render() {
    const {
      modifiers,
      useSafeArea,
      style,
      left,
      top,
      right,
      bottom,
      flex: propsFlex,
      forwardedRef,
      ...others
    } = this.props;
    const {backgroundColor, borderRadius, paddings, margins, alignments, flexStyle} = modifiers;
    const Element = useSafeArea && Constants.isIOS ? SafeAreaView : RNView;

    return (
      <Element
        {...others}
        style={[
          backgroundColor && {backgroundColor},
          borderRadius && {borderRadius},
          flexStyle,
          paddings,
          margins,
          alignments,
          style,
        ]}
        ref={forwardedRef}
      >
        {this.props.children}
      </Element>
    );
  }
}

export default asBaseComponent(forwardRef(View));
