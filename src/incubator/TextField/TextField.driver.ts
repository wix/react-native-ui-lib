import {fireEvent, RenderAPI} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';
import TextDriver from '../../components/text/Text.driver';
import _ from 'lodash';

const TextFieldDriverFactory = async ({wrapperComponent, testID}: {wrapperComponent: RenderAPI, testID: string}) => {
  const textInput: ReactTestInstance | null = await wrapperComponent.queryByTestId(testID);
  const label = await TextDriver({wrapperComponent, testID: `${testID}.label`});
  const validationMsg = await TextDriver({wrapperComponent, testID: `${testID}.validationMessage`});
  const floatingPlaceholder = await TextDriver({wrapperComponent, testID: `${testID}.floatingPlaceholder`});
  const charCounter = await TextDriver({wrapperComponent, testID: `${testID}.charCounter`});
  function isPlaceholderVisible() {
    if (textInput) {
      const hasPlaceholderProp = !!_.get(textInput, 'props.placeholder');
      const hasInputText = !!_.get(textInput, 'props.value');
      return hasPlaceholderProp && (!hasInputText || (hasInputText && floatingPlaceholder.exists()));
    } else {
      console.warn(`TextField component with testId:${testID}, is not found. So you can't get his placeholder`);
    }
  }
  return {
    exists: () => !!textInput,
    getRootElement: () => textInput,
    content: () => {
      if (textInput) {
        return textInput.props.value;
      } else {
        console.warn(`TextField component with testId:${testID}, is not found. So you can't get the content`);
        return null;
      }
    },
    isDisabled: () => {
      if (textInput) {
        return _.get(textInput, 'props.accessibilityState.disabled');
      } else {
        console.warn(`TextField component with testId:${testID}, is not found. So you can't get the content`);
        return null;
      }
    },
    changeText: (text: string) => {
      if (textInput) {
        fireEvent.changeText(textInput, text);
      } else {
        console.warn(`TextFieldDriverFactory: cannot change text because testID:${testID} were not found`);
      }
    },
    // placeholder
    isPlaceholderVisible,
    getPlaceholderContent: () => {
      if (isPlaceholderVisible()) {
        return _.get(textInput, 'props.placeholder');
      } else {
        console.warn(`You cant get placeholder content, cause placeholder is not visible.`);
        return null;
      }
    },
    // label
    getLabelRootElement: () => label.getRootElement(),
    isLabelExists: () => label.exists() && !floatingPlaceholder.exists(),
    getLabelContent: () => label.getTextContent(),
    // validation message
    getValidationMsgRootElement: () => validationMsg.getRootElement(),
    isValidationMsgExists: () => validationMsg.exists() && !_.isEmpty(validationMsg.getTextContent()),
    getValidationMsgContent: () => validationMsg.getTextContent(),
    //leadingAccessory, trailingAccessory, bottomAccessory
    // char counter
    getCharCounterRootElement: () => charCounter.getRootElement(),
    isCharCounterExists: () => charCounter.exists(),
    getCharCounterContent: () => charCounter.getTextContent()

  };
};

export default TextFieldDriverFactory;
