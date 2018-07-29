import React, {PureComponent} from 'react';
import {View, requireNativeComponent} from 'react-native';

const RNNonClippingView = requireNativeComponent('RNNonClippingView', {
  name: 'RNNonClippingView',
  propTypes: {
    ...View.propTypes,
  },
});

export default class NonClippingView extends PureComponent {
  render() {
    return <RNNonClippingView {...this.props}/>;
  }
}
