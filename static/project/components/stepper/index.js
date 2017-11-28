import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import createStyles from './style';
import {BaseComponent} from '../../commons';
import StepperButton from './StepperButton';

/**
 * Stepper component with increase and decrease buttons
 */
export default class Stepper extends BaseComponent {
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
    initialValue: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue,
    };
  }

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
        value: newValue,
      }, () => {
        if (this.props.onValueChange) {
          this.props.onValueChange(newValue);
        }
      });
    }
  }

  render() {
    const {minusDisabled, plusDisabled} = this.getDisabledState();
    return (
      <View style={[this.styles.container, this.props.containerStyle]}>
        <View style={this.styles.title}>
          <Text testID={'label'} style={this.styles.titleText}>{this.getLabel()}</Text>
        </View>
        <View style={this.styles.buttons}>
          <StepperButton
            label="-"
            testId={'decrease'}
            styles={this.styles}
            disabled={minusDisabled}
            onPress={() => this.updateValue(this.state.value - 1)}
          />
          <View style={this.styles.separator}/>
          <StepperButton
            label="+"
            testId={'increase'}
            styles={this.styles}
            disabled={plusDisabled}
            onPress={() => this.updateValue(this.state.value + 1)}
          />
        </View>
      </View>
    );
  }
}
