import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Assets,
  Colors,
  View,
  Text,
  Incubator,
  Spacings
} from 'react-native-ui-lib'; //eslint-disable-line
const {TextField} = Incubator;

export default class TextFieldScreen extends Component {
  input = React.createRef();

  componentDidMount() {
    this.input.current.focus();
  }

  render() {
    return (
      <View bg-dark80 flex padding-page>
        <Text h1>TextField</Text>
        <Text h3 grey30 marginV-s4>
          Default
        </Text>

        <TextField ref={this.input} label="Label" placeholder="Enter text..." />

        <Text h3 grey30 marginV-s4>
          Static vs Floating Placeholder
        </Text>
        <View row>
          <TextField
            placeholder="Floating placeholder"
            floatingPlaceholder
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
          Colors By State
        </Text>

        <TextField
          // value="value"
          label="Email"
          labelColor={'blue'}
          placeholder="Enter email"
          // leadingIcon={{source: Assets.icons.demo.search}}
          // trailingIcon={{source: Assets.icons.demo.refresh}}
          validationMessage="Email is invalid"
          validate={'email'}
          validateOnChange
          validateOnStart
          validateOnBlur
          // style={{borderWidth: 2}}
          fieldStyle={{
            borderWidth: 1,
            padding: 4,
            marginVertical: 4,
            borderRadius: 4,
            borderColor: Colors.grey40
          }}
        />

        <TextField
          containerStyle={{marginTop: 30}}
          placeholder="Placeholder"
          label="Label"
          labelColor={{
            default: 'green',
            focus: 'blue',
            disabled: Colors.grey40
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  withUnderline: {
    borderBottomWidth: 1,
    borderColor: Colors.grey40,
    paddingBottom: 4
  }
});
