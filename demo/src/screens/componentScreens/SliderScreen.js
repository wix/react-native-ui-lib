import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Colors, View, Text, Image, Slider, GradientSlider, ColorSliderGroup} from 'react-native-ui-lib';


const INITIAL_VALUE = 0;
const COLOR = Colors.blue30;

export default class SliderScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alpha: 1,
      color: COLOR,
      sliderValue: INITIAL_VALUE
    };
  }

  onSliderValueChange = (value) => {
    this.setState({sliderValue: value});
  }

  onGradientValueChange = (value, alpha) => {
    this.setState({color: value, alpha});
  }

  onGroupValueChange = (value) => {
    console.warn('onGroupValueChange: ', value);
  }

  render() {
    const {color, alpha, sliderValue} = this.state;

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View flex padding-20>
          <Text titleHuge marginB-20>Sliders</Text>
          
          <View row centerV>
            <Image assetName={'megaphone'} style={styles.image}/>
            <Slider 
              onValueChange={this.onSliderValueChange} 
              value={INITIAL_VALUE} 
              minimumValue={0} 
              maximumValue={100} 
              step={1} 
              containerStyle={styles.sliderContainer}
            />
            <Text bodySmall grey30 style={styles.text}>{sliderValue}%</Text>
          </View>
          
          <Text marginT-30>Negatives</Text>
          <Slider 
            minimumValue={-100} 
            maximumValue={100} 
            value={-30} 
            minimumTrackTintColor={Colors.red30}
            thumbTintColor={Colors.red50}
            containerStyle={styles.slider}
          />
          <Slider 
            minimumValue={-300} 
            maximumValue={-100} 
            value={-130} 
            minimumTrackTintColor={Colors.red30}
            thumbTintColor={Colors.red50}
            containerStyle={styles.slider}
          />

          <Text marginT-20>Disabled</Text>
          <Slider 
            minimumValue={100} 
            maximumValue={200} 
            value={120} 
            minimumTrackTintColor={Colors.red30}
            thumbTintColor={Colors.green30}
            containerStyle={styles.slider}
            disabled
          />
          
          <Text marginT-15>Custom with Steps</Text>
          <Slider 
            value={50} 
            minimumValue={0} 
            maximumValue={100} 
            step={25} 
            containerStyle={styles.slider}
            trackStyle={styles.track}
            thumbStyle={styles.thumb}
            activeThumbStyle={styles.activeThumb}
            thumbTintColor={Colors.violet70}
            minimumTrackTintColor={Colors.violet40}
            maximumTrackTintColor={Colors.violet70}
          />

          <Text marginT-15>Gradient Sliders</Text>
          <View row centerV>
            <Text text90 grey30>DEFAULT</Text>
            <GradientSlider 
              color={color} 
              containerStyle={styles.gradientSliderContainer} 
              onValueChange={this.onGradientValueChange}
            />
            <View style={styles.box}>
              <View style={{flex: 1, backgroundColor: color, opacity: alpha}}/>
            </View>
          </View>
          <View row centerV>
            <Text text90 grey30>HUE</Text>
            <GradientSlider 
              type={GradientSlider.types.HUE} 
              color={COLOR} 
              containerStyle={styles.gradientSliderContainer} 
              onValueChange={this.onGradientValueChange}
            />
            <View style={styles.box}>
              <View style={{flex: 1, backgroundColor: color}}/>
            </View>
          </View>
        
          <Text marginT-25 marginB-20>Color Slider Group</Text>
          <ColorSliderGroup 
            initialColor={color} 
            sliderContainerStyle={styles.slider}
            containerStyle={styles.group}
            showLabels
            // onValueChange={this.onGroupValueChange} 
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    tintColor: Colors.dark30
  },
  text: {
    width: 40
  },
  slider: {
    marginVertical: 6
  },
  sliderContainer: {
    flex: 1, // NOTE: to place a slider in a row layout you must set flex in its 'containerStyle'!!!
    marginHorizontal: 8
  },
  gradientSliderContainer: {
    flex: 1, // NOTE: to place a slider in a row layout you must set flex in its 'containerStyle'!!!
    marginHorizontal: 20,
    marginVertical: 10
  },
  track: {
    height: 2
  },
  thumb: {
    width: 26, 
    height: 26, 
    borderRadius: 13, 
    borderColor: Colors.violet40, 
    borderWidth: 1, 
    shadowColor: Colors.white
  },
  activeThumb: {
    width: 40, 
    height: 40, 
    borderRadius: 20
  },
  box: {
    width: 20, 
    height: 20,
    borderRadius: 4,
    borderWidth: 1, 
    borderColor: Colors.dark60
  },
  group: {
    backgroundColor: Colors.dark60,
    padding: 10,
    borderRadius: 6
  }
});
