import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {
  Keyboard,
  Text,
  View,
  TextField,
  Image,
  Button,
  Colors,
  Switch,
  Constants,
  Spacings
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
    uri:
      'https://images.pexels.com/photos/140234/pexels-photo-140234.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
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
      <View flex bg-dark80 paddingT-page>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardDismissMode={trackInteractive ? 'interactive' : 'none'}
        >
          <Text h1 dark10 marginB-s1>
            Keyboard Tracking View
          </Text>
          <Text marginB-s4 grey10>
            Attach a custom view to that will track the keyboard position
          </Text>
          <View row marginV-20 centerV spread>
            <Text text70>Dismiss Keyboard with Drag</Text>
            <Switch
              value={trackInteractive}
              onValueChange={this.toggleTrackInteractive}
              marginL-10
            />
          </View>
          {URIs.map((uri, index) => (
            <Image style={styles.image} source={uri} key={index} />
          ))}
        </ScrollView>
        <KeyboardTrackingView
          style={styles.trackingToolbarContainer}
          trackInteractive={trackInteractive}
        >
          <View bg-white row spread centerV paddingH-s5 paddingV-s3>
            <TextField
              containerStyle={{
                flex: 1,
                backgroundColor: Colors.grey60,
                paddingVertical: Spacings.s2,
                paddingHorizontal: Spacings.s4,
                borderRadius: 8
              }}
              hideUnderline
              placeholder={'Message'}
              floatingPlaceholder={false}
              floatOnFocus
              enableErrors={false}
            />
            <Button label="Send" link marginL-s4 />
          </View>
        </KeyboardTrackingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: Spacings.s5
  },
  image: {
    height: 250,
    marginBottom: Spacings.s3
  },
  trackingToolbarContainer: {
    position: Constants.isIOS ? 'absolute' : 'relative',
    bottom: 0,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.dark60
  }
});
