import _ from 'lodash';
import React, {PureComponent, ReactNode, RefObject} from 'react';
import memoize from 'memoize-one';
import {Animated, Easing, StyleSheet, ViewStyle, TextStyle, AccessibilityActionEvent} from 'react-native';
import {RectButton, GestureHandlerRootView} from 'react-native-gesture-handler';
import {Constants, asBaseComponent} from '../../commons/new';
import {extractAccessibilityProps} from '../../commons/modifiers';
import {Colors} from '../../style';
import View from '../view';
import Swipeable, {SwipeableProps} from './Swipeable';

const DEFAULT_BG = Colors.$backgroundPrimaryHeavy;
const DEFAULT_BOUNCINESS = 0;

interface DrawerItemProps {
  width?: number;
  background?: string;
  text?: string;
  textColor?: string;
  icon?: number;
  iconColor?: string;
  onPress?: Function;
  keepOpen?: boolean;
  style?: ViewStyle;
  testID?: string;
  customElement?: ReactNode;
}

interface DrawerProps {
  /**
   * The drawer animation bounciness
   */
  bounciness?: number;
  /**
   * OnDragStart handler
   */
  onDragStart?: Function;
  /**
   * The bottom layer's items to appear when opened from the right
   */
  rightItems?: DrawerItemProps[];
  /**
   * The bottom layer's item to appear when opened from the left (a single item)
   */
  leftItem?: DrawerItemProps;
  /**
   * Set a different minimum width
   */
  itemsMinWidth?: number;
  /**
   * The color for the text and icon tint of the items
   */
  itemsTintColor?: string;
  /**
   * The items' icon size
   */
  itemsIconSize?: number;
  /**
   * The items' text style
   */
  itemsTextStyle?: TextStyle;
  /**
   * Perform the animation in natively
   */
  useNativeAnimations?: boolean;
  /**
   * Whether to allow a full left swipe
   */
  fullSwipeLeft?: boolean;
  /**
   * Threshold for a left full swipe (0-1)
   */
  fullLeftThreshold?: number;
  /**
   * Callback for left item full swipe
   */
  onFullSwipeLeft?: Function;
  /**
   * Callback for left item toggle swipe
   */
  onToggleSwipeLeft?: Function;
  /**
   * Callback for just before left item full swipe
   */
  onWillFullSwipeLeft?: Function;
  /**
   * Whether to allow a full right swipe
   */
  fullSwipeRight?: boolean;
  /**
   * Threshold for a right full swipe (0-1)
   */
  fullRightThreshold?: number;
  /**
   * Callback for right item full swipe
   */
  onFullSwipeRight?: Function;
  /**
   * Callback for just before right item full swipe
   */
  onWillFullSwipeRight?: Function;
  /**
   * Whether to disable the haptic
   */
  disableHaptic?: boolean;
  /**
   * Style
   */
  style?: ViewStyle;
  /**
   * Callback for open action
   */
  onSwipeableWillOpen?: Function;
  /**
   * Callback for close action
   */
  onSwipeableWillClose?: Function;
  /**
   * Custom value of any type to pass on to the component and receive back in the action callbacks
   */
  customValue?: any;
  /**
   * Used as testing identifier
   */
  testID?: string;
  children?: React.ReactNode;
}

/**
 * @description: Drawer Component
 * @importantLink: https://docs.swmansion.com/react-native-gesture-handler/docs/installation/
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Drawer/Drawer.gif?raw=true
 */
class Drawer extends PureComponent<DrawerProps> {
  static displayName = 'Drawer';

  static defaultProps = {
    itemsTintColor: Colors.white,
    itemsIconSize: 24
  };

  leftRender: SwipeableProps['renderLeftActions'];
  rightRender: SwipeableProps['renderLeftActions'];
  _swipeableRow: RefObject<Swipeable> = React.createRef();
  animationOptions: SwipeableProps['animationOptions'] = {bounciness: this.props.bounciness || DEFAULT_BOUNCINESS};
  leftActionX: Animated.Value = new Animated.Value(0);

  constructor(props: DrawerProps) {
    super(props);

    this.leftRender = Constants.isRTL
      ? props.rightItems && this.renderRightActions
      : props.leftItem && this.renderLeftActions;
    this.rightRender = Constants.isRTL
      ? props.leftItem && this.renderLeftActions
      : props.rightItems && this.renderRightActions;
  }

  private getLeftActionsContainerStyle = memoize((leftItem, rightItems) => {
    return this.getActionsContainerStyle(Constants.isRTL ? rightItems : [leftItem]);
  });

  private getRightActionsContainerStyle = memoize((rightItems, leftItem) => {
    return this.getActionsContainerStyle(Constants.isRTL ? [leftItem] : rightItems);
  });

