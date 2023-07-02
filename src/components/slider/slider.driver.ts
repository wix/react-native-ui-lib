import {SliderProps} from './index';
import {ComponentDriver} from '../../testkit';

export class SliderDriver extends ComponentDriver<SliderProps> {
  isDisabled = async () => (await this.getElementProps()).accessibilityState?.disabled === true;
}
