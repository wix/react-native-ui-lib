import _pt from "prop-types";
import _ from 'lodash';
import React, { PureComponent } from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';
import { Colors } from "../../style";
import { asBaseComponent, forwardRef } from "../../commons/new";
import TouchableOpacity from "../touchableOpacity";
import View from "../view";
import Text from "../text";
import Image from "../image";
import asRadioGroupChild from "./asRadioGroupChild";
const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = Colors.primary;

/**
 * @description: A Radio Button component, should be wrapped inside a RadioGroup
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Default.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Alignment.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Custom.gif?raw=true
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Individual.png?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/RadioButtonScreen.js
 */
class RadioButton extends PureComponent {
  static propTypes = {
    /**
         * The identifier value of the radio button. must be different than other RadioButtons in the same group
         */
    value: _pt.oneOfType([_pt.string, _pt.number, _pt.bool]),

    /**
         * When using RadioButton without a RadioGroup, use this prop to toggle selection
         */
    selected: _pt.bool,

    /**
         * Invoked when pressing the button
         */
    onPress: _pt.func,

    /**
         * Whether the radio button should be disabled
         */
    disabled: _pt.bool,

    /**
         * The color of the radio button
         */
    color: _pt.string,

    /**
         * The size of the radio button, affect both width & height
         */
    size: _pt.number,

    /**
         * The radio button border radius
         */
    borderRadius: _pt.number,

    /**
         * A label for the radio button description
         */
    label: _pt.string,

    /**
         * Should the icon be on the right side of the label
         */
    iconOnRight: _pt.bool,

    /**
         * Should the content be rendered right to the button
         */
    contentOnRight: _pt.bool
  };
  static displayName = 'RadioButton';
  static defaultProps = {
    iconOnRight: false
  };

  constructor(props) {
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

  componentDidUpdate(prevProps) {
    if (prevProps.selected !== this.props.selected) {
      this.animate();
    }
  }

  animate() {
    const {
      selected
    } = this.props;
    const {
      opacityAnimationValue,
      scaleAnimationValue
    } = this.state;
    const animationTime = 150;
    const animationDelay = 60;

    if (selected) {
      Animated.parallel([Animated.timing(opacityAnimationValue, {
        toValue: 1,
        duration: animationTime,
        useNativeDriver: true
      }), Animated.timing(scaleAnimationValue, {
        toValue: 1,
        delay: animationDelay,
        duration: animationTime,
        easing: Easing.bezier(0.165, 0.84, 0.44, 1),
        useNativeDriver: true
      })]).start();
    } else {
      Animated.parallel([Animated.timing(scaleAnimationValue, {
        toValue: 0.8,
        duration: animationTime,
        useNativeDriver: true
      }), Animated.timing(opacityAnimationValue, {
        toValue: 0,
        duration: animationTime,
        useNativeDriver: true
      })]).start();
    }
  }

  onPress = () => {
    const {
      disabled,
      value,
      selected
    } = this.props;

    if (!disabled) {
      _.invoke(this.props, 'onValueChange', value);

      _.invoke(this.props, 'onPress', selected);
    }
  };
  getAccessibilityProps = () => {
    const {
      label = '',
      selected,
      disabled
    } = this.props;
    const selectedAccessibilityText = selected ? 'selected' : 'unselected';
    const accessibilityLabel = `${selectedAccessibilityText}. ${label}`;
    return {
      accessible: true,
      accessibilityStates: disabled ? ['disabled'] : undefined,
      accessibilityRole: 'button',
      // 'radio', TODO: uncomment when switching to RN60
      accessibilityLabel
    };
  };

  getRadioButtonOutlineStyle() {
    const {
      color,
      size,
      borderRadius,
      style: propsStyle,
      disabled
    } = this.props;
    const style = [this.styles.radioButtonOutline];

    if (size) {
      style.push({
        width: size,
        height: size
      });
    }

    if (borderRadius) {
      style.push({
        borderRadius
      });
    }

    if (color) {
      style.push({
        borderColor: disabled ? Colors.dark70 : color
      });
    }

    style.push(propsStyle);
    return style;
  }

  getRadioButtonInnerStyle() {
    const {
      color,
      borderRadius,
      disabled
    } = this.props;
    const style = [this.styles.radioButtonInner];

    if (borderRadius) {
      style.push({
        borderRadius
      });
    }

    if (color) {
      style.push({
        backgroundColor: disabled ? Colors.dark70 : color
      });
    }

    return style;
  }

  renderLabel() {
    const {
      label,
      labelStyle,
      contentOnRight
    } = this.props;
    return label && <Text marginL-10={!contentOnRight} marginR-10={contentOnRight} style={labelStyle}>
          {label}
        </Text>;
  }

  renderIcon() {
    const {
      iconSource,
      iconStyle
    } = this.props;
    const style = [this.styles.image, iconStyle];
    return iconSource && <Image style={style} source={iconSource} />;
  }

  renderButton() {
    const {
      opacityAnimationValue,
      scaleAnimationValue
    } = this.state;
    return <View style={this.getRadioButtonOutlineStyle()}>
        <Animated.View style={[this.getRadioButtonInnerStyle(), {
        opacity: opacityAnimationValue
      }, {
        transform: [{
          scale: scaleAnimationValue
        }]
      }]} />
      </View>;
  }

  render() {
    const {
      onPress,
      onValueChange,
      contentOnRight,
      containerStyle,
      ...others
    } = this.props;
    const Container = onPress || onValueChange ? TouchableOpacity : View;
    return (// @ts-ignore
      <Container row centerV activeOpacity={1} {...others} style={containerStyle} onPress={this.onPress} {...this.getAccessibilityProps()}>
        {!contentOnRight && this.renderButton()}
        {this.props.iconOnRight ? this.renderLabel() : this.renderIcon()}
        {this.props.iconOnRight ? this.renderIcon() : this.renderLabel()}
        {contentOnRight && this.renderButton()}
      </Container>
    );
  }

}

function createStyles(props) {
  const {
    size = DEFAULT_SIZE,
    borderRadius = DEFAULT_SIZE / 2,
    color = DEFAULT_COLOR,
    disabled
  } = props;
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

export default asBaseComponent(forwardRef(asRadioGroupChild(RadioButton)));