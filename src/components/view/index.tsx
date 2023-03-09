import {useModifiers, useThemeProps} from 'hooks';
import React, {useEffect, useMemo, useState} from 'react';
import {View as RNView, SafeAreaView, Animated, ViewProps as RNViewProps, StyleProp, ViewStyle} from 'react-native';
import {Constants, ContainerModifiers} from '../../commons/new';

export interface ViewProps extends Omit<RNViewProps, 'style'>, ThemeComponent, ContainerModifiers {
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

const modifiersOptions = {
  backgroundColor: true,
  borderRadius: true,
  paddings: true,
  margins: true,
  alignments: true,
  flex: true,
  position: true
};

/**
 * @description: An enhanced View component
 * @extends: View
 * @extendsLink: https://reactnative.dev/docs/view
 * @modifiers: margins, paddings, alignments, background, borderRadius
 */
function View(props: ViewProps, ref: any) {
  const themeProps = useThemeProps(props, 'View');
  const {
    renderDelay,
    style,
    // (!) extract left, top, bottom... props to avoid passing them on Android
    /* eslint-disable */
    left,
    top,
    right,
    bottom,
    flex: propsFlex,
    /* eslint-enable */
    inaccessible,
    useSafeArea,
    animated,
    reanimated,
    children,
    backgroundColor: backgroundColorProps,
    ...others
  } = themeProps;
  const {
    backgroundColor: backgroundColorModifiers,
    borderRadius,
    paddings,
    margins,
    alignments,
    flexStyle,
    positionStyle
  } = useModifiers(themeProps, modifiersOptions);
  const [ready, setReady] = useState(!renderDelay);

  useEffect(() => {
    if (renderDelay) {
      setTimeout(() => {
        setReady(true);
      }, renderDelay);
    }
  }, []);

  const ViewContainer = useMemo(() => {
    const container = useSafeArea && Constants.isIOS ? SafeAreaView : RNView;

    if (reanimated) {
      const {default: Reanimated}: typeof import('react-native-reanimated') = require('react-native-reanimated');
      return Reanimated.createAnimatedComponent(container);
    } else if (animated) {
      return Animated.createAnimatedComponent(container);
    }

    return container;
  }, [useSafeArea, animated, reanimated]);

  const _style = useMemo(() => {
    const backgroundColor = backgroundColorProps || backgroundColorModifiers;
    return [
      backgroundColor && {
        backgroundColor
      },
      borderRadius && {
        borderRadius
      },
      flexStyle,
      positionStyle,
      paddings,
      margins,
      alignments,
      style
    ];
  }, [
    backgroundColorProps,
    backgroundColorModifiers,
    borderRadius,
    flexStyle,
    positionStyle,
    paddings,
    margins,
    alignments,
    style
  ]);

  if (!ready) {
    return null;
  }

  return (
    <ViewContainer
      //@ts-expect-error
      accessibilityElementsHidden={inaccessible}
      importantForAccessibility={inaccessible ? 'no-hide-descendants' : undefined}
      {...others}
      style={_style}
      ref={ref}
    >
      {children}
    </ViewContainer>
  );
}

export default React.forwardRef<RNView, ViewProps>(View);
