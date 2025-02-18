import {StyleSheet} from 'react-native';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';

export const ViewDriver = (props: ComponentProps) => {
  const driver = useComponentDriver(props);

  const getStyle = (flatten = false) => {
    const style = driver.getElement().props.style;
    return flatten ? StyleSheet.flatten(style) : style;
  };
  return {...driver, getStyle};
};
