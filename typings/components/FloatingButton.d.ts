
import {ButtonProps} from './Button';
import {BaseComponent} from '../commons';

export interface FloatingButtonProps {
  visible?: boolean;
  button?: ButtonProps;
  secondaryButton?: ButtonProps;
  bottomMargin?: number;
  duration?: number;
  withoutAnimation?: boolean;
}

export class FloatingButton extends BaseComponent<FloatingButtonProps> {}
