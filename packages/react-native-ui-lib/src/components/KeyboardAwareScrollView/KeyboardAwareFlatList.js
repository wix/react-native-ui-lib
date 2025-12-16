import React from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import KeyboardAwareBase from './KeyboardAwareBase';

/**
 * @description: A wrapper component which handles the FlatList insets properly when the keyboard is shown and hides the content, scrolling content above the keybaord.
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/KeyboardAwareScrollViewScreen.js
 */
export default class KeyboardAwareFlatList extends KeyboardAwareBase {
  static displayName = 'KeyboardAwareFlatList';

  static PropTypes = {
    getTextInputRefs: PropTypes.func,
    onScroll: PropTypes.func
  };

  static defaultProps = {
    ...KeyboardAwareBase.defaultProps,
    getTextInputRefs: () => {
      return [];
    }
  };

  render() {
    return (
      <FlatList
        scrollEventThrottle={200}
        {...this.props}
        {...this.style}
        contentInset={{bottom: this.state.keyboardHeight}}
        ref={(r) => {
          this._keyboardAwareView = r;
        }}
        onLayout={this._onKeyboardAwareViewLayout}
        onScroll={this._onKeyboardAwareViewScroll}
        onContentSizeChange={this._updateKeyboardAwareViewContentSize}
        removeClippedSubviews={false}
      />
    );
  }
}
