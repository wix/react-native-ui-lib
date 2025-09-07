import { ComponentDriver } from "../../testkit/Component.driver";
import { RadioButtonDriver } from "../radioButton/RadioButton.driver";
export class RadioGroupDriver extends ComponentDriver {
  constructor(radioGroupDriverArgs) {
    super({
      ...radioGroupDriverArgs
    });
    this.radioButtonDrivers = {};
    Object.values(radioGroupDriverArgs.testIDs).forEach(radioButtonTestId => this.radioButtonDrivers[radioButtonTestId] = new RadioButtonDriver({
      ...radioGroupDriverArgs,
      testID: radioButtonTestId
    }));
  }
  pressOn = async radioButtonTestId => this.radioButtonDrivers[radioButtonTestId].press();
}