import {
  useComponentDriver,
  ComponentProps,
  usePressableDriver,
  ViewDriver,
  ImageDriver,
  ModalDriver
} from '../../testkit';
import {ViewStyle, StyleSheet} from 'react-native';

export const HintDriver = (props: ComponentProps) => {
  const driver = usePressableDriver(useComponentDriver(props));

  const modalDriver = ModalDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.modal`
  });

  const contentDriver = ViewDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.message`
  });

  const overlayDriver = usePressableDriver(useComponentDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.overlay`
  }));

  const iconDriver = ImageDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.icon`
  });

  const getIcon = () => {
    return iconDriver;
  };

  const getBackgroundColor = (): ViewStyle => {
    return StyleSheet.flatten(contentDriver.getStyle()).backgroundColor as ViewStyle;
  };

  const isBackgroundExists = () => {
    return overlayDriver.exists();
  };

  const isModalVisible = () => {
    return modalDriver.isVisible();
  };

  const press = () => {
    return driver.press();
  };

  const pressOnBackground = () => {
    return overlayDriver.press();
  };

  return {
    getBackgroundColor,
    getIcon,
    isBackgroundExists,
    pressOnBackground,
    isModalVisible,
    ...driver,
    press
  };
};
