import _ from 'lodash';
import React, {Component} from 'react';
import {Animated, Easing, StyleSheet, StyleProp, TouchableOpacityProps, ViewStyle} from 'react-native';
import {Colors} from '../../style';
//@ts-ignore
import Assets from '../../assets';
import {asBaseComponent, BaseComponentInjectedProps} from '../../commons/new';
import TouchableOpacity from '../touchableOpacity';

const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = Colors.blue30;
const DEFAULT_ICON_COLOR = Colors.white;
const DEFAULT_DISABLED_COLOR = Colors.dark70;

interface CheckboxProps {
  /**
   * The value of the Checkbox. If true the switch will be turned on. Default value is false.
   */
  value?: boolean;
  /**
   * Invoked with the new value when the value changes.
   */
  onValueChange?: Function;
  /**
   * Whether the checkbox should be disabled
   */
  disabled?: boolean;
  /**
   * The Checkbox color
   */
  color?: string;
  /**
   * The size of the checkbox. affect both width and height
   */
  size?: number;
  /**
   * The Checkbox border radius
   */
  borderRadius?: number;
  /**
   * The icon asset to use for the selected indication (accept only local assets)
   */
  selectedIcon?: number;
  /**
   * The selected icon color
   */
  iconColor?: string;
  /**
   * Additional styling
   */
  style?: StyleProp<ViewStyle>
}

type CheckboxState = {
  isChecked: Animated.Value;
};

type Props = CheckboxProps & BaseComponentInjectedProps & TouchableOpacityProps;

/**
 * @description: Checkbox component for toggling boolean value related to some context
 * @extends: TouchableOpacity
 * @extendslink: docs/TouchableOpacity
 * @gif: https://media.giphy.com/media/xULW8j5WzsuPytqklq/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CheckboxScreen.tsx
 */
class Checkbox extends Component<Props, CheckboxState> {
  static displayName = 'Checkbox';

  styles: {
    container: StyleProp<ViewStyle>;
    selectedIcon: StyleProp<ViewStyle>;
  };

  animationStyle: {
    opacity: CheckboxState['isChecked'];
    transform: [
      {
        scaleX: CheckboxState['isChecked'];
      },
      {
        scaleY: CheckboxState['isChecked'];
      }
    ];
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      isChecked: new Animated.Value(this.props.value ? 1 : 0)
    };

    this.styles = createStyles(props);

    this.animationStyle = {
      opacity: this.state.isChecked,
      transform: [
        {
          scaleX: this.state.isChecked
        },
        {
          scaleY: this.state.isChecked
        }
      ]
    };
  }

  componentDidUpdate(prevProps: Props) {
    const {value} = this.props;
    if (prevProps.value !== value) {
      this.animateCheckbox(value);
    }
  }

  getAccessibilityProps() {
    const {accessibilityLabel, disabled, value} = this.props;
    const checkedState = value ? 'checked' : 'unchecked';

    return {
      accessible: true,
      accessibilityLabel: accessibilityLabel ? `${accessibilityLabel} ${checkedState}` : `${checkedState}`,
      accessibilityRole: 'checkbox',
      accessibilityStates: disabled ? ['disabled'] : undefined
    };
  }

  animateCheckbox(value: CheckboxProps['value']) {
    const {isChecked} = this.state;

    Animated.timing(isChecked, {
      duration: 170,
      easing: Easing.bezier(0.77, 0.0, 0.175, 1.0),
      toValue: Number(value),
      useNativeDriver: true
    }).start();
  }

  onPress = () => {
    const {disabled} = this.props;

    if (!disabled) {
      _.invoke(this.props, 'onValueChange', !this.props.value);
    }
  };

  getColor() {
    const {color, disabled} = this.props;
    return disabled ? DEFAULT_DISABLED_COLOR : color || DEFAULT_COLOR;
  }

  getBorderStyle() {
    const borderColor = {borderColor: this.getColor()};
    const borderStyle = [this.styles.container, {borderWidth: 2}, borderColor];

    return borderStyle;
  }

  render() {
    const {selectedIcon, color, iconColor, disabled, testID, style, ...others} = this.props;
    return (
      // @ts-ignore
      <TouchableOpacity
        {...this.getAccessibilityProps()}
        activeOpacity={1}
        testID={testID}
        {...others}
        style={[this.getBorderStyle(), style]}
        onPress={this.onPress}
      >
        {
          <Animated.View
            style={[this.styles.container, {backgroundColor: this.getColor()}, {opacity: this.animationStyle.opacity}]}
          >
            <Animated.Image
              style={[
                this.styles.selectedIcon,
                color && {tintColor: iconColor},
                {transform: this.animationStyle.transform},
                disabled && {tintColor: DEFAULT_ICON_COLOR}
              ]}
              source={selectedIcon || Assets.icons.checkSmall}
              testID={`${testID}.selected`}
            />
          </Animated.View>
        }
      </TouchableOpacity>
    );
  }
}

function createStyles(props: Props) {
  const {color = DEFAULT_COLOR, iconColor = DEFAULT_ICON_COLOR, size = DEFAULT_SIZE, borderRadius} = props;

  return StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: borderRadius || 8,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: color
    },
    selectedIcon: {
      tintColor: iconColor,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
}

export default asBaseComponent<Props>(Checkbox);
