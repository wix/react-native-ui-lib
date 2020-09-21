import _ from 'lodash';
import React, {Component} from 'react';
import {TextInput, StyleSheet, ScrollView} from 'react-native';
import {
  Assets,
  Colors,
  Spacings,
  Typography,
  View,
  Text,
  Button,
  Incubator
} from 'react-native-ui-lib'; //eslint-disable-line
const {TextField} = Incubator;

export default class TextFieldScreen extends Component {
  input = React.createRef<TextInput>();
  input2 = React.createRef<TextInput>();
  state = {
    errorPosition: TextField.validationMessagePositions.TOP,
    shouldDisable: false,
    value: 'Initial Value'
  };

  componentDidMount() {
    this.input.current?.focus();
  }

  resetFieldValue = () => {
    this.input2.current?.clear();
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
          <TextField
            ref={this.input}
            label="Name"
            placeholder="Enter first and last name"
          />

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
            Leading/Trailing Button
          </Text>

          <TextField
            ref={this.input2}
            placeholder="Enter text..."
            leadingButton={{iconSource: Assets.icons.demo.search}}
            trailingButton={{iconSource: Assets.icons.demo.refresh, onPress: this.resetFieldValue}}
            fieldStyle={styles.withUnderline}
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
            onChangeText={(value) => this.setState({value})}
            label="Email"
            placeholder="Enter email"
            enableErrors
            validationMessage={['Email is required', 'Email is invalid']}
            validationMessageStyle={Typography.text90R}
            validationMessagePosition={errorPosition}
            validate={['required', 'email']}
            validateOnChange
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
            placeholder="Enter password"
            hint="1-6 chars including numeric chars"
            fieldStyle={styles.withUnderline}
          />
        </View>
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
