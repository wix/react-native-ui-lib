import React from 'react';
import {Keyboard, View} from 'react-native';
import KeyboardRegistry from '../KeyboardRegistry';
import CustomKeyboardViewBase, {CustomKeyboardViewBaseProps} from '../CustomKeyboardViewBase';

export default class CustomKeyboardView extends CustomKeyboardViewBase<CustomKeyboardViewBaseProps> {
  static displayName = 'IGNORE';

  async componentDidUpdate(prevProps: CustomKeyboardViewBaseProps) {
    const {component, inputRef, shouldFocus, onKeyboardDismiss} = this.props;

    if (prevProps.component !== component) {
      
      if (!component) {
        if (shouldFocus) {
          if (inputRef?.current) {
            inputRef.current.focus?.();
          } else {
            inputRef?.focus?.();
          }
        }
      } else {
        Keyboard.dismiss();
      }

      onKeyboardDismiss?.();
    }

    super.componentDidUpdate(prevProps);
  }

  getStyle = () => {
    const {keyboardHeight} = this.props;
    return {
      height: keyboardHeight
    };
  };

  render() {
    const {component, initialProps} = this.props;
    const KeyboardComponent = component && KeyboardRegistry.getKeyboard(component);
    if (!KeyboardComponent) {
      return null;
    }
    return (
      <View style={this.getStyle()}>
        <KeyboardComponent {...initialProps}/>
      </View>
    );
  }
}
