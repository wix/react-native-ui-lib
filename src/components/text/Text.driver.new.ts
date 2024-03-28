import {StyleSheet, TextStyle} from 'react-native';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {usePressableDriver, PressableDriverResult} from '../../testkit/new/usePressable.driver';
import {ReactTestInstance} from 'react-test-renderer';

export interface TextDriverInterface extends PressableDriverResult {
  getText: () => string | (string | ReactTestInstance)[];
  getStyle: () => TextStyle;
}

export const TextDriver = (props: ComponentProps): TextDriverInterface => {
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
    return StyleSheet.flatten(driver.getElement().props.style) as TextStyle;
  };

  return {...driver, getText, getStyle};
};
