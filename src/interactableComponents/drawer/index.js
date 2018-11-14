import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Animated, View, TouchableOpacity, TouchableHighlight} from 'react-native';
import Interactable from 'react-native-interactable';
import {BaseComponent, Colors} from '../../../src';


/**
 * @description: Interactable Drawer component
 * @extendslink: 
 */
export default class Drawer extends BaseComponent {
  static displayName = 'Drawer';

  static propTypes = {
    /**
     * The content for the drawer's top layer (one child view only)
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
     * The bottom layer's items to appear when opened from the right
     */
    rightItems: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      icon: PropTypes.number,
    })),
    /**
     * The bottom layer's item to appear when opened from the left
     */
    leftItem: PropTypes.shape({
      id: PropTypes.string,
      icon: PropTypes.number,
      style: PropTypes.oneOf([PropTypes.object, PropTypes.number, PropTypes.array]),
    }),
    /**
     * Press handler
     */
    onPress: PropTypes.func,
    /**
     * Press handler for buttons
     */
    onButtonPress: PropTypes.func,
  };

  static defaultProps = {
    height: 75,
    damping: 1 - 0.6,
    tension: 300,
  }

  constructor(props) {
    super(props);

    this.deltaX = new Animated.Value(0);
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
  onButtonPress(id) {
    _.invoke(this.props, 'onButtonPress', id);
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  renderleftItem() {
    const {height, leftItem} = this.props;

    return (
      <View style={{position: 'absolute', left: 0, height, flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity style={[leftItem.style, this.styles.button]} onPress={() => this.onButtonPress(leftItem.id)}>
          <Animated.Image
            source={leftItem.icon}
            style={
            [this.styles.buttonImage, {
              opacity: this.deltaX.interpolate({
                inputRange: [50, 75],
                outputRange: [0, 1],
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: [{
                scale: this.deltaX.interpolate({
                  inputRange: [50, 75],
                  outputRange: [0.7, 1],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }],
            },
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderRightItems() {
    const {height, rightItems} = this.props;

    return (
      <View style={{position: 'absolute', right: 0, height, flexDirection: 'row', alignItems: 'center'}}>
        
        {rightItems[0] && <TouchableOpacity style={[this.styles.button]} onPress={() => this.onButtonPress(rightItems[0].id)}>
          <Animated.Image
            source={rightItems[0].icon}
            style={
            [this.styles.buttonImage, {
              opacity: this.deltaX.interpolate({
                inputRange: [-225, -180],
                outputRange: [1, 0],
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: [{
                scale: this.deltaX.interpolate({
                  inputRange: [-225, -180],
                  outputRange: [1, 0.7],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }],
            },
            ]}
          />
        </TouchableOpacity>}
        {rightItems[1] && <TouchableOpacity style={[this.styles.button]} onPress={() => this.onButtonPress(rightItems[1].id)}>
          <Animated.Image
            source={rightItems[1].icon}
            style={
            [this.styles.buttonImage, {
              opacity: this.deltaX.interpolate({
                inputRange: [-150, -115],
                outputRange: [1, 0],
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: [{
                scale: this.deltaX.interpolate({
                  inputRange: [-150, -115],
                  outputRange: [1, 0.7],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }],
            },
            ]}
          />
        </TouchableOpacity>}
        {rightItems[2] && <TouchableOpacity style={[this.styles.button]} onPress={() => this.onButtonPress(rightItems[2].id)}>
          <Animated.Image
            source={rightItems[2].icon}
            style={
            [this.styles.buttonImage, {
              opacity: this.deltaX.interpolate({
                inputRange: [-75, -50],
                outputRange: [1, 0],
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: [{
                scale: this.deltaX.interpolate({
                  inputRange: [-75, -50],
                  outputRange: [1, 0.7],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }],
            },
            ]}
          />
        </TouchableOpacity>}
      
      </View>
    );
  }

  render() {
    const {style, height, leftItem, rightItems, damping, tension} = this.props;
    const leftSnapPoint = !_.isEmpty(leftItem) ? {x: 75, damping: 1 - damping, tension} : {};
    const firstRightSnapPoint = !_.isEmpty(rightItems[0]) ? {x: 0, damping: 1 - damping, tension} : {};
    const secondRightSnapPoint = !_.isEmpty(rightItems[1]) ? {x: -150, damping: 1 - damping, tension} : {};
    const thirdRightSnapPoint = !_.isEmpty(rightItems[2]) ? {x: -225, damping: 1 - damping, tension} : {};

    return (
      <View style={style}>
        {this.renderRightItems()}
        {leftItem && this.renderleftItem()}
        <Interactable.View
          ref={el => this.interactableElem = el}
          horizontalOnly
          snapPoints={[
            leftSnapPoint,
            firstRightSnapPoint,
            secondRightSnapPoint,
            thirdRightSnapPoint,
          ]}
          onSnap={this.onSnap}
          onDrag={this.onDrag}
          onStop={this.onStop}
          dragToss={0.01}
          animatedValueX={this.deltaX}
        >
          <TouchableHighlight onPress={this.onPress} activeOpacity={0.7} underlayColor={Colors.white}>
            <View style={{left: 0, right: 0, height}}>
              {this.props.children}
            </View>
          </TouchableHighlight>
        </Interactable.View>
      </View>
    );
  }
}

function createStyles(props) {
  const {height} = props;

  return StyleSheet.create({
    container: {},
    button: {
      width: height,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonImage: {
      width: 40,
      height: 40,
    },
  });
}
