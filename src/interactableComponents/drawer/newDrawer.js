import React from 'react';
import {Animated, StyleSheet} from 'react-native';
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

  onPress = text => {
    alert(text);
    this.close();
  };

  close = () => {
    this._swipeableRow.close();
  };

  updateRef = ref => {
    this._swipeableRow = ref;
  };

  renderLeftActions = (progress, dragX) => {
    const {leftItem} = this.getThemeProps();

    return (
      <View row>
        {this.renderAction({
          item: {background: DEFAULT_BG, ...leftItem},
          progress,
          dragX,
          index: 0,
          itemsCount: 1,
        })}
      </View>
    );
  };

  renderRightActions = (progress, dragX) => {
    const {rightItems} = this.getThemeProps();

    return (
      <View row>
        {/* <React.Fragment> */}
        {_.map(rightItems, (item, index) => {
          return this.renderAction({
            item,
            index: rightItems.length - index - 1,
            progress,
            dragX,
            itemsCount: rightItems.length,
          });
        })}
        {/* </React.Fragment> */}
      </View>
    );
  };

  // eslint-disable-next-line react/prop-types
  renderAction = ({item, index, progress, itemsCount}) => {
    const {itemsTintColor, itemsIconSize, itemsTextStyle} = this.getThemeProps();

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
        key={item.text}
        style={[styles.action, {backgroundColor: item.background}, !item.width ? {flex: 1} : {width: item.width}]}
        onPress={() => this.onPress(item.text)}
      >
        <Animated.Image
          source={item.icon}
          style={[
            styles.actionIcon,
            {tintColor: itemsTintColor, width: itemsIconSize, height: itemsIconSize, opacity, transform: [{scale}]},
          ]}
        />
        <Animated.Text
          style={[styles.actionText, {color: itemsTintColor, opacity, transform: [{scale}]}, itemsTextStyle]}
        >
          {item.text}
        </Animated.Text>
      </RectButton>
    );
  };

  positionWillChange = () => {
    // use for onDragStart
    console.warn('INBAL positionWillChange: ');
  };

  render() {
    const {children, rightItems, leftItem} = this.props;
    const leftRender = Constants.isRTL ? this.renderRightActions : this.renderLeftActions;
    const rightRender = Constants.isRTL ? this.renderLeftActions : this.renderRightActions;

    const rightActionsContainerStyle = {backgroundColor: _.get(_.first(rightItems), 'background')};
    const leftActionsContainerStyle = leftItem
      ? {backgroundColor: _.get(leftItem, 'background', DEFAULT_BG)}
      : undefined;

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
        onSwipeableLeftWillOpen={this.positionWillChange}
        onSwipeableRightWillOpen={this.positionWillChange}
        onSwipeableWillOpen={this.positionWillChange}
        onSwipeableWillClose={this.positionWillChange}
        animationOptions={{bounciness: 10}}
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
    // flex: 1, // apply for 'equalWidths'
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dd2c00',
  },
});
