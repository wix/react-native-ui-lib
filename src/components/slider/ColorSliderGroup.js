import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import GradientSlider from './GradientSlider';
import SliderGroup from './context/SliderGroup';
import Text from '../text';
import {PureBaseComponent} from '../../commons';


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
     * Show the sliders labels (defaults are: Hue, Lightness, Saturation)
     */
    showLabels: PropTypes.bool,
    /**
     * In case you would like to change the default labels (translations etc.), you can provide
     * a function that received the type (one of GradientSlider.types without DEFAULT) and returns a string.
     */
    getLabel: PropTypes.func,
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

  getSliderLabel = type => {
    const {getLabel} = this.getThemeProps();
    if (getLabel) {
      return getLabel(type);
    } else {
      return type.charAt(0).toUpperCase() + type.substr(1);
    }
  }

  getSlider = (type) => {
    const {sliderContainerStyle, showLabels, labelsStyle, accessible} = this.props;
    return (
      <>
        {showLabels && (
          <Text dark30 text80 style={labelsStyle} accessible={accessible}>
            {this.getSliderLabel(type)}
          </Text>
        )}
        <GradientSlider type={type} containerStyle={sliderContainerStyle} accessible={accessible}/>
      </>
    );
  };

  render() {
    const {containerStyle} = this.props;
    const {initialColor} = this.state;

    return (
      <SliderGroup style={containerStyle} color={initialColor} onValueChange={this.onValueChange}>
        {this.getSlider(GradientSlider.types.HUE)}
        {this.getSlider(GradientSlider.types.LIGHTNESS)}
        {this.getSlider(GradientSlider.types.SATURATION)}
      </SliderGroup>
    );
  }
}
