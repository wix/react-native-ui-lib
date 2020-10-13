import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import SliderContext from './SliderContext';
import {Colors} from '../../../style';
import View from '../../view';


export default class SliderGroup extends Component {
  static displayName = 'IGNORE';
  static propTypes = {
    color: PropTypes.string,
    onValueChange: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      value: Colors.getHSL(props.color)
    };
  }

  getContextProviderValue() {
    return {
      value: this.state.value,
      setValue: this.setValue
    };
  }

  setValue = (value) => {
    this.setState({value});
    _.invoke(this.props, 'onValueChange', Colors.getHexString(value));
  }

  render() {
    return (
      <View {...this.props}>
        <SliderContext.Provider value={this.getContextProviderValue()}>
          {this.props.children}
        </SliderContext.Provider>
      </View>
    );
  }
}
