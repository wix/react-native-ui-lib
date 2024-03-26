import _ from 'lodash';
import {fireEvent} from '@testing-library/react-native';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {TextDriver, TextDriverInterface} from '../text/Text.driver.new';
import {usePressableDriver, PressableDriverResult} from '../../testkit/new/usePressable.driver';

interface TextFieldDriverInterface extends PressableDriverResult {
  getValue: () => string | undefined;
  changeText: (text: string) => void;
  focus: () => void;
  blur: () => void;
  isEnabled: () => boolean;
  getPlaceholder: () => PressableDriverResult;
  getLabel: () => TextDriverInterface;
  getValidationMessage: () => TextDriverInterface;
  getCharCounter: () => TextDriverInterface;
}


export const TextFieldDriver = (props: ComponentProps): TextFieldDriverInterface => {
  const driver = usePressableDriver(useComponentDriver(props)); 

  const floatingPlaceholderDriver = TextDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.floatingPlaceholder`
  });
  const labelDriver = TextDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.label`
  });
  const validationMsgDriver = TextDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.validationMessage`
  });
  const charCounterDriver = TextDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.charCounter`
  });

  const getValue = (): string | undefined => {
    return driver.getElement().props.value ?? driver.getElement().props.defaultValue;
  };

  const changeText = (text: string): void => {
    fireEvent.changeText(driver.getElement(), text);
  };

  const focus = (): void => {
    fireEvent(driver.getElement(), 'focus');
  };

  const blur = (): void => {
    fireEvent(driver.getElement(), 'blur');
  };

  const isEnabled = (): boolean => {
    return !driver.getElement().props.accessibilityState?.disabled;
  };

  const getPlaceholder = () => {
    const exists = (): boolean => {
      const hasPlaceholder = !!driver.getElement().props.placeholder;
      const hasText = !!getValue();
      return hasPlaceholder && (!hasText || (hasText && floatingPlaceholderDriver.exists()));
    };
    const getText = (): string | undefined => {
      if (exists()) {
        return driver.getElement().props.placeholder;
      }
    };

    return {...floatingPlaceholderDriver, exists, getText};
  };

  const getLabel = () => {
    const exists = (): boolean => {
      return labelDriver.exists() && !floatingPlaceholderDriver.exists();
    };

    return {...labelDriver, exists};
  };

  const getValidationMessage = () => {
    const exists = (): boolean => {
      return validationMsgDriver.exists() && !_.isEmpty(validationMsgDriver.getText());
    };

    return {...validationMsgDriver, exists};
  };

  const getCharCounter = () => {
    return charCounterDriver;
  };

  return {
    ...driver,
    getValue,
    changeText,
    focus,
    blur,
    isEnabled,
    getPlaceholder,
    getLabel,
    getValidationMessage,
    getCharCounter
  };
};
