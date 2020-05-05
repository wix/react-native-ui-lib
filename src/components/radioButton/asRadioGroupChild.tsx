import React, {Component} from 'react';
import {RadioGroupContext} from './RadioGroup';
import {RadioGroupChildPropTypes} from './types';

export default function asRadioGroupChild(WrappedComponent: React.ComponentType<any>) {
  class RadioGroupChild extends Component<RadioGroupChildPropTypes> {
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
