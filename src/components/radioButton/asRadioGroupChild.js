import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {RadioGroupContext} from './RadioGroup';

export default function asRadioGroupChild(WrappedComponent) {
  class RadioGroupChild extends Component {
    static propTypes = {
      /**
       * The identifier value of the radio button. must be different than other RadioButtons in the same group
       */
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
      /**
       * When using RadioButton without a RadioGroup, use this prop to toggle selection
       */
      selected: PropTypes.bool
    };

    render() {
      const {value: buttonValue, selected} = this.props;
      return (
        <RadioGroupContext.Consumer>
          {({value, onValueChange}) => (
            <WrappedComponent
              {...this.props}
              selectedValue={value}
              selected={buttonValue !== undefined ? value === buttonValue : selected}
              onValueChange={onValueChange}
            />
          )}
        </RadioGroupContext.Consumer>
      );
    }
  }

  return RadioGroupChild;
}
