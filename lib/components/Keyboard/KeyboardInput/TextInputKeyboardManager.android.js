import {NativeModules} from 'react-native';

const CustomKeyboardInput = NativeModules.CustomKeyboardInput;

export default class TextInputKeyboardManager {
  static reset = () => CustomKeyboardInput.reset();

  static dismissKeyboard = async () => {
    CustomKeyboardInput.clearFocusedView();
    await TextInputKeyboardManager.reset();
  };
}
