import React, {Component} from 'react';
import {View, Text, TextInput, Colors} from 'react-native-ui-lib'; //eslint-disable-line
import _ from 'lodash';
import {renderSliderOption, renderColorOption} from '../ExampleScreenPresenter';

export default class TextInputScreen extends Component {
  state = {
    backgroundColor: '',
    color: Colors.grey10,
    typography: '70',
    margins: 0,
    paddings: 0
  };
  render() {
    const {typography, backgroundColor, color, margins, paddings} = this.state;

    const backgroundColorKey = _.invert(Colors)[backgroundColor];
    const colorKey = _.invert(Colors)[color] || 'grey10';
    const props = {
      [`text${typography}`]: true,
      [colorKey]: true,
      [`margin-${margins}`]: true,
      [`padding-${paddings}`]: true
    };

    if (backgroundColorKey) {
      props[`bg-${backgroundColorKey}`] = true;
    }

    return (
      <View flex padding-page>
        <Text h1>TextInput</Text>
        <View marginT-s5 marginB-s10>
          <TextInput placeholder="Enter Text" {...props} />
        </View>
        <View height={2} bg-grey60 marginB-20 />

        <View>
          {renderSliderOption.call(this, 'Typography', 'typography', {
            initial: 70,
            min: 40,
            max: 90,
            step: 10,
            sliderText: 'text'
          })}
          {renderColorOption.call(this, 'Background Color', 'backgroundColor')}
          {renderColorOption.call(this, 'Color', 'color', [
            'transparent',
            Colors.blue30,
            Colors.grey10,
            Colors.yellow30,
            Colors.green30,
            Colors.white
          ])}

          {renderSliderOption.call(this, 'Margins', 'margins', {
            initial: 0,
            min: 0,
            max: 20,
            step: 1
          })}
          {renderSliderOption.call(this, 'Paddings', 'paddings', {
            initial: 0,
            min: 0,
            max: 20,
            step: 1
          })}
        </View>
      </View>
    );
  }
}
