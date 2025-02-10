import {StyleSheet} from 'react-native';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';

export const ViewDriver = (props: ComponentProps) => {
  const driver = useComponentDriver(props);

  const getStyle = () => {
    return StyleSheet.flatten(driver.getElement().props.style);
  };
  return {...driver, getStyle};
};
