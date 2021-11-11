import { default as TextInputKeyboardManagerIOS } from './TextInputKeyboardManager.ios';
import { default as TextInputKeyboardManagerAndroid } from './TextInputKeyboardManager.android';
declare const TextInputKeyboardManager: typeof TextInputKeyboardManagerIOS | typeof TextInputKeyboardManagerAndroid;
export default TextInputKeyboardManager;
