import { StyleSheet } from 'react-native';
import { useComponentDriver } from "../../testkit/new/Component.driver";
export const ViewDriver = props => {
  const driver = useComponentDriver(props);
  const getStyle = (flatten = false) => {
    const style = driver.getElement().props.style;
    return flatten ? StyleSheet.flatten(style) : style;
  };
  return {
    ...driver,
    getStyle
  };
};