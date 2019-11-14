
import {BaseComponent} from '../commons';
import {ShadowType} from '../style/shadows';

export interface MultipleShadowProps {
  topShadow?: object;
  bottomShadow?: object;
  shadowType?: ShadowType;
  shadowColor?: string;
  borderRadius?: number;
}

export class MultipleShadow extends BaseComponent<MultipleShadowProps> {}
