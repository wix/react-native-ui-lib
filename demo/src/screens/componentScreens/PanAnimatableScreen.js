import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Switch, Button, Colors, Typography, PanListenerView, PanningProvider, PanAnimatableView} from 'react-native-ui-lib'; //eslint-disable-line

const PAN_LISTENER_VIEW_HEIGHT = 100;

export default class PanAnimatableScreen extends Component {
  constructor(props) {
    super(props);
    this.locations = [{left: 0, top: 0}, {left: 100, top: 0}, {left: 100, top: 100}, {left: 0, top: 100}];
    this.state = {
      ...this.getDefaultState(),
      isCoupled: false,
      isAnimating: false,
    };
  }

  getDefaultState = () => {
    return ({
        index: 0,
        to: this.locations[0],
      });
  }

  goToNextLocation = () => {
    const {index} = this.state;
    let nextIndex = index + 1;
    if (nextIndex === this.locations.length) {
      nextIndex = 0;
    }

    this.setState({
      index: nextIndex,
      to: this.locations[nextIndex],
      isAnimating: true,
    });
  }

  reset = () => {
    this.setState({
      ...this.getDefaultState(),
      isAnimating: this.state.index !== 0,
    });
  }

  switchExample = () => {
    const {isCoupled} = this.state;
    if (isCoupled) {
      this.setState({
        isCoupled: false,
      });
    } else {
      this.setState({
        isCoupled: true,
      });
    }
  }

  onAnimationEnd = () => {
    this.setState({isAnimating: false});
  }

  renderPanListener = () => {
    const {isCoupled} = this.state;
    const directions = isCoupled ? [PanningProvider.Directions.UP, PanningProvider.Directions.DOWN] : undefined;
    const text = isCoupled ? "Drag up\\down" : "Drag here";

    return (
      <PanListenerView style={styles.panListener} directions={directions}>
        <Text style={styles.largeText}>{text}</Text>
      </PanListenerView>
    );
  }

  render() {
    const {isAnimating, isCoupled, to} = this.state;
    const panListener = this.renderPanListener();

    return (
      <View flex bg-dark80>
        <View style={styles.header}>
          <Text style={styles.largeText}>Pan Animatable</Text>
          <View>
            <View row>
              <Switch value={isCoupled} onValueChange={this.switchExample} disabled={isAnimating} style={styles.switch}/>
              <Text style={styles.smallText}>{isCoupled ? 'Coupled' : 'Uncoupled'}</Text>
            </View>
            <View row>
              <Button style={styles.button} label={'Reset'} size={Button.sizes.xSmall} onPress={this.reset} disabled={isAnimating}/>
              <Button style={styles.button} label={'Next'} size={Button.sizes.xSmall} onPress={this.goToNextLocation} disabled={isAnimating}/>
            </View>
          </View>
        </View>
        <PanningProvider>
          {!isCoupled && panListener}
          <PanAnimatableView
            style={[styles.panAnimatable, {marginTop: isCoupled ? PAN_LISTENER_VIEW_HEIGHT : undefined}]}
            to={to}
            onAnimationEnd={this.onAnimationEnd}
          >
            {isCoupled && panListener}
          </PanAnimatableView>
        </PanningProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
  },
  panAnimatable: {
    width: 250,
    height: 250,
    backgroundColor: Colors.blue30,
  },
  panListener: {
    width: '100%',
    height: PAN_LISTENER_VIEW_HEIGHT,
    backgroundColor: Colors.blue60,
    justifyContent: 'center',
  },
  largeText: {
    ...Typography.text50,
    marginLeft: 40,

  },
  smallText: {
    ...Typography.text70,
    marginLeft: 20,
  },
  switch: {
    marginLeft: 20,
    alignSelf: 'center',
  },
  button: {
    marginLeft: 20,
    marginTop: 5,
    alignSelf: 'baseline',
  },
});
