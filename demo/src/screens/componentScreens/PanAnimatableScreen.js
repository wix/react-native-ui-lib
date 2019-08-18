import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Switch, Button, Colors, Typography, PanListenerView, PanningProvider, PanAnimatableView} from 'react-native-ui-lib'; //eslint-disable-line

const PAN_LISTENER_VIEW_HEIGHT = 100;

export default class PanAnimatableScreen extends Component {
  constructor(props) {
    super(props);
    this.key = 0;
    this.state = this.getDefaultState();
  }

  getDefaultState = () => {
    return ({
        from: {left: 50, top: 50},
        to: {left: 150, top: 150},
        isAnimating: true,
        isCoupled: false,
        key: this.key,
      });
  }

  reset = () => {
    this.key = this.key + 1;
    this.setState(this.getDefaultState());
  }

  switchExample = () => {
    const {isCoupled, from} = this.state;
    if (isCoupled) {
      this.setState({
        isCoupled: false,
        from: {left: from.left, top: from.top - PAN_LISTENER_VIEW_HEIGHT},
        to: {left: from.left, top: from.top - PAN_LISTENER_VIEW_HEIGHT},
      });
    } else {
      this.setState({
        isCoupled: true,
        from: {left: from.left, top: from.top + PAN_LISTENER_VIEW_HEIGHT},
        to: {left: from.left, top: from.top + PAN_LISTENER_VIEW_HEIGHT},
      });
    }
  }

  onAnimationEnd = () => {
    const {to} = this.state;
    this.setState({isAnimating: false, from: to});
  }

  onPanLocationChanged = (location) => {
    this.setState({from: location});
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
    const {isAnimating, isCoupled, from, to} = this.state;
    const panListener = this.renderPanListener();

    return (
      <View flex bg-dark80>
        <View style={styles.header}>
          <Text style={styles.largeText}>Pan Animatable</Text>
          <View>
            <View style={styles.coupling}>
              <Switch value={isCoupled} onValueChange={this.switchExample} disabled={isAnimating} style={styles.switch}/>
              <Text style={styles.smallText}>{isCoupled ? 'Coupled' : 'Uncoupled'}</Text>
            </View>
            <Button style={styles.button} label={'Reset'} size={Button.sizes.xSmall} onPress={this.reset}/>
          </View>
        </View>
        <PanningProvider>
          {!isCoupled && panListener}
          <PanAnimatableView
            style={styles.panAnimatable}
            from={from}
            to={to}
            onAnimationEnd={this.onAnimationEnd}
            onPanLocationChanged={this.onPanLocationChanged}
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
  coupling: {
    flexDirection: 'row',
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
