import {useModifiers, useThemeProps} from 'hooks';
import React, {useEffect, useMemo, useState} from 'react';
import {View as RNView, SafeAreaView, Animated, ViewProps as RNViewProps, StyleProp, ViewStyle} from 'react-native';
import type {AnimateProps as RNReanimatedProps} from 'react-native-reanimated';
import {Constants, ContainerModifiers} from '../../commons/new';
import type {RecorderProps} from '../../typings/recorderTypes';

/**
 * Extra props when using reanimated (only non experimental props)
 */
type ReanimatedProps = Partial<Pick<RNReanimatedProps<object>, 'entering' | 'exiting' | 'layout'>>;

export interface ViewProps extends Omit<RNViewProps, 'style'>, ReanimatedProps, ContainerModifiers, RecorderProps {
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
   * TODO: probably isn't needed
   */
  width?: string | number;
  /**
   * TODO: probably isn't needed
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
  position: true,
  gap: true
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
    recorderTag,
    ...others
  } = themeProps;
  const {
    backgroundColor: backgroundColorModifiers,
    borderRadius,
    paddings,
    margins,
    alignments,
    flexStyle,
    positionStyle,
    gap
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
      gap && {
        gap
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
    gap,
    style
  ]);

  if (!ready) {
    return null;
  }

  return (
    //@ts-expect-error
    <ViewContainer
      accessibilityElementsHidden={inaccessible}
      importantForAccessibility={inaccessible ? 'no-hide-descendants' : undefined}
      fsTagName={recorderTag}
      {...others}
      style={_style}
      ref={ref}
    >
      {children}
    </ViewContainer>
  );
}

export default React.forwardRef<RNView, ViewProps>(View);
