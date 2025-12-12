import {RadioGroupProps} from './index';
import {ComponentDriver, ComponentDriverArgs} from '../../testkit/Component.driver';
import {RadioButtonDriver} from '../radioButton/RadioButton.driver';

type RadioGroupDriverArgs = ComponentDriverArgs & {testIDs: {[key: string]: string}}

export class RadioGroupDriver extends ComponentDriver<RadioGroupProps> {
  private readonly radioButtonDrivers: {[key: string]: RadioButtonDriver};
  constructor(radioGroupDriverArgs: RadioGroupDriverArgs) {
    super({...radioGroupDriverArgs});

    this.radioButtonDrivers = {};
    Object.values(radioGroupDriverArgs.testIDs).forEach((radioButtonTestId: string) =>
      this.radioButtonDrivers[radioButtonTestId] =
        new RadioButtonDriver({...radioGroupDriverArgs, testID: radioButtonTestId}));
  }

  pressOn = async (radioButtonTestId: string) =>
    this.radioButtonDrivers[radioButtonTestId].press();
}
