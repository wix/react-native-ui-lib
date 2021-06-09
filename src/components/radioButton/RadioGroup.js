import _pt from "prop-types";
import _ from 'lodash';
import React, { PureComponent } from 'react';
import { asBaseComponent, forwardRef } from "../../commons/new";
import View from "../view";
import RadioGroupContext from "./RadioGroupContext";

/**
 * @description: Wrap a group of Radio Buttons to automatically control their selection
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Default.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Alignment.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Custom.gif?raw=true
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Individual.png?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/RadioButtonScreen.js
 */
class RadioGroup extends PureComponent {
  static propTypes = {
    /**
       * The initial value of the selected radio button
       */
    initialValue: _pt.oneOfType([_pt.string, _pt.number, _pt.bool]),

    /**
       * Invoked once when value changes, by selecting one of the radio buttons in the group
       */
    onValueChange: _pt.oneOfType([_pt.func, _pt.func, _pt.func, _pt.func])
  };
  static displayName = 'RadioGroup';

  constructor(props) {
    super(props);
    this.state = {
      initialValue: props.initialValue,
      value: props.initialValue
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    if (state.initialValue !== props.initialValue) {
      return {
        initialValue: props.initialValue,
        value: props.initialValue
      };
    }

    return null;
  };

  getContextProviderValue() {
    const {
      value
    } = this.state;
    return {
      value,
      onValueChange: this.onValueChange
    };
  }

  onValueChange = value => {
    this.setState({
      value
    });

    _.invoke(this.props, 'onValueChange', value);
  };

  render() {
    return <View {...this.props}>
        <RadioGroupContext.Provider value={this.getContextProviderValue()}>
          {this.props.children}
        </RadioGroupContext.Provider>
      </View>;
  }

}

export { RadioGroup }; // For tests

export default asBaseComponent(forwardRef(RadioGroup));