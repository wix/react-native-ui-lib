import { StyleSheet } from 'react-native';
import { useComponentDriver } from "../../testkit/new/Component.driver";
import { usePressableDriver } from "../../testkit/new/usePressable.driver";
export const TextDriver = props => {
  const driver = usePressableDriver(useComponentDriver(props));
  const getText = () => {
    const textChildren = driver.getElement().children;
    if (textChildren.length === 0) {
      return '';
    }
    if (textChildren.length === 1 && typeof textChildren[0] === 'string') {
      return textChildren[0];
    }
    return textChildren;
  };
  const getStyle = () => {
    return StyleSheet.flatten(driver.getElement().props.style);
  };
  return {
    ...driver,
    getText,
    getStyle
  };
};