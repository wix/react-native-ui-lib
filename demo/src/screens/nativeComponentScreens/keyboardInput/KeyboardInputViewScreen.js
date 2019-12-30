import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet, TextInput} from 'react-native';
import {
  Keyboard,
  TouchableOpacity,
  Text,
  View,
  TextField,
  Image,
  Colors,
  Spacings,
  Switch,
  Constants,
  Typography,
  Button
} from 'react-native-ui-lib';
const KeyboardAccessoryView = Keyboard.KeyboardAccessoryView;
const KeyboardUtils = Keyboard.KeyboardUtils;

import './demoKeyboards';

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
    return [
      {
        text: 'show1',
        testID: 'show1',
        onPress: () => this.showKeyboardView('KeyboardView', 'FIRST - 1 (passed prop)')
      },
      {
        text: 'show2',
        testID: 'show2',
        onPress: () => this.showKeyboardView('AnotherKeyboardView', 'SECOND - 2 (passed prop)')
      },
      {
        text: 'reset',
        testID: 'reset',
        onPress: () => this.resetKeyboardView()
      }
    ];
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

  keyboardAccessoryViewContent = () => {
    return (
      <View style={styles.keyboardContainer}>
        <View style={styles.inputContainer}>
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

        <View style={styles.keyboardModesContainer}>
          {this.getToolbarButtons().map((button, index) => (
            <Button label={button.text} link onPress={button.onPress} key={index} style={styles.button}/>
          ))}
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
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
          onHeightChanged={Constants.isIOS ? height => this.setState({keyboardAccessoryViewHeight: height}) : undefined}
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
  container: {
    flex: 1,
    backgroundColor: Colors.dark80
  },
  scrollContainer: {
    paddingHorizontal: Spacings.s5,
    flex: 1,
    justifyContent: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacings.s5
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
  },
  keyboardModesContainer: {
    flexDirection: 'row'
  }
});
