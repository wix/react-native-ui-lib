import {useEffect, useRef, useState} from 'react';
import {Keyboard, KeyboardEvent} from 'react-native';

/**
 * Hook that tracks keyboard height and provides real-time updates
 */
const useKeyboardHeight = (): number => {
  const keyboardDidHideListener = useRef<any>();
  const keyboardDidShowListener = useRef<any>();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    keyboardDidHideListener.current = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    keyboardDidShowListener.current = Keyboard.addListener('keyboardDidShow', (e: KeyboardEvent) => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    return () => {
      keyboardDidHideListener.current?.remove();
      keyboardDidShowListener.current?.remove();
    };
  }, []);

  return keyboardHeight;
};

export default useKeyboardHeight;
