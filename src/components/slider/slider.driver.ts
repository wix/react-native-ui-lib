import {SliderProps} from './types';
import {ComponentDriver} from '../../testkit/Component.driver';

export class SliderDriver extends ComponentDriver<SliderProps> {
  isDisabled = async () => (await this.getElementProps()).accessibilityState?.disabled === true;
}
