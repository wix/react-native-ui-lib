import _ from 'lodash';
import React from 'react';
import {StyleSheet, AccessibilityInfo, AccessibilityProps} from 'react-native';
import {Typography, Spacings} from '../../style';
import {PureBaseComponent} from '../../commons';
import View from '../view';
import Button from '../button';
import Text from '../text';


const MINUS = 'minus';
const PLUS = 'plus';
const minusIcon = require('./assets/minusOutline.png');
const plusIcon = require('./assets/plusOutline.png');
const minusIconSmall = require('./assets/minusOutlineSmall.png');
const plusIconSmall = require('./assets/plusOutlineSmall.png');


interface Props {
  /**
   * Component accessibility label
   */
  accessibilityLabel?: string;
  /**
   * Initial value of the Stepper.
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
   * On value change callback function
   */
  onValueChange?: (value: number, id: Props['id']) => void;
  /**
   * disables interaction with the stepper
   */
  disabled?: boolean;
  /**
   * Unique ID of the Stepper.
   */
  id?: string;
  /**
   * Renders a small sized Stepper
   */
  small?: boolean;
  /**
   * Test id for component
   */
  testID?: string;
}

interface State {
  currentStepperValue: number;
}

/**
 * @description: A stepper component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/StepperScreen.js
 */
class Stepper extends PureBaseComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const {value, minValue, maxValue, id} = props;

    let initialValue = 0;
    if (minValue) {
      initialValue = minValue;
    }

    if (value !== undefined) {
      initialValue = value;
    }

    this.state = {
      currentStepperValue: initialValue
    };

    if (initialValue < minValue) {
      console.warn(
        `Stepper ID: ${id}'s Minimum value: ${minValue} is greater than current stepper value: ${initialValue}`
      );
    }
    if (initialValue > maxValue) {
      console.warn(
        `Stepper ID: ${id}'s Maximum value: ${maxValue} is less than current stepper value: ${initialValue}`
      );
    }
    if (minValue > maxValue) {
      console.warn(`Stepper ID: ${id}'s Minimum value: ${minValue} is greater than the Maximum value: ${maxValue}`);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({currentStepperValue: nextProps.value});
    }
  }

  getAccessibilityProps(): AccessibilityProps {
    const {currentStepperValue} = this.state;
    const {accessibilityLabel} = this.props;
    const labelSuffix = `value = ${currentStepperValue}`;

    return {
      accessibilityLabel: accessibilityLabel ? `${accessibilityLabel}, ${labelSuffix}` : `Stepper, ${labelSuffix}`,
      accessible: true,
      accessibilityRole: 'adjustable',
      accessibilityActions: [{name: 'decrement'}, {name: 'increment'}],
      onAccessibilityAction: this.onAccessibilityAction
    };
  }

  onAccessibilityAction = event => {
    const {currentStepperValue} = this.state;
    const eventMsgContext = event.nativeEvent.actionName === 'decrement' ? 'Minimum' : 'Maximum';
    const stepperLimitMsg = `${eventMsgContext} stepper value, ${currentStepperValue}, reached`;

    switch (event.nativeEvent.actionName) {
      case 'decrement':
        this.accessibilityActionHandler('minus', currentStepperValue - 1, stepperLimitMsg);
        break;
      case 'increment':
        this.accessibilityActionHandler('plus', currentStepperValue + 1, stepperLimitMsg);
        break;
      default:
        break;
    }
  };

  accessibilityActionHandler(actionType, newStepperValue, actionLimitMsg) {
    if (this.allowStepChange(actionType)) {
      this.handleStepChange(actionType);
      _.invoke(AccessibilityInfo, 'announceForAccessibility', `${newStepperValue}`);
    } else {
      _.invoke(AccessibilityInfo, 'announceForAccessibility', actionLimitMsg);
    }
  }

  allowStepChange(buttonType) {
    const {minValue, maxValue} = this.props;
    const {currentStepperValue} = this.state;

    if (buttonType === PLUS) {
      return maxValue === undefined || currentStepperValue < maxValue;
    }
    if (buttonType === MINUS) {
      return minValue === undefined || currentStepperValue > minValue;
    }
  }

  handleStepChange(buttonType) {
    const {id} = this.props;
    const {currentStepperValue} = this.state;
    let newCurrent = currentStepperValue;

    if (buttonType === MINUS) {
      newCurrent = currentStepperValue - 1;
    } else {
      newCurrent = currentStepperValue + 1;
    }

    this.setState({currentStepperValue: newCurrent});
    _.invoke(this.props, 'onValueChange', newCurrent, id);
  }

  renderButton(buttonType) {
    const {disabled, small, testID} = this.props;
    const allowStepChange = this.allowStepChange(buttonType);
    const minusButton = small ? minusIconSmall : minusIcon;
    const plusButton = small ? plusIconSmall : plusIcon;

    return (
      <Button
        link
        throttleTime={0}
        iconSource={buttonType === MINUS ? minusButton : plusButton}
        disabled={disabled || !allowStepChange}
        onPress={() => this.handleStepChange(buttonType)}
        testID={buttonType === MINUS ? `${testID}.minusStep` : `${testID}.plusStep`}
        useCustomTheme
      />
    );
  }

  render() {
    const {small, testID} = this.props;
    const {currentStepperValue} = this.state;
    const typography = small ? Typography.bodyBold : Typography.mainBold;

    return (
      <View row centerV {...this.getAccessibilityProps()}>
        {this.renderButton(MINUS)}
        <Text style={[typography, styles.text]} testID={`${testID}.currentStepperValue`}>
          {currentStepperValue}
        </Text>
        {this.renderButton(PLUS)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    marginHorizontal: Spacings.s5
  }
});

export default Stepper;
