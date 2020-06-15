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
     * this prop with a map to the relevant labels ({hue: ..., lightness: ..., saturation: ...}).
     */
    labels: PropTypes.object,
    /**
     * The labels style
     */
    labelsStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array])
  }

  static defaultProps = {
    labels: {hue: 'Hue', lightness: 'Lightness', saturation: 'Saturation'}
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

  renderSlider = (type) => {
    const {sliderContainerStyle, showLabels, labelsStyle, accessible, labels} = this.getThemeProps();
    return (
      <>
        {showLabels && (
          <Text dark30 text80 style={labelsStyle} accessible={accessible}>
            {labels[type]}
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
        {this.renderSlider(GradientSlider.types.HUE)}
        {this.renderSlider(GradientSlider.types.LIGHTNESS)}
        {this.renderSlider(GradientSlider.types.SATURATION)}
      </SliderGroup>
    );
  }
}
