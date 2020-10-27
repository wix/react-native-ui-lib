import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import KeyboardAwareBase from './KeyboardAwareBase';
import {LogService} from '../../services';

export default class KeyboardAwareListView extends KeyboardAwareBase {
  static displayName = 'IGNORE';

  static propTypes = {
    onScroll: PropTypes.func
  };

  static defaultProps = {
    ...KeyboardAwareBase.defaultProps
  };

  constructor(props) {
    super(props);
    LogService.warn(
      'uilib: Please stop Using KeyboardAwareListView, use either KeyboardAwareScrollView or KeyboardAwareFlatList'
    );
  }

  render() {
    const initialOpacity = this.props.startScrolledToBottom ? 0 : 1;
    return (
      <ScrollView
        scrollEventThrottle={200}
        {...this.props}
        {...this.style}
        opacity={initialOpacity}
        contentInset={{bottom: this.state.keyboardHeight}}
        ref={r => {
          this._keyboardAwareView = r;
        }}
        onLayout={this._onKeyboardAwareViewLayout}
        onScroll={this._onKeyboardAwareViewScroll}
        onContentSizeChange={this._updateKeyboardAwareViewContentSize}
      />
    );
  }
}
