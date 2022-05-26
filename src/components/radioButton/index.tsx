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
import asRadioGroupChild from '../radioGroup/asRadioGroupChild';
import {RadioGroupContextProps} from '../radioGroup/RadioGroupContext';

const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = Colors.$backgroundPrimaryHeavy;

export type RadioButtonProps = RadioGroupContextProps &
  ViewProps & {
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
    /**
     * @deprecated The content is on right by default, for content on left use 'contentOnLeft'
     */
    contentOnRight?: boolean;
    /**
     * Should the content be rendered left to the button
     */
    contentOnLeft?: boolean;
    /**
     * Additional styling for the container
     */
    containerStyle?: StyleProp<ViewStyle>;
  };

interface RadioButtonState {
  opacityAnimationValue: Animated.Value;
  scaleAnimationValue: Animated.Value;
}

type Props = RadioButtonProps & BaseComponentInjectedProps & ForwardRefInjectedProps;

/**
 * @description: A Radio Button component, should be wrapped with a RadioGroup
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Default.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Alignment.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Custom.gif?raw=true
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Individual.png?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/RadioButtonScreen.js
 */
class RadioButton extends PureComponent<Props, RadioButtonState> {
  static displayName = 'RadioButton';

  static defaultProps = {
    iconOnRight: false
  };

  styles: {
    radioButtonOutline: StyleProp<ViewStyle>;
    radioButtonInner: StyleProp<ViewStyle>;
    image: StyleProp<ImageStyle>;
  };

  constructor(props: Props) {
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

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selected !== this.props.selected) {
      this.animate();
    }
  }

  get isContentOnLeft() {
    const {contentOnLeft, contentOnRight} = this.props;
    return contentOnLeft || contentOnRight;
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
    const {disabled, value = false, selected = false} = this.props;
    if (!disabled) {
      this.props.onValueChange?.(value);
      this.props.onPress?.(selected);
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
      style.push({borderColor: disabled ? Colors.$backgroundDisabled : color});
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
      style.push({backgroundColor: disabled ? Colors.$backgroundDisabled : color});
    }

    return style;
  }

  renderLabel() {
    const {label, labelStyle, testID} = this.props;
    return (
      label && (
        <Text marginL-10={!this.isContentOnLeft} marginR-10={this.isContentOnLeft} $textDefault style={labelStyle} testID={`${testID}.label`}>
          {label}
        </Text>
      )
    );
  }

  renderIcon() {
    const {iconSource, iconStyle, testID} = this.props;
    const style = [this.styles.image, iconStyle];
    return iconSource && <Image style={style} source={iconSource} testID={`${testID}.icon`}/>;
  }

  renderButton() {
    const {opacityAnimationValue, scaleAnimationValue} = this.state;

    return (
      <View style={this.getRadioButtonOutlineStyle()}>
        <Animated.View
          style={[
            this.getRadioButtonInnerStyle(),
            {opacity: opacityAnimationValue},
            {transform: [{scale: scaleAnimationValue}]}
          ]}
        />
      </View>
    );
  }

  render() {
    const {onPress, onValueChange, containerStyle, ...others} = this.props;
    const Container = onPress || onValueChange ? TouchableOpacity : View;

    return (
      // @ts-ignore
      <Container
        row
        centerV
        activeOpacity={1}
        {...others}
        style={containerStyle}
        onPress={this.onPress}
        {...this.getAccessibilityProps()}
      >
        {!this.isContentOnLeft && this.renderButton()}
        {this.props.iconOnRight ? this.renderLabel() : this.renderIcon()}
        {this.props.iconOnRight ? this.renderIcon() : this.renderLabel()}
        {this.isContentOnLeft && this.renderButton()}
      </Container>
    );
  }
}

function createStyles(props: RadioButtonProps) {
  const {size = DEFAULT_SIZE, borderRadius = DEFAULT_SIZE / 2, color = DEFAULT_COLOR, disabled} = props;
  return StyleSheet.create({
    radioButtonOutline: {
      borderWidth: 2,
      borderColor: disabled ? Colors.$backgroundDisabled : color,
      width: size,
      height: size,
      borderRadius,
      padding: 3
    },
    radioButtonInner: {
      backgroundColor: disabled ? Colors.$backgroundDisabled : color,
      flex: 1,
      borderRadius
    },
    image: {
      marginLeft: 6
    }
  });
}

export default asBaseComponent<RadioButtonProps>(forwardRef(asRadioGroupChild(RadioButton)));
