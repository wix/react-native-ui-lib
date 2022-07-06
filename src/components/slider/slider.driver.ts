import {ComponentDriver} from '../../testkit';

export class SliderDriver extends ComponentDriver {
  isDisabled = async () => (await this.getElementProps()).accessibilityStates[0] === 'disabled';
}
