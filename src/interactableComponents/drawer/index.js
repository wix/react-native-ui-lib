import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Animated, View, TouchableOpacity, TouchableHighlight} from 'react-native';
import Interactable from 'react-native-interactable';
import {BaseComponent, Constants, Colors, Typography} from '../../../src';


const SCALE_POINT = 72; // scaling content style by height
const MIN_LEFT_MARGIN = 28;
const DEFAULT_ICON_SIZE = 24;
const MIN_ITEM_WIDTH = 43; // NOTE: this is the min for the input ranges calc!
const ITEM_BG = Colors.blue30;
const ITEM_PADDING = 12;
const BLEED = 15;
const ITEM_PROP_TYPES = {
  width: PropTypes.number,
  background: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.number,
  onPress: PropTypes.func,
};

/**
 * @description: Interactable Drawer component
 * @extendslink: 
 */
export default class Drawer extends BaseComponent {
  static displayName = 'Drawer';

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
    /**
     * Press handler (will also close the drawer)
     */
    onPress: PropTypes.func,
  };

  static defaultProps = {
    damping: 1 - 0.6,
    tension: 300,
    itemsTintColor: Colors.white,
    itemsIconSize: DEFAULT_ICON_SIZE,
  }

  constructor(props) {
    super(props);

    this.deltaX = new Animated.Value(0);
    this.leftItemJSON = JSON.stringify(this.props.leftItem);
    this.rightItemsJSON = JSON.stringify(this.props.rightItems);

    this.state = {
      inMotion: false,
      position: 1,
      width: Constants.screenWidth,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.leftItemJSON !== JSON.stringify(nextProps.leftItem) || 
      this.rightItemsJSON !== JSON.stringify(nextProps.rightItems)) {
      this.closeDrawer();
    }
  }

  onAlert = ({nativeEvent}) => {
    const event = JSON.stringify(nativeEvent);

    if (event.includes('"first":"leave"')) {
      this.interactableElem.snapTo({index: 2});
    }
    if (event.includes('"second":"enter"')) {
      this.interactableElem.snapTo({index: 1});
    }
  }
  onSnap = ({nativeEvent}) => {
    const {index} = nativeEvent;
    this.setState({position: index});
  }
  onDrag = ({nativeEvent}) => {
    const {state} = nativeEvent;
    if (state === 'start') {
      this.setState({inMotion: true});
    }
  }
  onStop = () => {
    this.setState({inMotion: false});
  }
  onPress = () => {
    this.closeDrawer();
    setTimeout(() => {
      _.invoke(this.props, 'onPress');
    }, 0);
  }

  closeDrawer() {
    const {inMotion, position} = this.state;
    if (!inMotion && position !== 1) {
      this.interactableElem.snapTo({index: 1});
    }
  }
  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getMaxItemWidth() {
    const {rightItems} = this.props;
    const {width} = this.state;
    return rightItems ? (width - MIN_LEFT_MARGIN) / rightItems.length : (width - MIN_LEFT_MARGIN);
  }
  getMinItemWidth() {
    const {equalWidths} = this.props;
    const maxWidth = this.getMaxItemWidth();
    const minWidth = equalWidths ? maxWidth : MIN_ITEM_WIDTH;
    return (minWidth > maxWidth) ? maxWidth : minWidth;
  }
  getRightItemsTotalWidth(numberOfItems) {
    const {rightItems} = this.props;
    let total = 0;

    if (_.size(rightItems) > 0) {
      const items = rightItems.reverse();
      const size = numberOfItems && numberOfItems >= 0 ? numberOfItems : items.length;
      
      for (let i = 0; i < size; i++) {
        total += this.getItemWidth(items[i]);
      }
    }
    return total;
  }
  getItemWidth(item) {
    let width = this.getMinItemWidth();
    if (item && item.width) {
      width = Math.max(item.width, width);
      width = Math.min(width, this.getMaxItemWidth());
    }
    return width;
  }

  getBoundaries() {
    const {leftItem, rightItems} = this.props;
    const rightWidth = this.getRightItemsTotalWidth();
    const rightBound = rightWidth > 0 ? -rightWidth : 0;
    return {right: _.isEmpty(leftItem) ? 0 : this.getItemWidth(leftItem), left: _.isEmpty(rightItems) ? 0 : rightBound};
  }
  getSnapPoints() {
    const {leftItem, rightItems, damping, tension} = this.props;
    const size = rightItems ? rightItems.length : 0;
    
    const left = !_.isEmpty(leftItem) ? {x: this.getItemWidth(leftItem), damping: 1 - damping, tension} : {};
    const initial = {x: 0, damping: 1 - damping, tension};
    const last = rightItems && !_.isEmpty(rightItems[0]) ?
      {x: -(this.getRightItemsTotalWidth()), damping: 1 - damping, tension} : {};

    switch (size) {
      case 0: 
        return [left, initial];
      default:
        return [left, initial, last];
    }
  }
  getAlertAreas() {
    const {rightItems} = this.props;
    const size = rightItems ? rightItems.length : 0;

    const first = {id: 'first', influenceArea: {left: -(this.getRightItemsTotalWidth(1))}};
    const second = {id: 'second', influenceArea: {left: -(this.getRightItemsTotalWidth(size - 1))}};
    
    switch (size) {
      case 0: 
      case 1:
        return [];
      case 2:
        return [first];
      default:
        return [first, second];
    }
  }
  getInputRanges() {
    const {rightItems} = this.props;
    const size = rightItems ? rightItems.length : 0;
    const interval = 65;
    const inputRanges = [];
    
    for (let i = 0; i < size; i++) {
      const itemWidth = this.getItemWidth(rightItems[i]);
      const end = itemWidth - (size * BLEED);
      const min = -(itemWidth * (i + 1));
      const max = -(end + (interval * i));
      inputRanges.push([min, max]);
    }
    return inputRanges.reverse();
  }

  onLayout = (event) => {
    const {width, height} = event.nativeEvent.layout;
    
    const typography = height >= SCALE_POINT ? Typography.text70 : Typography.text80;
    const textTopMargin = height > SCALE_POINT ? 8 : 0;
    const itemPadding = height >= SCALE_POINT ? ITEM_PADDING : 8;
    
    this.setState({width, height, typography, textTopMargin, itemPadding});
  }; 

  renderLeftItem() {
    const {leftItem} = this.props;
    const leftItemWidth = this.getItemWidth(leftItem);
    const background = (leftItem ? leftItem.background : undefined) || ITEM_BG;
    const onLeftPress = leftItem ? leftItem.onPress : undefined;

    return (
      <View
        style={this.styles.leftItemContainer}
        pointerEvents={'box-none'}
      >
        <Animated.View
          style={{
            backgroundColor: background,
            position: 'absolute',
            left: 0,
            right: 0,
            transform: [{
              translateX: this.deltaX.interpolate({
                inputRange: [0, leftItemWidth],
                outputRange: [-leftItemWidth, 0],
                extrapolateRight: 'clamp',
              }),
            }],
          }}
        >
          <TouchableHighlight
            onPress={onLeftPress}
            underlayColor={Colors.getColorTint(background, 50)}
          >
            <View
              style={{
                height: this.state.height,
                width: leftItemWidth,
                padding: ITEM_PADDING,
                justifyContent: 'center',
                alignItems: 'center',
              }} 
            >
              {leftItem && leftItem.icon &&
              <Animated.Image
                source={leftItem.icon}
                style={
                [{
                  tintColor: this.props.itemsTintColor,
                  width: this.props.itemsIconSize,
                  height: this.props.itemsIconSize,
                  opacity: this.deltaX.interpolate({
                    inputRange: [leftItemWidth - BLEED, leftItemWidth],
                    outputRange: [0, 1],
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                  transform: [{
                    scale: this.deltaX.interpolate({
                      inputRange: [leftItemWidth - BLEED, leftItemWidth],
                      outputRange: [0.7, 1],
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                    }),
                  }],
                },
                ]}
              />}
              {leftItem && leftItem.text && 
              <Animated.Text
                numberOfLines={1}
                style={
                [{
                  color: this.props.itemsTintColor,
                  ...this.props.itemsTextStyle,
                  ...this.state.typography,
                  marginTop: this.state.textTopMargin,
                  opacity: this.deltaX.interpolate({
                    inputRange: [leftItemWidth - BLEED, leftItemWidth],
                    outputRange: [0, 1],
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                  transform: [{
                    scale: this.deltaX.interpolate({
                      inputRange: [leftItemWidth - BLEED, leftItemWidth],
                      outputRange: [0.7, 1],
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                    }),
                  }],
                },
                ]}
              >
                {leftItem.text}
              </Animated.Text>}
            </View>
          </TouchableHighlight>
        </Animated.View>
      </View>
    );
  }
  renderRightItem(item, index) {
    const inputRanges = this.getInputRanges();

    return (
      <TouchableOpacity
        key={index}
        style={[
          this.styles.item, {
            width: this.getItemWidth(item),
            backgroundColor: item.background || ITEM_BG,
            padding: this.state.itemPadding,
          },
        ]}
        onPress={item.onPress}
        activeOpacity={item.onPress ? 0.7 : 1}
      >
        {item.icon &&
        <Animated.Image
          source={item.icon}
          style={
          [{
            tintColor: this.props.itemsTintColor,
            width: this.props.itemsIconSize,
            height: this.props.itemsIconSize,
            opacity: this.deltaX.interpolate({
              inputRange: inputRanges[index],
              outputRange: [1, 0],
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            transform: [{
              scale: this.deltaX.interpolate({
                inputRange: inputRanges[index],
                outputRange: [1, 0.7],
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }],
          },
          ]}
        />}
        {item.text && 
        <Animated.Text
          numberOfLines={1}
          style={
          [{
            color: this.props.itemsTintColor,
            ...this.props.itemsTextStyle,
            ...this.state.typography,
            marginTop: this.state.textTopMargin,
            opacity: this.deltaX.interpolate({
              inputRange: inputRanges[index],
              outputRange: [1, 0],
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            transform: [{
              scale: this.deltaX.interpolate({
                inputRange: inputRanges[index],
                outputRange: [1, 0.7],
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }],
          },
          ]}
        >
          {item.text}
        </Animated.Text>}
      </TouchableOpacity>
    );
  }
  renderRightItems() {
    const {rightItems} = this.props;

    return (
      <View style={this.styles.rightItemsContainer}>
        {_.map(rightItems, (item, index) => { return this.renderRightItem(item, index); })}
      </View>
    );
  }
  render() {
    const {style, onPress, rightItems} = this.props;
    const Container = onPress ? TouchableOpacity : View;

    return (
      <View style={[style, this.styles.container]} onLayout={this.onLayout}>
        {rightItems && this.renderRightItems()}
        {this.renderLeftItem()}
        <Interactable.View
          ref={el => this.interactableElem = el}
          horizontalOnly
          boundaries={this.getBoundaries()}
          snapPoints={this.getSnapPoints()}
          alertAreas={this.getAlertAreas()}
          onAlert={this.onAlert}
          onSnap={this.onSnap}
          onDrag={this.onDrag}
          onStop={this.onStop}
          dragToss={0.01}
          animatedValueX={this.deltaX}
          style={{backgroundColor: Colors.white}}
        >
          <Container onPress={this.onPress} activeOpacity={0.7}>
            <View style={this.styles.childrenContainer}>
              {this.props.children}
            </View>
          </Container>
        </Interactable.View>
      </View>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      overflow: 'hidden',
    },
    childrenContainer: {
      left: 0,
      right: 0,
    },
    rightItemsContainer: {
      position: 'absolute',
      right: 0,
      height: '100%',
      flexDirection: 'row',
    },
    leftItemContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      flexDirection: 'row',
    },
    item: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
}
