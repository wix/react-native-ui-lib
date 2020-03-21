import React, {PureComponent} from 'react';
import {View as RNView, SafeAreaView, Animated, ViewProps} from 'react-native';
import asBaseComponent, {BaseComponentInjectedProps} from '../../commons/asBaseComponent';
import forwardRef, {ForwardRefInjectedProps} from '../../commons/forwardRef';
import Constants from '../../helpers/Constants';
import {ContainerModifiers} from '../../../typings/modifiers';
/**
 * @description: Wrapper component for React Native View component
 * @extends: View
 * @extendslink: https://facebook.github.io/react-native/docs/view.html
 * @modifiers: margins, paddings, alignments, background, borderRadius
 */

interface ViewPropTypes extends ViewProps {
  /**
   * If true, will render as SafeAreaView
   */
  useSafeArea?: boolean;
  animated?: boolean;
  inaccessible?: boolean;
}
type PropsTypes = BaseComponentInjectedProps & ViewPropTypes & ForwardRefInjectedProps & ContainerModifiers;
class View extends PureComponent<PropsTypes> {
  static displayName = 'View';
  private Container: React.ClassType<any, any, any>;
  constructor(props: PropsTypes) {
    super(props);

    this.Container = props.useSafeArea && Constants.isIOS ? SafeAreaView : RNView;
    if (props.animated) {
      this.Container = Animated.createAnimatedComponent(this.Container);
    }
  }

  // TODO: do we need this?
  setNativeProps(nativeProps: any) {
    //@ts-ignore
    this._root.setNativeProps(nativeProps); // eslint-disable-line
  }

  render() {
    // (!) extract left, top, bottom... props to avoid passing them on Android
    // eslint-disable-next-line
    const {modifiers, style, left, top, right, bottom, flex: propsFlex, forwardedRef, inaccessible, ...others} = this.props;
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

export default asBaseComponent(forwardRef(View));