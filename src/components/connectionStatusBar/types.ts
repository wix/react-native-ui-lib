export type ConnectionStatusBarProps = {
  /**
   * Text to show as the status
   */
  label?: string;
  /**
   * Handler to get connection change events propagation
   */
  onConnectionChange?: (isConnected: boolean, isInitial: boolean) => void;
  /**
   * Text to show as the status
   */
  allowDismiss?: boolean;
  /**
   * Use absolute position for the component
   */
  useAbsolutePosition?: boolean;
};

export type ConnectionStatusBarState = {
  /* Current connection type  */
  type?: string;
  isConnected: boolean;
  isCancelled: boolean;
};

export const DEFAULT_PROPS = {
  label: 'No internet. Check your connection.',
  allowDismiss: false,
  useAbsolutePosition: true
};
