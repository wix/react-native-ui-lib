import React, {Component} from 'react';
import {TouchableOpacity, ScrollView, Platform, StyleSheet} from 'react-native';
import {Assets, RadioButton, Colors, Shadows, RadioGroup, View, Text} from 'react-native-ui-lib'; //eslint-disable-line
const starIcon = require('../../assets/icons/star.png');

const COLORS = {
  ORANGE: {name: 'Orange', color: Colors.orange20},
  PURPLE: {name: 'Purple', color: Colors.purple20},
  GREEN: {name: 'Green', color: Colors.green20},
};

export default class RadioButtonScreen extends Component {
  static colors = COLORS;
  constructor(props) {
    super(props);
    this.state = {
      color: undefined,
      messageType: undefined,
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

  renderRadioButtonForColorEnum(color) {
    return (
      <View row centerV marginB-5>
        <RadioButton value={color.name} label={color.name} labelStyle={{color: color.color}}/>
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
        <View flex>
          <ScrollView style={{padding: 20}}>
            <RadioGroup value={this.state.color || null} onValueChange={value => this.setState({color: value})}>
              <Text marginB-20 text60 dark10>
                Select a color{'\n'}
                (enum with default value)
              </Text>
              {this.renderRadioButton(null, 'Default')}
              {this.renderRadioButtonForColorEnum(RadioButtonScreen.colors.ORANGE)}
              {this.renderRadioButtonForColorEnum(RadioButtonScreen.colors.PURPLE)}
              {this.renderRadioButtonForColorEnum(RadioButtonScreen.colors.GREEN)}
              <Text marginT-10>You chose: {this.state.color ? this.state.color : 'Default'}</Text>
            </RadioGroup>

            <RadioGroup marginT-30 value={this.state.textSide} onValueChange={value => this.setState({textSide: value})}>
              <Text marginB-20 text60 dark10>
                Select text side
              </Text>
              {this.renderRadioButtonWithImageAndText('right', 'Text on right')}
              {this.renderRadioButtonWithImageAndText('left', 'Text on left', true)}
              <Text marginT-10>You chose: {this.state.textSide}</Text>
            </RadioGroup>

            <RadioGroup marginT-30 initialValue={this.state.value} onValueChange={value => this.setState({value})}>
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

            <View style={{height: 30}}/>
          </ScrollView>

          <View paddingH-20 paddingV-10 style={[styles.shadow, {backgroundColor: Colors.dark80}]}>
            <Text text40 dark10>
              Radio Buttons
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        ...Shadows.dark20.bottom
      },
      android: {
        elevation: 3
      },
    }),
  },
});
