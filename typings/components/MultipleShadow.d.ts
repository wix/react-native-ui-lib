
import {BaseComponent} from '../commons';
import {ShadowName} from '../style/shadows';

export interface MultipleShadowProps {
  topShadow?: object;
  bottomShadow?: object;
  shadowType?: ShadowName;
  shadowColor?: string;
  borderRadius?: number;
}

export class MultipleShadow extends BaseComponent<MultipleShadowProps> {}
