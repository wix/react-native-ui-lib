import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import _ from 'lodash';
import {Colors, Text, Stepper, Typography, Picker} from 'react-native-ui-lib';//eslint-disable-line

const options = [
  {label: 'JavaScript', value: 'js'},
  {label: 'Java', value: 'java'},
  {label: 'Python', value: 'python'},
  {label: 'C++', value: 'c++', disabled: true},
  {label: 'Perl', value: 'perl'},
];

export default class FormScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemsCount: 1,
      // language: {value: 'java', label: 'Java'},
      language: undefined,
      languages: [options[3]],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{...Typography.text60}}>Stepper</Text>
        <Stepper
          label={this.state.itemsCount === 1 ? 'Item' : 'Items'}
          min={1}
          max={5}
          onValueChange={count => this.setState({itemsCount: count})}
          initialValue={1}
        />
        <Text style={styles.componentTitle}>Single Select Picker</Text>

        <Picker
          placeholder="Pick a Language"
          value={this.state.language}
          selectedValue={this.state.language}
          enableModalBlur={false}
          onChange={item => this.setState({language: item})}
        >
          {_.map(options, option => <Picker.Item key={option.value} label={option.label} value={option.value} disabled={option.disabled}/>)}
        </Picker>

        <Text text80 purple50>Selected Value: {_.get(this.state.language, 'value')}</Text>

        <Text style={styles.componentTitle}>Multi Select Picker</Text>
        <Picker
          placeholder="Pick Languages"
          value={this.state.languages}
          onChange={items => this.setState({languages: items})}
          mode={Picker.modes.MULTI}
        >
          {_.map(options, option => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
              disabled={option.disabled}
            />
          ))}
        </Picker>

        <Text text80 purple50>Selected Languages: {_.chain(this.state.languages).map('value').join(', ').value()}</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  componentTitle: {
    ...Typography.text60,
    marginTop: 20,
    marginBottom: 5,
  },
});
