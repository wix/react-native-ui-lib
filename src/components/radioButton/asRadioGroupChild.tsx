import React, {Component} from 'react';
import RadioGroupContext from './RadioGroupContext';

interface RadioGroupChildPropTypes {
  /**
   * The identifier value of the radio button. must be different than other RadioButtons in the same group
   */
  value?: string | boolean;
  /**
   * When using RadioButton without a RadioGroup, use this prop to toggle selection
   */
  selected?: boolean;
}

type PropTypes = RadioGroupChildPropTypes;

export default function asRadioGroupChild(WrappedComponent: React.ComponentType<any>) {
  class RadioGroupChild extends Component<PropTypes> {
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

  return RadioGroupChild as any;
}
