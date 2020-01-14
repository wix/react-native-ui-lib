import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import KeyboardAwareBase from './KeyboardAwareBase';

export default class KeyboardAwareScrollView extends KeyboardAwareBase {
  static displayName = 'KeyboardAwareScrollView';

  static PropTypes = {
    getTextInputRefs: PropTypes.func,
    onScroll: PropTypes.func
  };

  static defaultProps = {
    ...KeyboardAwareBase.defaultProps,
    getTextInputRefs: () => {
      return [];
    }
  }

  render() {
    return (
      <ScrollView
        {...this.props}
        {...this.style}
        contentInset={{bottom: this.state.keyboardHeight}}
        ref={r => {
          this._keyboardAwareView = r;
        }}
        onLayout={layoutEvent => {
          this._onKeyboardAwareViewLayout(layoutEvent.nativeEvent.layout);
        }}
        onScroll={event => {
          this._onKeyboardAwareViewScroll(event.nativeEvent.contentOffset);
          if (this.props.onScroll) {
            this.props.onScroll(event);
          }
        }}
        onContentSizeChange={() => {
          this._updateKeyboardAwareViewContentSize();
        }}
        scrollEventThrottle={200}
      />
    );
  }
}
