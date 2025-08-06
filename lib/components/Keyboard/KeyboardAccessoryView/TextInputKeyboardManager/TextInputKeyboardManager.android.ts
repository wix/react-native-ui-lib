import {NativeModules} from 'react-native';

const CustomKeyboardInput = NativeModules.CustomKeyboardInputTemp;

export default class TextInputKeyboardManager {
  static reset = () => CustomKeyboardInput.reset();

  static dismissKeyboard = async () => {
    CustomKeyboardInput.clearFocusedView();
    await TextInputKeyboardManager.reset();
  };
}
