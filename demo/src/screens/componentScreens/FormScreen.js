import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Stepper, Typography, Picker} from 'react-native-ui-lib';//eslint-disable-line

export default class FormScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemsCount: 1,
      language: 'java',
      languages: [],
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
          label="Pick a Language"
          selectedValue={this.state.language}
          enableModalBlur={false}
          onValueChange={({value}) => this.setState({language: value})}
        >
          <Picker.Item label={'JavaScript'} value={'js'}/>
          <Picker.Item label={'Java'} value={'java'}/>
          <Picker.Item label={'Python'} value={'python'}/>
          <Picker.Item label={'C++'} value={'c++'}/>
          <Picker.Item label={'Perl'} value={'perl'}/>
        </Picker>

        <Text style={styles.componentTitle}>Multi Select Picker</Text>
        <Picker
          label="Pick Languages"
          selectedValue={this.state.languages}
          onValueChange={({value}) => this.setState({languages: value})}
          mode={Picker.modes.MULTI}
        >
          <Picker.Item label={'JavaScript'} value={'js'}/>
          <Picker.Item label={'Java'} value={'java'}/>
          <Picker.Item label={'Python'} value={'python'}/>
          <Picker.Item label={'C++'} value={'c++'}/>
          <Picker.Item label={'Perl'} value={'perl'}/>
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
    ...Typography.text60,
    marginTop: 20,
    marginBottom: 5,
  },
});
