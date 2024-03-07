import _ from 'lodash';
import {fireEvent} from '@testing-library/react-native';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {TextDriver} from '../text/Text.driver.new';
import {usePressableDriver} from '../../testkit/new/usePressable.driver';

export const TextFieldDriver = (props: ComponentProps) => {
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
    return driver.getElementProps().value ?? driver.getElementProps().defaultValue;
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
    return !driver.getElementProps().accessibilityState?.disabled;
  };

  const getPlaceholder = () => {
    const exists = (): boolean => {
      const hasPlaceholder = !!driver.getElementProps().placeholder;
      const hasText = !!getValue();
      return hasPlaceholder && (!hasText || (hasText && floatingPlaceholderDriver.exists()));
    };
    const getText = (): string | undefined => {
      if (exists()) {
        return driver.getElementProps().placeholder;
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
