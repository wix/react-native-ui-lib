import _ from 'lodash';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import React from 'react';
import {HueGradient, LightnessGradient, SaturationGradient, Gradient} from 'react-native-color';
import {Colors, BaseComponent} from 'react-native-ui-lib';
import Slider from './index';
import asSliderGroupChild from './context/asSliderGroupChild';


const GRADIENT_TYPES = {
  DEFAULT: 'default',
  HUE: 'hue',
  LIGHTNESS: 'lightness',
  SATURATION: 'saturation'
};

/**
 * @description: A Gradient Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/feat/new_components/demo/src/screens/componentScreens/SliderScreen.js
 */
class GradientSlider extends BaseComponent {
  static displayName = 'GradientSlider';

  static propTypes = {
    /**
     * The gradient color
     */
    color: PropTypes.string,
    /**
     * The gradient type (default, hue, lightness, saturation)
     */
    type: PropTypes.oneOf(Object.values(GRADIENT_TYPES)),
    /**
     * The gradient steps
     */
    gradientSteps: PropTypes.number,
    /**
     * Callback for onValueChange, returns the updated color
     */
    onValueChange: PropTypes.func
  }

  static defaultProps = {
    type: GRADIENT_TYPES.DEFAULT,
    gradientSteps: 120
  }

  static types = GRADIENT_TYPES;

  constructor(props) {
    super(props);

    this.state = {
      color: props.color ? Colors.getHSL(props.color) : undefined
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.color !== nextProps.color) {
      this.setState({color: Colors.getHSL(nextProps.color)});
    }
  }

  getColor() {
    const {color} = this.state;
    const {value} = this.props.sliderContext;
    return value || color;
  }

  getStepColor = (i) => {
    const color = this.getColor();
    return tinycolor({...color, a: i}).toHslString();
  }

  renderDefaultGradient = () => {
    const {gradientSteps} = this.props;

    return (
      <Gradient
        gradientSteps={gradientSteps}
        maximumValue={1}
        getStepColor={this.getStepColor}
      />
    );
  }

  renderHueGradient = () => {
    const {gradientSteps} = this.props;
    
    return (
      <HueGradient gradientSteps={gradientSteps}/>
    );
  }

  renderLightnessGradient = () => {
    const color = this.getColor();
    const {gradientSteps} = this.props;

    return (
      <LightnessGradient color={color} gradientSteps={gradientSteps}/>
    );
  }

  renderSaturationGradient = () => {
    const color = this.getColor();
    const {gradientSteps} = this.props;

    return (
      <SaturationGradient color={color} gradientSteps={gradientSteps}/>
    );
  }

  onValueChange = (value, alpha) => {
    // alpha returns for type.DEFAULT
    _.invoke(this.props, 'onValueChange', value, alpha);
  }

  updateColor(color) {
    if (!_.isEmpty(this.props.sliderContext)) {
      _.invoke(this.props.sliderContext, 'setValue', color);
    } else {
      this.setState({color});
      const hex = Colors.getHexString(color);
      this.onValueChange(hex, color.a);
    }
  }

  updateAlpha = a => {
    const color = this.getColor();
    this.updateColor({...color, a});
  };

  updateHue = h => {
    const color = this.getColor();
    this.updateColor({...color, h});
  };

  updateLightness = l => {
    const color = this.getColor();
    this.updateColor({...color, l});
  };

  updateSaturation = s => {
    const color = this.getColor();
    this.updateColor({...color, s});
  };

  render() {
    const {type, containerStyle, disabled} = this.props;
    const color = this.getColor();
    const thumbTintColor = Colors.getHexString(color);
    let step = 0.01;
    let maximumValue = 1;
    let value = color.a;
    let renderTrack = this.renderDefaultGradient;
    let onValueChange = this.updateAlpha;

    switch (type) {
      case GRADIENT_TYPES.HUE:
        step = 1;
        maximumValue = 359;
        value = color.h;
        renderTrack = this.renderHueGradient;
        onValueChange = this.updateHue;
        break;
      case GRADIENT_TYPES.LIGHTNESS:
        value = color.l;
        renderTrack = this.renderLightnessGradient;
        onValueChange = this.updateLightness;
        break;
      case GRADIENT_TYPES.SATURATION:
        value = color.s;
        renderTrack = this.renderSaturationGradient;
        onValueChange = this.updateSaturation;
        break;
      default:
        break;
    }

    return (
      <Slider 
        renderTrack={renderTrack}
        step={step}
        maximumValue={maximumValue}
        value={value}
        thumbTintColor={thumbTintColor}
        onValueChange={onValueChange}
        containerStyle={containerStyle}
        disabled={disabled}
      />
    );
  }
}

export default asSliderGroupChild(GradientSlider);
