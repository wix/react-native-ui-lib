import { ComponentDriver } from "../../testkit/Component.driver";
export class SliderDriver extends ComponentDriver {
  isDisabled = async () => (await this.getElementProps()).accessibilityState?.disabled === true;
}