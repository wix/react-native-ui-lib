// TODO: support commented props
// TODO: disable scroll when content width is shorter than screen width
import React, {useMemo, useRef, useContext, ReactNode} from 'react';
import {StyleSheet, Platform, TextProps, StyleProp, ViewStyle} from 'react-native';
import Reanimated, {runOnJS, useAnimatedReaction, useAnimatedStyle, interpolate} from 'react-native-reanimated';
import _ from 'lodash';

import TabBarContext from './TabBarContext';
import TabBarItem, {TabControllerItemProps} from './TabBarItem';
import {asBaseComponent, forwardRef, BaseComponentInjectedProps, ForwardRefInjectedProps} from '../../commons/new';
import View from '../view';
import {Colors, Spacings, Typography} from '../../style';
import {Constants} from '../../helpers';
import FadedScrollView from './FadedScrollView';

import useScrollToItem from './useScrollToItem';

const DEFAULT_HEIGHT = 48;
const INDICATOR_INSET = Spacings.s4;
const DEFAULT_BACKGROUND_COLOR = Colors.white;

const DEFAULT_LABEL_STYLE = {
  ...Typography.text80,
  fontWeight: '400',
  letterSpacing: 0
};

const DEFAULT_SELECTED_LABEL_STYLE = {
  ...Typography.text80,
  // fontWeight: '700',
  letterSpacing: 0
};

export interface TabControllerBarProps {
  /**
   * The list of tab bar items
   */
  items?: TabControllerItemProps[];
  /**
   * Tab Bar height
   */
  height?: number;
  /**
   * Show Tab Bar bottom shadow
   */
  enableShadow?: boolean;
  /**
   * custom shadow style
   */
  shadowStyle?: StyleProp<ViewStyle>;
  // /**
  //  * The minimum number of tabs to render in scroll mode
  //  */
  // minTabsForScroll?: number;
  /**
   * custom style for the selected indicator
   */
  indicatorStyle?: StyleProp<ViewStyle>;
  /**
   * custom label style
   */
  labelStyle?: TextProps;
  /**
   * custom selected label style
   */
  selectedLabelStyle?: TextProps;
  /**
   * the default label color
   */
  labelColor?: string;
  /**
   * the selected label color
   */
  selectedLabelColor?: string;
  /**
   * whether to change the text to uppercase
   */
  uppercase?: boolean;
  /**
   * icon tint color
   */
  iconColor?: string;
  /**
   * icon selected tint color
   */
  selectedIconColor?: string;
  /**
   * TODO: rename to feedbackColor
   * Apply background color on press for TouchableOpacity
   */
  activeBackgroundColor?: string;
  /**
   * The TabBar background Color
   */
  backgroundColor?: string;
  /**
   * The TabBar container width
   */
  containerWidth?: number;
  /**
   * Pass to center selected item
   */
  centerSelected?: boolean;
  /**
   * Additional styles for the container
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Used as a testing identifier
   */
  testID?: string;
}

type ChildProps = React.ReactElement<TabControllerItemProps>;

interface Props extends TabControllerBarProps, BaseComponentInjectedProps, ForwardRefInjectedProps {
  children?: ChildProps[] | ChildProps;
}

/**
 * @description: TabController's TabBar component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 */
