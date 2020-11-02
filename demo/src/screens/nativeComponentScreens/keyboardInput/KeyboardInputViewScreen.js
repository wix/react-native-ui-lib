import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet, TextInput} from 'react-native';
import {
  Keyboard,
  Text,
  View,
  Colors,
  Spacings,
  Constants,
  Typography,
  Button,
  Switch,
  Assets
} from 'react-native-ui-lib';
import _ from 'lodash';
import './demoKeyboards';

const KeyboardAccessoryView = Keyboard.KeyboardAccessoryView;
const KeyboardUtils = Keyboard.KeyboardUtils;
const KeyboardRegistry = Keyboard.KeyboardRegistry;
const TrackInteractive = true;

const keyboards = [
  {
    id: 'unicorn.ImagesKeyboard',
    icon: Assets.icons.demo.image
  },
  {
    id: 'unicorn.CustomKeyboard',
    icon: Assets.icons.demo.dashboard
  }
];

export default class KeyboardInputViewScreen extends PureComponent {
  state = {
    customKeyboard: {
      component: undefined,
      initialProps: undefined
    },
    receivedKeyboardData: undefined,
    useSafeArea: true,
    keyboardOpenState: false
  };

  onKeyboardItemSelected = (keyboardId, params) => {
    const receivedKeyboardData = `onItemSelected from "${keyboardId}"\nreceived params: ${JSON.stringify(
      params
    )}`;
    this.setState({receivedKeyboardData});
  };

  onKeyboardResigned = () => {
    this.resetKeyboardView();
  };

  isCustomKeyboardOpen = () => {
    const {keyboardOpenState, customKeyboard} = this.state;
    return keyboardOpenState && !_.isEmpty(customKeyboard);
  };

  resetKeyboardView = () => {
    this.setState({customKeyboard: {}});
  };

  dismissKeyboard = () => {
    KeyboardUtils.dismiss();
  };

  toggleUseSafeArea = () => {
    const {useSafeArea} = this.state;
    this.setState({useSafeArea: !useSafeArea});

    if (this.isCustomKeyboardOpen()) {
      this.dismissKeyboard();
      this.showLastKeyboard();
    }
  };

  showLastKeyboard() {
    const {customKeyboard} = this.state;
    this.setState({customKeyboard: {}});

    setTimeout(() => {
      this.setState({
        keyboardOpenState: true,
        customKeyboard
      });
    }, 500);
  }

  showKeyboardView(component, title) {
    this.setState({
      keyboardOpenState: true,
      customKeyboard: {
        component,
        initialProps: {title}
      }
    });
  }

  onHeightChanged = (keyboardAccessoryViewHeight) => {
    if (Constants.isIOS) {
      this.setState({keyboardAccessoryViewHeight});
    }
  };

  renderKeyboardAccessoryViewContent = () => {
    return (
      <View style={styles.keyboardContainer} paddingV-s4>
        <View row paddingH-s4>
          <TextInput
            style={styles.textInput}
            ref={(r) => {
              this.textInputRef = r;
            }}
            placeholder={'Message'}
            underlineColorAndroid="transparent"
            onFocus={this.resetKeyboardView}
          />
          <Button
            link
            grey10
            iconSource={Assets.icons.demo.close}
            onPress={KeyboardUtils.dismiss}
            marginL-s2
          />
        </View>
        <View row paddingH-s4 marginT-s2 spread>
          <View row>
            {keyboards.map((keyboard) => (
              <Button
                key={keyboard.id}
                grey10
                link
                iconSource={keyboard.icon}
                onPress={() => this.showKeyboardView(keyboard.id)}
                marginR-s2
              />
            ))}
          </View>

          <Button grey10 label="Reset" link onPress={this.resetKeyboardView} />
        </View>
      </View>
    );
  };

  requestShowKeyboard = () => {
    KeyboardRegistry.requestShowKeyboard('unicorn.ImagesKeyboard');
  };

  onRequestShowKeyboard = (componentID) => {
    this.setState({
      customKeyboard: {
        component: componentID,
        initialProps: {title: 'Keyboard 1 opened by button'}
      }
    });
  };

  safeAreaSwitchToggle = () => {
    if (!Constants.isIOS) {
      return;
    }
    const {useSafeArea} = this.state;
    return (
      <View column center>
        <View style={styles.separatorLine} />
        <View centerV row margin-10>
          <Text text80 dark40>
            Safe Area Enabled:
          </Text>
          <Switch
            value={useSafeArea}
            onValueChange={this.toggleUseSafeArea}
            marginL-14
          />
        </View>
        <View style={styles.separatorLine} />
      </View>
    );
  };

  render() {
    const {message} = this.props;
    const {receivedKeyboardData, customKeyboard, useSafeArea} = this.state;
    return (
      <View flex bg-dark80>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardDismissMode={TrackInteractive ? 'interactive' : 'none'}
        >
          <Text text40 dark10 marginV-20 center>
            {message || 'KeyboardsRegistry'}
          </Text>
          <Text testID={'demo-message'}>{receivedKeyboardData}</Text>
          <Button
            label={'Open Images Keyboard'}
            link
            onPress={this.requestShowKeyboard}
            style={styles.button}
          />
          {this.safeAreaSwitchToggle()}
        </ScrollView>

        <KeyboardAccessoryView
          renderContent={this.renderKeyboardAccessoryViewContent}
          onHeightChanged={this.onHeightChanged}
          trackInteractive={TrackInteractive}
          kbInputRef={this.textInputRef}
          kbComponent={customKeyboard.component}
          kbInitialProps={customKeyboard.initialProps}
          onItemSelected={this.onKeyboardItemSelected}
          onKeyboardResigned={this.onKeyboardResigned}
          revealKeyboardInteractive
          onRequestShowKeyboard={this.onRequestShowKeyboard}
          useSafeArea={useSafeArea}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: Spacings.s5,
    flex: 1,
    justifyContent: 'center'
  },
  textInput: {
    flex: 1,
    paddingVertical: Spacings.s2,
    paddingHorizontal: Spacings.s3,
    ...Typography.text70,
    lineHeight: undefined,
    backgroundColor: Colors.grey60,
    borderRadius: 8
  },
  button: {
    padding: Spacings.s2
  },
  keyboardContainer: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.dark60
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.dark80
  }
});
