import {useCallback, useEffect, useState} from 'react';
import {Keyboard, KeyboardEvent, Platform} from 'react-native';
import TextInputKeyboardManager from '../TextInputKeyboardManager';

const IS_IOS = Platform.OS === 'ios';
const DEFAULT_KEYBOARD_HEIGHT = IS_IOS ? 216 : 312; // TODO: verify this value for iOS

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

const useKeyboardHeight = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(DEFAULT_KEYBOARD_HEIGHT);
  const [isVisible, setIsVisible] = useState(false);

  const keyboardDidShow = useCallback((e: KeyboardEvent) => {
    if (!isInitialized) {
      setIsInitialized(true);
      setKeyboardHeight(e.endCoordinates.height);
    }
    setIsVisible(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const keyboardDidHide = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {keyboardHeight, isKeyboardVisible: isVisible};
};

export interface KeyboardHeightListenerProps {
  onKeyboardHeightChange?: (height: number) => void;
  onKeyboardVisibilityChange?: (isKeyboardVisible: boolean) => void;
}

const KeyboardHeightListener = ({onKeyboardHeightChange, onKeyboardVisibilityChange}: KeyboardHeightListenerProps) => {
  const {keyboardHeight, isKeyboardVisible} = useKeyboardHeight();

  useEffect(() => {
    onKeyboardHeightChange?.(keyboardHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyboardHeight]);

  useEffect(() => {
    onKeyboardVisibilityChange?.(isKeyboardVisible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isKeyboardVisible]);

  return null;
};

export {useKeyboardHeight, KeyboardHeightListener};
