import React, { Component } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import RadioGroupContext from "./RadioGroupContext";
export default function asRadioGroupChild(WrappedComponent) {
  class RadioGroupChild extends Component {
    render() {
      const {
        value: buttonValue,
        selected
      } = this.props;
      return <RadioGroupContext.Consumer>
          {({
          value,
          onValueChange
        }) => <WrappedComponent {...this.props} selectedValue={value} selected={buttonValue !== undefined ? value === buttonValue : selected} onValueChange={onValueChange} />}
        </RadioGroupContext.Consumer>;
    }
  }
  hoistStatics(RadioGroupChild, WrappedComponent);
  RadioGroupChild.displayName = WrappedComponent.displayName;
  return RadioGroupChild;
}