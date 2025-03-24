import React, {PureComponent} from 'react';
import {StyleSheet, Animated, Easing, LayoutChangeEvent, StyleProp, ViewStyle} from 'react-native';
import Assets from '../../assets';
import {Colors} from '../../style';
import {asBaseComponent, BaseComponentInjectedProps, Constants, ColorsModifiers} from '../../commons/new';
import View from '../view';
import TouchableOpacity from '../touchableOpacity';
import Image from '../image';

export interface ColorInfo {
  index?: number;
  tintColor?: string;
  /**
   * The color result with 6 characters (#FFFFFF and never #FFF)
   */
  hexString: string;
}

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
   * Is the initial state is unavailable
   */
  unavailable?: boolean;
  /**
   * Is first render should be animated
   */
  animated?: boolean;
  /**
   * onPress callback
   */
  onPress?: (value: string, colorInfo: ColorInfo) => void;
  index?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  /**
   * Color swatch size
   */
  size?: number;
}
export type ColorSwatchProps = Props & ColorsModifiers;

const DEFAULT_SIZE = Constants.isTablet ? 44 : 36;
export const SWATCH_MARGIN = 12;
export const SWATCH_SIZE = DEFAULT_SIZE;
const DEFAULT_COLOR = Colors.grey30;

/**
 * @description: A color swatch component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ColorPickerScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ColorPalette/ColorPalette.gif?raw=true
 */
class ColorSwatch extends PureComponent<Props & BaseComponentInjectedProps> {
  static displayName = 'ColorSwatch';

  state = {
    isSelected: new Animated.Value(0),
    animatedOpacity: new Animated.Value(0.3),
    animatedScale: new Animated.Value(0.5)
  };

  styles = createStyles({...this.props, color: this.color});
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

  get color() {
    const {color, modifiers} = this.props;
    return color || modifiers?.color;
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
    const {value, index} = this.props;
    const tintColor = this.getTintColor(value);
    const result = value || this.color || '';
    const hexString = Colors.getHexString(result);
    this.props.onPress?.(result, {tintColor, index, hexString});
  };

  getTintColor(color?: string) {
    if (color) {
      if (Colors.isTransparent(color)) {
        return Colors.$iconDefault;
      }
      return Colors.isDark(color) ? Colors.white : Colors.grey10;
    }
  }

  getAccessibilityInfo() {
    const color = this.color || DEFAULT_COLOR;
    const defaultText = !this.color ? 'default' : '';
    
    return {
      accessible: true,
      accessibilityLabel: `${defaultText} color ${Colors.getColorName(color)}`,
      accessibilityState: {selected: this.props.selected}
    };
  }

  getLayout() {
    return this.layout;
  }

  onLayout = (event: LayoutChangeEvent) => {
    this.layout = event.nativeEvent.layout;
  };

  renderContent() {
    const {style, onPress, unavailable, size = DEFAULT_SIZE, ...others} = this.props;
    const {isSelected} = this.state;
    const Container = onPress ? TouchableOpacity : View;
    const tintColor = this.getTintColor(this.color);

    return (
      <Container
        {...others}
        center
        activeOpacity={1}
        throttleTime={0}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        onPress={this.onPress}
        style={[this.styles.container, {width: size, height: size, borderRadius: size / 2}, style]}
        onLayout={this.onLayout}
        {...this.getAccessibilityInfo()}
      >
        {Colors.isTransparent(this.color) && (
          <Image
            source={Assets.internal.images.transparentSwatch}
            style={this.styles.transparentImage}
            resizeMode={'cover'}
          />
        )}
        {unavailable ? (
          <View style={[this.styles.unavailable, {backgroundColor: tintColor}]}/>
        ) : (
          <Animated.Image
            source={Assets.internal.icons.check}
            style={{
              tintColor,
              opacity: isSelected,
              transform: [{scaleX: isSelected}, {scaleY: isSelected}]
            }}
          />
        )}
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

export default asBaseComponent<ColorSwatchProps>(ColorSwatch);

function createStyles({color = DEFAULT_COLOR}) {
  return StyleSheet.create({
    container: {
      backgroundColor: color,
      borderWidth: Colors.isTransparent(color) ? undefined : 1,
      borderColor: Colors.rgba(Colors.$outlineDisabledHeavy, 0.2),
      margin: SWATCH_MARGIN,
      overflow: 'hidden'
    },
    transparentImage: {
      ...StyleSheet.absoluteFillObject,
      width: DEFAULT_SIZE,
      height: DEFAULT_SIZE,
      borderWidth: 1,
      // borderRadius: BorderRadiuses.br100,
      borderColor: Colors.rgba(Colors.$outlineDisabledHeavy, 0.2)
    },
    unavailable: {
      height: '100%',
      width: 3,
      transform: [{rotate: '45deg'}],
      opacity: 0.7
    }
  });
}
