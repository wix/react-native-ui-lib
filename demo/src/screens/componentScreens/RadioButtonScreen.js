import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Assets, RadioButton, Colors, RadioGroup, View, Text, Image} from 'react-native-ui-lib'; //eslint-disable-line

export default class RadioButtonScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'orange',
    };
  }

  renderRadioButton(value, text) {
    return (
      <View row centerV marginB-5>
        <RadioButton value={value} />
        <Text marginL-10>{text}</Text>
      </View>
    );
  }

  renderRadioButtonWithImage(value, icon) {
    return (
      <View row centerV marginR-15>
        <RadioButton value={value} size={15} color={Colors.green30} borderRadius={0} />
        <Image style={{marginLeft: 6}} source={icon} />
      </View>
    );
  }

  render() {
    return (
      <View flex useSafeArea bg-dark80>
        <View flex padding-20>
          <View flex>
            <RadioGroup value={this.state.color} onValueChange={value => this.setState({color: value})}>
              <Text marginB-20 text60 dark10>
                Select a color
              </Text>
              {this.renderRadioButton('orange', 'Orange')}
              {this.renderRadioButton('purple', 'Purple')}
              {this.renderRadioButton('green', 'Green')}
              <Text marginT-10>You chose: {this.state.color}</Text>
            </RadioGroup>

            <RadioGroup marginT-30 value={this.state.value} onValueChange={value => this.setState({value})}>
              <Text marginB-20 text60 dark10>
                Yes or No?
              </Text>
              <View row>
                {this.renderRadioButtonWithImage('yes', Assets.icons.check)}
                {this.renderRadioButtonWithImage('no', Assets.icons.x)}
              </View>
              <Text marginT-10>You chose: {this.state.value}</Text>
            </RadioGroup>

            <Text marginV-20 text60 dark10>
              Use it without RaduiGroup
            </Text>

            <TouchableOpacity activeOpacity={1} onPress={() => this.setState({individualValue: !this.state.individualValue})}>
              <View row centerV>
                <RadioButton selected={this.state.individualValue} />
                <Text marginL-10>Individual Radio Button</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text text40 dark10>
              Radio Buttons
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
