import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

/**
 * Hook that tracks keyboard height and provides real-time updates
 */
const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return keyboardHeight;
};
export default useKeyboardHeight;