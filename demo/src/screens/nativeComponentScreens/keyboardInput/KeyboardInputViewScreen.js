import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet, TextInput} from 'react-native';
import {Keyboard, Text, View, Colors, Spacings, Constants, Typography, Button, Switch} from 'react-native-ui-lib';
const KeyboardAccessoryView = Keyboard.KeyboardAccessoryView;
const KeyboardUtils = Keyboard.KeyboardUtils;
import {_} from 'lodash';

import './demoKeyboards';
const KeyboardRegistry = Keyboard.KeyboardRegistry;

const TrackInteractive = true;

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
    const receivedKeyboardData = `onItemSelected from "${keyboardId}"\nreceived params: ${JSON.stringify(params)}`;
    this.setState({receivedKeyboardData});
  };

  onKeyboardResigned = () => {
    this.resetKeyboardView();
  };

  getToolbarButtons() {
    const keyboards = KeyboardRegistry.getAllKeyboards();
    const buttons = [];
    for (let index = 0; index < keyboards.length; ++index) {
      const string = `Show KB ${index + 1}`;
      const title = `Title ${index + 1} (passed prop)`;
      buttons.push({
        text: string,
        testID: string,
        onPress: () => this.showKeyboardView(keyboards[index].id, title)
      });
    }

    buttons.push({
      text: 'reset',
      testID: 'reset',
      onPress: () => this.resetKeyboardView()
    });

    return buttons;
  }

  isCustomKeyboardOpen = () => {
    const {keyboardOpenState, customKeyboard} = this.state;
    return keyboardOpenState && !_.isEmpty(customKeyboard);
  }

  resetKeyboardView = () => {
    this.setState({customKeyboard: {}});
  };

  dismissKeyboard = () => {
    KeyboardUtils.dismiss();
  }

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

  onHeightChanged = keyboardAccessoryViewHeight => {
    if (Constants.isIOS) {
      this.setState({keyboardAccessoryViewHeight});
    }
  };

  keyboardAccessoryViewContent = () => {
    return (
      <View style={styles.keyboardContainer}>
        <View row padding-s5>
          <TextInput
            maxHeight={200}
            style={styles.textInput}
            ref={r => {
              this.textInputRef = r;
            }}
            placeholder={'Message'}
            underlineColorAndroid="transparent"
            onFocus={this.resetKeyboardView}
          />
          <Button label="Close" link onPress={KeyboardUtils.dismiss} style={styles.button}/>
        </View>
        <View row>
          {this.getToolbarButtons().map((button, index) => (
            <Button label={button.text} link onPress={button.onPress} key={index} style={styles.button}/>
          ))}
        </View>
      </View>
    );
  };

  requestShowKeyboard = () => {
    KeyboardRegistry.requestShowKeyboard('KeyboardView1');
  };

  onRequestShowKeyboard = componentID => {
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
        <View style={styles.separatorLine}/>
        <View centerV row margin-10>
          <Text text80 dark40>Safe Area Enabled:</Text>
          <Switch value={useSafeArea} onValueChange={this.toggleUseSafeArea} marginL-14/>
        </View>
        <View style={styles.separatorLine}/>
      </View>
    );
  }

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
            {message || 'Keyboards example'}
          </Text>
          <Text testID={'demo-message'}>{receivedKeyboardData}</Text>
          <Button label={'Open keyboard #1'} link onPress={this.requestShowKeyboard} style={styles.button}/>
          { this.safeAreaSwitchToggle() }
        </ScrollView>

        <KeyboardAccessoryView
          renderContent={this.keyboardAccessoryViewContent}
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
    padding: Spacings.s1,
    ...Typography.text70
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
