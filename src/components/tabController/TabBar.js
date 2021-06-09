import _pt from "prop-types";
// TODO: support commented props
// TODO: disable scroll when content width is shorter than screen width
import React, { useEffect, useMemo, useRef, useContext } from 'react';
import { StyleSheet, Platform } from 'react-native';
import Reanimated from 'react-native-reanimated';
import _ from 'lodash';
import TabBarContext from "./TabBarContext";
import TabBarItem from "./TabBarItem";
import { asBaseComponent, forwardRef } from "../../commons/new";
import View from "../../components/view";
import { Colors, Spacings, Typography } from "../../style";
import { Constants } from "../../helpers";
import { LogService } from "../../services";
import FadedScrollView from "./FadedScrollView";
import { useScrollToItem } from "../../hooks";
const {
  Code,
  Value,
  interpolate: _interpolate,
  interpolateNode,
  block,
  set
} = Reanimated;
const interpolate = interpolateNode || _interpolate;
const DEFAULT_HEIGHT = 48;
const DEFAULT_BACKGROUND_COLOR = Colors.white;
const DEFAULT_LABEL_STYLE = { ...Typography.text80,
  fontWeight: '400',
  letterSpacing: 0
};
const DEFAULT_SELECTED_LABEL_STYLE = { ...Typography.text80,
  fontWeight: '700',
  letterSpacing: 0
};

/**
 * @description: TabController's TabBar component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 */
