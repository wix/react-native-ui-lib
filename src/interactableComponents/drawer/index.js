import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Animated, View, TouchableOpacity, TouchableHighlight} from 'react-native';
import Interactable from 'react-native-interactable';
import {BaseComponent, Constants, Colors, Typography} from '../../../src';


const DEFAULT_HEIGHT = 72;
const ITEM_BG = {
  left: Colors.blue30,
  first: Colors.violet10,
  second: Colors.violet30,
  third: Colors.violet40,
};
const MIN_LEFT_MARGIN = 28;
const ITEM_PADDING = 12;
const BLEED = 25;
const ITEM = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  icon: PropTypes.number,
  beckground: PropTypes.string,
  width: PropTypes.number,
  closeDrawer: PropTypes.bool,
};

/**
 * @description: Interactable Drawer component
 * @extendslink: 
 */
export default class Drawer extends BaseComponent {
  static displayName = 'Drawer';

  static propTypes = {
    /**
     * The content for the drawer's top layer (a single child)
     */
    children: PropTypes.element.isRequired,
    /**
     * The drawer's height
     */
    height: PropTypes.number,
    /**
     * The drawer's width
     */
    width: PropTypes.number,
    /**
     * The drawer top layer's damping
     */
    damping: PropTypes.number,
    /**
     * The drawer top layer's tention
     */
    tension: PropTypes.number,
    /**
     * The bottom layer's items to appear when opened from the right (max. 3 items)
     */
    rightItems: PropTypes.arrayOf(PropTypes.shape(ITEM)),
    /**
     * The bottom layer's item to appear when opened from the left (a single item)
     */
    leftItem: PropTypes.shape(ITEM),
    /**
     * The color for the text and icon tint of the items
     */
    itemsTintColor: PropTypes.string,
    /**
     * Press handler (will also close the drawer)
     */
    onPress: PropTypes.func,
    /**
     * Press handler for items
     */
    onItemPress: PropTypes.func,
  };

  static defaultProps = {
    height: DEFAULT_HEIGHT,
    width: Constants.screenWidth,
    damping: 1 - 0.6,
    tension: 300,
    itemsTintColor: Colors.white,
  }

