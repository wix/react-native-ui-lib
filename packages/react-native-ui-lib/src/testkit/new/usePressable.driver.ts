import {fireEvent} from '@testing-library/react-native';
import {ComponentDriverResult} from './Component.driver';
import {PressableProps} from 'react-native';

export interface PressableDriverResult extends ComponentDriverResult {
  press: () => void;
  hasOnPress: () => boolean;
  onPressIn: () => void;
  hasOnPressIn: () => boolean;
  onPressOut: () => void;
  hasOnPressOut: () => boolean;
  onLongPress: () => void;
  hasOnLongPress: () => boolean;
}

export type PressableDriverProps = Partial<
  Pick<PressableProps, 'onPress' | 'onPressIn' | 'onPressOut' | 'onLongPress'>
>;

export const usePressableDriver = <
  DriverProps extends ComponentDriverResult = ComponentDriverResult // Allows for chaining multiple drivers
>(
    driver: DriverProps
  ): PressableDriverResult & DriverProps => {
  const press = () => {
    fireEvent.press(driver.getElement());
  };

  const hasOnPress = () => {
    return typeof driver.getElement().props.onPress === 'function';
  };

  const onPressIn = () => {
    fireEvent(driver.getElement(), 'onPressIn');
  };

  const hasOnPressIn = () => {
    return typeof driver.getElement().props.onPressIn === 'function';
  };

  const onPressOut = () => {
    fireEvent(driver.getElement(), 'onPresonPressOutsIn');
  };

  const hasOnPressOut = () => {
    return typeof driver.getElement().props.onPressOut === 'function';
  };

  const onLongPress = () => {
    fireEvent(driver.getElement(), 'onLongPress');
  };

  const hasOnLongPress = () => {
    return typeof driver.getElement().props.onLongPress === 'function';
  };

  return {
    ...driver,
    press,
    hasOnPress,
    onPressIn,
    hasOnPressIn,
    onPressOut,
    hasOnPressOut,
    onLongPress,
    hasOnLongPress
  };
};
