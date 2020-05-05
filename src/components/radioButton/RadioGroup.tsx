import _ from 'lodash';
import React, {PureComponent} from 'react';
import {asBaseComponent, forwardRef, BaseComponentInjectedProps, ForwardRefInjectedProps} from '../../commons/new';
import View from '../view';
import {RadioGroupPropTypes, RadioGroupState, RadioGroupContextPropTypes} from './types';

export const RadioGroupContext = React.createContext<RadioGroupContextPropTypes>({
  value: undefined,
  onValueChange: undefined
});

type Props = RadioGroupPropTypes & BaseComponentInjectedProps & ForwardRefInjectedProps;

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

  UNSAFE_componentWillReceiveProps(nextProps: RadioGroupPropTypes) {
    if (this.props.initialValue !== nextProps.initialValue) {
      this.setState({value: nextProps.initialValue});
    }
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

export default asBaseComponent<RadioGroupPropTypes>(forwardRef(RadioGroup));
