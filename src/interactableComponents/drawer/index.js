import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Animated, View, TouchableOpacity, TouchableHighlight} from 'react-native';
import Interactable from 'react-native-interactable';
import {BaseComponent, Constants, Colors, Typography} from '../../../src';


const ITEM_BG = Colors.violet30;
const MIN_LEFT_MARGIN = 28;
const ITEM_PADDING = 12;

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
     * The drawer top layer's damping
     */
    damping: PropTypes.number,
    /**
     * The drawer top layer's tention
     */
    tension: PropTypes.number,
    /**
     * The drawer top layer's movment boundaries
     */
    boundaries: PropTypes.shape({
      left: PropTypes.number,
      right: PropTypes.number,
      top: PropTypes.number,
      bottom: PropTypes.number,
      bounce: PropTypes.number,
      haptics: PropTypes.boolean,
    }),
    /**
     * The bottom layer's items to appear when opened from the right (max. 3 items)
     */
    rightItems: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      icon: PropTypes.number,
      text: PropTypes.string,
      style: PropTypes.string,
    })),
    /**
     * The bottom layer's item to appear when opened from the left (a single item)
     */
    leftItem: PropTypes.shape({
      id: PropTypes.string,
      icon: PropTypes.number,
      text: PropTypes.string,
      background: PropTypes.string,
    }),
    /**
     * Press handler
     */
    onPress: PropTypes.func,
    /**
     * Press handler for items
     */
    onItemPress: PropTypes.func,
  };

  static defaultProps = {
    height: 72,
    damping: 1 - 0.6,
    tension: 300,
  }

  constructor(props) {
    super(props);

    this.deltaX = new Animated.Value(0);
    this.itemWidth = props.height;
    this.minItemWidth = props.height;
    this.maxItemWidth = (Constants.screenWidth - MIN_LEFT_MARGIN) / props.rightItems.length;
    
    this.state = {
      inMotion: false,
      position: 1,
    };
  }

  onSnap = ({nativeEvent}) => {
    const { index } = nativeEvent;
    this.setState({position: index});
  }
  onDrag = ({nativeEvent}) => {
    const { state } = nativeEvent;
    if (state === 'start') {
      this.setState({inMotion: true});
    }
  }
  onStop = () => {
    this.setState({inMotion: false});
  }
  onPress = () => {
    const {inMotion, position} = this.state;
    if (!inMotion && position !== 1) {
      this.interactableElem.snapTo({index: 1});
    }
    _.invoke(this.props, 'onPress');
  }
  onItemPress(id) {
    _.invoke(this.props, 'onItemPress', id);
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getSnapPoints() {
    const {leftItem, rightItems, damping, tension} = this.props;
    const size = rightItems.length;
    
    const left = !_.isEmpty(leftItem) ? {x: this.itemWidth, damping: 1 - damping, tension} : {};
    const zero = {x: 0, damping: 1 - damping, tension};
    const first = !_.isEmpty(rightItems[0]) ? {x: -(this.itemWidth), damping: 1 - damping, tension} : {};
    const second = !_.isEmpty(rightItems[1]) ? {x: -(this.itemWidth * 2), damping: 1 - damping, tension} : {};
    const third = !_.isEmpty(rightItems[2]) ? {x: -(this.itemWidth * 3), damping: 1 - damping, tension} : {};

    switch (size) {
      case 1:
        return [left, zero, first];
      case 2:
        return [left, zero, first, second];
      case 3:
        return [left, zero, first, second, third];
      default:
        return [left, zero];
    }
  }

  getInputRanges() {
    const {rightItems} = this.props;
    const size = rightItems.length;

    const end = this.itemWidth - 25;
    const interval = 65;

    // const opacityInputRanges = [[-225, -180], [-150, -115], [-75, -50]];
    const first = [-(this.itemWidth), -(end)];
    const second = [-(this.itemWidth * 2), -(end + interval)];
    const third = [-(this.itemWidth * 3), -(end + (interval * 2))];

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
    const {height, leftItem} = this.props;

    return (
      <View style={{position: 'absolute', left: 0, right: 0, height, flexDirection: 'row'}}>
        <Animated.View
          style={{
            backgroundColor: leftItem.background || ITEM_BG,
            position: 'absolute',
            left: 0,
            right: 0,
            transform: [{
              translateX: this.deltaX.interpolate({
                inputRange: [0, this.itemWidth],
                outputRange: [-this.itemWidth, 0],
                extrapolateRight: 'clamp',
              }),
            }],
          }}
        >
          <TouchableOpacity
            style={{width: this.itemWidth, height, padding: ITEM_PADDING, justifyContent: 'center', alignItems: 'center'}} 
            onPress={() => this.onItemPress(leftItem.id)}
            activeOpacity={0.7}
          >
            <Animated.Image
              source={leftItem.icon}
              style={
              [this.styles.buttonImage, {
                opacity: this.deltaX.interpolate({
                  inputRange: [this.itemWidth - 25, this.itemWidth],
                  outputRange: [0, 1],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
                transform: [{
                  scale: this.deltaX.interpolate({
                    inputRange: [this.itemWidth - 25, this.itemWidth],
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
                  inputRange: [this.itemWidth - 25, this.itemWidth],
                  outputRange: [0, 1],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
                transform: [{
                  scale: this.deltaX.interpolate({
                    inputRange: [this.itemWidth - 25, this.itemWidth],
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
          </TouchableOpacity>
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
            style={[this.styles.button, {width: this.itemWidth, backgroundColor: rightItems[0].background || ITEM_BG}]}
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
          style={[this.styles.button, {width: this.itemWidth, backgroundColor: rightItems[1].background || ITEM_BG}]}
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
          style={[this.styles.button, {width: this.itemWidth, backgroundColor: rightItems[2].background || ITEM_BG}]}
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
    const {style, height, boundaries, leftItem, rightItems, onPress} = this.props;
    const Container = onPress ? TouchableHighlight : View;
    const snapPoints = this.getSnapPoints();
    const dragBounds = boundaries || 
      {right: _.isEmpty(leftItem) ? 0 : this.itemWidth, left: _.isEmpty(rightItems) ? 0 : -(this.itemWidth * rightItems.length)};

    return (
      <View style={style}>
        {this.renderRightItems()}
        {this.renderLeftItem()}
        <Interactable.View
          ref={el => this.interactableElem = el}
          horizontalOnly
          boundaries={dragBounds}
          snapPoints={snapPoints}
          onSnap={this.onSnap}
          onDrag={this.onDrag}
          onStop={this.onStop}
          dragToss={0.01}
          animatedValueX={this.deltaX}
        >
          <Container onPress={this.onPress} activeOpacity={0.3} underlayColor={Colors.white}>
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
  const {height} = props;
  const typography = height >= 72 ? Typography.text70 : Typography.text80;
  const gap = height > 72 ? 8 : 0;
  const buttonPadding = height >= 72 ? ITEM_PADDING : 8;

  return StyleSheet.create({
    container: {},
    button: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: buttonPadding,
    },
    buttonImage: {
      width: 24,
      height: 24,
      tintColor: Colors.white,
    },
    buttonText: {
      ...typography,
      color: Colors.white,
      marginTop: gap,
    },
  });
}
