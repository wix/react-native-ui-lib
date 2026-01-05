import React, {PropsWithChildren, useCallback, useEffect, useMemo, useState} from 'react';
import {DimensionValue, Image, LayoutChangeEvent, StyleSheet} from 'react-native';
import Animated, {useAnimatedKeyboard, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import View from '../view';
import {Colors, Shadows, Spacings} from '../../style';
import {asBaseComponent, Constants} from '../../commons/new';

export enum ScreenFooterLayouts {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical'
}

export enum ScreenFooterBackgrounds {
    FADING = 'fading',
    SOLID = 'solid',
    TRANSPARENT = 'transparent'
}

export enum FooterAlignment {
    START = 'start',
    CENTER = 'center',
    END = 'end'
}

export enum HorizontalItemsDistribution {
    STACK = 'stack',
    SPREAD = 'spread'
}

export enum ItemsFit {
    FIT = 'fit',
    STRETCH = 'stretch',
    FIXED = 'fixed'
}

export enum KeyboardBehavior {
    STICKY = 'sticky',
    HOISTED = 'hoisted'
}

export enum ScreenFooterShadow {
    SH10 = 'sh10',
    SH20 = 'sh20',
    SH30 = 'sh30'
}

export interface ScreenFooterProps extends PropsWithChildren<{}> {
    /**
     * The background style of the footer
     */
    backgroundType?: ScreenFooterBackgrounds | `${ScreenFooterBackgrounds}`;
    /**
     * The layout direction of footer items
     */
    layout?: ScreenFooterLayouts | `${ScreenFooterLayouts}`;
    /**
     * Cross-axis alignment:
     * - Vertical layout: controls horizontal position (left/center/right)
     * - Horizontal layout: controls vertical position (top/center/bottom)
     */
    alignment?: FooterAlignment | `${FooterAlignment}`;
    /**
     * Main-axis alignment for horizontal layout only (when distribution is STACK):
     * Controls horizontal position (left/center/right) of the stacked items
     */
    horizontalAlignment?: FooterAlignment | `${FooterAlignment}`;
    /**
     * Distribution of items in horizontal layout (stack/spread)
     */
    horizontalItemsDistribution?: HorizontalItemsDistribution | `${HorizontalItemsDistribution}`;
    /**
     * How items should fit in vertical layout (fit/fixed/stretch)
     */
    itemsFit?: ItemsFit | `${ItemsFit}`;
    /**
     * The footer's keyboard behavior.
     * When STICKY, the footer will stay at the bottom of the screen when keyboard is opened.
     * When HOISTED, the footer will be pushed up when keyboard is opened.
     */
    keyboardBehavior?: KeyboardBehavior | `${KeyboardBehavior}`;
    /**
     * Fixed width for all items (used with ItemsFit.FIXED)
     */
    itemWidth?: DimensionValue;
    /**
     * If true, the footer is visible. If false, it slides down.
     */
    visible?: boolean;
    /**
     * Duration of the show/hide animation in ms.
     * @default 200
     */
    animationDuration?: number;
    /**
     * If true, the footer will respect the safe area (add bottom padding)
     */
    useSafeArea?: boolean;
    /**
     * Shadow preset for solid background (default: SH20)
     * Only applies when backgroundType is 'solid'
     */
    shadow?: ScreenFooterShadow | `${ScreenFooterShadow}`;
    /**
     * If true, hides the top divider for solid background (default: false)
     * Only applies when backgroundType is 'solid'
     */
    hideDivider?: boolean;
}

const ScreenFooter = (props: ScreenFooterProps) => {
  const {
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
  }, [visible, height, animationDuration]);

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

  const renderBackground = useCallback(() => {
    if (isSolid) {
      const shadowStyle = Shadows[shadow]?.top;
      const dividerStyle = hideDivider ? undefined : {borderTopWidth: 1, borderColor: Colors.$outlineDefault};
      return (
        <View
          absF
          bg-$backgroundElevated
          style={[styles.background, shadowStyle, dividerStyle]}
          pointerEvents="none"
        />
      );
    }

    if (isFading) {
      return (
        <View absF style={styles.background} pointerEvents="none">
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
  }, [isSolid, isFading, shadow, hideDivider]);

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
      onLayout={onLayout}
      style={[styles.container, animatedStyle]}
    >
      {renderBackground()}
      <View style={contentContainerStyle}>
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
