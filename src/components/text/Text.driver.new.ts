import {StyleSheet, TextStyle} from 'react-native';
import {TextProps} from './index';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {usePressableDriver} from '../../testkit/new/usePressable.driver';

export const TextDriver = (props: ComponentProps) => {
  const driver = usePressableDriver<TextProps>(useComponentDriver(props));

  const getText = (): React.ReactNode | string | undefined => {
    return driver.getProps().children;
  };

  const getStyle = () => {
    return StyleSheet.flatten(driver.getProps().style) as TextStyle;
  };

  return {...driver, getText, getStyle};
};
