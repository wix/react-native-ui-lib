import {Keyboard, Platform} from 'react-native';
import TextInputKeyboardMangerIOS from '../TextInputKeyboardMangerIOS';
import TextInputKeyboardManagerAndroid from '../TextInputKeyboardManagerAndroid';

const IsIOS = Platform.OS === 'ios';

export default class KeyboardUtils {
  static dismiss = () => {
    Keyboard.dismiss();
    if (IsIOS) {
      TextInputKeyboardMangerIOS.dismissKeyboard();
    } else {
      TextInputKeyboardManagerAndroid.dismissKeyboard();
    }
  };
}
