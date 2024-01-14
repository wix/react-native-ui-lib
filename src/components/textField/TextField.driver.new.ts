import _ from 'lodash';
import {fireEvent} from '@testing-library/react-native';
import {TextFieldProps} from './index';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {TextDriver} from '../text/Text.driver.new';

export const TextFieldDriver = (props: ComponentProps) => {
  const driver = useComponentDriver<TextFieldProps>(props);
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

  const hasFloatingPlaceholder = (): boolean => {
    return floatingPlaceholderDriver.exists();
  };

  const getText = (): string | undefined => {
    return driver.getProps().value ?? driver.getProps().defaultValue;
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
    return !driver.getProps().accessibilityState?.disabled;
  };

  const isPlaceholderVisible = (): boolean => {
    const hasPlaceholder = !!driver.getProps().placeholder;
    const hasText = !!getText();
    return hasPlaceholder && (!hasText || (hasText && hasFloatingPlaceholder()));
  };

  const getPlaceholderText = (): React.ReactNode | undefined => {
    if (isPlaceholderVisible()) {
      return driver.getProps().placeholder;
    }
  };

  const isLabelVisible = (): boolean => {
    return labelDriver.exists() && !hasFloatingPlaceholder();
  };

  const getLabelText = (): React.ReactNode | undefined => {
    if (labelDriver.exists()) {
      return labelDriver.getText();
    }
  };

  const isValidationMsgVisible = (): boolean => {
    return validationMsgDriver.exists() && !_.isEmpty(validationMsgDriver.getText());
  };

  const getValidationMsgText = (): React.ReactNode | undefined => {
    if (validationMsgDriver.exists()) {
      return validationMsgDriver.getText();
    }
  };

  const isCharCounterVisible = (): boolean => {
    return charCounterDriver.exists();
  };

  const getCharCounterText = (): React.ReactNode | undefined => {
    return charCounterDriver.getText();
  };

  return {
    ...driver,
    getText,
    changeText,
    focus,
    blur,
    isEnabled,
    isPlaceholderVisible,
    getPlaceholderText,
    isLabelVisible,
    getLabelText,
    isValidationMsgVisible,
    getValidationMsgText,
    isCharCounterVisible,
    getCharCounterText
  };
};
