import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {BaseComponent} from '../../commons';
import {Constants} from '../../helpers';
// import {Colors, Typography} from '../../style';
import Assets from '../../assets';


export default class NewDrawer extends BaseComponent {
  constructor(props) {
    super(props);

    console.warn('INBAL isRTL: ', Constants.isRTL);
  }

  onPress = (text) => {
    alert(text);
    this.close();
  }

  close = () => {
    this._swipeableRow.close();
  }

  updateRef = ref => {
    this._swipeableRow = ref;
  }

  renderLeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: /* Constants.isRTL ? [-80, 0] :  */[0, 80],
      outputRange: /* Constants.isRTL ? [1, 0] :  */[0, 1],
      extrapolate: 'clamp',
    });
    
    return (
      <RectButton style={styles.leftAction} onPress={() => this.onPress()}>
        <Animated.Image 
          source={Assets.icons.checkSmall} 
          style={[styles.actionIcon, {tintColor: '#ffffff'}, {transform: [{scale}]}]}
        />
        <Animated.Text style={[styles.actionText, {marginLeft: 10}, {transform: [{scale}]}]}>Dump</Animated.Text>
      </RectButton>
    );
  }

  renderRightActions = (progress, dragX) => {
    return (
      <View style={{width: 280, flexDirection: 'row'}}>
        {this.renderRightAction(progress, dragX, '#C8C7CD', 140, 'More', Assets.icons.checkSmall)}
        {this.renderRightAction(progress, dragX, '#ffab00', 50, 'Trash', Assets.icons.checkSmall)}
        {this.renderRightAction(progress, dragX, '#dd2c00', 90, 'Boom', Assets.icons.checkSmall)}
      </View>
    );
  }

  renderRightAction = (progress, dragX, backgroundColor, width, text, icon) => {
    const scale = dragX.interpolate({
      inputRange: /* Constants.isRTL ? [0, 80] :  */[-80, 0],
      outputRange: /* Constants.isRTL ? [0, 1] :  */[1, 0],
      extrapolate: 'clamp',
    });
    
    return (
      <RectButton style={[styles.rightAction, {backgroundColor}, {width}]} onPress={() => this.onPress(text)}>
        <Animated.Image source={icon} style={[styles.actionIcon, {tintColor: '#ffffff'}, {transform: [{scale}]}]}/>
        <Animated.Text style={[styles.actionText, {transform: [{scale}]}]}>{text}</Animated.Text>
      </RectButton>
    );
  }

  positionWillChange = () => { // use for onDragStart
    console.warn('INBAL positionWillChange: ');
  }
  
  render() {
    const {children} = this.props;
    const leftRender = /* Constants.isRTL ? this.renderRightActions :  */this.renderLeftActions;
    const rightRender = /* Constants.isRTL ? this.renderLeftActions :  */this.renderRightActions;

    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={80}
        rightThreshold={40}
        renderLeftActions={leftRender}
        renderRightActions={rightRender}
        onSwipeableLeftWillOpen={this.positionWillChange}
        onSwipeableRightWillOpen={this.positionWillChange}
        onSwipeableWillOpen={this.positionWillChange}
        onSwipeableWillClose={this.positionWillChange}
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
    alignItems: /* Constants.isRTL ? 'flex-end' :  */'flex-start',
    backgroundColor: '#388e3c'
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
  actionText: {
    color: '#ffffff'
  },
  rightAction: {
    // flex: 1, // apply for 'equalWidths'
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dd2c00'
  }
});
