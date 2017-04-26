import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import _ from 'lodash';
import {View, Colors, Text, Stepper, Typography, Picker} from 'react-native-ui-lib';//eslint-disable-line
import tagIcon from '../../assets/icons/tags.png';

const options = [
  {label: 'JavaScript', value: 'js'},
  {label: 'Java', value: 'java'},
  {label: 'Python', value: 'python'},
  {label: 'C++', value: 'c++', disabled: true},
  {label: 'Perl', value: 'perl'},
];

const filters = [
  {label: 'All', value: 0},
  {label: 'Draft', value: 1},
  {label: 'Published', value: 2},
  {label: 'Scheduled', value: 3},
];

export default class FormScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemsCount: 1,
      // language: {value: 'java', label: 'Java'},
      language: undefined,
      languages: [options[3]],
      filter: filters[0],
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

        <Picker
          placeholder="Pick a single language"
          value={this.state.language}
          selectedValue={this.state.language}
          enableModalBlur={false}
          onChange={item => this.setState({language: item})}
        >
          {_.map(options, option => <Picker.Item key={option.value} label={option.label} value={option.value} disabled={option.disabled}/>)}
        </Picker>

        {/*<Text text80 purple50>Selected Value: {_.get(this.state.language, 'value')}</Text>*/}

        <View marginT-20>
          <Picker
            placeholder="Pick multiple Languages"
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
        </View>

        {/*<Text text80 purple50>Selected Languages: {_.chain(this.state.languages).map('value').join(', ').value()}</Text>*/}

        <Text marginT-20 marginB-10 text70 dark60>Custom Picker:</Text>
        <Picker
          value={this.state.filter}
          onChange={filter => this.setState({filter})}
          renderPicker={({label}) => {
            return (
              <View row center>
                <Image style={{marginRight: 1, height: 16, resizeMode: 'contain'}} source={tagIcon}/>
                <Text dark10 text80>{label} Posts</Text>
              </View>
            );
          }}
        >
          {_.map(filters, filter => (
            <Picker.Item
              key={filter.value}
              label={filter.label}
              value={filter.value}
            />
          ))}
        </Picker>

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
    ...Typography.text80,
    marginTop: 25,
    marginBottom: 5,
  },
});
