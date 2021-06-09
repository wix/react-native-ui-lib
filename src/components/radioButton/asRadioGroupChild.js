import _pt from "prop-types";
import React, { Component } from 'react'; // @ts-ignore

import hoistStatics from 'hoist-non-react-statics';
import RadioGroupContext from "./RadioGroupContext";
export default function asRadioGroupChild(WrappedComponent) {
  class RadioGroupChild extends Component {
    static propTypes = {
      /**
         * The identifier value of the radio button. must be different than other RadioButtons in the same group
         */
      value: _pt.oneOfType([_pt.string, _pt.number, _pt.bool]),

      /**
         * When using RadioButton without a RadioGroup, use this prop to toggle selection
         */
      selected: _pt.bool
    };

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