import {useCallback, useEffect, useState} from 'react';
import {Keyboard, KeyboardEvent, Platform} from 'react-native';
import TextInputKeyboardManager from '../TextInputKeyboardManager';

const IS_IOS = Platform.OS === 'ios';
const DEFAULT_KEYBOARD_HEIGHT = IS_IOS ? 216 : 312; // TODO: verify this value for iOS

export default class KeyboardUtils {
  static displayName = 'KeyboardUtils';
  private static listeners: {[key: string]: () => void} = {};

  private static addListener = (id: string, onDismiss?: () => void) => {
    if (id && onDismiss && !KeyboardUtils.listeners[id]) {
      KeyboardUtils.listeners[id] = onDismiss;
    }
  };

  private static removeListener = (id: string) => {
    if (id && KeyboardUtils.listeners[id]) {
      delete KeyboardUtils.listeners[id];
    }
  };

  /**
   * Used to dismiss (close) the keyboard.
   */
  static dismiss = () => {
    Keyboard.dismiss();
    TextInputKeyboardManager.dismissKeyboard();
    Object.keys(KeyboardUtils.listeners).forEach(key => {
      KeyboardUtils.listeners[key]();
    });
  };
}

interface KeyboardHeightProps {
  id: string;
  onDismiss: () => void;
}

const useKeyboardHeight = ({id, onDismiss}: KeyboardHeightProps) => {
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
    // @ts-ignore
    KeyboardUtils.addListener(id, onDismiss);
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      // @ts-ignore
      KeyboardUtils.removeListener(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {keyboardHeight, isKeyboardVisible: isVisible};
};

export interface KeyboardHeightListenerProps {
  id: string;
  onDismiss: () => void;
  onKeyboardHeightChange?: (height: number) => void;
  onKeyboardVisibilityChange?: (isKeyboardVisible: boolean) => void;
}

const KeyboardHeightListener = ({
  id,
  onDismiss,
  onKeyboardHeightChange,
  onKeyboardVisibilityChange
}: KeyboardHeightListenerProps) => {
  const {keyboardHeight, isKeyboardVisible} = useKeyboardHeight({id, onDismiss});

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
