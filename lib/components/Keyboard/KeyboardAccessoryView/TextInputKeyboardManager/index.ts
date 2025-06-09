import {Platform} from 'react-native';
import {default as TextInputKeyboardManagerIOS} from './TextInputKeyboardManager.ios';
import {default as TextInputKeyboardManagerAndroid} from './TextInputKeyboardManager.android';

const IsAndroid = Platform.OS === 'android';

const TextInputKeyboardManager = IsAndroid ? TextInputKeyboardManagerAndroid : TextInputKeyboardManagerIOS;

export default TextInputKeyboardManager;
