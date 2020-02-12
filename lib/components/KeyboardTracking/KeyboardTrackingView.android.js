import React, {PureComponent} from 'react';
import {View} from 'react-native';

export default class KeyboardTrackingView extends PureComponent {
  render() {
    return <View {...this.props}/>;
  }
  async getNativeProps() {
    return {trackingViewHeight: 0, keyboardHeight: 0, contentTopInset: 0};
  }
  scrollToStart() {}
}