  constructor(props) {
    super(props);

    this.deltaX = new Animated.Value(0);
    this.minItemWidth = this.getMinItemWidth();
    this.maxItemWidth = this.getMaxItemWidth();
    
    this.state = {
      inMotion: false,
      position: 1,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) { //eslint-disable-line
    this.deltaX = new Animated.Value(0);
    this.minItemWidth = this.getMinItemWidth();
    this.maxItemWidth = this.getMaxItemWidth();
    this.setState({inMotion: false, position: 1});
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
  onItemPress(id) {
    const item = this.getItemById(id);
    if (item.closeDrawer) this.closeDrawer();
    setTimeout(() => {
      _.invoke(this.props, 'onItemPress', id);
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

  getMinItemWidth() {
    const {height} = this.props;
    const maxWidth = this.getMaxItemWidth();
    return (height > maxWidth) ? maxWidth : height;
  }
  getMaxItemWidth() {
    const {rightItems, width} = this.props;
    return (width - MIN_LEFT_MARGIN) / rightItems.length;
  }
  getItemById(id) {
    const {leftItem, rightItems} = this.props;
    return (id === leftItem.id) ? leftItem : _.find(rightItems, item => item.id === id);
  }
  getRightItemsTotalWidth(numberOfItems) {
    const items = this.props.rightItems;
    let total = 0;
    if (items.length > 0) {
      const index = items.length - numberOfItems || 0;
      for (let i = items.length - 1; i >= index; i--) {
        total += this.getItemWidth(items[i]);
      }
    }
    return total;
  }
  getLeftItemWidth() {
    const {leftItem} = this.props;
    return leftItem.width || this.minItemWidth;
  }
  getItemWidth(item) {
    if (item && item.width && item.width <= this.maxItemWidth) {
      return item.width;
    }
    return this.minItemWidth;
  }
  getBoundaries() {
    const {leftItem, rightItems} = this.props;
    const rightWidth = this.getRightItemsTotalWidth();
    const rightBound = rightWidth > 0 ? -rightWidth : -(this.minItemWidth * rightItems.length);
    const dragBounds = {right: _.isEmpty(leftItem) ? 0 : this.getLeftItemWidth(), left: _.isEmpty(rightItems) ? 0 : rightBound};
    return dragBounds;
  }
  getSnapPoints() {
    const {leftItem, rightItems, damping, tension} = this.props;
    const size = rightItems.length;
    
    const left = !_.isEmpty(leftItem) ? {x: this.getLeftItemWidth(), damping: 1 - damping, tension} : {};
    const zero = {x: 0, damping: 1 - damping, tension};
    const last = !_.isEmpty(rightItems[0]) ? {x: -(this.getRightItemsTotalWidth()), damping: 1 - damping, tension} : {};

    switch (size) {
      case 1:
      case 2:
      case 3:
        return [left, zero, last];
      default:
        return [left, zero];
    }
  }
  getAlertAreas() {
    const {rightItems} = this.props;
    const size = rightItems.length;
    
    const first = {id: 'first', influenceArea: {left: -(this.getItemWidth(rightItems[0]) || this.minItemWidth)}};
    const second = {id: 'second', influenceArea: {left: -(this.getRightItemsTotalWidth(2))}};
    
    switch (size) {
      case 2:
        return [first];
      case 3:
        return [first, second];
      default:
        return [];
    }
  }
  getInputRanges() {
    const {rightItems} = this.props;
    const size = rightItems.length;
    const end = this.minItemWidth - BLEED;
    const interval = 65;

    const first = [-(this.minItemWidth), -(end)];
    const second = [-(this.minItemWidth * 2), -(end + interval)];
    const third = [-(this.minItemWidth * 3), -(end + (interval * 2))];

    switch (size) {
      case 1:
        return [first];
      case 2:
        return [second, first];
      case 3:
        return [third, second, first];
      default:
        return [];
    }
  }

  renderLeftItem() {
    const {height, width, leftItem} = this.props;
    const leftItemWidth = this.getLeftItemWidth();
    const background = leftItem.background || ITEM_BG.left;

    return (
      <View
        style={{position: 'absolute', left: 0, right: width / 2, flexDirection: 'row'}}
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
            onPress={() => this.onItemPress(leftItem.id)}
            underlayColor={Colors.getColorTint(background, 50)}
          >
            <View
              style={{
                width: leftItemWidth,
                minWidth: this.minItemWidth,
                maxWidth: this.maxItemWidth,
                height,
                padding: ITEM_PADDING,
                justifyContent: 'center',
                alignItems: 'center',
              }} 
            >
              <Animated.Image
                source={leftItem.icon}
                style={
                [this.styles.buttonImage, {
                  opacity: this.deltaX.interpolate({
                    inputRange: [this.minItemWidth - BLEED, this.minItemWidth],
                    outputRange: [0, 1],
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                  transform: [{
                    scale: this.deltaX.interpolate({
                      inputRange: [this.minItemWidth - BLEED, this.minItemWidth],
                      outputRange: [0.7, 1],
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                    }),
                  }],
                },
                ]}
              />
              {leftItem.text && 
              <Animated.Text
                numberOfLines={1}
                style={
                [this.styles.buttonText, {
                  opacity: this.deltaX.interpolate({
                    inputRange: [this.minItemWidth - BLEED, this.minItemWidth],
                    outputRange: [0, 1],
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                  transform: [{
                    scale: this.deltaX.interpolate({
                      inputRange: [this.minItemWidth - BLEED, this.minItemWidth],
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
  renderRightItems() {
    const {height, rightItems} = this.props;
    const inputRanges = this.getInputRanges();

    return (
      <View style={{position: 'absolute', right: 0, height, flexDirection: 'row', alignItems: 'center'}}>
        
        {rightItems[0] && 
          <TouchableOpacity
            style={[
              this.styles.button, {
                width: rightItems[0].width,
                minWidth: this.minItemWidth,
                maxWidth: this.maxItemWidth,
                backgroundColor: rightItems[0].background || ITEM_BG.first,
              },
            ]}
            onPress={() => this.onItemPress(rightItems[0].id)}
            activeOpacity={0.7}
          >
            <Animated.Image
              source={rightItems[0].icon}
              style={
              [this.styles.buttonImage, {
                opacity: this.deltaX.interpolate({
                  inputRange: inputRanges[0],
                  outputRange: [1, 0],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
                transform: [{
                  scale: this.deltaX.interpolate({
                    inputRange: inputRanges[0],
                    outputRange: [1, 0.7],
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                }],
              },
              ]}
            />
            {rightItems[0].text && 
            <Animated.Text
              numberOfLines={1}
              style={
              [this.styles.buttonText, {
                opacity: this.deltaX.interpolate({
                  inputRange: inputRanges[0],
                  outputRange: [1, 0],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
                transform: [{
                  scale: this.deltaX.interpolate({
                    inputRange: inputRanges[0],
                    outputRange: [1, 0.7],
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                }],
              },
              ]}
            >
              {rightItems[0].text}
            </Animated.Text>}
          </TouchableOpacity>}
        
        {rightItems[1] && 
        <TouchableOpacity
          style={[
            this.styles.button, {
              width: rightItems[1].width,
              minWidth: this.minItemWidth,
              maxWidth: this.maxItemWidth,
              backgroundColor: rightItems[1].background || ITEM_BG.second,
            },
          ]}
          onPress={() => this.onItemPress(rightItems[1].id)}
          activeOpacity={0.7}
        >
          <Animated.Image
            source={rightItems[1].icon}
            style={
            [this.styles.buttonImage, {
              opacity: this.deltaX.interpolate({
                inputRange: inputRanges[1],
                outputRange: [1, 0],
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: [{
                scale: this.deltaX.interpolate({
                  inputRange: inputRanges[1],
                  outputRange: [1, 0.7],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }],
            },
            ]}
          />
          {rightItems[1].text && 
          <Animated.Text
            numberOfLines={1}
            style={
            [this.styles.buttonText, {
              opacity: this.deltaX.interpolate({
                inputRange: inputRanges[1],
                outputRange: [1, 0],
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: [{
                scale: this.deltaX.interpolate({
                  inputRange: inputRanges[1],
                  outputRange: [1, 0.7],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }],
            },
            ]}
          >
            {rightItems[1].text}
          </Animated.Text>}
        </TouchableOpacity>}
        
        {rightItems[2] && 
        <TouchableOpacity
          style={[
            this.styles.button, {
              width: rightItems[2].width,
              minWidth: this.minItemWidth,
              maxWidth: this.maxItemWidth,
              backgroundColor: rightItems[2].background || ITEM_BG.third,
            },
          ]}
          onPress={() => this.onItemPress(rightItems[2].id)}
          activeOpacity={0.7}
        >
          <Animated.Image
            source={rightItems[2].icon}
            style={
            [this.styles.buttonImage, {
              opacity: this.deltaX.interpolate({
                inputRange: inputRanges[2],
                outputRange: [1, 0],
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: [{
                scale: this.deltaX.interpolate({
                  inputRange: inputRanges[2],
                  outputRange: [1, 0.7],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }],
            },
            ]}
          />
          {rightItems[2].text && 
          <Animated.Text
            numberOfLines={1}
            style={
            [this.styles.buttonText, {
              opacity: this.deltaX.interpolate({
                inputRange: inputRanges[2],
                outputRange: [1, 0],
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: [{
                scale: this.deltaX.interpolate({
                  inputRange: inputRanges[2],
                  outputRange: [1, 0.7],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }],
            },
            ]}
          >
            {rightItems[2].text}
          </Animated.Text>}
        </TouchableOpacity>}
      </View>
    );
  }
  render() {
    const {style, height, width, onPress} = this.props;
    const Container = onPress ? TouchableOpacity : View;

    return (
      <View style={[style, this.styles.container, {width}]}>
        {this.renderRightItems()}
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
            <View style={{left: 0, right: 0, height}}>
              {this.props.children}
            </View>
          </Container>
        </Interactable.View>
      </View>
    );
  }
}

function createStyles(props) {
  const {height, itemsTintColor} = props;
  const typography = height >= DEFAULT_HEIGHT ? Typography.text70 : Typography.text80;
  const textTopMargin = height > DEFAULT_HEIGHT ? 8 : 0;
  const buttonPadding = height >= DEFAULT_HEIGHT ? ITEM_PADDING : 8;

  return StyleSheet.create({
    container: {
      overflow: 'hidden',
    },
    button: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: buttonPadding,
    },
    buttonImage: {
      width: 24,
      height: 24,
      tintColor: itemsTintColor,
    },
    buttonText: {
      ...typography,
      color: itemsTintColor,
      marginTop: textTopMargin,
    },
  });
}
