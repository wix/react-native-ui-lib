import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {LayoutChangeEvent, StyleSheet} from 'react-native';
import {Image} from 'react-native-ui-lib';
import Animated, {useAnimatedKeyboard, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import View from '../view';
import {Colors, Shadows, Spacings} from '../../style';
import {asBaseComponent, Constants} from '../../commons/new';
import {
  ScreenFooterProps,
  ScreenFooterLayouts,
  ScreenFooterBackgrounds,
  FooterAlignment,
  HorizontalItemsDistribution,
  ItemsFit,
  KeyboardBehavior,
  ScreenFooterShadow
} from './types';

export {
  ScreenFooterProps,
  ScreenFooterLayouts,
  ScreenFooterBackgrounds,
  FooterAlignment,
  HorizontalItemsDistribution,
  ItemsFit,
  KeyboardBehavior,
  ScreenFooterShadow
};

const ScreenFooter = (props: ScreenFooterProps) => {
  const {
    testID,
    layout,
    alignment,
    horizontalAlignment,
    backgroundType,
    children,
    keyboardBehavior = KeyboardBehavior.STICKY,
    itemsFit,
    itemWidth,
    horizontalItemsDistribution: distribution,
    visible = true,
    animationDuration = 200,
    useSafeArea,
    shadow = ScreenFooterShadow.SH20,
    hideDivider = false
  } = props;

  const keyboard = useAnimatedKeyboard();
  const [height, setHeight] = useState(0);
  const visibilityTranslateY = useSharedValue(0);

  // Update visibility translation when visible or height changes
  useEffect(() => {
    visibilityTranslateY.value = withTiming(visible ? 0 : height, {duration: animationDuration});
  }, [visible, height, animationDuration, visibilityTranslateY]);

  // Combine keyboard hoisting + visibility into a single animated style
  const animatedStyle = useAnimatedStyle(() => {
    const keyboardTranslateY = keyboardBehavior === KeyboardBehavior.HOISTED ? -keyboard.height.value : 0;
    return {
      transform: [{translateY: keyboardTranslateY + visibilityTranslateY.value}]
    };
  });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setHeight(event.nativeEvent.layout.height);
  }, []);

  const isSolid = backgroundType === ScreenFooterBackgrounds.SOLID;
  const isFading = backgroundType === ScreenFooterBackgrounds.FADING;
  const isHorizontal = layout === ScreenFooterLayouts.HORIZONTAL;

  const childrenCount = React.Children.count(children);

  const justifyContent = useMemo(() => {
    if (isHorizontal) {
      // When SPREAD with multiple items, distribute with space-between
      // When SPREAD with single item, center it (space-between has no effect)
      if (distribution === HorizontalItemsDistribution.SPREAD) {
        return childrenCount === 1 ? 'center' as const : 'space-between' as const;
      }
      // When STACK, horizontalAlignment controls left/center/right positioning
      switch (horizontalAlignment) {
        case FooterAlignment.START: return 'flex-start' as const;
        case FooterAlignment.END: return 'flex-end' as const;
        default: return 'center' as const;
      }
    }
    return 'flex-start' as const;
  }, [isHorizontal, distribution, horizontalAlignment, childrenCount]);

  const alignItems = useMemo(() => {
    if (layout === ScreenFooterLayouts.VERTICAL) {
      if (itemsFit === ItemsFit.STRETCH) {
        return 'stretch' as const;
      }
    }

    switch (alignment) {
      case FooterAlignment.START: return 'flex-start' as const;
      case FooterAlignment.END: return 'flex-end' as const;
      default: return 'center' as const;
    }
  }, [layout, itemsFit, alignment]);

  const {bottom: safeAreaBottom} = Constants.getSafeAreaInsets();

  const contentContainerStyle = useMemo(() => {
    const style: any[] = [
      styles.contentContainer,
      layout === ScreenFooterLayouts.HORIZONTAL ? styles.horizontalContainer : styles.verticalContainer,
      {alignItems, justifyContent}
    ];

    if (useSafeArea && Constants.isIphoneX) {
      style.push({paddingBottom: safeAreaBottom});
    }

    return style;
  }, [layout, alignItems, justifyContent, useSafeArea, safeAreaBottom]);

  const solidBackgroundStyle = useMemo(() => {
    if (!isSolid) {
      return undefined;
    }
    const shadowStyle = Shadows[shadow]?.top;
    const dividerStyle = hideDivider ? undefined : {borderTopWidth: 1, borderColor: Colors.$outlineDefault};
    return [shadowStyle, dividerStyle];
  }, [isSolid, shadow, hideDivider]);

  const renderBackground = useCallback(() => {
    if (isSolid) {
      return (
        <View
          testID={testID ? `${testID}.solidBackground` : undefined}
          absF
          bg-$backgroundElevated
          style={solidBackgroundStyle}
          pointerEvents="none"
        />
      );
    }

    if (isFading) {
      return (
        <View testID={testID ? `${testID}.fadingBackground` : undefined} absF pointerEvents="none">
          <Image
            source={require('./gradient.png')}
            style={styles.background}
            resizeMode="stretch"
            tintColor={Colors.$backgroundDefault}
          />
        </View>
      );
    }

    return null;
  }, [testID, isSolid, isFading, solidBackgroundStyle]);

  const renderChild = useCallback((child: React.ReactNode, index: number) => {
    if (itemsFit === ItemsFit.FIXED && itemWidth) {
      const fixedStyle = isHorizontal
        ? {width: itemWidth, flexShrink: 1, overflow: 'hidden' as const}
        : {width: itemWidth, maxWidth: '100%' as const};
      return (
        <View key={index} style={fixedStyle}>
          {child}
        </View>
      );
    }

    if (isHorizontal && React.isValidElement(child)) {
      const flexStyle = itemsFit === ItemsFit.STRETCH ? {flex: 1} : {flexShrink: 1};
      return React.cloneElement<any>(child, {
        key: index,
        style: [child.props.style, flexStyle]
      });
    }

    return child;
  }, [itemsFit, itemWidth, isHorizontal]);

  const childrenArray = React.Children.toArray(children).slice(0, 3).map(renderChild);

  return (
    <Animated.View
      testID={testID}
      onLayout={onLayout}
      style={[styles.container, animatedStyle]}
    >
      {renderBackground()}
      <View testID={testID ? `${testID}.content` : undefined} style={contentContainerStyle}>
        {childrenArray}
      </View>
    </Animated.View>
  );
};

ScreenFooter.displayName = 'ScreenFooter';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  contentContainer: {
    paddingTop: Spacings.s4,
    paddingHorizontal: Spacings.s5,
    paddingBottom: Spacings.s5
  },
  horizontalContainer: {
    flexDirection: 'row',
    gap: Spacings.s5
  },
  verticalContainer: {
    flexDirection: 'column',
    gap: Spacings.s3
  },
  background: {
    width: '100%',
    height: '100%'
  }
});

export default asBaseComponent<ScreenFooterProps, typeof ScreenFooter>(ScreenFooter);
