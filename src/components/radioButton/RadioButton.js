import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Animated, Easing} from 'react-native';
import {Colors} from '../../style';
import {BaseComponent} from '../../commons';
import TouchableOpacity from '../touchableOpacity';
import View from '../view';
import Text from '../text';
import Image from '../image';
import asRadioGroupChild from './asRadioGroupChild';

const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = Colors.blue30;

/**
 * A Radio Button component, should be wrapped inside a RadioGroup
 */
class RadioButton extends BaseComponent {
  static displayName = 'RadioButton';

  static propTypes = {
    /**
     * The identifier value of the radio button. must be different than other RadioButtons in the same group
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    /**
     * When using RadioButton without a RadioGroup, use this prop to toggle selection
     */
    selected: PropTypes.bool,
    /**
     * Invoked when pressing the button
     */
    onPress: PropTypes.func,
    /**
     * Whether the radio button should be disabled
     */
    disabled: PropTypes.bool,
    /**
     * The color of the radio button
     */
    color: PropTypes.string,
    /**
     * The size of the radio button, affect both width & height
     */
    size: PropTypes.number,
    /**
     * The radio button border radius
     */
    borderRadius: PropTypes.number,
    /**
     * A label for the radio button description
     */
    label: PropTypes.string,
    /**
     * Label style
     */
    labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * Icon image source
     */
    iconSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * Icon image style
     */
    iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * Should the icon be on the right side of the label
     */
    iconOnRight: PropTypes.bool
  };

  static defaultProps = {
    iconOnRight: false
  };

  constructor(props) {
    super(props);
    this.state = {
      opacityAnimationValue: new Animated.Value(0),
      scaleAnimationValue: new Animated.Value(0.8)
    };
  }

  componentDidMount() {
    this.animate();
  }

  componentDidUpdate(prevProps) {
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
          duration: animationTime
        }),
        Animated.timing(scaleAnimationValue, {
          toValue: 1,
          delay: animationDelay,
          duration: animationTime,
          easing: Easing.bezier(0.165, 0.84, 0.44, 1)
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnimationValue, {
          toValue: 0.8,
          duration: animationTime
        }),
        Animated.timing(opacityAnimationValue, {
          toValue: 0,
          duration: animationTime
        })
      ]).start();
    }
  }

  generateStyles() {
    this.styles = createStyles(this.getThemeProps());
  }

  onPress = () => {
    const {disabled, value, selected} = this.props;
    if (!disabled) {
      _.invoke(this.props, 'onValueChange', value);
      _.invoke(this.props, 'onPress', selected);
    }
  };

  getAccessibilityProps = () => {
    const {label = '', selected, disabled} = this.getThemeProps();
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
    const {color, size, borderRadius, style: propsStyle, disabled} = this.getThemeProps();
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
    const {color, borderRadius, disabled} = this.getThemeProps();
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
    const {iconSource} = this.props;
    const {iconStyle} = this.getThemeProps();
    const style = [this.styles.image, iconStyle];
    return iconSource && <Image style={style} source={iconSource}/>;
  }

  render() {
    const {onPress, onValueChange, ...others} = this.getThemeProps();
    const {opacityAnimationValue, scaleAnimationValue} = this.state;
    const Container = onPress || onValueChange ? TouchableOpacity : View;

    return (
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

function createStyles({size = DEFAULT_SIZE, borderRadius = DEFAULT_SIZE / 2, color = DEFAULT_COLOR, disabled}) {
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

export default asRadioGroupChild(RadioButton);
