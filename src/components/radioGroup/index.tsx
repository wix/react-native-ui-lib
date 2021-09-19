import React, {PureComponent, GetDerivedStateFromProps} from 'react';
import {
  asBaseComponent,
  forwardRef,
  BaseComponentInjectedProps,
  ForwardRefInjectedProps
} from '../../commons/new';
import View, {ViewProps} from '../view';
import RadioGroupContext from './RadioGroupContext';

export type RadioGroupProps = ViewProps & {
  /**
   * The initial value of the selected radio button
   */
  initialValue?: string | number | boolean;
  /**
   * Invoked once when value changes, by selecting one of the radio buttons in the group
   */
  onValueChange?: ((value?: string) => void) | ((value?: number) => void) | ((value?: boolean) => void) | ((value?: any) => void);
};

interface RadioGroupState {
  initialValue?: RadioGroupProps['initialValue'];
  value?: RadioGroupProps['initialValue'];
}

type Props = RadioGroupProps &
  BaseComponentInjectedProps &
  ForwardRefInjectedProps;

/**
 * @description: Wrap a group of Radio Buttons to automatically control their selection
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Default.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Alignment.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Custom.gif?raw=true
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Individual.png?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/RadioButtonScreen.js
 */
class RadioGroup extends PureComponent<Props, RadioGroupState> {
  static displayName = 'RadioGroup';

  constructor(props: Props) {
    super(props);

    this.state = {
      initialValue: props.initialValue,
      value: props.initialValue
    };
  }

  static getDerivedStateFromProps: GetDerivedStateFromProps<Props, RadioGroupState> = (props, state) => {
    if (state.initialValue !== props.initialValue) {
      return {
        initialValue: props.initialValue,
        value: props.initialValue
      };
    }

    return null;
  }

  getContextProviderValue() {
    const {value} = this.state;
    return {value, onValueChange: this.onValueChange};
  }

  onValueChange = (value: RadioGroupProps['initialValue']) => {
    this.setState({value});
    this.props.onValueChange?.(value);
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

export default asBaseComponent<RadioGroupProps>(forwardRef(RadioGroup));
