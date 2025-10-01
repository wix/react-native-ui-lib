import { StyleSheet } from 'react-native';
import { useComponentDriver } from "../../testkit/new/Component.driver";
import { TextDriver } from "../text/Text.driver.new";
import { ImageDriver } from "../image/Image.driver.new";
export const ChipDriver = props => {
  const driver = useComponentDriver(props);
  const labelDriver = TextDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.label`
  });
  const dismissIconDriver = ImageDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.dismissIcon`
  });
  const iconDriver = ImageDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.icon`
  });
  const getLabel = () => {
    return {
      ...labelDriver
    };
  };
  const getDismissIcon = () => {
    const exists = () => {
      return dismissIconDriver.exists();
    };
    const getStyle = () => {
      return StyleSheet.flatten(dismissIconDriver.getElement().props.style);
    };
    return {
      ...dismissIconDriver,
      exists,
      getStyle
    };
  };
  const getIcon = () => {
    const exists = () => {
      return iconDriver.exists();
    };
    const getStyle = () => {
      return StyleSheet.flatten(iconDriver.getElement().props.style);
    };
    return {
      ...iconDriver,
      exists,
      getStyle
    };
  };
  return {
    ...driver,
    getLabel,
    getDismissIcon,
    getIcon
  };
};