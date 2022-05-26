import _ from 'lodash';
import {ComponentDriver, ComponentDriverArgs} from '../../testkit/Component.driver';
import {TextDriver} from '../../components/text/Text.driver';


export class TextFieldDriver extends ComponentDriver {
  private readonly labelDriver: TextDriver;
  private readonly validationMsgDriver: TextDriver;
  private readonly floatingPlaceholderDriver: TextDriver;
  private readonly charCounterDriver: TextDriver;

  constructor(componentDriverArgs: ComponentDriverArgs) {
    super(componentDriverArgs);

    this.labelDriver = new TextDriver({...componentDriverArgs, testID: `${this.testID}.label`});
    this.validationMsgDriver = new TextDriver({...componentDriverArgs, testID: `${this.testID}.validationMessage`});
    this.floatingPlaceholderDriver = new TextDriver({...componentDriverArgs, testID: `${this.testID}.floatingPlaceholder`});
    this.charCounterDriver = new TextDriver({...componentDriverArgs, testID: `${this.testID}.charCounter`});
  }

  getContent = async () => {
    if (await this.exists()) {
      return _.get(await this.getElement(), 'props.value');
    } else {
      console.warn(`TextField component with testId:${this.testID}, is not found. So you can't get the content`);
      return null;
    }
  }

  isDisabled = async () => {
    if (await this.exists()) {
      return (await this.getElementProps()).accessibilityState.disabled;
    } else {
      console.warn(`TextField component with testId:${this.testID}, is not found. So you can't get the content`);
      return null;
    }
  }

  changeText = async (text: string) => (await this.uniDriver.selectorByTestId(this.testID)).typeText(text);

  getPlaceholderContent = async () => {
    if (await this.isPlaceholderVisible()) {
      return (await this.getElementProps()).placeholder;
    } else {
      console.warn(`TextField component with testId:${this.testID}, is not found. So you can't get the placeholder`);
      return null;
    }
  }

  isPlaceholderVisible = async () => {
    if (await this.exists()) {
      const hasPlaceholderProp = !!(await this.getElementProps()).placeholder;
      const hasInputText = !!await this.getContent();
      return hasPlaceholderProp && (!hasInputText || (hasInputText && await this.floatingPlaceholderDriver.exists()));
    } else {
      console.warn(`TextField component with testId:${this.testID}, is not found.`);
    }
  }

  isPressable = async () => {
    if (await this.exists()) {
      return typeof (await this.getElementProps()).onPress === 'function';
    } else {
      console.warn(`TextDriver: cannot click because testID:${this.testID} were not found`);
      return null;
    }
  }

  // label
  getLabelElement = () => this.labelDriver.getElement();
  isLabelExists = async () =>
    (await this.labelDriver.exists()) &&
    !(await this.floatingPlaceholderDriver.exists());
  getLabelContent = () => this.labelDriver.getTextContent();
  // validation message
  getValidationMsgRootElement = () => this.validationMsgDriver.getElement();
  isValidationMsgExists = async () =>
    (await this.validationMsgDriver.exists()) &&
    !_.isEmpty(await this.validationMsgDriver.getTextContent());
  getValidationMsgContent = () => this.validationMsgDriver.getTextContent();
  // char counter
  getCharCounterRootElement = () => this.charCounterDriver.getElement();
  isCharCounterExists = () => this.charCounterDriver.exists();
  getCharCounterContent = () => this.charCounterDriver.getTextContent();
}
