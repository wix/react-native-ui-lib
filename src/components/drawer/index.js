import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import memoize from 'memoize-one';
import {Animated, Easing, StyleSheet, ViewPropTypes} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {PureBaseComponent} from '../../commons';
import {Constants} from '../../helpers';
import {Colors} from '../../style';
import View from '../../components/view';
import Swipeable from './Swipeable';

const DEFAULT_BG = Colors.blue30;
const ITEM_PROP_TYPES = {
  width: PropTypes.number,
  background: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.number,
  onPress: PropTypes.func,
  keepOpen: PropTypes.bool,
  style: ViewPropTypes.style,
  testID: PropTypes.string
};

/**
 * @description: Drawer Component
 * @important: If your app works with RNN, your screen must be wrapped
 * with gestureHandlerRootHOC from 'react-native-gesture-handler'. see
 * @importantLink: https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html#with-wix-react-native-navigation-https-githubcom-wix-react-native-navigation
 */
class NewDrawer extends PureBaseComponent {
  static displayName = 'Drawer';

  static propTypes = {
    /**
     * The drawer animation bounciness
     */
    bounciness: PropTypes.number,
    /**
     * OnDragStart handler
     */
    onDragStart: PropTypes.func,
    /**
     * The bottom layer's items to appear when opened from the right
     */
    rightItems: PropTypes.arrayOf(PropTypes.shape(ITEM_PROP_TYPES)),
    /**
     * The bottom layer's item to appear when opened from the left (a single item)
     */
    leftItem: PropTypes.shape(ITEM_PROP_TYPES),
    /**
     * Set a different minimum width
     */
    itemsMinWidth: PropTypes.number,
    /**
     * The color for the text and icon tint of the items
     */
    itemsTintColor: PropTypes.string,
    /**
     * The items' icon size
     */
    itemsIconSize: PropTypes.number,
    /**
     * The items' text style
     */
    itemsTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * Perform the animation in natively
     */
    useNativeAnimations: PropTypes.bool,
    /**
     * Whether to allow a full left swipe
     */
    fullSwipeLeft: PropTypes.bool,
    /**
     * Threshold for a left full swipe (0-1)
     */
    fullLeftThreshold: PropTypes.number,
    /**
     * Callback for left item full swipe
     */
    onFullSwipeLeft: PropTypes.func,
    /**
     * Callback for left item toggle swipe
     */
    onToggleSwipeLeft: PropTypes.func,
    /**
     * Callback for just before left item full swipe
     */
    onWillFullSwipeLeft: PropTypes.func,
    /**
     * Whether to allow a full right swipe
     */
    fullSwipeRight: PropTypes.bool,
    /**
     * Threshold for a right full swipe (0-1)
     */
    fullRightThreshold: PropTypes.number,
    /**
     * Callback for right item full swipe
     */
    onFullSwipeRight: PropTypes.func,
    /**
     * Callback for just before right item full swipe
     */
    onWillFullSwipeRight: PropTypes.func,
    /**
     * Haptic trigger function to use onToggleSwipeLeft
     */
    leftToggleHapticTrigger: PropTypes.func
  };

  static defaultProps = {
    itemsTintColor: Colors.white,
    itemsIconSize: 24
  };

  constructor(props) {
    super(props);

    this._swipeableRow = React.createRef();
    this.animationOptions = {bounciness: props.bounciness || 5};

    this.leftRender = props.leftItem ? (Constants.isRTL ? this.renderRightActions : this.renderLeftActions) : undefined;
    this.rightRender = props.rightItems
      ? Constants.isRTL
        ? this.renderLeftActions
        : this.renderRightActions
      : undefined;

    
    this.leftActionX = new Animated.Value(0);
  }

  /** Actions */

  getLeftActionsContainerStyle = memoize((leftItem, rightItems) => {
    return this.getActionsContainerStyle(Constants.isRTL ? rightItems : [leftItem]);
  })

  getRightActionsContainerStyle = memoize((rightItems, leftItem) => {
    return this.getActionsContainerStyle(Constants.isRTL ? [leftItem] : rightItems);
  })

  getActionsContainerStyle(items) {
    return {backgroundColor: _.get(_.first(items), 'background', DEFAULT_BG)};
  }

  closeDrawer = () => {
    this._swipeableRow.current.close();
  };

  openLeft = () => {
    this._swipeableRow.current.openLeft();
  };

  openLeftFull = () => {
    this._swipeableRow.current.openLeftFull();
  };

  toggleLeft = () => {
    this._swipeableRow.current.toggleLeft();
  };

  openRight = () => {
    this._swipeableRow.current.openRight();
  };

  openRightFull = () => {
    this._swipeableRow.current.openRightFull();
  };

  /** Events */

  onActionPress = (item) => {
    if (!item.keepOpen) {
      this.closeDrawer();
    }
    _.invoke(item, 'onPress', this.props);
  }

  onSwipeableWillOpen = () => {
    _.invoke(this.props, 'onSwipeableWillOpen', this.props);
  };

  onSwipeableWillClose = () => {
    _.invoke(this.props, 'onSwipeableWillClose', this.props);
  };

  onToggleSwipeLeft = ({rowWidth, leftWidth, dragX, released}) => {
    Animated.timing(this.leftActionX, {
      toValue: dragX ? dragX - leftWidth : rowWidth * 0.6 - leftWidth,
      easing: Easing.bezier(0.25, 1, 0.5, 1),
      duration: 200,
      delay: 100,
      useNativeDriver: true
    }).start(released && this.toggle());
  }

  toggle() {
    _.invoke(this.props, 'leftToggleHapticTrigger');
    setTimeout(() => {
      _.invoke(this.props, 'onToggleSwipeLeft');
    }, 500);
  }

  /** Accessability */

  getAccessibilityActions(withOnPress = false) {
    const {rightItems, leftItem} = this.props;
    const actions = [];

    if (leftItem?.onPress && leftItem.text) {
      const action = {name: leftItem.text, label: leftItem.text};
      if (withOnPress) {
        action.onPress = leftItem.onPress;
      }
      actions.push(action);
    }
    if (rightItems) {
      rightItems.forEach(item => {
        if (item.onPress && item.text) {
          const action = {name: item.text, label: item.text};
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
    const action = _.find(actions, (o) => {
      // return o.text === event.nativeEvent.action;
      return o.name === event.nativeEvent.actionName;
    });
    _.invoke(action, 'onPress');
  };

  /** Renders */

  // TODO: enable support for rendering more than one left item
  renderLeftActions = (progress, dragX) => {
    const {leftItem} = this.getThemeProps();
    const leftItems = leftItem ? [leftItem] : undefined;
    return this.renderActions(leftItems, progress, dragX);
  };

  renderRightActions = (progress, dragX) => {
    const {rightItems} = this.getThemeProps();
    return this.renderActions(rightItems, progress, dragX);
  };

  renderActions(items, progress, dragX) {
    if (items) {
      return (
        <View animated row style={{transform: [{translateX: this.leftActionX}]}}>
          {_.map(items, (item, index) => {
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

  renderAction = ({item, index, progress, itemsCount}) => {
    const {itemsTintColor, itemsIconSize, itemsTextStyle, itemsMinWidth} = this.getThemeProps();
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
    const {children, style, leftItem, rightItems, ...others} = this.getThemeProps();

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
          {...this.extractAccessibilityProps()}
        >
          {children}
        </View>
      </Swipeable>
    );
  }
}

export default NewDrawer;

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