const TabBar = props => {
  const {
    items: propsItems,
    spreadItems,
    height,
    enableShadow,
    shadowStyle: propsShadowStyle,
    // minTabsForScroll,
    indicatorStyle,
    wideIndicator,
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
  const indicatorInset = wideIndicator ? 0 : Spacings.s4;
  const context = useContext(TabBarContext); // @ts-ignore // TODO: typescript

  const {
    itemStates,
    items: contextItems,
    currentPage,
    targetPage,
    registerTabItems,
    selectedIndex
  } = context;
  const children = useRef(_.filter(propsChildren, child => !!child));

  const _registerTabItems = () => {
    const ignoredItems = [];
    let itemsCount;

    if (propsItems) {
      itemsCount = _.size(propsItems);

      _.forEach(propsItems, (item, index) => {
        if (item.ignore) {
          ignoredItems.push(index);
        }
      }); // TODO: deprecate with props.children

    } else {
      itemsCount = React.Children.count(children.current); // @ts-ignore TODO: typescript - not sure if this can be solved

      React.Children.toArray(children.current).forEach((child, index) => {
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
  const containerWidth = useMemo(() => {
    return propsContainerWidth || Constants.screenWidth;
  }, [propsContainerWidth]);
  const items = useMemo(() => {
    return contextItems || propsItems;
  }, [contextItems, propsItems]);
  const itemsCount = useRef(items ? _.size(items) : React.Children.count(children.current));
  const {
    scrollViewRef: tabBar,
    onItemLayout,
    itemsWidths,
    focusIndex,
    onContentSizeChange,
    onLayout
  } = useScrollToItem({
    itemsCount: itemsCount.current,
    selectedIndex,
    offsetType: centerSelected ? useScrollToItem.offsetType.CENTER : useScrollToItem.offsetType.DYNAMIC
  });
  const indicatorOffsets = useMemo(() => {
    let index = 0;
    const offsets = [];
    offsets.push(0);

    while (index < itemsWidths.length - 1) {
      ++index;
      offsets[index] = offsets[index - 1] + itemsWidths[index - 1];
    }

    return offsets;
  }, [itemsWidths]);

  const _renderTabBarItems = useMemo(() => {
    return _.map(items, (item, index) => {
      return <TabBarItem labelColor={labelColor} selectedLabelColor={selectedLabelColor} labelStyle={labelStyle} selectedLabelStyle={selectedLabelStyle} uppercase={uppercase} iconColor={iconColor} selectedIconColor={selectedIconColor} activeBackgroundColor={activeBackgroundColor} key={item.label} // width={_itemsWidths.current[index]}
      {...item} {...context} index={index} state={itemStates[index]} onLayout={onItemLayout} />;
    });
  }, [items, labelColor, selectedLabelColor, labelStyle, selectedLabelStyle, uppercase, iconColor, selectedIconColor, activeBackgroundColor, itemStates, centerSelected, onItemLayout]); // TODO: Remove once props.children is deprecated


  const _renderTabBarItemsFromChildren = useMemo(() => {
    return !children.current ? null : React.Children.map(children.current, (child, index) => {
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
        onLayout: centerSelected ? onItemLayout : undefined
      });
    });
  }, [propsChildren, labelColor, selectedLabelColor, labelStyle, selectedLabelStyle, uppercase, iconColor, selectedIconColor, activeBackgroundColor, itemStates, centerSelected, onItemLayout]);

  const renderTabBarItems = useMemo(() => {
    return _.isEmpty(itemStates) ? null : items ? _renderTabBarItems : _renderTabBarItemsFromChildren;
  }, [itemStates, items, _renderTabBarItems, _renderTabBarItemsFromChildren]);

  const _indicatorWidth = new Value(0); // TODO: typescript?


  const _indicatorOffset = new Value(0); // TODO: typescript?


  const _indicatorTransitionStyle = {
    // StyleProp<ViewStyle> TODO:
    width: _indicatorWidth,
    left: _indicatorOffset
  };
  const selectedIndicator = itemsWidths && itemsWidths.length > 0 ? <Reanimated.View style={[styles.selectedIndicator, {
    marginHorizontal: indicatorInset
  }, indicatorStyle, _indicatorTransitionStyle]} /> : undefined;

  const renderCodeBlock = _.memoize(() => {
    const nodes = [];
    nodes.push(set(_indicatorOffset, interpolate(currentPage, {
      inputRange: indicatorOffsets.map((_v, i) => i),
      outputRange: indicatorOffsets
    })));
    nodes.push(set(_indicatorWidth, interpolate(currentPage, {
      inputRange: itemsWidths.map((_v, i) => i),
      outputRange: itemsWidths.map(v => v - 2 * indicatorInset)
    })));
    nodes.push(Reanimated.onChange(targetPage, Reanimated.call([targetPage], focusIndex)));
    const temp = <Code>{() => block(nodes)}</Code>;
    return temp;
  });

  const shadowStyle = useMemo(() => {
    return enableShadow ? propsShadowStyle || styles.containerShadow : undefined;
  }, [enableShadow, propsShadowStyle]);

  const _containerStyle = useMemo(() => {
    return [styles.container, shadowStyle, {
      width: containerWidth
    }, containerStyle];
  }, [shadowStyle, containerWidth, containerStyle]);

  const indicatorContainerStyle = useMemo(() => {
    return [styles.tabBar, {
      flex: spreadItems ? 1 : undefined
    }, !_.isUndefined(height) && {
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
  return <View style={_containerStyle}>
      <FadedScrollView
    /**
     // @ts-ignore TODO: typescript */
    ref={tabBar} horizontal contentContainerStyle={scrollViewContainerStyle} scrollEnabled // TODO:
    testID={testID} onContentSizeChange={onContentSizeChange} onLayout={onLayout}>
        <View style={indicatorContainerStyle}>{renderTabBarItems}</View>
        {selectedIndicator}
      </FadedScrollView>
      {_.size(itemsWidths) > 1 && renderCodeBlock()}
    </View>;
};

TabBar.propTypes = {
  /**
     * The list of tab bar items
     */
  items: _pt.array,

  /**
     * Whether the tabBar should be spread (default: true)
     */
  spreadItems: _pt.bool,

  /**
     * Tab Bar height
     */
  height: _pt.number,

  /**
     * Show Tab Bar bottom shadow
     */
  enableShadow: _pt.bool,

  /**
     * Whether the indicator should be wide (as the item)
     */
  wideIndicator: _pt.bool,

  /**
     * the default label color
     */
  labelColor: _pt.string,

  /**
     * the selected label color
     */
  selectedLabelColor: _pt.string,

  /**
     * whether to change the text to uppercase
     */
  uppercase: _pt.bool,

  /**
     * icon tint color
     */
  iconColor: _pt.string,

  /**
     * icon selected tint color
     */
  selectedIconColor: _pt.string,

  /**
     * TODO: rename to feedbackColor
     * Apply background color on press for TouchableOpacity
     */
  activeBackgroundColor: _pt.string,

  /**
     * The TabBar background Color
     */
  backgroundColor: _pt.string,

  /**
     * The TabBar container width
     */
  containerWidth: _pt.number,

  /**
     * Pass to center selected item
     */
  centerSelected: _pt.bool,

  /**
     * Used as a testing identifier
     */
  testID: _pt.string,
  children: _pt.oneOfType([_pt.arrayOf(_pt.element), _pt.element])
};
TabBar.displayName = 'TabController.TabBar';
TabBar.defaultProps = {
  labelStyle: DEFAULT_LABEL_STYLE,
  selectedLabelStyle: DEFAULT_SELECTED_LABEL_STYLE,
  backgroundColor: DEFAULT_BACKGROUND_COLOR,
  spreadItems: true // containerWidth: Constants.screenWidth

};
const styles = StyleSheet.create({
  container: {
    zIndex: 100
  },
  tabBar: {
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
    backgroundColor: Colors.primary
  },
  containerShadow: { ...Platform.select({
      ios: {
        shadowColor: Colors.dark10,
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
          height: 6,
          width: 0
        }
      },
      android: {
        elevation: 5,
        backgroundColor: Colors.white
      }
    })
  }
});
export default asBaseComponent(forwardRef(TabBar));