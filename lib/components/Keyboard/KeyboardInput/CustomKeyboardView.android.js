import React from 'react';
import PropTypes from 'prop-types';
import {requireNativeComponent} from 'react-native';
import TextInputKeyboardManager from './TextInputKeyboardManager';
import KeyboardRegistry from './KeyboardRegistry';
import CustomKeyboardViewBase from './CustomKeyboardViewBase';

const CustomKeyboardViewNativeAndroid = requireNativeComponent('CustomKeyboardViewNative');

export default class CustomKeyboardView extends CustomKeyboardViewBase {
  static propTypes = {
    initialProps: PropTypes.object,
    component: PropTypes.string,
    onItemSelected: PropTypes.func
  };

  async UNSAFE_componentWillReceiveProps(nextProps) {
    const {component} = nextProps;

    if (this.props.component !== component && !component) {
      await TextInputKeyboardManager.reset();
    }

    await super.UNSAFE_componentWillReceiveProps(nextProps);
  }

  render() {
    const {component, initialProps} = this.props;
    const KeyboardComponent = component && KeyboardRegistry.getKeyboard(component);
    return (
      <CustomKeyboardViewNativeAndroid>
        {KeyboardComponent && <KeyboardComponent {...initialProps}/>}
      </CustomKeyboardViewNativeAndroid>
    );
  }
}
