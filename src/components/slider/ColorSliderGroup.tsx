import React, {PureComponent, GetDerivedStateFromProps} from 'react';
import {StyleProp, ViewStyle, TextStyle} from 'react-native';
import _ from 'lodash';
import {asBaseComponent} from '../../commons/new';
import GradientSlider, {GradientSliderTypes} from './GradientSlider';
import SliderGroup from './context/SliderGroup';
import Text from '../text';

type SliderOnValueChange = (value: string) => void;

export type ColorSliderGroupProps = {
  /**
   * The gradient color
   */
  initialColor: string;
  /**
   * Callback for onValueChange returns the new hex color
   */
  onValueChange?: SliderOnValueChange;
  /**
   * Group container style
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Sliders style
   */
  sliderContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Show the sliders labels (defaults are: Hue, Lightness, Saturation)
   */
  showLabels?: boolean;
  /**
   * In case you would like to change the default labels (translations etc.), you can provide
   * this prop with a map to the relevant labels ({hue: ..., lightness: ..., saturation: ...}).
   */
  labels?: {[key in GradientSliderTypes]: string};
  /**
   * The labels style
   */
  labelsStyle?: StyleProp<TextStyle>;
  /**
   * If true the component will have accessibility features enabled
   */
  accessible?: boolean;
};

interface ColorSliderGroupState {
  initialColor: string;
}

/**
 * @description: A Gradient Slider component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ColorSliderGroup/ColorSliderGroup.gif?raw=true
 */
class ColorSliderGroup extends PureComponent<ColorSliderGroupProps, ColorSliderGroupState> {
  static displayName = 'ColorSliderGroup';

  static defaultProps = {
    labels: {hue: 'Hue', lightness: 'Lightness', saturation: 'Saturation'}
  };

  state = {
    initialColor: this.props.initialColor
  };

  static getDerivedStateFromProps: GetDerivedStateFromProps<ColorSliderGroupProps, ColorSliderGroupState> = (nextProps,
    prevState) => {
    if (prevState.initialColor !== nextProps.initialColor) {
      return {
        initialColor: nextProps.initialColor
      };
    }
    return null;
  };

  onValueChange = (value: string) => {
    _.invoke(this.props, 'onValueChange', value);
  };

  renderSlider = (type: GradientSliderTypes) => {
    const {sliderContainerStyle, showLabels, labelsStyle, accessible, labels} = this.props;

    return (
      <>
        {showLabels && labels && (
          <Text $textNeutral text80 style={labelsStyle} accessible={accessible}>
            {labels[type]}
          </Text>
        )}
        <GradientSlider
          color={this.props.initialColor}
          type={type}
          containerStyle={sliderContainerStyle}
          accessible={accessible}
        />
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

export default asBaseComponent<ColorSliderGroupProps, typeof ColorSliderGroup>(ColorSliderGroup);