  private getActionsContainerStyle(items: DrawerItemProps[]) {
    return {backgroundColor: _.get(_.first(items), 'background', DEFAULT_BG)};
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

  private onActionPress = (item: DrawerItemProps) => {
    if (!item.keepOpen) {
      this.closeDrawer();
    }
    item.onPress?.(this.props);
  };

  private onSwipeableWillOpen = () => {
    this.props.onSwipeableWillOpen?.(this.props);
  };

  private onSwipeableWillClose = () => {
    this.props.onSwipeableWillClose?.(this.props);
  };

  private onToggleSwipeLeft = (options?: any) => {
    if (this.props.onToggleSwipeLeft) {
      this.animateItem(options);
    }
  };

  private animateItem({rowWidth, leftWidth, dragX, released, resetItemPosition}: any) {
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
        this.animateItem({released: false, resetItemPosition: true});
        this.closeDrawer();
        setTimeout(() => {
          this.props.onToggleSwipeLeft?.(this.props);
        }, 150);
      }
    });
  }

  /** Accessability */

  private getAccessibilityActions(withOnPress = false) {
    const {rightItems, leftItem} = this.props;
    const actions = [];

    if (leftItem?.onPress && leftItem.text) {
      const action: any = {name: leftItem.text, label: leftItem.text};
      if (withOnPress) {
        action.onPress = leftItem.onPress;
      }
      actions.push(action);
    }
    if (rightItems) {
      rightItems.forEach(item => {
        if (item.onPress && item.text) {
          const action: any = {name: item.text, label: item.text};
          if (withOnPress) {
            action.onPress = item.onPress;
          }
          actions.push(action);
        }
      });
    }

    return actions;
  }

  private onAccessibilityAction = (event: AccessibilityActionEvent) => {
    const actions = this.getAccessibilityActions(true);
    const action = _.find(actions, o => {
      // return o.text === event.nativeEvent.action;
      return o.name === event.nativeEvent.actionName;
    });
    action.onPress?.();
  };

  /** Renders */

  // TODO: enable support for rendering more than one left item
  private renderLeftActions = (progress: Animated.Value /* , dragX: Animated.Value */) => {
    const {leftItem} = this.props;
    const leftItems = leftItem ? [leftItem] : undefined;
    return this.renderActions(leftItems, progress /* , dragX */);
  };

  private renderRightActions = (progress: Animated.Value /* , dragX: Animated.Value */) => {
    const {rightItems} = this.props;
    return this.renderActions(rightItems, progress /* , dragX */);
  };

  private renderActions(items: DrawerItemProps[] | undefined, progress: Animated.Value /* , dragX: Animated.Value */) {
    if (items) {
      return (
        // @ts-ignore
        <View animated renderDelay={100} row style={{transform: [{translateX: this.leftActionX}]}}>
          {_.map(items, (item, index: number) => {
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

  private renderAction = ({item, index, progress, itemsCount}: any) => {
    const {itemsTintColor, itemsIconSize, itemsTextStyle, itemsMinWidth} = this.props;
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

    return (
      <RectButton key={index} testID={item.testID} onPress={() => this.onActionPress(item)}>
        <View
          style={[
            styles.action,
            item.style,
            {
              backgroundColor: item.background || DEFAULT_BG,
              height: '100%',
              width: item.width,
              minWidth: itemsMinWidth
            }
          ]}
        >
          {item.customElement}
          {!item.customElement && item.icon && (
            <Animated.Image
              source={item.icon}
              style={[
                styles.actionIcon,
                {
                  width: itemsIconSize,
                  height: itemsIconSize,
                  tintColor: item.iconColor || itemsTintColor,
                  opacity,
                  transform: [{scale}]
                }
              ]}
            />
          )}
          {!item.customElement && item.text && (
            <Animated.Text
              style={[
                styles.actionText,
                {
                  color: item.textColor || itemsTintColor,
                  opacity,
                  transform: [{scale}]
                },
                itemsTextStyle
              ]}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              accessible={false}
            >
              {item.text}
            </Animated.Text>
          )}
        </View>
      </RectButton>
    );
  };

  render() {
    const {children, style, leftItem, rightItems, onToggleSwipeLeft, ...others} = this.props;

    return (
      <GestureHandlerRootView style={styles.container}>
        <Swipeable
          {...others}
          ref={this._swipeableRow}
          friction={1}
          containerStyle={style}
          animationOptions={this.animationOptions}
          renderLeftActions={this.leftRender}
          renderRightActions={this.rightRender}
          rightActionsContainerStyle={this.getRightActionsContainerStyle(rightItems, leftItem)}
          leftActionsContainerStyle={this.getLeftActionsContainerStyle(leftItem, rightItems)}
          onSwipeableWillOpen={this.onSwipeableWillOpen}
          onSwipeableWillClose={this.onSwipeableWillClose}
          onToggleSwipeLeft={onToggleSwipeLeft && this.onToggleSwipeLeft}
        >
          <View
            accessible
            accessibilityActions={this.getAccessibilityActions()}
            onAccessibilityAction={this.onAccessibilityAction}
            {...extractAccessibilityProps(this.props)}
          >
            {children}
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    );
  }
}

export {DrawerProps, DrawerItemProps};
export default asBaseComponent<DrawerProps, typeof Drawer>(Drawer);

const styles = StyleSheet.create({
  container: {
    flex: 0
  },
  leftAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: /* Constants.isRTL ? 'flex-end' :  */ 'flex-start',
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
