import _ from 'lodash';
import React, {PureComponent, RefObject} from 'react';
import memoize from 'memoize-one';
import {Animated, Easing, StyleSheet, ViewStyle, TextStyle, AccessibilityActionEvent} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {asBaseComponent} from '../../commons/new';
import {extractAccessibilityProps} from '../../commons/modifiers';
import {Constants} from '../../helpers';
import {Colors} from '../../style';
import View from '../view';
import Swipeable, {PropType as SwipeableProps} from './Swipeable';

const DEFAULT_BG = Colors.blue30;

interface ItemProps {
  width?: number;
  background?: string;
  text?: string;
  icon?: number;
  onPress?: Function;
  keepOpen?: boolean;
  style?: ViewStyle;
  testID?: string;
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
  rightItems?: ItemProps[];
  /**
   * The bottom layer's item to appear when opened from the left (a single item)
   */
  leftItem?: ItemProps;
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
   * Haptic trigger function to use onToggleSwipeLeft
   */
  leftToggleHapticTrigger?: Function;
  /**
   * Style
   */
  style?: ViewStyle;
}

/**
 * @description: Drawer Component
 * @important: If your app works with RNN, your screen must be wrapped
 * with gestureHandlerRootHOC from 'react-native-gesture-handler'. see
 * @importantLink: https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html#with-wix-react-native-navigation-https-githubcom-wix-react-native-navigation
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
  animationOptions: SwipeableProps['animationOptions'] = {bounciness: this.props.bounciness || 5};
  leftActionX: Animated.Value = new Animated.Value(0);

  constructor(props: DrawerProps) {
    super(props);

    this.leftRender = props.leftItem ? (Constants.isRTL ? this.renderRightActions : this.renderLeftActions) : undefined;
    this.rightRender = props.rightItems
      ? Constants.isRTL
        ? this.renderLeftActions
        : this.renderRightActions
      : undefined;
  }

  private getLeftActionsContainerStyle = memoize((leftItem, rightItems) => {
    return this.getActionsContainerStyle(Constants.isRTL ? rightItems : [leftItem]);
  })

  private getRightActionsContainerStyle = memoize((rightItems, leftItem) => {
    return this.getActionsContainerStyle(Constants.isRTL ? [leftItem] : rightItems);
  })

  private getActionsContainerStyle(items: ItemProps[]) {
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

  private onActionPress = (item: ItemProps) => {
    if (!item.keepOpen) {
      this.closeDrawer();
    }
    _.invoke(item, 'onPress', this.props);
  }

  private onSwipeableWillOpen = () => {
    _.invoke(this.props, 'onSwipeableWillOpen', this.props);
  };

  private onSwipeableWillClose = () => {
    _.invoke(this.props, 'onSwipeableWillClose', this.props);
  };

  private onToggleSwipeLeft = (options?: any) => {
    if (this.props.onToggleSwipeLeft) {
      if (options?.triggerHaptic) {
        _.invoke(this.props, 'leftToggleHapticTrigger');
      }
      this.animateItem(options);
    }
  }

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
        _.invoke(this.props, 'onToggleSwipeLeft', this.props);
        // reset Drawer
        this.animateItem({released: false, resetItemPosition: true});
        this.closeDrawer();
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
    const action = _.find(actions, (o) => {
      // return o.text === event.nativeEvent.action;
      return o.name === event.nativeEvent.actionName;
    });
    _.invoke(action, 'onPress');
  };

  /** Renders */

  // TODO: enable support for rendering more than one left item
  private renderLeftActions = (progress: Animated.Value/* , dragX: Animated.Value */) => {
    const {leftItem} = this.props;
    const leftItems = leftItem ? [leftItem] : undefined;
    return this.renderActions(leftItems, progress/* , dragX */);
  };

  private renderRightActions = (progress: Animated.Value/* , dragX: Animated.Value */) => {
    const {rightItems} = this.props;
    return this.renderActions(rightItems, progress/* , dragX */);
  };

  private renderActions(items: ItemProps[] | undefined, progress: Animated.Value/* , dragX: Animated.Value */) {
    if (items) {
      return (
        // @ts-ignore
        <View animated row style={{transform: [{translateX: this.leftActionX}]}}>
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
      <RectButton
        key={index}
        testID={item.testID}
        style={[
          styles.action,
          item.style,
          {
            backgroundColor: item.background || DEFAULT_BG,
            width: item.width,
            minWidth: itemsMinWidth
          }
        ]}
        onPress={() => this.onActionPress(item)}
      >
        {item.icon && (
          <Animated.Image
            source={item.icon}
            style={[
              styles.actionIcon,
              {
                width: itemsIconSize,
                height: itemsIconSize,
                tintColor: itemsTintColor,
                opacity,
                transform: [{scale}]
              }
            ]}
          />
        )}
        {item.text && (
          <Animated.Text
            style={[
              styles.actionText,
              {
                color: itemsTintColor,
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
      </RectButton>
    );
  };

  render() {
    const {children, style, leftItem, rightItems, ...others} = this.props;

    return (
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
        onToggleSwipeLeft={this.onToggleSwipeLeft}
      >
        <View
          // flex
          accessible
          accessibilityActions={this.getAccessibilityActions()}
          onAccessibilityAction={this.onAccessibilityAction}
          {...extractAccessibilityProps(this.props)}
        >
          {children}
        </View>
      </Swipeable>
    );
  }
}

export default asBaseComponent<DrawerProps, typeof Drawer>(Drawer);

const styles = StyleSheet.create({
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
