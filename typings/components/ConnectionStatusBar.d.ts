
import {PureBaseComponent} from '../commons';

export interface ConnectionStatusBarProps {
  label?: string;
  onConnectionChange?: (isConnected: boolean, isInitial: boolean) => void;
  allowDismiss?: boolean;
  useAbsolutePosition?: boolean;
}

export class ConnectionStatusBar extends PureBaseComponent<ConnectionStatusBarProps> {}
