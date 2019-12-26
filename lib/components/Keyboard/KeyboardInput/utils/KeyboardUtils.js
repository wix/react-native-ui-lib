import {Keyboard} from 'react-native';
import TextInputKeyboardManager from '../TextInputKeyboardManager';

export default class KeyboardUtils {
  static dismiss = () => {
    Keyboard.dismiss();
    TextInputKeyboardManager.dismissKeyboard();
  };
}
