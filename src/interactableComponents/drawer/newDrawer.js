import React from 'react';
import {Animated, StyleSheet, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';
import {RectButton} from 'react-native-gesture-handler';
import _ from 'lodash';

import Swipeable from './Swipeable';
import View from '../../components/view';
import {BaseComponent} from '../../commons';
import {Constants} from '../../helpers';
import {Colors} from '../../style';

const DEFAULT_BG = Colors.blue30;

const ITEM_PROP_TYPES = {
  width: PropTypes.number,
  background: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.number,
  onPress: PropTypes.func,
  keepOpen: PropTypes.bool,
  style: ViewPropTypes.style,
  testID: PropTypes.string,
};

export default class NewDrawer extends BaseComponent {
  static propTypes = {
    /**
     * The drawer top layer's damping
     */
    damping: PropTypes.number,
    /**
     * The drawer top layer's tention
     */
    tension: PropTypes.number,
    /**
     * Press handler
     */
    onPress: PropTypes.func,
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
     * Whether to give the items equal width (the max width)
     */
    equalWidths: PropTypes.bool,
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
  };

  onPress = item => {
    if (!item.keepOpen) {
      this.closeDrawer();
    }

    _.invoke(item, 'onPress');
  };

  closeDrawer = () => {
    this._swipeableRow.close();
  };

  updateRef = ref => {
    this._swipeableRow = ref;
  };

  getActionsContainerStyle(items) {
    return {backgroundColor: _.get(_.first(items), 'background', DEFAULT_BG)};
  }

  // TODO: enable support for rendering more than one left item
  renderLeftActions = (progress, dragX) => {
    const {leftItem} = this.getThemeProps();
    if (leftItem) {
      return this.renderActions([leftItem], progress, dragX);
    }
  };

  renderRightActions = (progress, dragX) => {
    const {rightItems} = this.getThemeProps();
    return this.renderActions(rightItems, progress, dragX);
  };

  renderActions(items, progress, dragX) {
    return (
      <View row>
        {_.map(items, (item, index) => {
          return this.renderAction({
            item,
            index: items.length - index - 1,
            progress,
            dragX,
            itemsCount: items.length,
          });
        })}
      </View>
    );
  }

  // eslint-disable-next-line react/prop-types
  renderAction = ({item, index, progress, itemsCount}) => {
    const {itemsTintColor, itemsIconSize, itemsTextStyle, itemsMinWidth} = this.getThemeProps();
    const inputRange = [index / itemsCount, (index + 1) / itemsCount];
    const outputRange = [0.2, 1];

    const scale = progress.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    });

    const opacity = progress.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    });

    return (
      <RectButton
        key={index}
        testID={item.testID}
        style={[styles.action, item.style, {backgroundColor: item.background || DEFAULT_BG}, {width: item.width}, {minWidth: itemsMinWidth}]}
        onPress={() => this.onPress(item)}
      >
        {item.icon && (
          <Animated.Image
            source={item.icon}
            style={[
              styles.actionIcon,
              {tintColor: itemsTintColor, width: itemsIconSize, height: itemsIconSize, opacity, transform: [{scale}]},
            ]}
          />
        )}
        {item.text && (
          <Animated.Text
            style={[styles.actionText, {color: itemsTintColor, opacity, transform: [{scale}]}, itemsTextStyle]}
          >
            {item.text}
          </Animated.Text>
        )}
      </RectButton>
    );
  };

  // positionWillChange = () => {};

  render() {
    const {children, rightItems, leftItem, onDragStart, style} = this.props;
    const leftRender = Constants.isRTL ? this.renderRightActions : this.renderLeftActions;
    const rightRender = Constants.isRTL ? this.renderLeftActions : this.renderRightActions;

    const rightActionsContainerStyle = this.getActionsContainerStyle(Constants.isRTL ? [leftItem] : rightItems);
    const leftActionsContainerStyle = this.getActionsContainerStyle(Constants.isRTL ? rightItems : [leftItem]);

    return (
      <Swipeable
        ref={this.updateRef}
        friction={1}
        // leftThreshold={80}
        // rightThreshold={40}
        renderLeftActions={leftRender}
        renderRightActions={rightRender}
        rightActionsContainerStyle={rightActionsContainerStyle}
        leftActionsContainerStyle={leftActionsContainerStyle}
        // onSwipeableLeftWillOpen={this.positionWillChange}
        // onSwipeableRightWillOpen={this.positionWillChange}
        // onSwipeableWillOpen={this.positionWillChange}
        // onSwipeableWillClose={this.positionWillChange}
        onDragStart={onDragStart}
        animationOptions={{bounciness: 10}}
        containerStyle={style}
      >
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: /* Constants.isRTL ? 'flex-end' :  */ 'flex-start',
    backgroundColor: '#388e3c',
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
  actionText: {
    color: '#ffffff',
  },
  action: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dd2c00',
  },
});
