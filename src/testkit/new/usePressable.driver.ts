import {fireEvent} from '@testing-library/react-native';
import {ComponentDriverResult} from './Component.driver';
import {PressableProps} from 'react-native';

export interface PressableDriverResult<Props> extends ComponentDriverResult<Props> {
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
  Props extends PressableDriverProps,
  DriverProps extends ComponentDriverResult<Props> = ComponentDriverResult<Props> // Allows for chaining multiple drivers
>(
    driver: DriverProps
  ): PressableDriverResult<Props> & DriverProps => {
  const press = () => {
    fireEvent.press(driver.getElement());
  };

  const hasOnPress = () => {
    return typeof driver.getProps().onPress === 'function';
  };

  const onPressIn = () => {
    fireEvent(driver.getElement(), 'onPressIn');
  };

  const hasOnPressIn = () => {
    return typeof driver.getProps().onPressIn === 'function';
  };

  const onPressOut = () => {
    fireEvent(driver.getElement(), 'onPresonPressOutsIn');
  };

  const hasOnPressOut = () => {
    return typeof driver.getProps().onPressOut === 'function';
  };

  const onLongPress = () => {
    fireEvent(driver.getElement(), 'onLongPress');
  };

  const hasOnLongPress = () => {
    return typeof driver.getProps().onLongPress === 'function';
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
