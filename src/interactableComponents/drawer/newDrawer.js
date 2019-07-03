import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {Animated, StyleSheet, ViewPropTypes} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {BaseComponent} from '../../commons';
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

class NewDrawer extends BaseComponent {
  static propTypes = {
    ...Swipeable.PropTypes,
    /**
     * The drawer top layer's damping
     */
    damping: PropTypes.number,
    /**
     * The drawer top layer's tension
     */
    tension: PropTypes.number,
    /**
     * Press handler - DEPRECATED
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
    itemsTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
  };

  constructor(props) {
    super(props);

    this._swipeableRow = React.createRef();
    this.rightActionsContainerStyle = this.getActionsContainerStyle(Constants.isRTL ? [props.leftItem] : props.rightItems);
    this.leftActionsContainerStyle = this.getActionsContainerStyle(Constants.isRTL ? props.rightItems : [props.leftItem]);
    this.animationOptions = {bounciness: 5};
    this.leftRender = Constants.isRTL ? this.renderRightActions : this.renderLeftActions;
    this.rightRender = Constants.isRTL ? this.renderLeftActions : this.renderRightActions;

    if (props.onPress !== undefined) {
      console.warn("Drawer's 'onPress' prop is deprecated. " +
        "For items, send 'onPress' handler in the item's object and for content use your own.");
    }
  }

  getActionsContainerStyle(items) {
    return {backgroundColor: _.get(_.first(items), 'background', DEFAULT_BG)};
  }

  closeDrawer = () => {
    this._swipeableRow.current.close();
  };

  onActionPress(item) {
    if (!item.keepOpen) {
      this.closeDrawer();
    }
    _.invoke(item, 'onPress');
  };

  onSwipeableWillOpen = () => {
    _.invoke(this.props, 'onSwipeableWillOpen', this.props);
  };
  onSwipeableWillClose = () => {
    _.invoke(this.props, 'onSwipeableWillClose', this.props);
  };

  // TODO: enable support for rendering more than one left item
  renderLeftActions = (progress, dragX) => {
    const {leftItem} = this.getThemeProps();
    return this.renderActions([leftItem], progress, dragX);
  };

  renderRightActions = (progress, dragX) => {
    const {rightItems} = this.getThemeProps();
    return this.renderActions(rightItems, progress, dragX);
  };

  renderActions(items, progress, dragX) {
    if (items) {
      return (
        <View row>
          {_.map(items, (item, index) => {
            return this.renderAction({
              item,
              index: items.length - index - 1,
              progress,
              dragX,
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
          {backgroundColor: item.background || DEFAULT_BG},
          {width: item.width},
          {minWidth: itemsMinWidth}
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
          >
            {item.text}
          </Animated.Text>
        )}
      </RectButton>
    );
  };

  render() {
    const {children, style, ...others} = this.props;
    return (
      <Swipeable
        {...others}
        ref={this._swipeableRow}
        friction={1}
        containerStyle={style}
        animationOptions={this.animationOptions}
        renderLeftActions={this.leftRender}
        renderRightActions={this.rightRender}
        rightActionsContainerStyle={this.rightActionsContainerStyle}
        leftActionsContainerStyle={this.leftActionsContainerStyle}
        onSwipeableWillOpen={this.onSwipeableWillOpen}
        onSwipeableWillClose={this.onSwipeableWillClose}
      >
        {children}
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
