import React, {PureComponent} from 'react';
import {StyleSheet, Animated, Easing, LayoutChangeEvent, StyleProp, ViewStyle} from 'react-native';
import Assets from '../../assets';
import {asBaseComponent} from '../../commons/new';
import View from '../view';
import TouchableOpacity from '../touchableOpacity';
import Image from '../image';
import {Colors} from '../../style';
import {Constants} from '../../helpers';


interface Props {
  /**
   * The identifier value of the ColorSwatch in a ColorSwatch palette.
   * Must be different than other ColorSwatches in the same group
   */
  value?: string;
  /**
   * The color of the ColorSwatch
   */
  color?: string;
  /**
   * Is the initial state is selected
   */
  selected?: boolean;
  /**
   * Is first render should be animated
   */
  animated?: boolean;
  /**
   * onPress callback
   */
  onPress?: (value: string, options: object) => void;
  index?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
export type ColorSwatchProps = Props;

const transparentImage = require('./assets/transparentSwatch/TransparentSwatch.png');
const DEFAULT_SIZE = Constants.isTablet ? 44 : 36;
export const SWATCH_MARGIN = 12;
export const SWATCH_SIZE = DEFAULT_SIZE;

/**
 * @description: A color swatch component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ColorPickerScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ColorPalette/ColorPalette.gif?raw=true
 */
class ColorSwatch extends PureComponent<Props> {
  static displayName = 'ColorSwatch';

  state = {
    isSelected: new Animated.Value(0),
    animatedOpacity: new Animated.Value(0.3),
    animatedScale: new Animated.Value(0.5)
  };

  styles = createStyles(this.props);
  layout = {x: 0, y: 0};

  componentDidMount() {
    this.animateCheckmark(this.props.selected);
    this.animateSwatch(1);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selected !== this.props.selected) {
      this.animateCheckmark(this.props.selected);
    }
  }

  animateSwatch(newValue: number) {
    const {animatedOpacity, animatedScale} = this.state;

    Animated.parallel([
      Animated.timing(animatedOpacity, {
        duration: 250,
        toValue: newValue,
        useNativeDriver: true
      }),
      Animated.spring(animatedScale, {
        toValue: newValue,
        // easing: Easing.bezier(0, 0, 0.58, 1), // => easeOut
        bounciness: 18,
        speed: 12,
        delay: 170,
        useNativeDriver: true
      })
    ]).start();
  }

  animateCheckmark(newValue = false) {
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
    const {color = '', value, index} = this.props;
    const tintColor = this.getTintColor(value);
    this.props.onPress?.(value || color, {tintColor, index});
  };

  getTintColor(color?: string) {
    if (color) {
      if (Colors.isTransparent(color)) {
        return Colors.black;
      }
      return Colors.isDark(color) ? Colors.white : Colors.black;
    }
  }

  getAccessibilityInfo() {
    const {color} = this.props;

    return {
      accessibilityLabel: color && Colors.getColorName(color),
      accessibilityStates: this.props.selected ? ['selected'] : []
    };
  }

  getLayout() {
    return this.layout;
  }

  onLayout = (event: LayoutChangeEvent) => {
    this.layout = event.nativeEvent.layout;
  };

  renderContent() {
    const {style, color, onPress, ...others} = this.props;
    const {isSelected} = this.state;
    const Container = onPress ? TouchableOpacity : View;
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
        {...this.getAccessibilityInfo()}
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
    const {animated} = this.props;
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

export default asBaseComponent<Props>(ColorSwatch);


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
