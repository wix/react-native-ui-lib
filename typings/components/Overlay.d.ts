
import {PureBaseComponent} from '../commons';

export type OverlayType = 'vertical' | 'top' | 'bottom' | 'solid';
export interface OverlayProps {
  type?: OverlayType;
}

export class Overlay extends PureBaseComponent<OverlayProps> {}
