import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Switch, Colors, Typography, PanListenerView, PanningProvider, PanResponderView} from 'react-native-ui-lib'; //eslint-disable-line

const PAN_LISTENER_VIEW_HEIGHT = 100;

export default class PanResponderScreen extends Component {
  state = {
    location: {left: 50, top: 50},
    isCoupled: false,
  };

  switchExample = () => {
    const {isCoupled, location} = this.state;
    if (isCoupled) {
      this.setState({
        isCoupled: false,
        location: {left: location.left, top: location.top - PAN_LISTENER_VIEW_HEIGHT},
      });
    } else {
      this.setState({
        isCoupled: true,
        location: {left: location.left, top: location.top + PAN_LISTENER_VIEW_HEIGHT},
      });
    }
  }

  renderPanListener = () => {
    return (
      <PanListenerView style={styles.panListener}>
        <Text style={styles.largeText}>Drag here</Text>
      </PanListenerView>
    );
  }

  render() {
    const {isCoupled} = this.state;
    const panListener = this.renderPanListener();

    return (
      <View flex bg-dark80>
        <View style={styles.container}>
          <Text style={styles.largeText}>Pan Responder</Text>
          <Switch value={isCoupled} onValueChange={this.switchExample} style={styles.switch}/>
          <Text style={styles.smallText}>{isCoupled ? 'Coupled' : 'Uncoupled'}</Text>
        </View>
        <PanningProvider>
          {!isCoupled && panListener}
          <PanResponderView
            style={[styles.panResponder, {marginTop: isCoupled ? PAN_LISTENER_VIEW_HEIGHT : undefined}]}
          >
            {isCoupled && panListener}
          </PanResponderView>
        </PanningProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  panResponder: {
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
});
