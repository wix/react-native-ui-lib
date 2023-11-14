import {NumberInputProps} from './index';
import {ComponentDriver, ComponentDriverArgs} from '../../testkit/Component.driver';
import {TextFieldDriver} from '../textField/TextField.driver';

export class NumberInputDriver extends ComponentDriver<NumberInputProps> {
  private readonly maskedInputDriver: TextFieldDriver;
  private readonly visualTextFieldDriver: TextFieldDriver;

  constructor(componentDriverArgs: ComponentDriverArgs) {
    super(componentDriverArgs);

    this.maskedInputDriver = new TextFieldDriver({...componentDriverArgs, testID: `${this.testID}`});
    this.visualTextFieldDriver = new TextFieldDriver({...componentDriverArgs, testID: `${this.testID}.visual`});
  }

  changeText = async (text: string) => {
    await this.maskedInputDriver.changeText(text);
  };

  getText = async () => {
    return await this.visualTextFieldDriver.getText();
  };
}
