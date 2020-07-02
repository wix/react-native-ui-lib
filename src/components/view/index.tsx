import React, {PureComponent} from 'react';
import {View as RNView, SafeAreaView, Animated, ViewProps} from 'react-native';
import {asBaseComponent, forwardRef, BaseComponentInjectedProps, ForwardRefInjectedProps, ContainerModifiers} from '../../commons/new';
import Constants from '../../helpers/Constants';

export interface ViewPropTypes extends ViewProps, ContainerModifiers {
  /**
   * If true, will render as SafeAreaView
   */
  useSafeArea?: boolean;
  /**
   * Use Animate.View as a container
   */
  animated?: boolean;
  /**
   * Turn off accessibility for this view and its nested children
   */
  inaccessible?: boolean;
  /**
   * TODO: probobly isn't needed
   */
  width?: string | number;
  /**
   * TODO: probobly isn't needed
   */
  height?: string | number;
  /**
   * Experimental: Pass time in ms to delay render
   */
  renderDelay?: number;
}
type PropsTypes = BaseComponentInjectedProps & ForwardRefInjectedProps & ViewPropTypes;

interface ViewState {
  ready: boolean;
}

/**
 * @description: An enhanced View component
 * @extends: View
 * @extendslink: https://facebook.github.io/react-native/docs/view.html
 * @modifiers: margins, paddings, alignments, background, borderRadius
 */
class View extends PureComponent<PropsTypes, ViewState> {
  static displayName = 'View';
  private Container: React.ClassType<any, any, any>;

  constructor(props: PropsTypes) {
    super(props);

    this.Container = props.useSafeArea && Constants.isIOS ? SafeAreaView : RNView;
    if (props.animated) {
      this.Container = Animated.createAnimatedComponent(this.Container);
    }

    this.state = {
      ready: !props.renderDelay
    };
  }

  componentDidMount() {
    const {renderDelay} = this.props;
    if (renderDelay) {
      setTimeout(() => {
        this.setState({ready: true});
      }, renderDelay);
    }
  }

  // TODO: do we need this?
  setNativeProps(nativeProps: any) {
    //@ts-ignore
    this._root.setNativeProps(nativeProps); // eslint-disable-line
  }

  render() {
    if (!this.state.ready) {
      return null;
    }

    // (!) extract left, top, bottom... props to avoid passing them on Android
    // eslint-disable-next-line
    const {
      modifiers,
      style,
      left,
      top,
      right,
      bottom,
      flex: propsFlex,
      forwardedRef,
      inaccessible,
      ...others
    } = this.props;
    const {backgroundColor, borderRadius, paddings, margins, alignments, flexStyle, positionStyle} = modifiers;
    const Element = this.Container;
    return (
      <Element
        accessibilityElementsHidden={inaccessible}
        importantForAccessibility={inaccessible ? 'no-hide-descendants' : undefined}
        {...others}
        style={[
          backgroundColor && {backgroundColor},
          borderRadius && {borderRadius},
          flexStyle,
          positionStyle,
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

export default asBaseComponent<ViewPropTypes>(forwardRef(View));
