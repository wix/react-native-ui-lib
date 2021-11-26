import { ToastProps } from '../types';
declare const _default: ({ autoDismiss, onDismiss }: Pick<ToastProps, 'autoDismiss' | 'onDismiss'>) => {
    clearTimer: () => void;
    setDismissTimer: () => void;
};
export default _default;
