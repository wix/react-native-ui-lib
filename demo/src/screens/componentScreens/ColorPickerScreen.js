import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Colors, View, Text, ColorPicker, ColorPalette} from 'react-native-ui-lib';


const INITIAL_COLOR = Colors.blue30;
const colors = [
  '#20303C', '#43515C', '#66737C', '#858F96', '#A3ABB0', '#C2C7CB', '#E0E3E5', '#F2F4F5',
  '#3182C8', '#4196E0', '#459FED', '#57a8ef', '#8fc5f4', '#b5d9f8', '#daecfb', '#ecf5fd',
  '#00AAAF', '#32BABC', '#3CC7C5', '#64D4D2', '#8BDFDD', '#B1E9E9', '#D8F4F4', '#EBF9F9',
  '#00A65F', '#32B76C', '#65C888', '#84D3A0', '#A3DEB8', '#C1E9CF', '#E8F7EF', '#F3FBF7',
  '#E2902B', '#FAA030', '#FAAD4D', '#FBBD71', '#FCCE94', '#FDDEB8', '#FEEFDB', '#FEF7ED',
  '#D9644A', '#E66A4E', '#F27052', '#F37E63', '#F7A997', '#FAC6BA', '#FCE2DC', '#FEF0ED',
  '#CF262F', '#EE2C38', '#F2564D', '#F57871', '#F79A94', '#FABBB8', '#FCDDDB', '#FEEEED',
  '#8B1079', '#A0138E', '#B13DAC', '#C164BD', '#D08BCD', '#E0B1DE', '#EFD8EE', '#F7EBF7'
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
          <ColorPalette value={paletteValue} onValueChange={this.onPaletteValueChange} colors={colors}/>
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
