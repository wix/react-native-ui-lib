import {useCallback, useRef} from 'react';
import {ToastProps} from '../types';

export default ({autoDismiss, onDismiss}: Pick<ToastProps, 'autoDismiss' | 'onDismiss'>) => {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const clearTimer = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = undefined;
    }
  }, []);

  const setTimer = () => {
    if (autoDismiss && onDismiss) {
      timer.current = setTimeout(onDismiss, autoDismiss);
    }
  };

  return {clearTimer, setTimer};
};
