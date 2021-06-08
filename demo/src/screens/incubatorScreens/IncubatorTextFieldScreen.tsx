import _ from 'lodash';
import React, {Component} from 'react';
import {TextInput, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {Assets, Colors, Spacings, Typography, View, Text, Button, Keyboard, Incubator} from 'react-native-ui-lib'; //eslint-disable-line
const {TextField} = Incubator;
const {KeyboardAwareInsetsView} = Keyboard;

export default class TextFieldScreen extends Component {
  input = React.createRef<TextInput>();
  input2 = React.createRef<TextInput>();
  state = {
    errorPosition: TextField.validationMessagePositions.TOP,
    shouldDisable: false,
    value: 'Initial Value',
    searching: false
  };

  componentDidMount() {
    this.input.current?.focus();
  }

  resetFieldValue = () => {
    this.input2.current?.clear();
  };

  renderTrailingAccessory() {
    const {searching} = this.state;
    if (searching) {
      return <ActivityIndicator color={Colors.grey10}/>;
    } else {
      return (
        <Button
          iconSource={Assets.icons.demo.search}
          link
          marginL-s2
          grey10
          onPress={() => {
            this.setState({searching: true});
            setTimeout(() => {
              this.setState({searching: false});
            }, 1200);
          }}
        />
      );
    }
  }

  render() {
    const {errorPosition, shouldDisable} = this.state;
    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <View flex padding-page>
          <Text h1>TextField</Text>
          <Text h3 blue50 marginV-s4>
            Default
          </Text>
          <TextField ref={this.input} label="Name" placeholder="Enter full name"/>

          <Text h3 blue50 marginV-s4>
            Static vs Floating Placeholder
          </Text>
          <View row bottom>
            <TextField
              placeholder="Floating placeholder"
              floatingPlaceholder
              floatingPlaceholderColor={{
                focus: Colors.grey10,
                default: Colors.grey30
              }}
              // floatingPlaceholderStyle={Typography.text60}
              // style={Typography.text60}
              containerStyle={{flex: 1}}
              fieldStyle={styles.withUnderline}
            />
            <TextField
              placeholder="Placeholder"
              containerStyle={{flex: 1, marginLeft: Spacings.s4}}
              fieldStyle={styles.withUnderline}
            />
          </View>
          <Text h3 blue50 marginV-s4>
            Accessories
          </Text>

          <TextField
            ref={this.input2}
            placeholder="Enter search term"
            text70
            trailingAccessory={this.renderTrailingAccessory()}
            fieldStyle={styles.withUnderline}
            marginB-s4
          />

          <TextField
            ref={this.input2}
            placeholder="Enter URL"
            text70
            leadingAccessory={
              <Text text70 blue30>
                Https://
              </Text>
            }
            fieldStyle={styles.withUnderline}
            marginB-s4
          />

          <TextField
            ref={this.input2}
            placeholder="Enter weight"
            text70
            trailingAccessory={
              <Text text70 dark30>
                Kg.
              </Text>
            }
            fieldStyle={styles.withUnderline}
            keyboardType="numeric"
          />

          <View row marginV-s4 spread>
            <Text h3 blue50>
              Validation
            </Text>
            <Button
              size={Button.sizes.xSmall}
              label={`Error Position: ${_.upperCase(errorPosition)}`}
              onPress={() =>
                this.setState({
                  errorPosition:
                    errorPosition === TextField.validationMessagePositions.TOP
                      ? TextField.validationMessagePositions.BOTTOM
                      : TextField.validationMessagePositions.TOP
                })
              }
            />
          </View>

          <TextField
            value={this.state.value}
            onChangeText={value => this.setState({value})}
            label="Email"
            placeholder="Enter email"
            enableErrors
            validationMessage={['Email is required', 'Email is invalid']}
            // validationMessageStyle={Typography.text90R}
            validationMessagePosition={errorPosition}
            validate={['required', 'email']}
            validateOnChange
            onChangeValidity={(isValid: boolean) => console.warn('validity changed:', isValid, Date.now())}
            // validateOnStart
            // validateOnBlur
            fieldStyle={styles.withUnderline}
          />

          <View row centerV spread>
            <Text h3 blue50 marginV-s4>
              Colors By State
            </Text>
            <Button
              label={shouldDisable ? 'Enable' : 'Disable'}
              onPress={() => this.setState({shouldDisable: !shouldDisable})}
              size={Button.sizes.xSmall}
            />
          </View>

          <TextField
            label="Email"
            labelColor={{default: Colors.grey10, focus: Colors.blue20, error: Colors.red30, disabled: Colors.grey40}}
            placeholder="Enter valid email"
            validationMessage="Email is invalid"
            validate={'email'}
            validateOnChange
            fieldStyle={styles.withFrame}
            editable={!shouldDisable}
          />

          <Text h3 blue50 marginV-s4>
            Char Counter
          </Text>

          <TextField
            label="Description"
            placeholder="Enter text..."
            multiline
            showCharCounter
            charCounterStyle={{color: Colors.blue30}}
            maxLength={20}
            fieldStyle={styles.withFrame}
          />
          <Text h3 blue50 marginV-s4>
            Hint
          </Text>
          <TextField
            label="Password"
            placeholder="Enter password"
            hint="1-6 chars including numeric chars"
            fieldStyle={styles.withUnderline}
          />
        </View>
        <KeyboardAwareInsetsView/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  withUnderline: {
    borderBottomWidth: 1,
    borderColor: Colors.grey40,
    paddingBottom: 4
  },
  withFrame: {
    borderWidth: 1,
    borderColor: Colors.grey40,
    padding: 4,
    borderRadius: 2
  }
});
