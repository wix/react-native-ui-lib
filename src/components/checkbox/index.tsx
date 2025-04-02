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
import Icon from '../icon';
import Constants from '../../commons/Constants';

const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = Colors.$backgroundPrimaryHeavy;
const DEFAULT_ICON_COLOR = Colors.$iconDefaultLight;
const DEFAULT_DISABLED_COLOR = Colors.$backgroundDisabled;

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
   * Whether the checkbox is required
   */
  required?: boolean;
  /** 
   * Callback for when field validity has changed (only after invoking validate())
   */
  onChangeValidity?: (isValid?: boolean) => void;
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
  indeterminate?: boolean;
}

interface CheckboxMethods {
  validate: () => void;
  isValid: () => boolean;
}

export type CheckboxRef = Checkbox & CheckboxMethods;

interface CheckboxState {
  isChecked: Animated.Value;
  showError?: boolean;
  isValid?: boolean;
}

/**
 * @description: Checkbox component for toggling boolean value related to some context
 * @extends: TouchableOpacity
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CheckboxScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Checkbox/Checkbox.gif?raw=true
 */

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
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

    const {value = false, required} = props;

    this.state = {
      isChecked: new Animated.Value(value ? 1 : 0),
      showError: false,
      isValid: !required || value
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

  validationState = false;

  componentDidUpdate(prevProps: CheckboxProps) {
    const {value} = this.props;

    if (prevProps.value !== value) {
      this.animateCheckbox(value);
      if (value !== undefined) {
        this.setValidation(value);
      }
    }
  }

  getAccessibilityProps() {
    const {accessibilityLabel = 'checkbox', disabled, value} = this.props;

    return {
      accessible: true,
      accessibilityLabel,
      accessibilityRole: 'checkbox',
      accessibilityState: {disabled, checked: value}
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

  setValidation(newValue: boolean) {
    const {required, onChangeValidity} = this.props;
    if (required) {
      const error = required && !newValue;
      this.setState({showError: this.validationState ? error : false, isValid: !error}, () => {
        onChangeValidity?.(this.state.isValid);
      });
    }
  }

  onPress = () => {
    const {disabled, value, onValueChange} = this.props;
    
    if (!disabled) {
      const newValue = !value;
      onValueChange?.(newValue);
      this.setValidation(newValue);
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
      return DEFAULT_ICON_COLOR;
    } else {
      return iconColor || DEFAULT_ICON_COLOR;
    }
  };

  getBorderStyle() {
    const borderColor = {borderColor: this.state.showError ? Colors.$outlineDanger : this.getColor()};
    const borderStyle = [this.styles.container, {borderWidth: DEFAULT_BORDER_WIDTH}, borderColor];

    return borderStyle;
  }

  getLabelStyle = () => {
    return {
      color: this.props.disabled ? Colors.$textDisabled : 
        this.state.showError ? Colors.$textDangerLight : Colors.$textDefault
    };
  };

  getAccessibleHitSlop(size: number) {
    return Math.max(0, (48 - size) / 2);    
  }

  renderCheckbox() {
    const {selectedIcon, label, testID, style, containerStyle, indeterminate, ...others} = this.props;
    
    return (
      //@ts-ignore
      <TouchableOpacity
        {...this.getAccessibilityProps()}
        activeOpacity={1}
        testID={testID}
        {...others}
        style={[this.getBorderStyle(), style, !label && containerStyle]}
        onPress={this.onPress}
        hitSlop={this.getAccessibleHitSlop(this.props.size || DEFAULT_SIZE)}
      >
        {
          <Animated.View
            style={[
              this.styles.container,
              {opacity: this.animationStyle.opacity},
              {backgroundColor: this.getBackgroundColor()}
            ]}
          >
            <AnimatedIcon
              style={[this.styles.selectedIcon, {transform: this.animationStyle.transform}]}
              source={indeterminate ? Assets.internal.icons.minusSmall : selectedIcon || Assets.internal.icons.checkSmall}
              testID={`${testID}.selected`}
              tintColor={this.getTintColor()}
            />
          </Animated.View>
        }
      </TouchableOpacity>
    );
  }

  render() {
    const {label, labelStyle, containerStyle, labelProps, testID} = this.props;
    
    return label ? (
      <View row centerV style={containerStyle} collapsable={!Constants.isAndroid}>
        {this.renderCheckbox()}
        <Text flexS style={[this.styles.checkboxLabel, this.getLabelStyle(), labelStyle]} recorderTag={'unmask'} {...labelProps} onPress={this.onPress} testID={`${testID}.label`}>
          {label}
        </Text>
      </View>
    ) : (
      this.renderCheckbox()
    );
  }

  validate = () => {
    const {value, required} = this.props;
    const error = required && !value;
    this.validationState = true; 
    this.setState({showError: error, isValid: !error});
    return !error;
  };

  isValid = () => {
    return this.state.isValid;
  };
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
