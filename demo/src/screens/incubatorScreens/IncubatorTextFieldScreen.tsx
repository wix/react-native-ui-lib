import _ from 'lodash';
import React, {Component} from 'react';
import {TextInput, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {Assets, Colors, Spacings, Typography, View, Text, Button, Keyboard, Incubator} from 'react-native-ui-lib'; //eslint-disable-line
const {TextField} = Incubator;
const {KeyboardAwareInsetsView} = Keyboard;

const priceFormatter = Intl.NumberFormat('en-US');

export default class TextFieldScreen extends Component {
  input = React.createRef<TextInput>();
  input2 = React.createRef<TextInput>();
  inputWithValidation = React.createRef<TextInput>();
  state = {
    errorPosition: TextField.validationMessagePositions.TOP,
    shouldDisable: false,
    value: 'Initial Value',
    searching: false,
    preset: 'withUnderline'
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
      return <ActivityIndicator color={Colors.$iconDefault}/>;
    } else {
      return (
        <Button
          iconSource={Assets.icons.demo.search}
          link
          marginL-s2
          $iconDefault
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
    const {errorPosition, shouldDisable, price, preset} = this.state;
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
                focus: Colors.$textDefault,
                default: Colors.$textNeutral
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
            floatingPlaceholder
            text70
            leadingAccessory={
              <Text text70 blue30 marginR-2>
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
              <Text text70 $textNeutral>
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
            marginB-s4
          />

          <View row top marginT-s4>
            <TextField
              ref={this.inputWithValidation}
              placeholder="Enter full name"
              validate="required"
              validationMessage="This field is required"
              containerStyle={{flexGrow: 1}}
              fieldStyle={styles.withUnderline}
            />
            <Button
              marginL-s5
              label="Validate"
              size={Button.sizes.xSmall}
              onPress={() => {
                this.inputWithValidation.current?.validate?.();
              }}
            />
          </View>

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
            labelColor={{
              default: Colors.$textDefault,
              focus: Colors.$textGeneral,
              error: Colors.$textDangerLight,
              disabled: Colors.$textDisabled
            }}
            placeholder="Enter valid email"
            validationMessage="Email is invalid"
            validate={'email'}
            validateOnChange
            fieldStyle={styles.withFrame}
            editable={!shouldDisable}
          />

          <View row spread centerV>
            <Text h3 blue50 marginV-s4>
              Custom Field Style
            </Text>
            <Button
              label={preset}
              onPress={() => this.setState({preset: preset === 'withUnderline' ? 'withFrame' : 'withUnderline'})}
              size={Button.sizes.xSmall}
            />
          </View>

          <TextField
            label="Label"
            placeholder="Enter text..."
            preset={preset}
            dynamicFieldStyle={(_state, {preset}) =>
              preset === 'withUnderline' ? styles.withUnderline : styles.withFrame
            }
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
            bottomAccessory={
              <Text text100>
                {Assets.emojis.grapes} {Assets.emojis.melon} {Assets.emojis.banana}
              </Text>
            }
            charCounterStyle={{color: Colors.$textGeneral}}
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
          <Text h3 blue50 marginV-s4>
            Formatter
          </Text>
          <TextField
            value={price}
            onChangeText={value => this.setState({price: value})}
            label="Price"
            placeholder="Enter price"
            validate={'number'}
            validationMessage="Invalid price"
            // @ts-expect-error
            formatter={value => (isNaN(value) ? value : priceFormatter.format(Number(value)))}
            leadingAccessory={
              <Text marginR-s1 $textNeutral>
                $
              </Text>
            }
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
    borderColor: Colors.$outlineDisabledHeavy,
    paddingBottom: 4
  },
  withFrame: {
    borderWidth: 1,
    borderColor: Colors.$outlineDisabledHeavy,
    padding: 4,
    borderRadius: 2
  }
});
