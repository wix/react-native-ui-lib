import React, {PureComponent} from 'react';
import {View} from 'react-native';

class KeyboardTrackingView extends PureComponent {
  static displayName = 'IGNORE';
  render() {
    return <View {...this.props}/>;
  }
  async getNativeProps() {
    return {trackingViewHeight: 0, keyboardHeight: 0, contentTopInset: 0};
  }
  scrollToStart() {}
}

export default KeyboardTrackingView;
