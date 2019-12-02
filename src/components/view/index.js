import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {View as RNView, ViewPropTypes, SafeAreaView, Animated} from 'react-native';
import {asBaseComponent, forwardRef} from '../../commons';
import {Constants} from '../../helpers';

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
    /**
     * Use Animate.View as a container
     */
    animated: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.Container = props.useSafeArea && Constants.isIOS ? SafeAreaView : RNView;
    if (props.animated) {
      this.Container = Animated.createAnimatedComponent(this.Container);
    }
  }

  // TODO: do we need this?
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps); // eslint-disable-line
  }

  render() {
    // (!) extract left, top, bottom... props to avoid passing them on Android
    // eslint-disable-next-line
    const {modifiers, style, left, top, right, bottom, flex: propsFlex, forwardedRef, ...others} = this.props;
    const {backgroundColor, borderRadius, paddings, margins, alignments, flexStyle} = modifiers;
    const Element = this.Container;

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
          style
        ]}
        ref={forwardedRef}
      >
        {this.props.children}
      </Element>
    );
  }
}

export default asBaseComponent(forwardRef(View));
