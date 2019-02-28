import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Assets, RadioButton, Colors, RadioGroup, View, Text} from 'react-native-ui-lib'; //eslint-disable-line
const starIcon = require('../../assets/icons/star.png');

export default class RadioButtonScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'orange',
      disabledSelectedValue: true,
    };
  }

  renderRadioButton(value, text) {
    return (
      <View row centerV marginB-5>
        <RadioButton value={value} label={text}/>
      </View>
    );
  }

  renderRadioButtonWithImage(value, icon, style) {
    return (
      <View row centerV marginR-15>
        <RadioButton value={value} size={15} color={Colors.green30} borderRadius={0} iconSource={icon} iconStyle={style}/>
      </View>
    );
  }

  renderRadioButtonWithImageAndText(value, text, iconOnRight) {
    return (
      <View row centerV marginB-5>
        <RadioButton value={value} label={text} iconSource={starIcon} iconOnRight={iconOnRight}/>
      </View>
    );
  }

  render() {
    return (
      <View flex useSafeArea bg-dark80>
        <View flex padding-20>
          <View flex>
            <View spread row>
              <RadioGroup value={this.state.color} onValueChange={value => this.setState({color: value})}>
                <Text marginB-20 text60 dark10>
                  Select a color
                </Text>
                {this.renderRadioButton('orange', 'Orange')}
                {this.renderRadioButton('purple', 'Purple')}
                {this.renderRadioButton('green', 'Green')}
                <Text marginT-10>You chose: {this.state.color}</Text>
              </RadioGroup>
              <RadioGroup value={this.state.textSide} onValueChange={value => this.setState({textSide: value})}>
                <Text marginB-20 text60 dark10>
                  Select text side
                </Text>
                {this.renderRadioButtonWithImageAndText('right', 'Text on right')}
                {this.renderRadioButtonWithImageAndText('left', 'Text on left', true)}
                <Text marginT-10>You chose: {this.state.textSide}</Text>
              </RadioGroup>
            </View>

            <RadioGroup marginT-30 value={this.state.value} onValueChange={value => this.setState({value})}>
              <Text marginB-20 text60 dark10>
                Yes or No?
              </Text>
              <View row>
                {this.renderRadioButtonWithImage('yes', Assets.icons.check, {tintColor: 'green'})}
                {this.renderRadioButtonWithImage('no', Assets.icons.x, {tintColor: 'red'})}
              </View>
              <Text marginT-10>You chose: {this.state.value}</Text>
            </RadioGroup>

            <Text marginV-20 text60 dark10>
              Use it without RadioGroup
            </Text>

            <View row centerV marginB-10>
              <RadioButton
                selected={this.state.individualValue2}
                onPress={() => this.setState({individualValue2: !this.state.individualValue2})}
                label="Individual Radio Button (with style)"
                labelStyle={{fontSize: 16, fontWeight: 'bold'}}
              />
            </View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.setState({individualValue: !this.state.individualValue})}
            >
              <View row centerV>
                <RadioButton selected={this.state.individualValue} label="Individual Radio Button (wrapped)" />
              </View>
            </TouchableOpacity>
            <View row centerV marginT-10>
              <RadioButton
                disabled
                selected={this.state.disabledValue}
                onPress={() => this.setState({disabledValue: !this.state.disabledValue})}
                label="Disabled Radio Button"
              />
            </View>
            <View row centerV marginT-10>
              <RadioButton
                disabled
                selected={this.state.disabledSelectedValue}
                onPress={() => this.setState({disabledSelectedValue: !this.state.disabledSelectedValue})}
                label="Disabled Selected Radio Button"
              />
            </View>
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
