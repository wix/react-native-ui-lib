import {NativeModules} from 'react-native';

const CustomKeyboardInput = NativeModules.CustomKeyboardInput;

export default class TextInputKeyboardManagerAndroid {
  static reset = () => CustomKeyboardInput.reset();

  static dismissKeyboard = async () => {
    CustomKeyboardInput.clearFocusedView();
    await TextInputKeyboardManagerAndroid.reset();
  };
}
