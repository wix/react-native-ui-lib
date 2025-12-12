import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Colors, View, Text, ColorPicker, ColorPalette, ColorName, ColorInfo, TouchableOpacity, ColorPickerDialog} from 'react-native-ui-lib';
import {renderMultipleSegmentOptions} from '../ExampleScreenPresenter';

interface State {
  color: string;
  textColor?: string;
  customColors: string[];
  paletteChange: boolean;
  backgroundColor: string;
  showPicker: boolean;
}

const INITIAL_COLOR = Colors.$backgroundPrimaryHeavy;
// prettier-ignore
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

export default class ColorPickerScreen extends Component<{}, State> {
  state: State = {
    color: INITIAL_COLOR,
    textColor: Colors.$textDefaultLight,
    customColors: [],
    paletteChange: false,
    backgroundColor: Colors.$backgroundDefault,
    showPicker: false
  };

  onDismiss = () => {
    console.log(`screen onDismiss`);
  };

  onSubmit = (color: string, textColor: string) => {
    const {customColors} = this.state;
    customColors.push(color);
    this.setState({color, textColor, customColors: _.clone(customColors), paletteChange: false});
  };

  onValueChange = (value: string, colorInfo: ColorInfo) => {
    this.setState({color: value, textColor: colorInfo?.tintColor, paletteChange: false});
  };

  onPaletteValueChange = (value: string, colorInfo: ColorInfo) => {
    this.setState({color: value, textColor: colorInfo?.tintColor, paletteChange: true});
  };

  render() {
    const {color, textColor, customColors, paletteChange, backgroundColor} = this.state;
    const paletteValue = paletteChange ? color || INITIAL_COLOR : undefined;
    const pickerValue = !paletteChange ? color || INITIAL_COLOR : undefined;

    const mappedColor = ColorName.name(color);
    const nearestColor = mappedColor[0];
    const colorName = mappedColor[1];
    const isMapped = mappedColor[2] ? 'Mapped' : 'Not mapped';

    return (
      <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 20}}>
        <View center bg-$backgroundDefault marginV-10>
          <Text text60 margin-10 style={{color}}>
            Selected Color: {color}
          </Text>
          <View center marginB-10 style={{height: 50, width: 200, backgroundColor: color}}>
            <Text text60 style={{color: textColor}}>
              {color}
            </Text>
          </View>
        </View>
        <View bg-$backgroundDefault>
          <View marginH-20>
            {renderMultipleSegmentOptions.call(this, 'backgroundColor:', 'backgroundColor', [
              {label: 'Default', value: Colors.$backgroundDefault},
              {label: 'Primary', value: Colors.$backgroundPrimaryHeavy},
              {label: 'Success', value: Colors.$backgroundSuccessHeavy}
            ])}
          </View>
          <Text text60 marginL-20 marginB-4 marginT-24>
            Theme Color
          </Text>
          <Text marginL-20>Choose a color for your place’s theme.</Text>
          <ColorPalette
            value={paletteValue}
            onValueChange={this.onPaletteValueChange}
            colors={colors}
            backgroundColor={backgroundColor}
          />
          <Text marginL-20 marginT-16>
            Custom Colors
          </Text>
          <ColorPicker
            initialColor={color}
            colors={customColors}
            onDismiss={this.onDismiss}
            onSubmit={this.onSubmit}
            onValueChange={this.onValueChange}
            value={pickerValue}
            // animatedIndex={0}
            backgroundColor={backgroundColor}
          />
        </View>

        <View marginV-10 bg-$backgroundDefault>
          <Text center text60 marginT-10>
            Color Name
          </Text>
          <View spread row margin-10 style={{backgroundColor: nearestColor}}>
            <Text margin-5 text70 style={{color: textColor}}>
              {nearestColor}
            </Text>
            <Text margin-5 text60 style={{color: textColor}}>
              {colorName}
            </Text>
            <Text margin-5 text70 style={{color: textColor}}>
              {isMapped}
            </Text>
          </View>
        </View>

        <Text center text60 marginT-10>Color Picker Dialog</Text>
        <View center>
          <TouchableOpacity
            margin-10 
            center
            style={{width: 60, height: 60, borderWidth: 1, borderRadius: 30, backgroundColor: color}} 
            onPress={() => this.setState({showPicker: true})}
          >
            <Text>Press</Text>
          </TouchableOpacity>
        </View>
        <ColorPickerDialog
          visible={this.state.showPicker}
          initialColor={color}
          key={color}
          onDismiss={() => this.setState({showPicker: false})}
          onSubmit={this.onSubmit}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.$backgroundNeutralLight
  }
});
