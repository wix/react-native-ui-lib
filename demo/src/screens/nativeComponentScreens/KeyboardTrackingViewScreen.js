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
import _ from 'lodash';

const KeyboardTrackingView = Keyboard.KeyboardTrackingView;

const messages = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit amet porttitor eget dolor',
  'turpis cursus in hac habitasse',
  'neque gravida in fermentum et sollicitudin ac orci phasellus egestas'
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

  renderChatBubbles() {
    return (
      <View flex>
        {_.map(messages, (message, i) => {
          const isLeftBubble = i % 2 === 0;
          return (
            <View right={!isLeftBubble}>
              <View
                bg-blue40={isLeftBubble}
                bg-white={!isLeftBubble}
                br20
                marginB-s4
                padding-s2
                width={'70%'}
              >
                <Text white={isLeftBubble} grey10={!isLeftBubble} text80>
                  {message}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  }

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
          {this.renderChatBubbles()}
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
