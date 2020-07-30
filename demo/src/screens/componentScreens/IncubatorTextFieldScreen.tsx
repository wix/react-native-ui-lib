import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView, TextInput} from 'react-native';
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
  input = React.createRef();
  state = {
    errorPosition: 'top',
    value: 'Initial Value'
  };

  componentDidMount() {
    this.input.current.focus();
  }

  render() {
    const {errorPosition} = this.state;
    return (
      <ScrollView>
        <View flex padding-page>
          <Text h1>TextField</Text>
          <Text h3 blue50 marginV-s4>
            Default
          </Text>

          <TextField
            ref={this.input}
            label="Name"
            placeholder="Enter first+last name"
            value={this.state.value}
            onChangeText={value => this.setState({value})}
          />

          <Text h3 blue50 marginV-s4>
            Static vs Floating Placeholder
          </Text>
          <View row bottom>
            <TextField
              placeholder="Floating placeholder"
              floatingPlaceholder
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
            Leading/Trailing Icon
          </Text>

          <TextField
            placeholder="Enter text..."
            leadingIcon={{source: Assets.icons.demo.search}}
            trailingIcon={{source: Assets.icons.demo.refresh}}
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
                  errorPosition: errorPosition === 'top' ? 'bottom' : 'top'
                })
              }
            />
          </View>

          <TextField
            // value="value"
            label="Email"
            placeholder="Enter email"
            enableErrors
            validationMessage="Email is invalid"
            validationMessageStyle={Typography.text90R}
            validationMessagePosition={errorPosition}
            validate={'email'}
            validateOnChange
            // validateOnStart
            // validateOnBlur
            fieldStyle={styles.withUnderline}
          />

          <Text h3 blue50 marginV-s4>
            Colors By State
          </Text>

          <TextField
            label="Email"
            labelColor={Colors.blue30}
            placeholder="Enter email"
            validationMessage="Email is invalid"
            validate={'email'}
            fieldStyle={styles.withFrame}
          />

          <TextField
            containerStyle={{marginTop: 30}}
            placeholder="Placeholder"
            label="Label"
            labelColor={{
              default: Colors.grey30,
              focus: Colors.blue20,
              disabled: Colors.grey40
            }}
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
            maxLength={225}
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
    padding: 4
  }
});
