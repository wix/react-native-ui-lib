import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Switch, Button, Colors, Typography, PanListenerView, PanningProvider, PanAnimatableView} from 'react-native-ui-lib'; //eslint-disable-line

const PAN_LISTENER_VIEW_HEIGHT = 100;

export default class PanAnimatableScreen extends Component {
  constructor(props) {
    super(props);
    this.key = 0;
    this.currentLocationIndex = 0;
    this.locations = [{left: 100, top: 200}, {left: 100, top: 100}, {left: 150, top: 100}, {left: 100, top: 150}];
    this.state = this.getDefaultState();
  }

  getDefaultState = () => {
    return ({
        to: this.locations[this.currentLocationIndex],
        isAnimating: true,
        isCoupled: false,
        key: this.key,
      });
  }

  goToNextLocation = () => {
    this.currentLocationIndex = this.currentLocationIndex + 1;
    if (this.currentLocationIndex === this.locations.length) {
      this.currentLocationIndex = 0;
    }

    this.setState({
      to: this.locations[this.currentLocationIndex],
      isAnimating: true,
    });
  }

  reset = () => {
    this.key = this.key + 1;
    this.currentLocationIndex = 0;
    this.setState(this.getDefaultState());
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
    const {isAnimating, isCoupled, to, key} = this.state;
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
              <Button style={styles.button} label={'Reset'} size={Button.sizes.xSmall} onPress={this.reset}/>
              <Button style={styles.button} label={'Next'} size={Button.sizes.xSmall} onPress={this.goToNextLocation}/>
            </View>
          </View>
        </View>
        <PanningProvider>
          {!isCoupled && panListener}
          <PanAnimatableView
            key={key}
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
