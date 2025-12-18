import {ComponentProps} from '../../testkit/new/Component.driver';
import {TextFieldDriver} from '../textField/TextField.driver.new';

export const NumberInputDriver = (props: ComponentProps) => {
  const maskedInputDriver = TextFieldDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}`
  });

  const textFieldDriver = TextFieldDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.visual`
  });
  
  const exists = (): boolean => {
    return maskedInputDriver.exists();
  };

  const changeText = async (text: string) => {
    await maskedInputDriver.changeText(text);
  };

  const getValue = (): string | undefined => {
    return textFieldDriver.getValue();
  };

  return {
    exists,
    changeText,
    getValue
  };
};
