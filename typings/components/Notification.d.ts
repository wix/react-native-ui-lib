import {BaseComponent} from '../commons';
import {ToastProps} from './Toast';

export interface NotificationProps extends ToastProps {}

export class Notification extends BaseComponent<NotificationProps> {}
