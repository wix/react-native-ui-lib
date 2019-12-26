import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {
  Keyboard,
  Text,
  View,
  TextField,
  Image,
  Colors,
  Spacings,
  Switch,
  Constants
} from 'react-native-ui-lib';
const KeyboardTrackingView = Keyboard.KeyboardTrackingView;

const URIs = [
  {
    uri:
      'https://static.pexels.com/photos/50721/pencils-crayons-colourful-rainbow-50721.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
  },
  {
    uri:
      'https://static.pexels.com/photos/60628/flower-garden-blue-sky-hokkaido-japan-60628.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
  },
  {
    uri: 'https://images.pexels.com/photos/140234/pexels-photo-140234.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
  }
];

export default class KeyboardTrackingViewScreen extends PureComponent {
  state = {
    trackInteractive: true
  };

  toggleTrackInteractive = () => {
    this.setState({
      trackInteractive: !this.state.trackInteractive
    });
  };

  render() {
    const {trackInteractive} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardDismissMode={trackInteractive ? 'interactive' : 'none'}
        >
          <Text text40 dark10 marginV-20>
            Keyboard Tracking View
          </Text>
          <View row marginV-20 centerV>
            <Text text60>Track interactive:</Text>
            <Switch value={trackInteractive} onValueChange={this.toggleTrackInteractive} marginL-10/>
          </View>
          {URIs.map((uri, index) => (
            <Image style={styles.image} source={uri} key={index}/>
          ))}
        </ScrollView>
        <KeyboardTrackingView style={styles.trackingToolbarContainer} trackInteractive={trackInteractive}>
          <View centerV style={styles.inputContainer}>
            <TextField text70 placeholder={'Message'} floatingPlaceholder floatOnFocus/>
          </View>
        </KeyboardTrackingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark80
  },
  scrollContainer: {
    paddingHorizontal: 15
  },
  image: {
    height: 250,
    marginBottom: 10
  },
  trackingToolbarContainer: {
    position: Constants.isIOS ? 'absolute' : 'relative',
    bottom: 0,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.dark60
  },
  inputContainer: {
    paddingHorizontal: Spacings.s5,
    paddingVertical: Spacings.s2,
    backgroundColor: Colors.white
  }
});
