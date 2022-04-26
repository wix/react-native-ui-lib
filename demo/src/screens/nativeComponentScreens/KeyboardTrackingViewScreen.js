import _ from 'lodash';
import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {
  Constants,
  Colors,
  Spacings,
  Keyboard,
  View,
  Text,
  TextField,
  Button,
  Switch
} from 'react-native-ui-lib';

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
            <View right={!isLeftBubble} key={i}>
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
      <View flex bg-grey80 paddingT-page>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardDismissMode={trackInteractive ? 'interactive' : 'none'}
          showsVerticalScrollIndicator={false}
        >
          <Text h1 grey10 marginB-s1>
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
          useSafeArea
          addBottomView
          bottomViewColor={Colors.violet80}
        >
          <View bg-violet80 row spread centerV paddingH-s5 paddingV-s3>
            <TextField
              migrate
              containerStyle={styles.textField}
              preset={null}
              placeholder={'Message'}
              floatingPlaceholder={false}
              enableErrors={false}
            />
            <Button label="Send" link marginL-s4/>
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
  trackingToolbarContainer: {
    position: Constants.isIOS ? 'absolute' : 'relative',
    bottom: 0,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.grey60
  },
  textField: {
    flex: 1,
    backgroundColor: Colors.grey80,
    paddingVertical: Spacings.s2,
    paddingHorizontal: Spacings.s4,
    borderRadius: 8
  }
});
