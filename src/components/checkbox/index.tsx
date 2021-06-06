import _ from 'lodash';
import React, {Component} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  StyleProp,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
  ImageStyle
} from 'react-native';
import {Colors, Spacings} from '../../style';
//@ts-ignore
import Assets from '../../assets';
import {asBaseComponent} from '../../commons/new';
import TouchableOpacity from '../touchableOpacity';
import Text, {TextProps} from '../text';
import View from '../view';

const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = Colors.primary;
const DEFAULT_ICON_COLOR = Colors.white;
const DEFAULT_DISABLED_COLOR = Colors.grey50;

const DEFAULT_BORDER_WIDTH = 2;
const DEFAULT_BORDER_RADIUS = 8;

export interface CheckboxProps extends TouchableOpacityProps {
  /**
   * The value of the Checkbox. If true the switch will be turned on. Default value is false.
   */
  value?: boolean;
  /**
   * Invoked with the new value when the value changes.
   */
  onValueChange?: (value: boolean) => void;
  /**
   * Whether the checkbox should be disabled
   */
  disabled?: boolean;
  /**
   * The Checkbox color
   */
  color?: string;
  /**
   * alternative Checkbox outline style
   */
  outline?: boolean;
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
   * The label of the checkbox
   */
  label?: string;
  /**
   * The style of the label
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Props that will be passed to the checkbox Text label.
   */
  labelProps?: Omit<TextProps, 'style'>;
  /**
   * Additional styling
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Additional styling for checkbox and label container
   */
  containerStyle?: StyleProp<ViewStyle>;
}
export type CheckboxPropTypes = CheckboxProps; //TODO: remove after ComponentPropTypes deprecation;

interface CheckboxState {
  isChecked: Animated.Value;
}

/**
 * @description: Checkbox component for toggling boolean value related to some context
 * @extends: TouchableOpacity
 * @extendsLink: docs/TouchableOpacity
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CheckboxScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Checkbox/Checkbox.gif?raw=true
 */
class Checkbox extends Component<CheckboxProps, CheckboxState> {
  static displayName = 'Checkbox';

  styles: {
    container: StyleProp<ViewStyle>;
    selectedIcon: StyleProp<ImageStyle>;
    checkboxLabel: StyleProp<TextStyle>;
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

  constructor(props: CheckboxProps) {
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

  componentDidUpdate(prevProps: CheckboxProps) {
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

  getColor = () => (this.props.disabled ? DEFAULT_DISABLED_COLOR : this.props.color || DEFAULT_COLOR);

  getBackgroundColor = () => (this.props.outline ? 'transparent' : this.getColor());

  getTintColor = () => {
    const {outline, disabled, iconColor} = this.props;
    if (outline) {
      if (disabled) {
        return DEFAULT_DISABLED_COLOR;
      } else {
        return iconColor || DEFAULT_COLOR;
      }
    } else if (disabled) {
      return Colors.white;
    } else {
      return iconColor || Colors.white;
    }
  };

  getBorderStyle() {
    const borderColor = {borderColor: this.getColor()};
    const borderStyle = [this.styles.container, {borderWidth: DEFAULT_BORDER_WIDTH}, borderColor];

    return borderStyle;
  }

  renderCheckbox() {
    const {selectedIcon, label, testID, style, containerStyle, ...others} = this.props;

    return (
      //@ts-ignore
      <TouchableOpacity
        {...this.getAccessibilityProps()}
        activeOpacity={1}
        testID={testID}
        {...others}
        style={[this.getBorderStyle(), style, !label && containerStyle]}
        onPress={this.onPress}
      >
        {
          <Animated.View
            style={[
              this.styles.container,
              {opacity: this.animationStyle.opacity},
              {backgroundColor: this.getBackgroundColor()}
            ]}
          >
            <Animated.Image
              style={[
                this.styles.selectedIcon,
                {transform: this.animationStyle.transform},
                {tintColor: this.getTintColor()}
              ]}
              source={selectedIcon || Assets.icons.checkSmall}
              testID={`${testID}.selected`}
            />
          </Animated.View>
        }
      </TouchableOpacity>
    );
  }

  render() {
    const {label, labelStyle, containerStyle, labelProps} = this.props;
    return label ? (
      <View row centerV style={[containerStyle]}>
        {this.renderCheckbox()}
        <Text style={[this.styles.checkboxLabel, labelStyle]} {...labelProps} onPress={this.onPress}>
          {label}
        </Text>
      </View>
    ) : (
      this.renderCheckbox()
    );
  }
}

function createStyles(props: CheckboxProps) {
  const {
    color = DEFAULT_COLOR,
    iconColor = DEFAULT_ICON_COLOR,
    size = DEFAULT_SIZE,
    borderRadius = DEFAULT_BORDER_RADIUS
  } = props;

  return StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: color
    },
    selectedIcon: {
      tintColor: iconColor,
      alignItems: 'center',
      justifyContent: 'center'
    },
    checkboxLabel: {
      marginLeft: Spacings.s3,
      alignSelf: 'center'
    }
  });
}

export default asBaseComponent<CheckboxProps>(Checkbox);
