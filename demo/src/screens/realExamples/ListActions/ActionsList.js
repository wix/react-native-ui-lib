import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Animated, LayoutAnimation, PanResponder, I18nManager} from 'react-native';
import {Constants, Assets, Colors, View, TouchableOpacity, Button, Text} from 'react-native-ui-lib'; //eslint-disable-line


const icon1 = require('../../../assets/icons/share.png');
const icon2 = require('../../../assets/icons/star.png');
const icon3 = require('../../../assets/icons/tags.png');
const icon4 = require('../../../assets/icons/collections.png');

const INITIAL_WIDTH = 40;
const DIRECTIONS = {
  LEFT: 'left',
  RIGHT: 'right'
};

export default class ActionsList extends Component {
  static displayName = 'ActionsList';
  
  static propTypes = {
    item: PropTypes.object,
    index: PropTypes.number
  }

  constructor(props) {
    super(props);
    
    this.state = {
      animationValue: new Animated.Value(0),
      animationValue2: new Animated.Value(0),
      rightPanelWidth: INITIAL_WIDTH,
      leftPanelWidth: INITIAL_WIDTH
    };

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      // onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd
    });
  }

  componentDidUpdate(prevProps) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  handleMoveShouldSetPanResponder = (e, gestureState) => {
    // return true if user is swiping, return false if it's a single click
    const {dx, dy} = gestureState;
    return dx > 5 || dx < -5 || dy > 5 || dy < -5;
  };
  // handlePanResponderGrant = (e, gestureState) => {
  // };
  handlePanResponderMove = (e, gestureState) => {
    if (gestureState.dx < 0 && this.direction !== DIRECTIONS.LEFT) {
      this.direction = I18nManager.isRTL ? DIRECTIONS.RIGHT : DIRECTIONS.LEFT;
    } else if (gestureState.dx > 0 && this.direction !== DIRECTIONS.RIGHT) {
      this.direction = I18nManager.isRTL ? DIRECTIONS.LEFT : DIRECTIONS.RIGHT;
    }
  };
  handlePanResponderEnd = () => {
    this.animate();
    this.direction = undefined;
  };

  closePanels = () => {
    if (this.rightPanel) {
      this.animate(DIRECTIONS.RIGHT);
    } 
    if (this.leftPanel) {
      this.animate(DIRECTIONS.LEFT);
    }
  }

  animate(panelDirection) {
    if (panelDirection) {
      this.direction = panelDirection;
    }
    
    const {animationValue, animationValue2} = this.state;
    
    if (this.direction === DIRECTIONS.LEFT && !this.rightPanel && !this.leftPanel) { // open rightPanel
      Animated.spring(animationValue, {
        toValue: 1,
        speed: 2000,
        bounciness: 0
      }).start();
      setTimeout(() => {
        this.setState({rightPanelWidth: Constants.screenWidth - 40});
      }, 100);
      this.rightPanel = !this.rightPanel;
    } else if (this.direction === DIRECTIONS.RIGHT && this.rightPanel) { // close rightPanel
      this.setState({rightPanelWidth: INITIAL_WIDTH}, () => {
        Animated.spring(animationValue, {
          toValue: 0,
          speed: 20,
          bounciness: 0,
          delay: 500
        }).start();
      });
      this.rightPanel = !this.rightPanel;
    } else if (this.direction === DIRECTIONS.RIGHT && !this.leftPanel && !this.rightPanel) { // open leftPanel
      Animated.spring(animationValue2, {
        toValue: 1,
        speed: 2000,
        bounciness: 0
      }).start();
      setTimeout(() => {
        this.setState({leftPanelWidth: 64});
      }, 100);
      this.leftPanel = !this.leftPanel;
    } else if (this.direction === DIRECTIONS.LEFT && this.leftPanel) { // close leftPanel
      this.setState({leftPanelWidth: INITIAL_WIDTH}, () => {
        Animated.spring(animationValue2, {
          toValue: 0,
          speed: 20,
          bounciness: 0,
          delay: 500
        }).start();
        this.leftPanel = !this.leftPanel;
      });
    }
  }

  renderLeftPanel() {
    const {leftPanelWidth, animationValue2} = this.state;

    return (
      <Animated.View 
        style={{
          position: 'absolute',
          alignSelf: 'flex-start',
          padding: 20,
          opacity: animationValue2,
          transform: [
            {scale: animationValue2}
          ]
        }}
      >
        <View 
          style={{
            overflow: 'hidden',
            height: INITIAL_WIDTH,
            width: leftPanelWidth, 
            backgroundColor: Colors.rgba(Colors.red20, 0.9), 
            borderRadius: 20
          }}
        >
          {leftPanelWidth > INITIAL_WIDTH &&
          <View paddingH-16 paddingV-4>
            <Button
              size={'xSmall'}
              round
              backgroundColor="transparent"
              iconSource={icon4}
              iconStyle={{tintColor: Colors.white}}
              onPress={() => {
                // console.warn('left action press');
                this.animate(DIRECTIONS.LEFT);
              }}
            />
          </View>}
        </View>
      </Animated.View>
    );
  }

  renderRightPanel() {
    const {rightPanelWidth, animationValue} = this.state;

    return (
      <Animated.View 
        style={{
          position: 'absolute',
          alignSelf: 'flex-end',
          padding: 20,
          opacity: animationValue,
          transform: [
            {scale: animationValue}
          ]
        }}
      >
        <View 
          style={{
            overflow: 'hidden',
            height: INITIAL_WIDTH,
            width: rightPanelWidth,
            backgroundColor: Colors.rgba(Colors.violet30, 0.9), 
            borderRadius: 20
          }}
        >
          {rightPanelWidth > INITIAL_WIDTH &&
          <View row spread paddingH-16 paddingV-4>
            <Button
              size={'xSmall'}
              round
              backgroundColor="transparent"
              iconSource={Assets.icons.x}
              iconStyle={{tintColor: Colors.white}}
              onPress={() => {
                // console.warn('dismiss press');
                this.animate(DIRECTIONS.RIGHT);
              }}
            />
            <Button
              size={'xSmall'}
              round
              backgroundColor="transparent"
              iconSource={icon1}
              iconStyle={{tintColor: Colors.white}}
              onPress={() => {
                // console.warn('action 1 press');
                this.animate(DIRECTIONS.RIGHT);
              }}
            />
            <Button
              size={'xSmall'}
              round
              backgroundColor="transparent"
              iconSource={icon2}
              iconStyle={{tintColor: this.state.selected ? Colors.yellow40 : Colors.white}}
              onPress={() => {
                // console.warn('action 2 press');
                this.setState({selected: !this.state.selected});
              }}
            />
            <Button
              size={'xSmall'}
              round
              backgroundColor="transparent"
              iconSource={icon3}
              iconStyle={{tintColor: Colors.white}}
              // onPress={() => console.warn('action 3 press')}
            />
          </View>}
        </View>
      </Animated.View>
    );
  }

  render() {
    const {item, index} = this.props;

    return (
      <View 
        style={{
          height: 80,
          backgroundColor: Colors.white,
          borderBottomWidth: 1,
          borderBottomColor: Colors.dark70
        }}
        {...this.panResponder.panHandlers}
      >
        <TouchableOpacity flex center activeOpacity={0.5} onPress={this.closePanels}>
          <View row>
            <Text text80 dark10 style={{alignSelf: 'center'}}>{item.text} #{item.id}</Text>
            <Text text60 marginH-12>Swipe to any direction</Text>
            <Button size={'small'} label={`Button #${index}`} onPress={() => console.warn(`button ${index} press`)}/>
          </View>
        </TouchableOpacity>
        {this.renderLeftPanel()}
        {this.renderRightPanel()}
      </View>
    );
  }
}
