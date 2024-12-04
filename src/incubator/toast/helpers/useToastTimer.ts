import clamp from 'lodash/clamp';
import {useCallback, useRef} from 'react';
import {ToastProps} from '../types';

const getDefaultAutoDismiss = (message: string) => {
  const wordsCount = message.split(' ').length + 1;
  return clamp((wordsCount / 2) * 1000, 3000, 7000);
};

export default ({autoDismiss, onDismiss, message}: Pick<ToastProps, 'autoDismiss' | 'onDismiss' | 'message'>) => {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const clearTimer = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = undefined;
    }
  }, []);

  const setTimer = () => {
    if (autoDismiss && onDismiss) {
      const timeout = (autoDismiss === true) ? getDefaultAutoDismiss(message || '') : autoDismiss;
      timer.current = setTimeout(onDismiss, timeout);
    }
  };

  return {clearTimer, setTimer};
};
