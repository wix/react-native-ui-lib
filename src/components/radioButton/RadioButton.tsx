import _ from 'lodash';
import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Animated,
  Easing,
  TextStyle,
  StyleProp,
  ImageSourcePropType,
  ImageStyle,
  ViewStyle,
  ViewProps
} from 'react-native';
import {Colors} from '../../style';
import {asBaseComponent, forwardRef, BaseComponentInjectedProps, ForwardRefInjectedProps} from '../../commons/new';
import TouchableOpacity from '../touchableOpacity';
import View from '../view';
import Text from '../text';
import Image from '../image';
import asRadioGroupChild from './asRadioGroupChild';
import {RadioGroupContextPropTypes} from './RadioGroupContext';

const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = Colors.blue30;

export type RadioButtonPropTypes = RadioGroupContextPropTypes & BaseComponentInjectedProps & ForwardRefInjectedProps & ViewProps & {
  /**
   * The identifier value of the radio button. must be different than other RadioButtons in the same group
   */
  value?: string | number | boolean;
  /**
   * When using RadioButton without a RadioGroup, use this prop to toggle selection
   */
  selected?: boolean;
  /**
   * Invoked when pressing the button
   */
  onPress?: (selected: boolean) => void;
  /**
   * Whether the radio button should be disabled
   */
  disabled?: boolean;
  /**
   * The color of the radio button
   */
  color?: string;
  /**
   * The size of the radio button, affect both width & height
   */
  size?: number;
  /**
   * The radio button border radius
   */
  borderRadius?: number;
  /**
   * A label for the radio button description
   */
  label?: string;
  /**
   * Label style
   */
  labelStyle?: TextStyle;
  /**
   * Icon image source
   */
  iconSource?: ImageSourcePropType;
  /**
   * Icon image style
   */
  iconStyle?: ImageStyle;
  /**
   * Should the icon be on the right side of the label
   */
  iconOnRight?: boolean;
}

interface RadioButtonState {
  opacityAnimationValue: Animated.Value;
  scaleAnimationValue: Animated.Value;
}

/**
 * A Radio Button component, should be wrapped inside a RadioGroup
 */
class RadioButton extends PureComponent<RadioButtonPropTypes, RadioButtonState> {
  static displayName = 'RadioButton';

  static defaultProps = {
    iconOnRight: false
  };

  styles: {
    radioButtonOutline: StyleProp<ViewStyle>;
    radioButtonInner: StyleProp<ViewStyle>;
    image: StyleProp<ImageStyle>;
  };

  constructor(props: RadioButtonPropTypes) {
    super(props);
    this.styles = createStyles(props);
    this.state = {
      opacityAnimationValue: new Animated.Value(0),
      scaleAnimationValue: new Animated.Value(0.8)
    };
  }

  componentDidMount() {
    this.animate();
  }

  componentDidUpdate(prevProps: RadioButtonPropTypes) {
    if (prevProps.selected !== this.props.selected) {
      this.animate();
    }
  }

  animate() {
    const {selected} = this.props;
    const {opacityAnimationValue, scaleAnimationValue} = this.state;
    const animationTime = 150;
    const animationDelay = 60;
    if (selected) {
      Animated.parallel([
        Animated.timing(opacityAnimationValue, {
          toValue: 1,
          duration: animationTime,
          useNativeDriver: true
        }),
        Animated.timing(scaleAnimationValue, {
          toValue: 1,
          delay: animationDelay,
          duration: animationTime,
          easing: Easing.bezier(0.165, 0.84, 0.44, 1),
          useNativeDriver: true
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnimationValue, {
          toValue: 0.8,
          duration: animationTime,
          useNativeDriver: true
        }),
        Animated.timing(opacityAnimationValue, {
          toValue: 0,
          duration: animationTime,
          useNativeDriver: true
        })
      ]).start();
    }
  }

  onPress = () => {
    const {disabled, value, selected} = this.props;
    if (!disabled) {
      _.invoke(this.props, 'onValueChange', value);
      _.invoke(this.props, 'onPress', selected);
    }
  };

  getAccessibilityProps = () => {
    const {label = '', selected, disabled} = this.props;
    const selectedAccessibilityText = selected ? 'selected' : 'unselected';
    const accessibilityLabel = `${selectedAccessibilityText}. ${label}`;

    return {
      accessible: true,
      accessibilityStates: disabled ? ['disabled'] : undefined,
      accessibilityRole: 'button', // 'radio', TODO: uncomment when switching to RN60
      accessibilityLabel
    };
  };

  getRadioButtonOutlineStyle() {
    const {color, size, borderRadius, style: propsStyle, disabled} = this.props;
    const style = [this.styles.radioButtonOutline];

    if (size) {
      style.push({width: size, height: size});
    }
    if (borderRadius) {
      style.push({borderRadius});
    }
    if (color) {
      style.push({borderColor: disabled ? Colors.dark70 : color});
    }

    style.push(propsStyle);
    return style;
  }

  getRadioButtonInnerStyle() {
    const {color, borderRadius, disabled} = this.props;
    const style = [this.styles.radioButtonInner];

    if (borderRadius) {
      style.push({borderRadius});
    }
    if (color) {
      style.push({backgroundColor: disabled ? Colors.dark70 : color});
    }

    return style;
  }

  renderLabel() {
    const {label, labelStyle} = this.props;
    return (
      label && (
        <Text marginL-10 style={labelStyle}>
          {label}
        </Text>
      )
    );
  }

  renderIcon() {
    const {iconSource, iconStyle} = this.props;
    const style = [this.styles.image, iconStyle];
    return iconSource && <Image style={style} source={iconSource}/>;
  }

  render() {
    const {onPress, onValueChange, ...others} = this.props;
    const {opacityAnimationValue, scaleAnimationValue} = this.state;
    const Container = onPress || onValueChange ? TouchableOpacity : View;

    return (
      // @ts-ignore
      <Container
        row
        centerV
        activeOpacity={1}
        {...others}
        style={undefined}
        onPress={this.onPress}
        {...this.getAccessibilityProps()}
      >
        <View style={this.getRadioButtonOutlineStyle()}>
          <Animated.View
            style={[
              this.getRadioButtonInnerStyle(),
              {opacity: opacityAnimationValue},
              {transform: [{scale: scaleAnimationValue}]}
            ]}
          />
        </View>
        {this.props.iconOnRight ? this.renderLabel() : this.renderIcon()}
        {this.props.iconOnRight ? this.renderIcon() : this.renderLabel()}
      </Container>
    );
  }
}

function createStyles(props: RadioButtonPropTypes) {
  const {size = DEFAULT_SIZE, borderRadius = DEFAULT_SIZE / 2, color = DEFAULT_COLOR, disabled} = props;
  return StyleSheet.create({
    radioButtonOutline: {
      borderWidth: 2,
      borderColor: disabled ? Colors.dark70 : color,
      width: size,
      height: size,
      borderRadius,
      padding: 3
    },
    radioButtonInner: {
      backgroundColor: disabled ? Colors.dark70 : color,
      flex: 1,
      borderRadius
    },
    image: {
      marginLeft: 6
    }
  });
}

export default asBaseComponent<RadioButtonPropTypes>(forwardRef(asRadioGroupChild(RadioButton)));
