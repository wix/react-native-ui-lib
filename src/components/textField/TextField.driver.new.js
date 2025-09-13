import _isEmpty from "lodash/isEmpty";
import { StyleSheet } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import { useComponentDriver } from "../../testkit/new/Component.driver";
import { usePressableDriver } from "../../testkit/new/usePressable.driver";
import { TextDriver } from "../text/Text.driver.new";
import { ImageDriver } from "../image/Image.driver.new";
import { ButtonDriver } from "../button/Button.driver.new";
import { ViewDriver } from "../view/View.driver.new";
export const TextFieldDriver = props => {
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
  const helperTextDriver = TextDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.helperText`
  });
  const validationIconDriver = ImageDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.validationMessage.icon`
  });
  const clearButtonDriver = ButtonDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.clearButton`
  });
  const clearButtonContainerDriver = ViewDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.clearButton.container`
  });
  const getValue = () => {
    return driver.getElement().props.value ?? driver.getElement().props.defaultValue;
  };
  const changeText = text => {
    fireEvent.changeText(driver.getElement(), text);
  };
  const focus = () => {
    fireEvent(driver.getElement(), 'focus');
  };
  const blur = () => {
    fireEvent(driver.getElement(), 'blur');
  };
  const isEnabled = () => {
    return !driver.getElement().props.accessibilityState?.disabled;
  };
  const getPlaceholder = () => {
    const exists = () => {
      const hasPlaceholder = !!driver.getElement().props.placeholder;
      const hasText = !!getValue();
      return hasPlaceholder && (!hasText || hasText && floatingPlaceholderDriver.exists());
    };
    const getText = () => {
      if (exists()) {
        return driver.getElement().props.placeholder;
      }
    };
    return {
      ...floatingPlaceholderDriver,
      exists,
      getText
    };
  };
  const getLabel = () => {
    const exists = () => {
      return labelDriver.exists() && !floatingPlaceholderDriver.exists();
    };
    return {
      ...labelDriver,
      exists
    };
  };
  const getValidationMessage = () => {
    const exists = () => {
      return validationMsgDriver.exists() && !_isEmpty(validationMsgDriver.getText());
    };
    return {
      ...validationMsgDriver,
      exists
    };
  };
  const getCharCounter = () => {
    return charCounterDriver;
  };
  const getHelperText = () => {
    return helperTextDriver;
  };
  const getValidationIcon = () => {
    return validationIconDriver;
  };
  const getClearButton = () => {
    const visible = () => {
      const transform = StyleSheet.flatten(clearButtonContainerDriver.getStyle()).transform;
      const translate = StyleSheet.flatten(transform);
      const translateY = translate.translateY;
      return translateY === 0;
    };
    return {
      ...clearButtonDriver,
      visible
    };
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
    getCharCounter,
    getHelperText,
    getValidationIcon,
    getClearButton
  };
};