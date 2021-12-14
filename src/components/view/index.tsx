import React, {PureComponent} from 'react';
import {View as RNView, SafeAreaView, Animated, ViewProps as RNViewProps, StyleProp, ViewStyle} from 'react-native';
import Reanimated from 'react-native-reanimated';
import {
  Constants,
  asBaseComponent,
  forwardRef,
  BaseComponentInjectedProps,
  ForwardRefInjectedProps,
  ContainerModifiers
} from '../../commons/new';

export interface ViewProps extends Omit<RNViewProps, 'style'>, ContainerModifiers {
  /**
   * If true, will render as SafeAreaView
   */
  useSafeArea?: boolean;
  /**
   * Use Animate.View as a container
   */
  animated?: boolean;
  /**
    * Use Animate.View (from react-native-reanimated) as a container
   */
  reanimated?: boolean;
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
  /**
   * Set background color
   */
  backgroundColor?: string;
  style?: StyleProp<ViewStyle | Animated.AnimatedProps<ViewStyle>>;
}

type PropsTypes = BaseComponentInjectedProps & ForwardRefInjectedProps & ViewProps;

interface ViewState {
  ready: boolean;
}

/**
 * @description: An enhanced View component
 * @extends: View
 * @extendsLink: https://reactnative.dev/docs/view
 * @modifiers: margins, paddings, alignments, background, borderRadius
 */
class View extends PureComponent<PropsTypes, ViewState> {
  static displayName = 'View';
  private Container: React.ClassType<any, any, any>;

  constructor(props: PropsTypes) {
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

export default asBaseComponent<ViewProps>(forwardRef(View));
