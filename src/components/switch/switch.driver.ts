import {ComponentDriver} from '../../testkit';

export class SwitchDriver extends ComponentDriver {
  getAccessibilityValue = async () => (await this.getElementProps()).accessibilityValue.text === '1';

  isDisabled = async () => (await this.getElementProps()).accessibilityState.disabled === true;

  isChecked = async () => (await this.getElementProps()).accessibilityState.checked === 'checked';

  getColor = async () => (await this.getElementProps()).style.backgroundColor;
}
