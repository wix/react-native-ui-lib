import {isUndefined} from 'lodash';
import React, {PureComponent} from 'react';
import {StyleSheet, AccessibilityInfo, AccessibilityProps, AccessibilityActionEvent} from 'react-native';
import {Typography, Spacings, Colors, Shadows, BorderRadiuses} from '../../style';
import {asBaseComponent} from '../../commons/new';
import View from '../view';
import Text from '../text';
import Button from '../button';
import Assets from '../../assets';

enum ActionType {
  MINUS = 'minus',
  PLUS = 'plus'
}

export type StepperType = 'default' | 'floating';

const DEFAULT_STEP = 1;

interface Props {
  /**
   * Stepper style type
   */
  type?: StepperType;
  /**
   * Stepper value.
   */
  value?: number;
  /**
   * Minimum value.
   */
  minValue?: number;
  /**
   * Maximum value.
   */
  maxValue?: number;
  /**
   * The step to increase and decrease by (default is 1)
   */
  step?: number;
  /**
   * On value change callback function
   */
  onValueChange?: (value: number, testID?: string) => void;
  /**
   * disables interaction with the stepper
   */
  disabled?: boolean;
  /**
   * Renders a small sized Stepper
   */
  small?: boolean;
  /**
   * Component accessibility label
   */
  accessibilityLabel?: string;
  /**
   * Test id for component
   */
  testID?: string;
}
export type StepperProps = Props;

interface State {
  currentValue: number;
}

/**
 * @description: A stepper component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/StepperScreen.js
 */
class Stepper extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    const {value, minValue = 0, maxValue = 1, testID} = props;
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

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (!isUndefined(nextProps.value) && prevState.currentValue !== nextProps.value) {
      return {currentValue: nextProps.value};
    }
    return null;
  }

  getAccessibilityProps(): AccessibilityProps {
    const {currentValue} = this.state;
    const {accessibilityLabel} = this.props;
    const labelSuffix = `value = ${currentValue}`;

    return {
      accessibilityLabel: accessibilityLabel ? `${accessibilityLabel}, ${labelSuffix}` : `Stepper, ${labelSuffix}`,
      accessible: true,
      accessibilityRole: 'adjustable',
      accessibilityActions: [{name: 'decrement'}, {name: 'increment'}],
      onAccessibilityAction: this.onAccessibilityAction
    };
  }

  onAccessibilityAction = (event: AccessibilityActionEvent) => {
    const {currentValue} = this.state;
    const {step = DEFAULT_STEP} = this.props;
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

  accessibilityActionHandler(actionType: ActionType, newStepperValue: number, actionLimitMsg: string) {
    if (this.allowStepChange(actionType)) {
      this.handleStepChange(actionType);
      AccessibilityInfo.announceForAccessibility?.(newStepperValue.toString());
    } else {
      AccessibilityInfo.announceForAccessibility?.(actionLimitMsg);
    }
  }

  allowStepChange(actionType: ActionType) {
    const {minValue, maxValue} = this.props;
    const {currentValue} = this.state;

    if (actionType === ActionType.PLUS) {
      return maxValue === undefined || currentValue < maxValue;
    }
    if (actionType === ActionType.MINUS) {
      return minValue === undefined || currentValue > minValue;
    }
  }

  handleStepChange(actionType: ActionType) {
    const {testID, step = DEFAULT_STEP} = this.props;
    const {currentValue} = this.state;
    let newCurrent = currentValue;

    if (actionType === ActionType.MINUS) {
      newCurrent = currentValue - step;
    } else {
      newCurrent = currentValue + step;
    }

    this.setState({currentValue: newCurrent});
    this.props.onValueChange?.(newCurrent, testID);
  }

  renderButton(actionType: ActionType) {
    const {type, disabled, small, testID} = this.props;
    const allowStepChange = this.allowStepChange(actionType);
    const isFloatingStepper = type === 'floating';
    const minusButton = isFloatingStepper
      ? Assets.internal.icons.minusSmall
      : small
        ? Assets.internal.icons.minusOutlineSmall
        : Assets.internal.icons.minusOutline;
    const plusButton = isFloatingStepper
      ? Assets.internal.icons.plusSmall
      : small
        ? Assets.internal.icons.plusOutlineSmall
        : Assets.internal.icons.plusOutline;

    return (
      <Button
        link
        color={isFloatingStepper ? Colors.$iconDefault : undefined}
        iconSource={actionType === ActionType.MINUS ? minusButton : plusButton}
        disabled={disabled || !allowStepChange}
        onPress={() => this.handleStepChange(actionType)}
        testID={actionType === ActionType.MINUS ? `${testID}.minusStep` : `${testID}.plusStep`}
      />
    );
  }

  render() {
    const {type, disabled, testID} = this.props;
    const {currentValue} = this.state;

    return (
      <View row centerV {...this.getAccessibilityProps()} style={type === 'floating' && styles.containerFloating}>
        {this.renderButton(ActionType.MINUS)}
        <Text
          $textDefault
          $textDisabled={disabled}
          style={[Typography.text70M, type === 'floating' ? styles.textFloating : styles.textDefault]}
          testID={`${testID}.currentValue`}
          recorderTag={'unmask'}
        >
          {currentValue}
        </Text>
        {this.renderButton(ActionType.PLUS)}
      </View>
    );
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

export default asBaseComponent<Props>(Stepper);
