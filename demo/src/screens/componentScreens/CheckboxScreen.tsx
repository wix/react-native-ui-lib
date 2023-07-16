import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Assets, Colors, View, Text, Button, Checkbox, CheckboxRef} from 'react-native-ui-lib'; //eslint-disable-line

export default class CheckboxScreen extends Component {
  state = {
    value1: false,
    value2: false,
    value3: true,
    value4: true,
    value5: false,
    value6: false,
    value7: false
  };
  checkbox = React.createRef<CheckboxRef>();
  checkbox1 = React.createRef<CheckboxRef>();

  render() {
    return (
      <View flex padding-page>
        <Text text40 $textDefault marginB-20>
          Checkbox
        </Text>

        <Text marginB-s4>Customizable UI</Text>
        <View row marginB-s5 centerV>
          <Checkbox value={this.state.value1} onValueChange={value1 => this.setState({value1})}/>
          <Checkbox
            value={this.state.value2}
            onValueChange={value2 => this.setState({value2})}
            borderRadius={2}
            size={30}
            color={Colors.purple30}
            selectedIcon={Assets.icons.x}
            marginL-s5
          />

          <Checkbox
            value={this.state.value3}
            onValueChange={value3 => this.setState({value3})}
            borderRadius={5}
            size={18}
            color={Colors.grey10}
            iconColor={Colors.green10}
            marginL-s5
          />
        </View>
        <Checkbox
          value={this.state.value6}
          label={'With label'}
          color={Colors.green20}
          onValueChange={value6 => this.setState({value6})}
          containerStyle={styles.checkbox}
        />

        <View row style={styles.row}>
          <Text $textDefault marginR-10>
            Disabled States
          </Text>
          <Checkbox
            disabled
            value={this.state.value5}
            onValueChange={value5 => this.setState({value5})}
            style={{marginRight: 10}}
          />
          <Checkbox
            disabled
            value={!this.state.value5}
            onValueChange={value5 => this.setState({value5})}
            iconColor={Colors.green10}
          />
        </View>

        <View marginT-20>
          <Text text60 $textDefault marginB-10>
            Validation
          </Text>
          <View row spread marginB-10>
            <Checkbox
              ref={this.checkbox}
              value={this.state.value7}
              onValueChange={value7 => this.setState({value7})}
              label={'This is a checkbox'}
            />
            <Button size={'small'} label={'Validate'} onPress={() => this.checkbox.current?.validate()}/>
          </View>
          <View row spread>
            <Checkbox
              disabled
              ref={this.checkbox1}
              value={this.state.value7}
              onValueChange={value7 => this.setState({value7})}
              iconColor={Colors.green10}
              label={'This is disabled checkbox'}
            />
            <Button disabled size={'small'} label={'Validate'} onPress={() => this.checkbox1.current?.validate()}/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  checkbox: {
    marginBottom: 20
  },
  row: {
    alignItems: 'center'
  }
});
