import _map from "lodash/map";
import _find from "lodash/find";
import _first from "lodash/first";
import _get from "lodash/get";
import React, { PureComponent } from 'react';
import memoize from 'memoize-one';
import { Animated, Easing, StyleSheet } from 'react-native';
import { RectButton, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Constants, asBaseComponent } from "../../commons/new";
import { extractAccessibilityProps } from "../../commons/modifiers";
import { Colors } from "../../style";
import View from "../view";
import Swipeable from "./Swipeable";
const DEFAULT_BG = Colors.$backgroundPrimaryHeavy;
const DEFAULT_BOUNCINESS = 0;
/**
 * @description: Drawer Component
 * @importantLink: https://docs.swmansion.com/react-native-gesture-handler/docs/installation/
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Drawer/Drawer.gif?raw=true
 */
class Drawer extends PureComponent {
  static displayName = 'Drawer';
  static defaultProps = {
    itemsTintColor: Colors.white,
    itemsIconSize: 24
  };
  _swipeableRow = React.createRef();
  animationOptions = {
    bounciness: this.props.bounciness || DEFAULT_BOUNCINESS
  };
  leftActionX = new Animated.Value(0);
  constructor(props) {
    super(props);
    this.leftRender = Constants.isRTL ? props.rightItems && this.renderRightActions : props.leftItem && this.renderLeftActions;
    this.rightRender = Constants.isRTL ? props.leftItem && this.renderLeftActions : props.rightItems && this.renderRightActions;
  }
  getLeftActionsContainerStyle = memoize((leftItem, rightItems) => {
    return this.getActionsContainerStyle(Constants.isRTL ? rightItems : [leftItem]);
  });
  getRightActionsContainerStyle = memoize((rightItems, leftItem) => {
    return this.getActionsContainerStyle(Constants.isRTL ? [leftItem] : rightItems);
  });
  getActionsContainerStyle(items) {
    return {
      backgroundColor: _get(_first(items), 'background', DEFAULT_BG)
    };
  }

  /** Actions */

  closeDrawer = () => {
    this._swipeableRow.current?.close();
  };
  openLeft = () => {
    this._swipeableRow.current?.openLeft();
  };
  openLeftFull = () => {
    this._swipeableRow.current?.openLeftFull();
  };
  toggleLeft = () => {
    this._swipeableRow.current?.toggleLeft();
  };
  openRight = () => {
    this._swipeableRow.current?.openRight();
  };
  openRightFull = () => {
    this._swipeableRow.current?.openRightFull();
  };

  /** Events */

  onActionPress = item => {
    if (!item.keepOpen) {
      this.closeDrawer();
    }
    item.onPress?.(this.props);
  };
  onSwipeableWillOpen = () => {
    this.props.onSwipeableWillOpen?.(this.props);
  };
  onSwipeableWillClose = () => {
    this.props.onSwipeableWillClose?.(this.props);
  };
  onToggleSwipeLeft = options => {
    if (this.props.onToggleSwipeLeft) {
      this.animateItem(options);
    }
  };
  animateItem({
    rowWidth,
    leftWidth,
    dragX,
    released,
    resetItemPosition
  }) {
    const toValue = resetItemPosition ? 0 : dragX ? dragX - leftWidth : rowWidth * 0.6 - leftWidth;
    Animated.timing(this.leftActionX, {
      toValue,
      easing: Easing.bezier(0.25, 1, 0.5, 1),
      duration: 200,
      delay: 100,
      useNativeDriver: true
    }).start(() => {
      if (released) {
        // reset Drawer
        this.animateItem({
          released: false,
          resetItemPosition: true
        });
        this.closeDrawer();
        setTimeout(() => {
          this.props.onToggleSwipeLeft?.(this.props);
        }, 150);
      }
    });
  }

  /** Accessability */

