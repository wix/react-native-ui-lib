import _ from 'lodash';
import React, {PureComponent} from 'react';
import {asBaseComponent, forwardRef, BaseComponentInjectedProps, ForwardRefInjectedProps} from '../../commons/new';
import View from '../view';
import RadioGroupContext from './RadioGroupContext';

interface RadioGroupPropTypes {
  /**
   * The initial value of the selected radio button
   */
  initialValue?: string | number | boolean;
  /**
   * Invoked once when value changes, by selecting one of the radio buttons in the group
   */
  onValueChange?: (value: string | number | boolean) => void;
}

interface RadioGroupState {
  value?: RadioGroupPropTypes['initialValue'];
}

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
