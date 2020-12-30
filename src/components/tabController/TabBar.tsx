// TODO: support commented props
// TODO: disable scroll when content width is shorter than screen width
import React, {useEffect, useState, useCallback, useMemo, useRef, useContext} from 'react';
import {
  StyleSheet,
  ScrollView,
  Platform,
  TextProps,
  StyleProp,
  ViewStyle,
  LayoutRectangle,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import Reanimated from 'react-native-reanimated';
import _ from 'lodash';

import TabBarContext from './TabBarContext';
import TabBarItem, {TabControllerItemProps} from './TabBarItem';
import {asBaseComponent, forwardRef, BaseComponentInjectedProps, ForwardRefInjectedProps} from '../../commons/new';
import View from '../../components/view';
import {Colors, Spacings, Typography} from '../../style';
import {Constants} from '../../helpers';
import {LogService} from '../../services';
import FadedScrollView from './FadedScrollView';

const {Code, Value, interpolate, block, set} = Reanimated;

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
  fontWeight: '700',
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
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.js
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
    centerSelected: propsCenterSelected,
    containerStyle,
    testID,
    children: propsChildren
  } = props;

  const context = useContext(TabBarContext);
  // @ts-ignore // TODO: typescript
  const {itemStates, items: contextItems, selectedIndex, currentPage, targetPage, registerTabItems} = context;

  const children = useRef<Props['children']>(_.filter(propsChildren, (child: ChildProps) => !!child));

  const _registerTabItems = () => {
    const ignoredItems: number[] = [];
    let itemsCount;

    if (propsItems) {
      itemsCount = _.size(propsItems);
      _.forEach(propsItems, (item, index) => {
        if (item.ignore) {
          ignoredItems.push(index);
        }
      });
      // TODO: deprecate with props.children
    } else {
      itemsCount = React.Children.count(children.current);
      // @ts-ignore TODO: typescript - not sure if this can be solved
      React.Children.toArray(children.current).forEach((child: ChildProps, index: number) => {
        if (child.props.ignore) {
          ignoredItems.push(index);
        }
      });
    }

    registerTabItems(itemsCount, ignoredItems);
  };

  useEffect(() => {
    if (propsChildren) {
      LogService.warn('uilib: Please pass the "items" prop to TabController.TabBar instead of children');
    }

    if ((propsItems || children.current) && !contextItems) {
      _registerTabItems();
    }
  }, []);

  const [itemsWidths, setItemsWidths] = useState<number[]>([]);
  const [itemsOffsets, setItemsOffsets] = useState<number[]>([]);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(false);
  const tabBar = useRef<ScrollView>(null);
  const tabBarScrollOffset = useRef<number>(0);
  const contentWidth = useRef<number>(0);

  const containerWidth: number = useMemo(() => {
    return propsContainerWidth || Constants.screenWidth;
  }, [propsContainerWidth]);
  const items = useMemo(() => {
    return contextItems || propsItems;
  }, [contextItems, propsItems]);

  const itemsCount = useRef<number>(items ? _.size(items) : React.Children.count(children.current));
  const _itemsWidths = useRef<(number | null | undefined)[]>(_.times(itemsCount.current, () => null));
  const _itemsOffsets = useRef<(number | null | undefined)[]>(_.times(itemsCount.current, () => null));

  const onScroll = useCallback(({nativeEvent: {contentOffset}}: NativeSyntheticEvent<NativeScrollEvent>) => {
    tabBarScrollOffset.current = contentOffset.x;
    if (Constants.isRTL && Constants.isAndroid) {
      const scrollingWidth = Math.max(0, contentWidth.current - containerWidth);
      tabBarScrollOffset.current = scrollingWidth - tabBarScrollOffset.current;
    }
  },
  [containerWidth]);

  const snapBreakpoints = useMemo(() => {
    return itemsWidths && itemsOffsets && itemsWidths.length > 0 && itemsOffsets.length > 0 && propsCenterSelected
      ? _.times(itemsWidths.length, index => {
        const screenCenter = containerWidth / 2;
        const itemOffset = itemsOffsets[index];
        const itemWidth = itemsWidths[index];
        return itemOffset - screenCenter + itemWidth / 2;
      })
      : undefined;
  }, [itemsWidths, itemsOffsets, propsCenterSelected, containerWidth]);

  const guesstimateCenterValue = 60;
  const centerOffset = propsCenterSelected ? containerWidth / 2 - guesstimateCenterValue : 0;

  // TODO: move this logic into a ScrollPresenter or something
  const focusSelected = useCallback(([index]: readonly number[], animated = true) => {
    const itemOffset = _itemsOffsets.current[index];
    const itemWidth = _itemsWidths.current[index];
    const screenCenter = containerWidth / 2;

    let targetOffset;

    if (!_.isNil(itemOffset) && !_.isNil(itemWidth)) {
      if (propsCenterSelected) {
        targetOffset = itemOffset - screenCenter + itemWidth / 2;
      } else if (itemOffset < tabBarScrollOffset.current) {
        targetOffset = itemOffset - itemWidth;
      } else if (itemOffset + itemWidth > tabBarScrollOffset.current + containerWidth) {
        const offsetChange = Math.max(0, itemOffset - (tabBarScrollOffset.current + containerWidth));
        targetOffset = tabBarScrollOffset.current + offsetChange + itemWidth;
      }

      if (!_.isUndefined(targetOffset)) {
        if (Constants.isRTL && Constants.isAndroid) {
          const scrollingWidth = Math.max(0, contentWidth.current - containerWidth);
          targetOffset = scrollingWidth - targetOffset;
        }

        if (tabBar?.current) {
          tabBar.current.scrollTo({x: targetOffset, animated});
        }
      }
    }
  },
  [containerWidth]);

  function getItemsOffsets() {
    return _.times(_itemsWidths.current.length,
      i => _.chain(_itemsWidths.current).take(i).sum().value() + centerOffset);
  }

  const setItemsLayouts = useCallback(() => {
    // It's important to calculate itemOffsets for RTL support
    _itemsOffsets.current = getItemsOffsets();
    const itemsOffsets = _.map(_itemsOffsets.current, offset => (offset ? offset : 0) + INDICATOR_INSET);
    const itemsWidths = _.map(_itemsWidths.current, width => (width ? width : 0) - INDICATOR_INSET * 2);
    contentWidth.current = _.sum(_itemsWidths.current);
    const scrollEnabled = contentWidth.current > containerWidth;

    setItemsWidths(itemsWidths);
    setItemsOffsets(itemsOffsets);
    setScrollEnabled(scrollEnabled);
    focusSelected([selectedIndex], false);
  }, [containerWidth, selectedIndex]);

  const onItemLayout = useCallback(({width}: Partial<LayoutRectangle>, itemIndex: number) => {
    _itemsWidths.current[itemIndex] = width;
    if (!_.includes(_itemsWidths.current, null)) {
      setItemsLayouts();
    }
  },
  [setItemsLayouts]);

  const _renderTabBarItems = _.map(items, (item, index) => {
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
        // width={_itemsWidths.current[index]}
        {...item}
        {...context}
        index={index}
        state={itemStates[index]}
        onLayout={onItemLayout}
      />
    );
  });

  // TODO: Remove once props.children is deprecated
  const _renderTabBarItemsFromChildren = !children.current
    ? null
    : React.Children.map(children.current, (child: Partial<ChildProps>, index: number) => {
      // @ts-ignore TODO: typescript - not sure if this can be easily solved
      return React.cloneElement(child, {
        labelColor,
        selectedLabelColor,
        labelStyle,
        selectedLabelStyle,
        uppercase,
        iconColor,
        selectedIconColor,
        activeBackgroundColor,
        ...child.props,
        ...context,
        index,
        state: itemStates[index],
        onLayout: onItemLayout
      });
    });

  const renderTabBarItems = _.isEmpty(itemStates) ? null : items ? _renderTabBarItems : _renderTabBarItemsFromChildren;

  const _indicatorWidth = new Value(0); // TODO: typescript?
  const _indicatorOffset = new Value(0); // TODO: typescript?

  const _indicatorTransitionStyle = {
    // StyleProp<ViewStyle> TODO:
    width: _indicatorWidth,
    left: _indicatorOffset
  };

  const renderSelectedIndicator =
    itemsWidths && itemsWidths.length > 0 ? (
      <Reanimated.View style={[styles.selectedIndicator, indicatorStyle, _indicatorTransitionStyle]}/>
    ) : undefined;

  const renderCodeBlock = () => {
    const nodes: any[] = [];

    nodes.push(set(_indicatorOffset,
      interpolate(currentPage, {
        inputRange: itemsOffsets.map((_v, i) => i),
        outputRange: itemsOffsets
      })));
    nodes.push(set(_indicatorWidth,
      interpolate(currentPage, {inputRange: itemsWidths.map((_v, i) => i), outputRange: itemsWidths})));

    nodes.push(Reanimated.onChange(targetPage, Reanimated.call([targetPage], focusSelected)));

    return <Code>{() => block(nodes)}</Code>;
  };

  const shadowStyle = enableShadow ? propsShadowStyle || styles.containerShadow : undefined;
  return (
    <View style={[styles.container, shadowStyle, {width: containerWidth}, containerStyle]}>
      <FadedScrollView
        // @ts-ignore TODO: typescript
        ref={tabBar}
        horizontal
        contentContainerStyle={{minWidth: containerWidth}}
        scrollEnabled={scrollEnabled}
        onScroll={onScroll}
        testID={testID}
        snapToOffsets={snapBreakpoints}
      >
        <View
          style={[
            styles.tabBar,
            !_.isUndefined(height) && {height},
            {paddingHorizontal: centerOffset, backgroundColor}
          ]}
        >
          {renderTabBarItems}
        </View>
        {renderSelectedIndicator}
      </FadedScrollView>
      {_.size(itemsWidths) > 1 && renderCodeBlock()}
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
    backgroundColor: Colors.blue30
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
