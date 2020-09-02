import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Button,
  View,
  Text,
  Switch,
  Colors,
  Typography,
  PanListenerView,
  PanningProvider,
  PanDismissibleView
} from 'react-native-ui-lib';

const PAN_LISTENER_VIEW_HEIGHT = 100;

export default class PanDismissibleScreen extends Component {
  state = {
    location: {left: 50, top: 50},
    isCoupled: true,
    key: false
  };

  switchExample = () => {
    const {isCoupled, location} = this.state;
    if (isCoupled) {
      this.setState({
        isCoupled: false,
        location: {left: location.left, top: location.top - PAN_LISTENER_VIEW_HEIGHT}
      });
    } else {
      this.setState({
        isCoupled: true,
        location: {left: location.left, top: location.top + PAN_LISTENER_VIEW_HEIGHT}
      });
    }
  };

  reset = () => {
    this.setState({key: !this.state.key});
  };

  renderPanListener = () => {
    return (
      <PanListenerView style={styles.panListener}>
        <Text style={styles.largeText}>Drag\Swipe here</Text>
      </PanListenerView>
    );
  };

  render() {
    const {isCoupled, key} = this.state;
    const panListener = this.renderPanListener();

    return (
      <View flex bg-dark80>
        <Text style={styles.largeText}>Pan Dismissible</Text>
        <View style={styles.container}>
          <Switch value={isCoupled} onValueChange={this.switchExample} style={styles.switch}/>
          <Text style={styles.smallText}>{isCoupled ? 'Coupled' : 'Uncoupled'}</Text>
        </View>
        <Button label="Reset" size={Button.sizes.medium} outline style={styles.button} onPress={this.reset}/>
        <View centerH>
          <PanningProvider>
            {!isCoupled && panListener}
            <PanDismissibleView
              key={key}
              style={[styles.panDismissible, {marginTop: isCoupled ? PAN_LISTENER_VIEW_HEIGHT : undefined}]}
            >
              {isCoupled && panListener}
            </PanDismissibleView>
          </PanningProvider>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  largeText: {
    ...Typography.text50,
    margin: 20
  },
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    alignSelf: 'center'
  },
  panDismissible: {
    width: 250,
    height: 250,
    backgroundColor: Colors.blue30
  },
  panListener: {
    width: '100%',
    height: PAN_LISTENER_VIEW_HEIGHT,
    backgroundColor: Colors.blue60,
    justifyContent: 'center'
  },
  smallText: {
    ...Typography.text70,
    marginLeft: 20
  },
  switch: {
    marginLeft: 20,
    alignSelf: 'center'
  },
  button: {
    alignSelf: 'center',
    marginBottom: 20
  }
});
