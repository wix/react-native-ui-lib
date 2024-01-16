import {SwitchProps} from './index';
import {ComponentDriver} from '../../testkit/Component.driver';

export class SwitchDriver extends ComponentDriver<SwitchProps> {
  getAccessibilityValue = async () => (await this.getElementProps()).accessibilityValue?.text === '1';

  isDisabled = async () => (await this.getElementProps()).accessibilityState?.disabled === true;

  isChecked = async () => (await this.getElementProps()).accessibilityValue?.text === '1';

  // @ts-ignore
  getColor = async () => (await this.getElementProps()).style.backgroundColor;
}
