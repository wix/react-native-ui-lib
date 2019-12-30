import _ from 'lodash';
import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet, TextInput} from 'react-native';
import {Keyboard, Text, View, Colors, Spacings, Constants, Typography, Button} from 'react-native-ui-lib';
const KeyboardAccessoryView = Keyboard.KeyboardAccessoryView;
const KeyboardUtils = Keyboard.KeyboardUtils;

import './demoKeyboards';
const KeyboardRegistry = Keyboard.KeyboardRegistry;

const TrackInteractive = true;

export default class KeyboardInputViewScreen extends PureComponent {
  state = {
    customKeyboard: {
      component: undefined,
      initialProps: undefined
    },
    receivedKeyboardData: undefined
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

  resetKeyboardView = () => {
    this.setState({customKeyboard: {}});
  };

  showKeyboardView(component, title) {
    this.setState({
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

  render() {
    return (
      <View flex bg-dark80>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardDismissMode={TrackInteractive ? 'interactive' : 'none'}
        >
          <Text text40 dark10 marginV-20 center>
            {this.props.message || 'Keyboards example'}
          </Text>
          <Text testID={'demo-message'}>{this.state.receivedKeyboardData}</Text>
        </ScrollView>

        <KeyboardAccessoryView
          renderContent={this.keyboardAccessoryViewContent}
          onHeightChanged={this.onHeightChanged}
          trackInteractive={TrackInteractive}
          kbInputRef={this.textInputRef}
          kbComponent={this.state.customKeyboard.component}
          kbInitialProps={this.state.customKeyboard.initialProps}
          onItemSelected={this.onKeyboardItemSelected}
          onKeyboardResigned={this.onKeyboardResigned}
          revealKeyboardInteractive
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
    padding: Spacings.s2,
    ...Typography.text70
  },
  button: {
    padding: Spacings.s2
  },
  keyboardContainer: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.dark60
  }
});
