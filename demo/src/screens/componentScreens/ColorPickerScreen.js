import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Colors, View, Text, ColorPicker, ColorPalette} from 'react-native-ui-lib';


const INITIAL_COLOR = Colors.blue30;
const mainColors = [
  '#66737C', '#459FED', '#1D5382', '#3CC7C5', '#65C888', '#FAAD4D', '#F27052', '#F2564D', 
  '#B13DAC', '#733CA6', '#79838A', '#5847FF', '#00BBF2', '#00CD8B', '#FF563D', '#ffb600'
];


export default class ColorPickerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: INITIAL_COLOR,
      textColor: Colors.white,
      customColors: [],
      paletteChange: false
    };
  }

  onDismiss = () => {
    console.log(`screen onDismiss`);
  }

  onSubmit = (color, textColor) => {
    const {customColors} = this.state;
    customColors.push(color);
    this.setState({color, textColor, customColors: _.clone(customColors), paletteChange: false});
  }

  onValueChange = (value, options) => {
    this.setState({color: value, textColor: options ? options.tintColor : undefined, paletteChange: false});
  }

  onPaletteValueChange = (value, options) => {
    this.setState({color: value, textColor: options ? options.tintColor : undefined, paletteChange: true});
  }

  render() {
    const {color, textColor, customColors, paletteChange} = this.state;
    const paletteValue = paletteChange ? (color || INITIAL_COLOR) : undefined;
    const pickerValue = !paletteChange ? (color || INITIAL_COLOR) : undefined;

    return (
      <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 20}}>
        <View center bg-white marginV-10>
          <Text text60 margin-10 style={{color}}>Selected Color: {color}</Text>
          <View center marginB-10 style={{height: 50, width: 200, backgroundColor: color}}>
            <Text text60 style={{color: textColor}}>{color}</Text>
          </View>
        </View>
        <View bg-white>
          <Text text60 marginL-20 marginB-4 marginT-24>Theme Color</Text>
          <Text marginL-20>Choose a color for your place’s theme.</Text>
          <ColorPalette value={paletteValue} onValueChange={this.onPaletteValueChange} colors={mainColors}/>
          <Text marginL-20 marginT-16>Custom Colors</Text>
          <ColorPicker
            initialColor={color}
            colors={customColors}
            onDismiss={this.onDismiss}
            onSubmit={this.onSubmit}
            onValueChange={this.onValueChange}
            value={pickerValue}
            // animatedIndex={0}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark80
  }
});
