import { useCallback, useRef } from 'react';
export default ({
  autoDismiss,
  onDismiss
}) => {
  const timer = useRef();
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
  return {
    clearTimer,
    setTimer
  };
};