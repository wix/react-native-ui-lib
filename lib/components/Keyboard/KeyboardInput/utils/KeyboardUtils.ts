import {Keyboard} from 'react-native';
import TextInputKeyboardManager from '../TextInputKeyboardManager';

/**
 * @description: util for managing the keyboard.
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/nativeComponentScreens/keyboardInput/KeyboardInputViewScreen.js
 */
export default class KeyboardUtils {
  static displayName = 'KeyboardUtils';
  /**
   * Used to dismiss (close) the keyboard.
   */
  static dismiss = () => {
    Keyboard.dismiss();
    TextInputKeyboardManager.dismissKeyboard();
  };
}
