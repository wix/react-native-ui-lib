import _isUndefined from "lodash/isUndefined";
import React, { PureComponent } from 'react';
import { StyleSheet, AccessibilityInfo } from 'react-native';
import { Typography, Spacings, Colors, Shadows, BorderRadiuses } from "../../style";
import { asBaseComponent } from "../../commons/new";
import View from "../view";
import Text from "../text";
import Button from "../button";
import Assets from "../../assets";
var ActionType = /*#__PURE__*/function (ActionType) {
  ActionType["MINUS"] = "minus";
  ActionType["PLUS"] = "plus";
  return ActionType;
}(ActionType || {});
const DEFAULT_STEP = 1;
/**
 * @description: A stepper component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/StepperScreen.js
 */
class Stepper extends PureComponent {
  constructor(props) {
    super(props);
    const {
      value,
      minValue = 0,
      maxValue = 1,
      testID
    } = props;
    let initialValue = 0;
    if (minValue) {
      initialValue = minValue;
    }
    if (value !== undefined) {
      initialValue = value;
    }
    this.state = {
      currentValue: initialValue
    };
    if (initialValue < minValue) {
      console.warn(`Stepper: ${testID}'s minimum value: ${minValue} is greater than current value: ${initialValue}`);
    }
    if (initialValue > maxValue) {
      console.warn(`Stepper: ${testID}'s maximum value: ${maxValue} is less than current value: ${initialValue}`);
    }
    if (minValue > maxValue) {
      console.warn(`Stepper: ${testID}'s minimum value: ${minValue} is greater than the maximum value: ${maxValue}`);
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!_isUndefined(nextProps.value) && prevState.currentValue !== nextProps.value) {
      return {
        currentValue: nextProps.value
      };
    }
    return null;
  }
  getAccessibilityProps() {
    const {
      currentValue
    } = this.state;
    const {
      accessibilityLabel
    } = this.props;
    const labelSuffix = `value = ${currentValue}`;
    return {
      accessibilityLabel: accessibilityLabel ? `${accessibilityLabel}, ${labelSuffix}` : `Stepper, ${labelSuffix}`,
      accessible: true,
      accessibilityRole: 'adjustable',
      accessibilityActions: [{
        name: 'decrement'
      }, {
        name: 'increment'
      }],
      onAccessibilityAction: this.onAccessibilityAction
    };
  }
  onAccessibilityAction = event => {
    const {
      currentValue
    } = this.state;
    const {
      step = DEFAULT_STEP
    } = this.props;
    const eventMsgContext = event.nativeEvent.actionName === 'decrement' ? 'Minimum' : 'Maximum';
    const stepperLimitMsg = `${eventMsgContext} stepper value, ${currentValue}, reached`;
    switch (event.nativeEvent.actionName) {
      case 'decrement':
        this.accessibilityActionHandler(ActionType.MINUS, currentValue - step, stepperLimitMsg);
        break;
      case 'increment':
        this.accessibilityActionHandler(ActionType.PLUS, currentValue + step, stepperLimitMsg);
        break;
      default:
        break;
    }
  };
  accessibilityActionHandler(actionType, newStepperValue, actionLimitMsg) {
    if (this.allowStepChange(actionType)) {
      this.handleStepChange(actionType);
      AccessibilityInfo.announceForAccessibility?.(newStepperValue.toString());
    } else {
      AccessibilityInfo.announceForAccessibility?.(actionLimitMsg);
    }
  }
  allowStepChange(actionType) {
    const {
      minValue,
      maxValue
    } = this.props;
    const {
      currentValue
    } = this.state;
    if (actionType === ActionType.PLUS) {
      return maxValue === undefined || currentValue < maxValue;
    }
    if (actionType === ActionType.MINUS) {
      return minValue === undefined || currentValue > minValue;
    }
  }
  handleStepChange(actionType) {
    const {
      testID,
      step = DEFAULT_STEP
    } = this.props;
    const {
      currentValue
    } = this.state;
    let newCurrent = currentValue;
    if (actionType === ActionType.MINUS) {
      newCurrent = currentValue - step;
    } else {
      newCurrent = currentValue + step;
    }
    this.setState({
      currentValue: newCurrent
    });
    this.props.onValueChange?.(newCurrent, testID);
  }
  renderButton(actionType) {
    const {
      type,
      disabled,
      small,
      testID
    } = this.props;
    const allowStepChange = this.allowStepChange(actionType);
    const isFloatingStepper = type === 'floating';
    const minusButton = isFloatingStepper ? Assets.internal.icons.minusSmall : small ? Assets.internal.icons.minusOutlineSmall : Assets.internal.icons.minusOutline;
    const plusButton = isFloatingStepper ? Assets.internal.icons.plusSmall : small ? Assets.internal.icons.plusOutlineSmall : Assets.internal.icons.plusOutline;
    return <Button link color={isFloatingStepper ? Colors.$iconDefault : undefined} iconSource={actionType === ActionType.MINUS ? minusButton : plusButton} disabled={disabled || !allowStepChange} onPress={() => this.handleStepChange(actionType)} testID={actionType === ActionType.MINUS ? `${testID}.minusStep` : `${testID}.plusStep`} />;
  }
  render() {
    const {
      type,
      disabled,
      testID
    } = this.props;
    const {
      currentValue
    } = this.state;
    return <View row centerV {...this.getAccessibilityProps()} style={type === 'floating' && styles.containerFloating}>
        {this.renderButton(ActionType.MINUS)}
        <Text $textDefault $textDisabled={disabled} style={[Typography.text70M, type === 'floating' ? styles.textFloating : styles.textDefault]} testID={`${testID}.currentValue`} recorderTag={'unmask'}>
          {currentValue}
        </Text>
        {this.renderButton(ActionType.PLUS)}
      </View>;
  }
}
const styles = StyleSheet.create({
  containerFloating: {
    borderRadius: BorderRadiuses.br100,
    backgroundColor: Colors.$backgroundElevated,
    borderWidth: 1,
    borderColor: Colors.$outlineDefault,
    paddingHorizontal: Spacings.s3,
    paddingVertical: Spacings.s1,
    ...Shadows.sh10.bottom
  },
  textDefault: {
    marginHorizontal: Spacings.s5
  },
  textFloating: {
    marginHorizontal: Spacings.s2,
    minWidth: Spacings.s6,
    textAlign: 'center'
  }
});
export default asBaseComponent(Stepper);