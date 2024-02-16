import React, {Component, Fragment} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {
  Constants,
  Colors,
  View,
  Text,
  Button,
  Icon,
  Slider,
  GradientSlider,
  ColorSliderGroup
} from 'react-native-ui-lib';
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
  sliderMinValue2: number;
  sliderMaxValue2: number;
  forceLTR: boolean;
}

const INITIAL_VALUE = 20;
const RANGE_INITIAL_MIN = 0;
const RANGE_INITIAL_MAX = 100;

const COLOR = Colors.blue30;

export default class SliderScreen extends Component<SliderScreenProps, SliderScreenState> {
  state = {
    alpha: 1,
    color: COLOR,
    sliderValue: INITIAL_VALUE,
    sliderMinValue: RANGE_INITIAL_MIN,
    sliderMaxValue: RANGE_INITIAL_MAX,
    sliderMinValue2: 25,
    sliderMaxValue2: 80,
    forceLTR: false
  };

  slider = React.createRef();
  rangeSlider = React.createRef();
  gradientSlider = React.createRef();

  resetSlider = () => {
    // @ts-expect-error
    this.slider.current?.reset();
    // @ts-expect-error
    this.rangeSlider.current?.reset();
    // @ts-expect-error
    this.gradientSlider.current?.reset();
  };

  onSliderRangeChange = (values: {min: number; max: number}) => {
    const {min, max} = values;
    this.setState({sliderMinValue: min, sliderMaxValue: max});
  };

  onSliderRangeChange2 = (values: {min: number; max: number}) => {
    const {min, max} = values;
    this.setState({sliderMinValue2: min, sliderMaxValue2: max});
  };

  onSliderValueChange = (value: number) => {
    this.setState({sliderValue: value});
  };

  onSliderReset = () => {
    this.setState({sliderValue: INITIAL_VALUE});
  };

  onRangeSliderReset = () => {
    this.setState({sliderMinValue: RANGE_INITIAL_MIN, sliderMaxValue: RANGE_INITIAL_MAX});
  };

  onGradientValueChange = (value: string, alpha: number) => {
    this.setState({color: value, alpha});
  };

  onGroupValueChange = (value: string) => {
    console.warn('onGroupValueChange: ', value);
  };

  getReverseStyle = () => {
    return Constants.isRTL && this.state.forceLTR && styles.ltr;
  };

  renderDefaultSliderExample() {
    const {sliderValue, forceLTR} = this.state;

    return (
      <Fragment>
        <Text $textDefault text70BO>
          Default slider
        </Text>

        <View row centerV style={this.getReverseStyle()}>
          <Icon assetName={'search'} style={styles.image}/>
          <Slider
            onValueChange={this.onSliderValueChange}
            value={INITIAL_VALUE}
            minimumValue={0}
            maximumValue={100}
            step={1}
            containerStyle={styles.sliderContainer}
            disableRTL={forceLTR}
            ref={this.slider}
            onReset={this.onSliderReset}
          />
          <Text bodySmall $textNeutral style={styles.text} numberOfLines={1}>
            ${sliderValue}
          </Text>
        </View>
      </Fragment>
    );
  }

  renderNegativeSliderExample() {
    return (
      <Fragment>
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
      </Fragment>
    );
  }

  renderDisabledSliderExample() {
    return (
      <Fragment>
        <Text $textDefault text70BO marginT-20>
          Disabled
        </Text>
        <Slider minimumValue={100} maximumValue={200} value={120} containerStyle={styles.slider} disabled/>
      </Fragment>
    );
  }

  renderCustomSlider() {
    return (
      <>
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
      </>
    );
  }

  renderRangeSliderExample() {
    const {sliderMinValue, sliderMaxValue, forceLTR} = this.state;

    return (
      <Fragment>
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
          ref={this.rangeSlider}
          onReset={this.onRangeSliderReset}
        />
      </Fragment>
    );
  }

  renderRangeSliderWithValuesExample() {
    const {sliderMinValue2, sliderMaxValue2, forceLTR} = this.state;

    return (
      <Fragment>
        <Text $textDefault text70BO marginV-15>
          Range w/ initial values and no default gap
        </Text>
        <View row spread style={this.getReverseStyle()}>
          <Text bodySmall $textNeutral>
            min. {sliderMinValue2}%
          </Text>
          <Text bodySmall $textNeutral>
            max. {sliderMaxValue2}%
          </Text>
        </View>
        <Slider
          useRange
          useGap={false}
          onRangeChange={this.onSliderRangeChange2}
          value={INITIAL_VALUE}
          minimumValue={0}
          maximumValue={100}
          step={1}
          disableRTL={forceLTR}
          initialMinimumValue={25}
          initialMaximumValue={80}
        />
      </Fragment>
    );
  }

  renderGradientSlidersExample() {
    const {color, alpha} = this.state;

    return (
      <Fragment>
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
            ref={this.gradientSlider}
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
      </Fragment>
    );
  }

  renderColorSliderGroupExample() {
    const {color} = this.state;

    return (
      <Fragment>
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
      </Fragment>
    );
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View flex padding-20>
          <View row spread centerV marginB-10>
            <Text text40 $textDefault marginB-20>
              Sliders
            </Text>
            <Button link label="Reset" onPress={this.resetSlider}/>
          </View>
          {Constants.isRTL && renderBooleanOption.call(this, 'Force LTR', 'forceLTR')}

          {this.renderDefaultSliderExample()}
          {this.renderNegativeSliderExample()}
          {this.renderDisabledSliderExample()}
          {this.renderCustomSlider()}
          {this.renderRangeSliderExample()}
          {this.renderRangeSliderWithValuesExample()}
          {this.renderGradientSlidersExample()}
          {this.renderColorSliderGroupExample()}
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
