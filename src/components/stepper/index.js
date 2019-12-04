import _ from 'lodash';
import React from 'react';
import {AccessibilityInfo, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import StepperButton from './StepperButton';
import createStyles from './style';
import {PureBaseComponent} from '../../commons';

/**
 * @description: Stepper component with increase and decrease buttons
 * @gif: https://media.giphy.com/media/3oFzm47bk0v4WV15O8/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FormScreen.js
 */
export default class Stepper extends PureBaseComponent {
  static displayName = 'Stepper';
  static propTypes = {
    /**
     * Text to show next to the current number
     */
    label: PropTypes.string,
    /**
     * Minimum value
     */
    min: PropTypes.number.isRequired,
    /**
     * Maximum value
     */
    max: PropTypes.number,
    /**
     * Additional styles for the top container
     */
    containerStyle: PropTypes.object,
    /**
     * Handler function to receive updates when the value changes
     */
    onValueChange: PropTypes.func,
    /**
     * the initial value
     */
    initialValue: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.initialValue
    };
  }

  getAccessibilityProps() {
    const {value} = this.state;
    const {accessibilityLabel} = this.props;
    const labelSuffix = `value = ${value}`;
    return {
      accessibilityLabel: accessibilityLabel ? `${accessibilityLabel}, ${labelSuffix}` : `Stepper, ${labelSuffix}`,
      accessible: true,
      accessibilityRole: 'adjustable',
      accessibilityActions: [{name: 'increment', label: 'increment'}, {name: 'decrement', label: 'decrement'}],
      onAccessibilityAction: this.onAccessibilityAction
    };
  }

  onAccessibilityAction = event => {
    const {value} = this.state;
    const {min, max} = this.props;
    const eventMsgContext = event.nativeEvent.action === 'decrement' ? 'Minimum' : 'Maximum';
    const stepperLimitMsg = `${eventMsgContext} stepper value, ${value}, reached`;

    // switch (event.nativeEvent.action) {
    switch (event.nativeEvent.actionName) {
      case 'decrement':
        if (value <= min) {
          _.invoke(AccessibilityInfo, 'announceForAccessibility', stepperLimitMsg);
        } else {
          this.updateValue(value - 1);
          _.invoke(AccessibilityInfo, 'announceForAccessibility', value - 1);
        }
        break;
      case 'increment':
        if (value >= max) {
          _.invoke(AccessibilityInfo, 'announceForAccessibility', stepperLimitMsg);
        } else {
          this.updateValue(value + 1);
          _.invoke(AccessibilityInfo, 'announceForAccessibility', value + 1);
        }
        break;
      default:
        break;
    }
  };
  
  generateStyles() {
    this.styles = createStyles(this.props.size);
  }

  getLabel() {
    return [this.state.value, this.props.label].join(' ');
  }

  getDisabledState() {
    const minusDisabled = this.state.value === this.props.min;
    const plusDisabled = this.state.value === this.props.max;
    return {minusDisabled, plusDisabled};
  }

  updateValue(value) {
    let newValue = _.max([value, this.props.min]);
    newValue = _.min([newValue, this.props.max]);
    if (this.state.value !== newValue) {
      this.setState({
        value: newValue
      },
      () => {
        if (this.props.onValueChange) {
          this.props.onValueChange(newValue);
        }
      },);
    }
  }

  render() {
    const {minusDisabled, plusDisabled, testID} = this.getDisabledState();
    return (
      <View {...this.getAccessibilityProps()} style={[this.styles.container, this.props.containerStyle]}>
        <View style={this.styles.title}>
          <Text testID={`${testID}.label`} style={this.styles.titleText}>
            {this.getLabel()}
          </Text>
        </View>
        <View style={this.styles.buttons}>
          <StepperButton
            label="-"
            testID={`${testID}.decrease`}
            styles={this.styles}
            disabled={minusDisabled}
            onPress={() => this.updateValue(this.state.value - 1)}
          />
          <View style={this.styles.separator}/>
          <StepperButton
            label="+"
            testID={`${testID}.increase`}
            styles={this.styles}
            disabled={plusDisabled}
            onPress={() => this.updateValue(this.state.value + 1)}
          />
        </View>
      </View>
    );
  }
}
