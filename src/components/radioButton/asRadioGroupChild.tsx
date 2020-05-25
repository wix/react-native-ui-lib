import React, {Component} from 'react';
// @ts-ignore
import hoistStatics from 'hoist-non-react-statics';
import RadioGroupContext from './RadioGroupContext';

interface RadioGroupChildPropTypes {
  /**
   * The identifier value of the radio button. must be different than other RadioButtons in the same group
   */
  value?: string | number | boolean;
  /**
   * When using RadioButton without a RadioGroup, use this prop to toggle selection
   */
  selected?: boolean;
}

type PropTypes = RadioGroupChildPropTypes;

export default function asRadioGroupChild(WrappedComponent: React.ComponentType<any>) {
  class RadioGroupChild extends Component<PropTypes> {
    static displayName: string | undefined;

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

  hoistStatics(RadioGroupChild, WrappedComponent);
  RadioGroupChild.displayName = WrappedComponent.displayName;

  return RadioGroupChild as any;
}
