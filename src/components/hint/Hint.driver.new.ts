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

  const hintPressableDriver = usePressableDriver(useComponentDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}`
  }));

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

  const getOnBackgroundPressTouchable = () => {
    return overlayDriver;
  };

  const getIsModalVisible = () => {
    return modalDriver.isVisible();
  };

  const hintPress = () => {
    return hintPressableDriver.press();
  };

  const pressOnBackground = () => {
    return overlayDriver.press();
  };

  return {
    getBackgroundColor,
    getIcon,
    getOnBackgroundPressTouchable,
    hintPress,
    pressOnBackground,
    getIsModalVisible,
    ...driver
  };
};
