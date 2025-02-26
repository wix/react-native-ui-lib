import {ViewStyle} from 'react-native';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {usePressableDriver} from '../../testkit/new/usePressable.driver';

export const SwitchDriver = (props: ComponentProps) => {
  const driver = usePressableDriver(useComponentDriver(props));
  
  const getStyle = () => driver.getElement().props.style as ViewStyle;
  const isDisabled = () => driver.getElement().props.accessibilityState?.disabled === true;
  const isChecked = () => driver.getElement().props.accessibilityState?.checked;
  
  return {...driver, getStyle, isDisabled, isChecked};
};
