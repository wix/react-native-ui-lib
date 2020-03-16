import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {PureBaseComponent, Text} from 'react-native-ui-lib';
import GradientSlider from './GradientSlider';
import SliderGroup from './context/SliderGroup';


/**
 * @description: A Gradient Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/feat/new_components/demo/src/screens/componentScreens/SliderScreen.js
 */
export default class ColorSliderGroup extends PureBaseComponent {
  static displayName = 'ColorSliderGroup';

  static propTypes = {
    /**
     * The gradient color
     */
    initialColor: PropTypes.string.isRequired,
    /**
     * Callback for onValueChange returns the new hex color
     */
    onValueChange: PropTypes.func,
    /**
     * Group container style
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * Sliders style
     */
    sliderContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * Show the sliders labels (Hue, Lightness, Saturation)
     */
    showLabels: PropTypes.bool,
    /**
     * The labels style
     */
    labelsStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array])
  }

  state = {
    initialColor: this.props.initialColor
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (prevState.initialColor !== nextProps.initialColor) {
  //     return {initialColor: nextProps.initialColor};
  //   }
  //   return null;
  // }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.initialColor !== nextProps.initialColor) {
      return {initialColor: nextProps.initialColor};
    }
  }

  onValueChange = (value) => {
    _.invoke(this.props, 'onValueChange', value);
  }

  render() {
    const {containerStyle, sliderContainerStyle, showLabels, labelsStyle, accessible} = this.props;
    const {initialColor} = this.state;

    return (
      <SliderGroup style={containerStyle} color={initialColor} onValueChange={this.onValueChange}>
        {showLabels && <Text dark30 text80 style={labelsStyle} accessible={accessible}>Hue</Text>}
        <GradientSlider type={GradientSlider.types.HUE} containerStyle={sliderContainerStyle} accessible={accessible}/>
        {showLabels && <Text dark30 text80 style={labelsStyle} accessible={accessible}>Lightness</Text>}
        <GradientSlider type={GradientSlider.types.LIGHTNESS} containerStyle={sliderContainerStyle} accessible={accessible}/>
        {showLabels && <Text dark30 text80 style={labelsStyle} accessible={accessible}>Saturation</Text>}
        <GradientSlider type={GradientSlider.types.SATURATION} containerStyle={sliderContainerStyle} accessible={accessible}/>
      </SliderGroup>
    );
  }
}
