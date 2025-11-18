import {StyleSheet, TextStyle} from 'react-native';
import {useComponentDriver, ComponentProps, ComponentDriverOptions} from '../../testkit/new/Component.driver';
import {usePressableDriver} from '../../testkit/new/usePressable.driver';

export const TextDriver = (props: ComponentProps, options?: ComponentDriverOptions) => {
  const driver = usePressableDriver(useComponentDriver(props, options));

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
    return StyleSheet.flatten(driver.getElement().props.style) as TextStyle;
  };

  return {...driver, getText, getStyle};
};
