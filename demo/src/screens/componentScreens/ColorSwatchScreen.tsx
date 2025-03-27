import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Constants, Colors, View, Text, ColorSwatch, ColorPalette} from 'react-native-ui-lib'; //eslint-disable-line

export default class ColorSwatchScreen extends Component {
  colors = [
    'transparent',
    Colors.$backgroundSuccessHeavy,
    Colors.$backgroundWarningHeavy,
    Colors.$backgroundDangerHeavy
  ];
  mainColors = [
    '#66737C',
    '#459FED',
    '#1D5382',
    '#3CC7C5',
    '#65C888',
    '#FAAD4D',
    '#F27052',
    '#F2564D',
    '#B13DAC',
    '#733CA6',
    '#79838A',
    '#5847FF',
    '#00BBF2',
    '#00CD8B',
    '#FF563D',
    '#ffb600'
  ];
  allColors = _.filter(Object.values(Colors), _.isString);

  state = {
    color: this.colors[0],
    color1: this.mainColors[this.mainColors.length - 1],
    color2: this.allColors[20],
    selected: false
  };

  onPress = () => {
    this.setState({selected: !this.state.selected});
  };

  onValueChange = (value: string) => {
    this.setState({color: value});
  };
  onValueChange1 = (value: string) => {
    this.setState({color1: value});
  };
  onValueChange2 = (value: string) => {
    this.setState({color2: value});
  };

  unavailableOnPress = () => {
    console.log(`Pressed on unavailable color swatch!`);
  };

  render() {
    const {color, color1, color2, selected} = this.state;

    return (
      <ScrollView>
        <View flex center paddingT-s5>
          <Text margin-5 text60>
            Single ColorSwatch
          </Text>
          <View row spread gap-15>
            <View>
              <ColorSwatch selected={selected} onPress={this.onPress}/>
            </View>
            <View>
              <ColorSwatch unavailable onPress={this.unavailableOnPress} color={Colors.yellow10}/>
              <Text text90R>Unavailable</Text>
            </View>
            <View>
              <ColorSwatch color={'transparent'}/>
              <Text text90R>Transparent</Text>
            </View>
            <View center>
              <ColorSwatch style={{borderRadius: 0}} transparent selected/>
              <Text text90R>Square</Text>
            </View>
          </View>

          <Text marginT-20 text60>
            ColorPalette
          </Text>
          <Text marginB-10 text70 style={{color}}>
            Selected Color: {color}
          </Text>
          <ColorPalette value={color} onValueChange={this.onValueChange} colors={this.colors}/>

          <Text margin-10 text60>
            Scrollable
          </Text>
          <ColorPalette value={color1} onValueChange={this.onValueChange1} colors={this.mainColors}/>

          <Text margin-10 text60>
            Pagination
          </Text>
          <ColorPalette
            numberOfRows={!Constants.isTablet ? 4 : undefined}
            value={color2}
            onValueChange={this.onValueChange2}
            colors={this.allColors}
          />
        </View>
      </ScrollView>
    );
  }
}
