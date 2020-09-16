import _ from 'lodash';
import React, {PureComponent, GetDerivedStateFromProps} from 'react';
import {
  asBaseComponent,
  forwardRef,
  BaseComponentInjectedProps,
  ForwardRefInjectedProps
} from '../../commons/new';
import View from '../view';
import RadioGroupContext from './RadioGroupContext';

export type RadioGroupPropTypes = {
  /**
   * The initial value of the selected radio button
   */
  initialValue?: string | number | boolean;
  /**
   * Invoked once when value changes, by selecting one of the radio buttons in the group
   */
  onValueChange?: (value: string | number | boolean) => void;
};

interface RadioGroupState {
  value?: RadioGroupPropTypes['initialValue'];
}

type Props = RadioGroupPropTypes &
  BaseComponentInjectedProps &
  ForwardRefInjectedProps;

/**
 * Wrap a group of Radio Buttons to automatically control their selection
 */
class RadioGroup extends PureComponent<Props, RadioGroupState> {
  static displayName = 'RadioGroup';

  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.initialValue
    };
  }

  static getUpdatedState = (
    nextProps: Props,
    prevState: RadioGroupState
  ): RadioGroupState | null => {
    const {value} = prevState;
    const {initialValue} = nextProps;
    
    if (_.isUndefined(nextProps.initialValue) || value === initialValue) {
      return null;
    }

    return {
      value: initialValue
    }
  };

  static getDerivedStateFromProps: GetDerivedStateFromProps<Props, RadioGroupState> = (props, state) => {
    return RadioGroup.getUpdatedState(props, state);
  }

  getContextProviderValue() {
    const {value} = this.state;
    return {value, onValueChange: this.onValueChange};
  }

  onValueChange = (value: RadioGroupPropTypes['initialValue']) => {
    this.setState({value});
    _.invoke(this.props, 'onValueChange', value);
  };

  render() {
    return (
      <View {...this.props}>
        <RadioGroupContext.Provider value={this.getContextProviderValue()}>
          {this.props.children}
        </RadioGroupContext.Provider>
      </View>
    );
  }
}

export {RadioGroup}; // For tests

export default asBaseComponent(forwardRef(RadioGroup));
