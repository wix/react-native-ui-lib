import React, {Component} from 'react';
import {TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {Assets, Colors, View, Text, RadioButton, RadioGroup} from 'react-native-ui-lib'; //eslint-disable-line
const starIcon = require('../../assets/icons/star.png');

const COLORS = {
  ORANGE: {name: 'Orange', color: Colors.orange20},
  PURPLE: {name: 'Purple', color: Colors.purple20},
  GREEN: {name: 'Green', color: Colors.green20}
};

export default class RadioButtonScreen extends Component {
  static colors = COLORS;

  constructor(props) {
    super(props);

    this.state = {
      color: undefined,
      messageType: undefined,
      disabledSelectedValue: true
    };
  }

  renderRadioButton(value, text, props) {
    return (
      <View row centerV marginB-5>
        <RadioButton value={value} label={text} {...props}/>
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
        <RadioButton
          value={value}
          size={15}
          color={Colors.green30}
          borderRadius={0}
          iconSource={icon}
          iconStyle={style}
        />
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
      <View flex useSafeArea>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding: 20}}>
          <Text h1 marginB-s5 $textDefault>
            Radio Buttons
          </Text>

          <RadioGroup gap-s4 initialValue={this.state.color || null} onValueChange={value => this.setState({color: value})}>
            <Text marginB-20 text60 $textDefault>
              Select a color{'\n'}
              (enum with default value)
            </Text>
            {this.renderRadioButton(null, 'Default')}
            {this.renderRadioButtonForColorEnum(RadioButtonScreen.colors.ORANGE)}
            {this.renderRadioButtonForColorEnum(RadioButtonScreen.colors.PURPLE)}
            {this.renderRadioButtonForColorEnum(RadioButtonScreen.colors.GREEN)}
            <Text marginT-10>You chose: {this.state.color ? this.state.color : 'Default'}</Text>
          </RadioGroup>

          <RadioGroup
            gap-s4
            marginT-30
            initialValue={this.state.textSide}
            onValueChange={value => this.setState({textSide: value})}
          >
            <Text marginB-20 text60 $textDefault>
              Alignments
            </Text>
            {this.renderRadioButtonWithImageAndText('left-icon', 'Text on right')}
            {this.renderRadioButtonWithImageAndText('right-icon', 'Text on left', true)}
            {this.renderRadioButton('right-content', 'Content on right', true)}
            {this.renderRadioButton('left-content', 'Content on left', {contentOnLeft: true})}
            <Text marginT-10>You chose: {this.state.textSide}</Text>
          </RadioGroup>

          <RadioGroup gap-s4 marginT-30 initialValue={this.state.value} onValueChange={value => this.setState({value})}>
            <Text marginB-20 text60 $textDefault>
              Yes or No?
            </Text>
            <View row>
              {this.renderRadioButtonWithImage('yes', Assets.icons.demo.check, {tintColor: 'green'})}
              {this.renderRadioButtonWithImage('no', Assets.icons.demo.x, {tintColor: 'red'})}
            </View>
            <Text marginT-10>You chose: {this.state.value}</Text>
          </RadioGroup>

          <Text marginV-20 text60 $textDefault>
            Use it without RadioGroup
          </Text>
          <View row centerV marginB-10>
            <RadioButton
              gap-s4
              selected={this.state.individualValue2}
              onPress={() => this.setState({individualValue2: !this.state.individualValue2})}
              label="Individual Radio Button (with style)"
              labelStyle={{fontSize: 16, fontWeight: 'bold'}}
              contentOnLeft
              containerStyle={styles.contentOnLeft}
            />
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.setState({individualValue: !this.state.individualValue})}
            accessible={false}
          >
            <View row centerV>
              <RadioButton
                contentOnLeft
                containerStyle={styles.contentOnLeft}
                selected={this.state.individualValue}
                label="Individual Radio Button (wrapped)"
              />
            </View>
          </TouchableOpacity>
          <View row centerV marginT-10>
            <RadioButton
              disabled
              selected={this.state.disabledValue}
              onPress={() => this.setState({disabledValue: !this.state.disabledValue})}
              label="Disabled Radio Button"
              contentOnLeft
              containerStyle={styles.contentOnLeft}
            />
          </View>
          <View row centerV marginT-10>
            <RadioButton
              disabled
              selected={this.state.disabledSelectedValue}
              onPress={() => this.setState({disabledSelectedValue: !this.state.disabledSelectedValue})}
              label="Disabled Selected Radio Button"
              contentOnLeft
              containerStyle={styles.contentOnLeft}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentOnLeft: {
    flex: 1,
    justifyContent: 'space-between'
  }
});
