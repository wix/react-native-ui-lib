import _pt from "prop-types";
import React, { PureComponent } from 'react';
import { View as RNView, SafeAreaView, Animated } from 'react-native';
import Reanimated from 'react-native-reanimated';
import { asBaseComponent, forwardRef } from "../../commons/new";
import { Constants } from "../../helpers";

/**
 * @description: An enhanced View component
 * @extends: View
 * @extendsLink: https://facebook.github.io/react-native/docs/view.html
 * @modifiers: margins, paddings, alignments, background, borderRadius
 */
class View extends PureComponent {
  static propTypes = {
    /**
       * If true, will render as SafeAreaView
       */
    useSafeArea: _pt.bool,

    /**
       * Use Animate.View as a container
       */
    animated: _pt.bool,

    /**
        * Use Animate.View (from react-native-reanimated) as a container
       */
    reanimated: _pt.bool,

    /**
       * Turn off accessibility for this view and its nested children
       */
    inaccessible: _pt.bool,

    /**
       * TODO: probobly isn't needed
       */
    width: _pt.oneOfType([_pt.string, _pt.number]),

    /**
       * TODO: probobly isn't needed
       */
    height: _pt.oneOfType([_pt.string, _pt.number]),

    /**
       * Experimental: Pass time in ms to delay render
       */
    renderDelay: _pt.number,

    /**
       * Set background color
       */
    backgroundColor: _pt.string
  };
  static displayName = 'View';

  constructor(props) {
    super(props);
    this.Container = props.useSafeArea && Constants.isIOS ? SafeAreaView : RNView;

    if (props.reanimated) {
      this.Container = Reanimated.createAnimatedComponent(this.Container);
    } else if (props.animated) {
      this.Container = Animated.createAnimatedComponent(this.Container);
    }

    this.state = {
      ready: !props.renderDelay
    };
  }

  componentDidMount() {
    const {
      renderDelay
    } = this.props;

    if (renderDelay) {
      setTimeout(() => {
        this.setState({
          ready: true
        });
      }, renderDelay);
    }
  } // TODO: do we need this?


  setNativeProps(nativeProps) {
    //@ts-ignore
    this._root.setNativeProps(nativeProps); // eslint-disable-line

  }

  render() {
    if (!this.state.ready) {
      return null;
    } // (!) extract left, top, bottom... props to avoid passing them on Android
    // eslint-disable-next-line


    const {
      modifiers,
      style,

      /* eslint-disable */
      left,
      top,
      right,
      bottom,
      flex: propsFlex,

      /* eslint-enable */
      forwardedRef,
      inaccessible,
      ...others
    } = this.props;
    const {
      backgroundColor,
      borderRadius,
      paddings,
      margins,
      alignments,
      flexStyle,
      positionStyle
    } = modifiers;
    const Element = this.Container;
    return <Element accessibilityElementsHidden={inaccessible} importantForAccessibility={inaccessible ? 'no-hide-descendants' : undefined} {...others} style={[backgroundColor && {
      backgroundColor
    }, borderRadius && {
      borderRadius
    }, flexStyle, positionStyle, paddings, margins, alignments, style]} ref={forwardedRef}>
        {this.props.children}
      </Element>;
  }

}

export default asBaseComponent(forwardRef(View));