  getAccessibilityActions(withOnPress = false) {
    const {
      rightItems,
      leftItem
    } = this.props;
    const actions = [];
    if (leftItem?.onPress && leftItem.text) {
      const action = {
        name: leftItem.text,
        label: leftItem.text
      };
      if (withOnPress) {
        action.onPress = leftItem.onPress;
      }
      actions.push(action);
    }
    if (rightItems) {
      rightItems.forEach(item => {
        if (item.onPress && item.text) {
          const action = {
            name: item.text,
            label: item.text
          };
          if (withOnPress) {
            action.onPress = item.onPress;
          }
          actions.push(action);
        }
      });
    }
    return actions;
  }
  onAccessibilityAction = event => {
    const actions = this.getAccessibilityActions(true);
    const action = _find(actions, o => {
      // return o.text === event.nativeEvent.action;
      return o.name === event.nativeEvent.actionName;
    });
    action.onPress?.();
  };

  /** Renders */

  // TODO: enable support for rendering more than one left item
  renderLeftActions = progress => {
    const {
      leftItem
    } = this.props;
    const leftItems = leftItem ? [leftItem] : undefined;
    return this.renderActions(leftItems, progress /* , dragX */);
  };
  renderRightActions = progress => {
    const {
      rightItems
    } = this.props;
    return this.renderActions(rightItems, progress /* , dragX */);
  };
  renderActions(items, progress) {
    if (items) {
      return (
        // @ts-ignore
        <View animated renderDelay={100} row style={{
          transform: [{
            translateX: this.leftActionX
          }]
        }}>
          {_map(items, (item, index) => {
            return this.renderAction({
              item,
              index: items.length - index - 1,
              progress,
              // dragX,
              itemsCount: items.length
            });
          })}
        </View>
      );
    }
  }
  renderAction = ({
    item,
    index,
    progress,
    itemsCount
  }) => {
    const {
      itemsTintColor,
      itemsIconSize,
      itemsTextStyle,
      itemsMinWidth
    } = this.props;
    const inputRange = [index / itemsCount, (index + 1) / itemsCount];
    const outputRange = [0.2, 1];
    const scale = progress.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp'
    });
    const opacity = progress.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp'
    });
    return <RectButton key={index} testID={item.testID} style={[styles.action, item.style, {
      backgroundColor: item.background || DEFAULT_BG,
      width: item.width,
      minWidth: itemsMinWidth
    }]} onPress={() => this.onActionPress(item)}>
        {item.customElement}
        {!item.customElement && item.icon && <Animated.Image source={item.icon} style={[styles.actionIcon, {
        width: itemsIconSize,
        height: itemsIconSize,
        tintColor: item.iconColor || itemsTintColor,
        opacity,
        transform: [{
          scale
        }]
      }]} />}
        {!item.customElement && item.text && <Animated.Text style={[styles.actionText, {
        color: item.textColor || itemsTintColor,
        opacity,
        transform: [{
          scale
        }]
      }, itemsTextStyle]} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" accessible={false}>
            {item.text}
          </Animated.Text>}
      </RectButton>;
  };
  render() {
    const {
      children,
      style,
      leftItem,
      rightItems,
      onToggleSwipeLeft,
      ...others
    } = this.props;
    return <GestureHandlerRootView>
        <Swipeable {...others} ref={this._swipeableRow} friction={1} containerStyle={style} animationOptions={this.animationOptions} renderLeftActions={this.leftRender} renderRightActions={this.rightRender} rightActionsContainerStyle={this.getRightActionsContainerStyle(rightItems, leftItem)} leftActionsContainerStyle={this.getLeftActionsContainerStyle(leftItem, rightItems)} onSwipeableWillOpen={this.onSwipeableWillOpen} onSwipeableWillClose={this.onSwipeableWillClose} onToggleSwipeLeft={onToggleSwipeLeft && this.onToggleSwipeLeft}>
          <View accessible accessibilityActions={this.getAccessibilityActions()} onAccessibilityAction={this.onAccessibilityAction} {...extractAccessibilityProps(this.props)}>
            {children}
          </View>
        </Swipeable>
      </GestureHandlerRootView>;
  }
}
export default asBaseComponent(Drawer);
const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: /* Constants.isRTL ? 'flex-end' :  */'flex-start',
    backgroundColor: '#388e3c'
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10
  },
  actionText: {
    color: '#ffffff'
  },
  action: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dd2c00'
  }
});