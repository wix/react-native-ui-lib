import React, {Component} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import _ from 'lodash';
import SliderContext from './SliderContext';
import {Colors} from '../../../style';
import View from '../../view';

interface SliderGroupProps {
  color: string;
  onValueChange: (color: string) => void;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

interface SliderGroupState {
  value: tinycolor.ColorFormats.HSLA;
}

export default class SliderGroup extends Component<SliderGroupProps, SliderGroupState> {
  static displayName = 'IGNORE';

  constructor(props: SliderGroupProps) {
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

  setValue = (value: tinycolor.ColorFormats.HSLA) => {
    this.setState({value});
    _.invoke(this.props, 'onValueChange', Colors.getHexString(value));
  };

  render() {
    return (
      <View {...this.props}>
        <SliderContext.Provider value={this.getContextProviderValue()}>{this.props.children}</SliderContext.Provider>
      </View>
    );
  }
}
