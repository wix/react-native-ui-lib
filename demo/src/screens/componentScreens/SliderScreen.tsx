import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Constants, Colors, View, Text, Button, Icon, Slider, GradientSlider, ColorSliderGroup} from 'react-native-ui-lib';
import {renderBooleanOption} from '../ExampleScreenPresenter';

interface SliderScreenProps {
  componentId: string;
}

interface SliderScreenState {
  alpha: number;
  color: string;
  sliderValue: number;
  sliderMinValue: number;
  sliderMaxValue: number;
  forceLTR: boolean;
}

const INITIAL_VALUE = 0;
const COLOR = Colors.blue30;

export default class SliderScreen extends Component<SliderScreenProps, SliderScreenState> {
  state = {
    alpha: 1,
    color: COLOR,
    sliderValue: INITIAL_VALUE,
    sliderMinValue: 0,
    sliderMaxValue: 100,
    forceLTR: false
  };

  slider = React.createRef();

  resetSlider = () => {
    this.slider.current?.reset();
  }

  onSliderRangeChange = (values: {min: number, max: number}) => {
    const {min, max} = values;
    this.setState({sliderMinValue: min, sliderMaxValue: max});
  };

  onSliderValueChange = (value: number) => {
    this.setState({sliderValue: value});
  };

  onGradientValueChange = (value: string, alpha: number) => {
    this.setState({color: value, alpha});
  };

  onGroupValueChange = (value: string) => {
    console.warn('onGroupValueChange: ', value);
  };

  getReverseStyle = () => {
    return Constants.isRTL && this.state.forceLTR && styles.ltr;
  }

  render() {
    const {color, alpha, sliderValue, sliderMinValue, sliderMaxValue, forceLTR} = this.state;

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View flex padding-20>
          <Text text40 $textDefault marginB-20>
            Sliders
          </Text>

          {Constants.isRTL && renderBooleanOption.call(this, 'Force LTR', 'forceLTR')}

          <View row spread centerV marginB-10>
            <Text $textDefault text70BO>
              Default slider
            </Text>
            <Button link label="Reset" onPress={this.resetSlider}/>
          </View>
          
          <View row centerV style={this.getReverseStyle()}>
            <Icon assetName={'search'} style={styles.image}/>
            <Slider
              ref={this.slider}
              onValueChange={this.onSliderValueChange}
              value={INITIAL_VALUE}
              minimumValue={0}
              maximumValue={100}
              step={1}
              containerStyle={styles.sliderContainer}
              disableRTL={forceLTR}
            />
            <Text bodySmall $textNeutral style={styles.text} numberOfLines={1}>
              ${sliderValue}
            </Text>
          </View>

          <Text $textDefault text70BO marginT-30>
            Negatives
          </Text>
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

          <Text $textDefault text70BO marginT-20>
            Disabled
          </Text>
          <Slider minimumValue={100} maximumValue={200} value={120} containerStyle={styles.slider} disabled/>

          <Text $textDefault text70BO marginT-15>
            Custom with Steps
          </Text>
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

          <Text $textDefault text70BO marginV-15>
            Range Slider
          </Text>
          <View row spread style={this.getReverseStyle()}>
            <Text bodySmall $textNeutral>
              min. {sliderMinValue}%
            </Text>
            <Text bodySmall $textNeutral>
              max. {sliderMaxValue}%
            </Text>
          </View>
          <Slider
            useRange
            onRangeChange={this.onSliderRangeChange}
            value={INITIAL_VALUE}
            minimumValue={0}
            maximumValue={100}
            step={1}
            disableRTL={forceLTR}
          />

          <Text $textDefault text70BO marginV-15>
            Range w/ initial values and no default gap
          </Text>
          <View row spread style={this.getReverseStyle()}>
            <Text bodySmall $textNeutral>
              min. {sliderMinValue}%
            </Text>
            <Text bodySmall $textNeutral>
              max. {sliderMaxValue}%
            </Text>
          </View>
          <Slider
            useRange
            useGap={false}
            onRangeChange={this.onSliderRangeChange}
            value={INITIAL_VALUE}
            minimumValue={0}
            maximumValue={100}
            step={1}
            disableRTL={forceLTR}
            initialMinimumValue={20}
            initialMaximumValue={80}
          />

          <Text $textDefault text70BO marginT-15>
            Gradient Sliders
          </Text>
          <View row centerV>
            <Text text90 $textNeutral>
              DEFAULT
            </Text>
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
            <Text text90 $textNeutral>
              HUE
            </Text>
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

          <Text $textDefault text70BO marginV-15>
            Color Slider Group
          </Text>
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
  ltr: {
    flexDirection: 'row-reverse'
  },
  image: {
    tintColor: Colors.$iconNeutral
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
    borderRadius: 20,
    borderColor: Colors.yellow30,
    borderWidth: 2
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.$outlineDefault
  },
  group: {
    backgroundColor: Colors.$backgroundNeutralMedium,
    padding: 10,
    borderRadius: 6
  }
});
