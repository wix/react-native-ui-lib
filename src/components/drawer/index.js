import _pt from "prop-types";
import _ from 'lodash';
import React, { PureComponent } from 'react';
import memoize from 'memoize-one';
import { Animated, Easing, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { asBaseComponent } from "../../commons/new";
import { extractAccessibilityProps } from "../../commons/modifiers";
import { Constants } from "../../helpers";
import { Colors } from "../../style";
import View from "../view";
import Swipeable from "./Swipeable";
import { LogService } from "../../services";
const DEFAULT_BG = Colors.primary;
const DEFAULT_BOUNCINESS = 0;

/**
 * @description: Drawer Component
 * @important: If your app works with RNN, your screen must be wrapped
 * with gestureHandlerRootHOC from 'react-native-gesture-handler'. see
 * @importantLink: https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html#with-wix-react-native-navigation-https-githubcom-wix-react-native-navigation
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Drawer/Drawer.gif?raw=true
 */
class Drawer extends PureComponent {
  static propTypes = {
    /**
       * The drawer animation bounciness
       */
    bounciness: _pt.number,

    /**
       * The bottom layer's items to appear when opened from the right
       */
    rightItems: _pt.arrayOf(_pt.shape({
      width: _pt.number,
      background: _pt.string,
      text: _pt.string,
      icon: _pt.number,
      keepOpen: _pt.bool,
      testID: _pt.string
    })),

    /**
       * The bottom layer's item to appear when opened from the left (a single item)
       */
    leftItem: _pt.shape({
      width: _pt.number,
      background: _pt.string,
      text: _pt.string,
      icon: _pt.number,
      keepOpen: _pt.bool,
      testID: _pt.string
    }),

    /**
       * Set a different minimum width
       */
    itemsMinWidth: _pt.number,

    /**
       * The color for the text and icon tint of the items
       */
    itemsTintColor: _pt.string,

    /**
       * The items' icon size
       */
    itemsIconSize: _pt.number,

    /**
       * Perform the animation in natively
       */
    useNativeAnimations: _pt.bool,

    /**
       * Whether to allow a full left swipe
       */
    fullSwipeLeft: _pt.bool,

    /**
       * Threshold for a left full swipe (0-1)
       */
    fullLeftThreshold: _pt.number,

    /**
       * Whether to allow a full right swipe
       */
    fullSwipeRight: _pt.bool,

    /**
       * Threshold for a right full swipe (0-1)
       */
    fullRightThreshold: _pt.number,

    /**
       * Whether to disable the haptic
       */
    disableHaptic: _pt.bool,

    /**
       * Custom value of any type to pass on to the component and receive back in the action callbacks
       */
    customValue: _pt.any,

    /**
       * Used as testing identifier
       */
    testID: _pt.string
  };
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
    this.leftRender = props.leftItem ? Constants.isRTL ? this.renderRightActions : this.renderLeftActions : undefined;
    this.rightRender = props.rightItems ? Constants.isRTL ? this.renderLeftActions : this.renderRightActions : undefined;
  }

  getLeftActionsContainerStyle = memoize((leftItem, rightItems) => {
    return this.getActionsContainerStyle(Constants.isRTL ? rightItems : [leftItem]);
  });
  getRightActionsContainerStyle = memoize((rightItems, leftItem) => {
    return this.getActionsContainerStyle(Constants.isRTL ? [leftItem] : rightItems);
  });

  getActionsContainerStyle(items) {
    return {
      backgroundColor: _.get(_.first(items), 'background', DEFAULT_BG)
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

    _.invoke(item, 'onPress', this.props);
  };
  onSwipeableWillOpen = () => {
    _.invoke(this.props, 'onSwipeableWillOpen', this.props);
  };
  onSwipeableWillClose = () => {
    _.invoke(this.props, 'onSwipeableWillClose', this.props);
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
          _.invoke(this.props, 'onToggleSwipeLeft', this.props);
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

    const action = _.find(actions, o => {
      // return o.text === event.nativeEvent.action;
      return o.name === event.nativeEvent.actionName;
    });

    _.invoke(action, 'onPress');
  };
  /** Renders */
  // TODO: enable support for rendering more than one left item

  renderLeftActions = progress =>
  /* , dragX: Animated.Value */
  {
    const {
      leftItem
    } = this.props;
    const leftItems = leftItem ? [leftItem] : undefined;
    return this.renderActions(leftItems, progress
    /* , dragX */
    );
  };
  renderRightActions = progress =>
  /* , dragX: Animated.Value */
  {
    const {
      rightItems
    } = this.props;
    return this.renderActions(rightItems, progress
    /* , dragX */
    );
  };

  renderActions(items, progress)
  /* , dragX: Animated.Value */
  {
    if (items) {
      return (// @ts-ignore
        <View animated row style={{
          transform: [{
            translateX: this.leftActionX
          }]
        }}>
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
        {item.icon && <Animated.Image source={item.icon} style={[styles.actionIcon, {
        width: itemsIconSize,
        height: itemsIconSize,
        tintColor: itemsTintColor,
        opacity,
        transform: [{
          scale
        }]
      }]} />}
        {item.text && <Animated.Text style={[styles.actionText, {
        color: itemsTintColor,
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
      leftToggleHapticTrigger,
      ...others
    } = this.props;
    leftToggleHapticTrigger && LogService.deprecationWarn({
      component: 'Drawer',
      oldProp: 'leftToggleHapticTrigger'
    });
    return <Swipeable {...others} ref={this._swipeableRow} friction={1} containerStyle={style} animationOptions={this.animationOptions} renderLeftActions={this.leftRender} renderRightActions={this.rightRender} rightActionsContainerStyle={this.getRightActionsContainerStyle(rightItems, leftItem)} leftActionsContainerStyle={this.getLeftActionsContainerStyle(leftItem, rightItems)} onSwipeableWillOpen={this.onSwipeableWillOpen} onSwipeableWillClose={this.onSwipeableWillClose} onToggleSwipeLeft={onToggleSwipeLeft && this.onToggleSwipeLeft}>
        <View accessible accessibilityActions={this.getAccessibilityActions()} onAccessibilityAction={this.onAccessibilityAction} {...extractAccessibilityProps(this.props)}>
          {children}
        </View>
      </Swipeable>;
  }

}

export default asBaseComponent(Drawer);
const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems:
    /* Constants.isRTL ? 'flex-end' :  */
    'flex-start',
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