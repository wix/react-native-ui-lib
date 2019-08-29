import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Colors, View} from 'react-native-ui-lib';
import SliderContext from './SliderContext';


export default class SliderGroup extends Component {
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

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.color !== Colors.getHexString(prevState.value)) {
  //     return {value: Colors.getHSL(nextProps.color)};
  //   }
  //   return null;
  // }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.color !== Colors.getHexString(this.state.value)) {
      return {value: Colors.getHSL(nextProps.color)};
    }
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
