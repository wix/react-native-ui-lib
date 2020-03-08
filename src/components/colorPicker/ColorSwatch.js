import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Animated, Easing} from 'react-native';
import Assets from '../../assets';
import View from '../view';
import TouchableOpacity from '../touchableOpacity';
import Image from '../image';
import {PureBaseComponent} from '../../commons';
import {Colors} from '../../style';
import {Constants} from '../../helpers';


const transparentImage = require('./assets/transparentSwatch/TransparentSwatch.png');
const DEFAULT_SIZE = Constants.isTablet ? 44 : 36;
export const SWATCH_MARGIN = 12;
export const SWATCH_SIZE = DEFAULT_SIZE;

/**
 * @description: A color swatch component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ColorPickerScreen.js
 * @extends: Animated.View
 * @extendsLink: https://facebook.github.io/react-native/docs/animated
 */
export default class ColorSwatch extends PureBaseComponent {
  static displayName = 'ColorSwatch';
  
  static propTypes = {
    /**
     * The identifier value of the ColorSwatch in a ColorSwatch palette. 
     * Must be different than other ColorSwatches in the same group
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    /**
     * The color of the ColorSwatch
     */
    color: PropTypes.string,
    /**
     * Is the initial state is selected
     */
    selected: PropTypes.bool,
    /**
     * Is first render should be animated
     */
    animated: PropTypes.bool,
    /**
     * onPress callback
     */
    onPress: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      isSelected: new Animated.Value(0),
      animatedOpacity: new Animated.Value(0.3),
      animatedScale: new Animated.Value(0.5)
    };
  }

  componentDidMount() {
    this.animateCheckmark(this.props.selected);
    this.animateSwatch(1);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected !== this.props.selected) {
      this.animateCheckmark(this.props.selected);
    }
  }

  generateStyles() {
    this.styles = createStyles(this.getThemeProps());
  }

  animateSwatch(newValue) {
    const {animatedOpacity, animatedScale} = this.state;

    Animated.parallel([
      Animated.timing(animatedOpacity, {
        duration: 250,
        toValue: Number(newValue),
        useNativeDriver: true
      }),
      Animated.spring(animatedScale, {
        toValue: Number(newValue),
        easing: Easing.bezier(0, 0, 0.58, 1), // => easeOut
        bounciness: 18,
        speed: 12,
        delay: 170,
        useNativeDriver: true
      })
    ]).start();
  }

  animateCheckmark(newValue) {
    const {isSelected} = this.state;

    Animated.timing(isSelected, {
      duration: 150,
      easing: Easing.bezier(0.165, 0.84, 0.44, 1.0), // => easeOutQuart
      toValue: Number(newValue),
      delay: 50,
      useNativeDriver: true
    }).start();
  }

  onPress = () => {
    const {color, value, index} = this.props;
    const tintColor = this.getTintColor(value);
    _.invoke(this.props, 'onPress', value || color, {tintColor, index});
  };

  getTintColor(color) {
    if (Colors.isTransparent(color)) {
      return Colors.black;
    }
    return Colors.isDark(color) ? Colors.white : Colors.black;
  }

  getLayout() {
    return this.layout;
  }

  onLayout = event => {
    this.layout = event.nativeEvent.layout;
  };

  renderContent() {
    const {style, color, onPress, onValueChange, ...others} = this.getThemeProps();
    const {isSelected} = this.state;
    const Container = onPress || onValueChange ? TouchableOpacity : View;
    const tintColor = this.getTintColor(color);

    return (
      <Container
        {...others}
        center
        activeOpacity={1}
        throttleTime={0}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        onPress={this.onPress}
        style={[this.styles.container, style]}
        onLayout={this.onLayout}
        accessibilityLabel={Colors.getColorName(color)}
      >
        {Colors.isTransparent(color) && (
          <Image source={transparentImage} style={this.styles.transparentImage} resizeMode={'cover'}/>
        )}
        <Animated.Image
          source={Assets.icons.check}
          style={{
            tintColor,
            opacity: isSelected,
            transform: [{scaleX: isSelected}, {scaleY: isSelected}]
          }}
        />
      </Container>
    );
  }

  renderSwatch = () => {
    const {animated} = this.getThemeProps();
    const {animatedOpacity, animatedScale} = this.state;

    if (animated) {
      return (
        <Animated.View
          style={{
            opacity: animatedOpacity,
            transform: [{scaleX: animatedScale}, {scaleY: animatedScale}]
          }}
        >
          {this.renderContent()}
        </Animated.View>
      );
    }
    return this.renderContent();
  };

  render() {
    return this.renderSwatch();
  }
}

function createStyles({color = Colors.dark30}) {
  return StyleSheet.create({
    container: {
      backgroundColor: color,
      width: DEFAULT_SIZE,
      height: DEFAULT_SIZE,
      borderRadius: DEFAULT_SIZE / 2,
      margin: SWATCH_MARGIN,
      borderWidth: color === 'transparent' ? undefined : 1,
      borderColor: Colors.rgba(Colors.dark30, 0.2)
    },
    transparentImage: {
      ...StyleSheet.absoluteFillObject,
      width: DEFAULT_SIZE,
      height: DEFAULT_SIZE
    }
  });
}
