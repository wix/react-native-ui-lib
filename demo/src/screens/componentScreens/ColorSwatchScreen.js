import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Constants, Colors, View, Text, ColorSwatch, ColorPalette} from 'react-native-ui-lib'; //eslint-disable-line


export default class ColorSwatchScreen extends Component {
  constructor(props) {
    super(props);
    
    this.colors = ['transparent', Colors.green30, Colors.yellow30, Colors.red30];
    this.mainColors = ['#66737C', '#459FED', '#1D5382', '#3CC7C5', '#65C888', '#FAAD4D', '#F27052', '#F2564D', '#B13DAC', '#733CA6', '#79838A', '#5847FF', '#00BBF2', '#00CD8B', '#FF563D', '#ffb600'];
    this.allColors = _.filter(Object.values(Colors), _.isString);

    this.state = {
      color: this.colors[0],
      color1: this.mainColors[this.mainColors.length - 1],
      color2: this.allColors[20],
      selected: false
    };
  }

  onPress = () => {
    this.setState({selected: !this.state.selected});
  }

  onValueChange = (value) => {
    this.setState({color: value});
  }
  onValueChange1 = (value) => {
    this.setState({color1: value});
  }
  onValueChange2 = (value) => {
    this.setState({color2: value});
  }

  render() {
    const {color, color1, color2, selected} = this.state;
    
    return (
      <ScrollView style={{backgroundColor: Colors.dark80}}>
        <View flex center useSafeArea>
          <Text margin-5 text60 dark10>Single ColorSwatch</Text>
          <View row>
            <ColorSwatch selected={selected} onPress={this.onPress}/>
            <View>
              <ColorSwatch selected color={Colors.orange60}/>
              <Text>Disabled</Text>
            </View>
          </View>
          
          <Text marginT-20 text60 dark10>ColorPalette</Text>
          <Text marginB-10 text70 style={{color}}>Selected Color: {color}</Text>
          <ColorPalette value={color} onValueChange={this.onValueChange} colors={this.colors}/>

          <Text margin-10 text60 dark10>Scrollable</Text>
          <ColorPalette value={color1} onValueChange={this.onValueChange1} colors={this.mainColors}/>
          
          <Text margin-10 text60 dark10>Pagination</Text>
          <ColorPalette numberOfRows={!Constants.isTablet ? 4 : undefined} value={color2} onValueChange={this.onValueChange2} colors={this.allColors}/>
        </View>
      </ScrollView>
    );
  }
}
