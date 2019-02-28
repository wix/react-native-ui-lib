import React, {Component} from 'react';
import {RadioGroupContext} from './RadioGroup';

export default function asRadioGroupChild(WrappedComponent) {
  class RadioGroupChild extends Component {
    render() {
      return (
        <RadioGroupContext.Consumer>
          {({value, onValueChange}) => (
            <WrappedComponent {...this.props} selectedValue={value} onValueChange={onValueChange} />
          )}
        </RadioGroupContext.Consumer>
      );
    }
  }

  return RadioGroupChild;
}
