import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {LayoutChangeEvent, StyleSheet, ViewStyle} from 'react-native';
import {Image} from 'react-native-ui-lib';
import Animated, {useAnimatedKeyboard, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {Keyboard} from 'uilib-native';
import {SafeAreaContextPackage} from '../../optionalDependencies';
import View from '../view';
import Assets from '../../assets';
import {Colors, Shadows, Spacings} from '../../style';
import {asBaseComponent, Constants} from '../../commons/new';
import {useKeyboardHeight} from '../../hooks';
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

  // Animated style for STICKY behavior (counters Android system offset + visibility)
  const stickyAnimatedStyle = useAnimatedStyle(() => {
    const counterSystemOffset = Constants.isAndroid ? keyboard.height.value : 0;
    return {
      transform: [{translateY: counterSystemOffset + visibilityTranslateY.value}]
    };
  });

  // Animated style for HOISTED behavior (visibility only, keyboard handled by KeyboardAccessoryView)
  const hoistedAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: visibilityTranslateY.value}]
    };
  });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setHeight(event.nativeEvent.layout.height);
  }, []);

  const isSolid = backgroundType === ScreenFooterBackgrounds.SOLID;
  const isFading = backgroundType === ScreenFooterBackgrounds.FADING;
  const isHorizontal = layout === ScreenFooterLayouts.HORIZONTAL;

  const childrenCount = React.Children.count(children);

  const justifyContent: ViewStyle['justifyContent'] = useMemo(() => {
    if (isHorizontal) {
      if (distribution === HorizontalItemsDistribution.SPREAD) {
        return childrenCount === 1 ? 'center' : 'space-between';
      }
      switch (horizontalAlignment) {
        case FooterAlignment.START: return 'flex-start';
        case FooterAlignment.END: return 'flex-end';
        default: return 'center';
      }
    }
    return 'flex-start';
  }, [isHorizontal, distribution, horizontalAlignment, childrenCount]);

  const alignItems = useMemo(() => {
    if (layout === ScreenFooterLayouts.VERTICAL) {
      if (itemsFit === ItemsFit.STRETCH) {
        return 'stretch';
      }
    }

    switch (alignment) {
      case FooterAlignment.START: return 'flex-start';
      case FooterAlignment.END: return 'flex-end';
      default: return 'center';
    }
  }, [layout, itemsFit, alignment]);

  const useSafeAreaInsets = SafeAreaContextPackage?.useSafeAreaInsets ?? (() => Constants.getSafeAreaInsets());
  const insets = useSafeAreaInsets();

  const keyboardHeight = useKeyboardHeight();
  const isKeyboardVisible = keyboardHeight > 0;

  const contentContainerStyle = useMemo(() => {
    const style: any[] = [
      styles.contentContainer,
      layout === ScreenFooterLayouts.HORIZONTAL ? styles.horizontalContainer : styles.verticalContainer,
      {alignItems, justifyContent}
    ];

    if (!isKeyboardVisible) {
      style.push({paddingBottom: insets.bottom});
    }
    
    if (isSolid) {
      const shadowStyle = Shadows[shadow]?.top;
      const backgroundElevation = shadowStyle?.elevation || 0;
      // When the background has a shadow (elevation on Android), it might render on top of the content
      style.push({elevation: backgroundElevation + 1});
    }

    return style;
  }, [layout, alignItems, justifyContent, insets.bottom, isSolid, shadow, isKeyboardVisible]);

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
            source={Assets.internal.images.bottomGradient}
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
      const fixedStyle: ViewStyle = isHorizontal
        ? {width: itemWidth, flexShrink: 1, overflow: 'hidden', flexDirection: 'row', justifyContent: 'center'}
        : {width: itemWidth, maxWidth: '100%'};
      return (
        <View key={index} style={fixedStyle}>
          {child}
        </View>
      );
    }

    if (isHorizontal && React.isValidElement(child) && itemsFit === ItemsFit.STRETCH) {
      return (
        <View flex row centerH key={index}>
          {child}
        </View>
      );
    }
    return child;
  }, [itemsFit, itemWidth, isHorizontal]);

  const childrenArray = React.Children.toArray(children).slice(0, 3).map(renderChild);

  const renderFooterContent = useCallback(() => {
    return (
      <>
        {renderBackground()}
        <View testID={testID ? `${testID}.content` : undefined} style={contentContainerStyle}>
          {childrenArray}
        </View>
      </>
    );
  }, [renderBackground, testID, contentContainerStyle, childrenArray]);

  if (keyboardBehavior === KeyboardBehavior.HOISTED) {
    return (
      <Animated.View
        style={[styles.container, hoistedAnimatedStyle]}
        pointerEvents={visible ? 'box-none' : 'none'}
      >
        <Keyboard.KeyboardAccessoryView
          renderContent={renderFooterContent}
          kbInputRef={undefined}
          scrollBehavior={Keyboard.KeyboardAccessoryView.scrollBehaviors.FIXED_OFFSET}
          useSafeArea={false}
          manageScrollView={false}
          revealKeyboardInteractive
          onHeightChanged={setHeight}
        />
      </Animated.View>
    );
  }

  return (
    <Animated.View
      testID={testID}
      onLayout={onLayout}
      style={[styles.container, stickyAnimatedStyle]}
    >
      {renderFooterContent()}
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
