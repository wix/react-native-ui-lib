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
  Incubator
} from 'react-native-ui-lib'; //eslint-disable-line
const {TextField} = Incubator;

export default class TextFieldScreen extends Component {
  input = React.createRef();

  componentDidMount() {
    this.input.current.focus();
  }

  render() {
    return (
      <ScrollView>
        <View flex padding-page>
          <Text h1>TextField</Text>
          <Text h3 grey30 marginV-s4>
            Default
          </Text>

          <TextField
            ref={this.input}
            label="Label"
            placeholder="Enter text..."
          />

          <Text h3 grey30 marginV-s4>
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
          <Text h3 grey30 marginV-s4>
            Leading/Trailing Icon
          </Text>

          <TextField
            label="Label"
            placeholder="Enter text..."
            leadingIcon={{source: Assets.icons.demo.search}}
            trailingIcon={{source: Assets.icons.demo.refresh}}
          />

          <Text h3 grey30 marginV-s4>
            Validation
          </Text>

          <TextField
            // value="value"
            label="Email"
            placeholder="Enter email"
            enableErrors
            validationMessage="Email is invalid"
            validationMessageStyle={Typography.text90R}
            validate={'email'}
            validateOnChange
            // validateOnStart
            // validateOnBlur
            fieldStyle={styles.withUnderline}
          />

          <Text h3 grey30 marginV-s4>
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

          <Text h3 grey30 marginV-s4>
            Char Counter
          </Text>

          <TextField
            placeholder="Placeholder"
            fieldStyle={styles.withFrame}
            showCharCounter
            charCounterStyle={{color: Colors.blue30}}
            maxLength={75}
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
