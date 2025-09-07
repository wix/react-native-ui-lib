import { TextFieldDriver } from "../textField/TextField.driver.new";
export const NumberInputDriver = props => {
  const maskedInputDriver = TextFieldDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}`
  });
  const textFieldDriver = TextFieldDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.visual`
  });
  const exists = () => {
    return maskedInputDriver.exists();
  };
  const changeText = async text => {
    await maskedInputDriver.changeText(text);
  };
  const getValue = () => {
    return textFieldDriver.getValue();
  };
  return {
    exists,
    changeText,
    getValue
  };
};