const TabBar = (props: Props) => {
  const {
    items: propsItems,
    height,
    enableShadow,
    shadowStyle: propsShadowStyle,
    // minTabsForScroll,
    indicatorStyle,
    labelStyle,
    selectedLabelStyle,
    labelColor,
    selectedLabelColor,
    uppercase,
    iconColor,
    selectedIconColor,
    activeBackgroundColor,
    backgroundColor,
    containerWidth: propsContainerWidth,
    centerSelected,
    containerStyle,
    testID,
    children: propsChildren
  } = props;

  const context = useContext(TabBarContext);
  // @ts-ignore // TODO: typescript
  const {
    // asCarousel,
    itemStates,
    items: contextItems,
    currentPage,
    targetPage,
    // carouselOffset,
    // pageWidth = Constants.screenWidth,
    /* targetPage, */
    /* registerTabItems, */
    selectedIndex
  } = context;

  const children = useRef<Props['children']>(_.filter(propsChildren, (child: ChildProps) => !!child));

  const containerWidth: number = useMemo(() => {
    return propsContainerWidth || Constants.screenWidth;
  }, [propsContainerWidth]);

  const items = useMemo(() => {
    return contextItems || propsItems;
  }, [contextItems, propsItems]);

  const itemsCount = useRef<number>(items ? _.size(items) : React.Children.count(children.current));

  const {
    scrollViewRef: tabBar,
    onItemLayout,
    itemsWidthsAnimated,
    itemsOffsetsAnimated,
    // itemsWidths,
    // itemsOffsets,
    focusIndex,
    onContentSizeChange,
    onLayout
  } = useScrollToItem({
    itemsCount: itemsCount.current,
    selectedIndex,
    offsetType: centerSelected ? useScrollToItem.offsetType.CENTER : useScrollToItem.offsetType.DYNAMIC
  });

  useAnimatedReaction(() => {
    return Math.round(currentPage.value);
  },
  (currIndex, prevIndex) => {
    if (currIndex !== prevIndex) {
      runOnJS(focusIndex)(currIndex);
    }
  });

  const _renderTabBarItems = useMemo((): ReactNode => {
    return _.map(items, (item, index) => {
      return (
        <TabBarItem
          labelColor={labelColor}
          selectedLabelColor={selectedLabelColor}
          labelStyle={labelStyle}
          selectedLabelStyle={selectedLabelStyle}
          uppercase={uppercase}
          iconColor={iconColor}
          selectedIconColor={selectedIconColor}
          activeBackgroundColor={activeBackgroundColor}
          key={item.label}
          {...item}
          {...context}
          index={index}
          // @ts-expect-error
          state={itemStates[index]}
          onLayout={onItemLayout}
        />
      );
    });
  }, [
    items,
    labelColor,
    selectedLabelColor,
    labelStyle,
    selectedLabelStyle,
    uppercase,
    iconColor,
    selectedIconColor,
    activeBackgroundColor,
    itemStates,
    centerSelected,
    onItemLayout
  ]);

  const _indicatorTransitionStyle = useAnimatedStyle(() => {
    const value = /* asCarousel ? carouselOffset.value / pageWidth :  */ targetPage.value;
    const width = interpolate(value,
      itemsWidthsAnimated.value.map((_v: number, i: number) => i),
      itemsWidthsAnimated.value.map((v: number) => v - 2 * INDICATOR_INSET));

    const left = interpolate(value,
      itemsOffsetsAnimated.value.map((_v: any, i: number) => i),
      itemsOffsetsAnimated.value);

    return {
      width,
      left
    };
  });

  const renderTabBarItems = useMemo(() => {
    return _.isEmpty(itemStates) ? null : /* items ?  */ _renderTabBarItems;
  }, [itemStates, /* items, */ _renderTabBarItems]);

  const shadowStyle = useMemo(() => {
    return enableShadow ? propsShadowStyle || styles.containerShadow : undefined;
  }, [enableShadow, propsShadowStyle]);

  const _containerStyle = useMemo(() => {
    return [styles.container, shadowStyle, {width: containerWidth}, containerStyle];
  }, [shadowStyle, containerWidth, containerStyle]);

  const indicatorContainerStyle = useMemo(() => {
    return [styles.tabBar, !_.isUndefined(height) && {height}, {backgroundColor}];
  }, [height, backgroundColor]);

  const scrollViewContainerStyle = useMemo(() => {
    return {minWidth: containerWidth};
  }, [containerWidth]);

  return (
    <View style={_containerStyle}>
      <FadedScrollView
        // @ts-ignore TODO: typescript
        ref={tabBar}
        horizontal
        contentContainerStyle={scrollViewContainerStyle}
        scrollEnabled // TODO:
        testID={testID}
        onContentSizeChange={onContentSizeChange}
        onLayout={onLayout}
      >
        <View style={indicatorContainerStyle}>{renderTabBarItems}</View>
        <Reanimated.View style={[styles.selectedIndicator, indicatorStyle, _indicatorTransitionStyle]}/>
      </FadedScrollView>
    </View>
  );
};

TabBar.displayName = 'TabController.TabBar';
TabBar.defaultProps = {
  labelStyle: DEFAULT_LABEL_STYLE,
  selectedLabelStyle: DEFAULT_SELECTED_LABEL_STYLE,
  backgroundColor: DEFAULT_BACKGROUND_COLOR
  // containerWidth: Constants.screenWidth
};

const styles = StyleSheet.create({
  container: {
    zIndex: 100
  },
  tabBar: {
    flex: 1,
    height: DEFAULT_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tabBarScrollContent: {
    minWidth: Constants.screenWidth
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
    marginHorizontal: INDICATOR_INSET,
    backgroundColor: Colors.primary
  },
  containerShadow: {
    ...Platform.select({
      ios: {
        shadowColor: Colors.dark10,
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {height: 6, width: 0}
      },
      android: {
        elevation: 5,
        backgroundColor: Colors.white
      }
    })
  }
});

export default asBaseComponent<TabControllerBarProps>(forwardRef<Props>(TabBar));
