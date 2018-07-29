import React, {PureComponent} from 'react';
import {View} from 'react-native';

export default class NonClippingView extends PureComponent {
  render() {
    return <View {...this.props}/>;
  }
}
