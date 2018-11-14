// TODO: update usage of React Context API to latest (https://reactjs.org/docs/context.html)
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import View from '../view';

/**
 * Wrap a group of Radio Buttons to automatically control their selection
 */
class RadioGroup extends BaseComponent {
  static displayName = 'RadioGroup';

  static propTypes = {
    /**
     * The value of the selected radio button
     */
    value: PropTypes.string,
    /**
     * Invoked once when value changes, by selecting one of the radio buttons in the group
     */
    onValueChange: PropTypes.func,
  };

  static childContextTypes = {
    value: PropTypes.string,
    onValueChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) { //eslint-disable-line
    if (this.props.value !== nextProps.value) {
      this.setState({value: nextProps.value});
    }
  }

  getChildContext() {
    const {value} = this.state;
    return {value, onValueChange: this.onValueChange};
  }

  onValueChange = (value) => {
    this.setState({value});
    _.invoke(this.props, 'onValueChange', value);
  };

  state = {};

  render() {
    return <View {...this.props}>{this.props.children}</View>;
  }
}

export default RadioGroup;
