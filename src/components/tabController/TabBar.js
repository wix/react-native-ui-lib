import _isUndefined from "lodash/isUndefined";
import _map from "lodash/map";
import React, { useMemo, useContext, useState, useRef } from 'react';
import { StyleSheet, Platform } from 'react-native';
import Reanimated, { runOnJS, useAnimatedReaction, useAnimatedStyle, interpolate } from 'react-native-reanimated';
import TabBarContext from "./TabBarContext";
import TabBarItem from "./TabBarItem";
import { Constants, asBaseComponent, forwardRef } from "../../commons/new";
import View from "../view";
import { Colors, Spacings, Typography } from "../../style";
import FadedScrollView from "../fadedScrollView";
import useScrollToItem from "./useScrollToItem";
import { useDidUpdate } from "../../hooks";
const DEFAULT_HEIGHT = 48;
const DEFAULT_LABEL_STYLE = {
  ...Typography.text80M,
  letterSpacing: 0
};
const DEFAULT_SELECTED_LABEL_STYLE = {
  ...Typography.text80M,
  letterSpacing: 0
};
const DEFAULT_FADER_PROPS = {
  size: 76,
  tintColor: Colors.$backgroundElevated
};
/**
 * @description: TabController's TabBar component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 */
const TabBar = props => {
  const {
    items: propsItems,
    height,
    enableShadow,
    shadowStyle: propsShadowStyle,
    indicatorStyle,
    labelStyle = DEFAULT_LABEL_STYLE,
    selectedLabelStyle = DEFAULT_SELECTED_LABEL_STYLE,
    labelColor,
    selectedLabelColor,
    uppercase,
    iconColor,
    selectedIconColor,
    activeBackgroundColor,
    backgroundColor = Colors.$backgroundElevated,
    faderProps = DEFAULT_FADER_PROPS,
    containerWidth: propsContainerWidth,
    centerSelected,
    spreadItems = true,
    indicatorInsets = Spacings.s4,
    indicatorWidth,
    containerStyle,
    testID
  } = props;
  const tabBar = useRef(null);
  const [key, setKey] = useState(generateKey(Constants.orientation, labelColor, selectedLabelColor));
  const context = useContext(TabBarContext);
  const {
    items: contextItems,
    currentPage,
    targetPage,
    containerWidth: contextContainerWidth
  } = context;
  const containerWidth = useMemo(() => {
    return propsContainerWidth || contextContainerWidth;
  }, [propsContainerWidth, contextContainerWidth]);
  const items = useMemo(() => {
    return contextItems || propsItems;
  }, [contextItems, propsItems]);
  const itemsCount = items?.length || 0;
  const {
    onItemLayout,
    itemsWidthsAnimated,
    itemsOffsetsAnimated,
    // itemsWidths,
    // itemsOffsets,
    focusIndex,
    reset,
    onContentSizeChange,
    onLayout
  } = useScrollToItem({
    // @ts-expect-error TODO: typing bug
    scrollViewRef: tabBar,
    itemsCount,
    selectedIndex: currentPage.value,
    containerWidth,
    offsetType: centerSelected ? useScrollToItem.offsetType.CENTER : useScrollToItem.offsetType.DYNAMIC
  });
  useAnimatedReaction(() => {
    return Math.round(currentPage.value);
  }, (currIndex, prevIndex) => {
    if (prevIndex !== null && currIndex !== prevIndex) {
      runOnJS(focusIndex)(currIndex);
    }
  });
  const tabBarItems = useMemo(() => {
    return _map(items, (item, index) => {
      return <TabBarItem labelColor={labelColor} selectedLabelColor={selectedLabelColor} labelStyle={labelStyle} selectedLabelStyle={selectedLabelStyle} uppercase={uppercase} iconColor={iconColor} selectedIconColor={selectedIconColor} backgroundColor={backgroundColor} activeBackgroundColor={activeBackgroundColor} {...item} {...context} key={`${index}_${item.label}`} index={index} onLayout={onItemLayout} spreadItems={spreadItems} />;
    });
  }, [items, labelColor, selectedLabelColor, labelStyle, selectedLabelStyle, uppercase, iconColor, selectedIconColor, backgroundColor, activeBackgroundColor, centerSelected, onItemLayout, spreadItems]);
  const _indicatorTransitionStyle = useAnimatedStyle(() => {
    const value = targetPage.value;
    let width, marginHorizontal;
    if (indicatorWidth) {
      width = indicatorWidth;
      marginHorizontal = interpolate(value, itemsWidthsAnimated.value.map((_v, i) => i), itemsWidthsAnimated.value.map(v => (v - indicatorWidth) / 2));
    } else {
      marginHorizontal = indicatorInsets;
      width = interpolate(value, itemsWidthsAnimated.value.map((_v, i) => i), itemsWidthsAnimated.value.map(v => v - 2 * indicatorInsets));
    }
    const left = interpolate(value, itemsOffsetsAnimated.value.map((_v, i) => i), itemsOffsetsAnimated.value);
    return {
      marginHorizontal,
      width,
      left
    };
  });
  const shadowStyle = useMemo(() => {
    return enableShadow ? propsShadowStyle || styles.containerShadow : undefined;
  }, [enableShadow, propsShadowStyle]);
  const _containerStyle = useMemo(() => {
    return [styles.container, shadowStyle, {
      width: containerWidth
    }, containerStyle];
  }, [shadowStyle, containerWidth, containerStyle]);
  const tabBarContainerStyle = useMemo(() => {
    return [styles.tabBar, spreadItems && styles.spreadItems, !_isUndefined(height) && {
      height
    }, {
      backgroundColor
    }];
  }, [height, backgroundColor]);
  const scrollViewContainerStyle = useMemo(() => {
    return {
      minWidth: containerWidth
    };
  }, [containerWidth]);
  useDidUpdate(() => {
    if (tabBar.current?.isScrollEnabled()) {
      focusIndex(currentPage.value);
    } else {
      reset();
      setKey(generateKey(Constants.orientation, labelColor, selectedLabelColor));
    }
  }, [containerWidth]);
  useDidUpdate(() => {
    setKey(generateKey(Constants.orientation, labelColor, selectedLabelColor));
  }, [labelColor, selectedLabelColor]);
  return <View style={_containerStyle} key={key} bg-$backgroundElevated>
      <FadedScrollView ref={tabBar} horizontal showsHorizontalScrollIndicator={false} showStartFader startFaderProps={faderProps} showEndFader endFaderProps={faderProps} contentContainerStyle={scrollViewContainerStyle} testID={testID} onContentSizeChange={onContentSizeChange} onLayout={onLayout}>
        <View style={tabBarContainerStyle} accessibilityRole={Constants.isIOS ? 'tabbar' : 'tablist'}>{tabBarItems}</View>
        {itemsCount > 1 && <Reanimated.View style={[styles.selectedIndicator, indicatorStyle, _indicatorTransitionStyle]} />}
      </FadedScrollView>
    </View>;
};
TabBar.displayName = 'TabController.TabBar';
const styles = StyleSheet.create({
  container: {
    zIndex: 100
  },
  tabBar: {
    height: DEFAULT_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 70,
    height: 2,
    backgroundColor: Colors.$backgroundPrimaryHeavy
  },
  containerShadow: {
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
          height: 6,
          width: 0
        }
      },
      android: {
        elevation: 5,
        backgroundColor: Colors.$backgroundElevated
      }
    })
  },
  spreadItems: {
    flex: 1
  }
});
const generateKey = (orientation, labelColor = '', selectedLabelColor = '') => `${orientation}_${labelColor}_${selectedLabelColor}`;
export default asBaseComponent(forwardRef(TabBar));