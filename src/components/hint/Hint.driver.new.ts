import {HintProps} from './index';
import {TouchableOpacityProps} from '../touchableOpacity';
import {
  useComponentDriver,
  ComponentProps,
  usePressableDriver,
  ViewDriver,
  ImageDriver,
  ModalDriver,
  TextDriver
} from '../../testkit';
import {ViewStyle, StyleSheet} from 'react-native';

export const HintDriver = (props: ComponentProps) => {
  const driver = usePressableDriver<HintProps>(useComponentDriver(props));

  const modalDriver = ModalDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.modal`
  });

  const contentDriver = ViewDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.message`
  });

  const textDriver = TextDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.text`
  });

  const hintPressableDriver = usePressableDriver<TouchableOpacityProps>(useComponentDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}`
  }));

  const overlayDriver = usePressableDriver<TouchableOpacityProps>(useComponentDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.overlay`
  }));

  const iconDriver = ImageDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.icon`
  });

  const getModal = () => {
    return modalDriver;
  };

  const getIcon = () => {
    return iconDriver;
  };

  const getBackgroundColor = (): ViewStyle => {
    return StyleSheet.flatten(contentDriver.getProps().style).backgroundColor as ViewStyle;
  };

  const getMessage = () => {
    return textDriver.getText();
  };

  const getHintPressable = () => {
    return hintPressableDriver;
  };

  const getOverlay = () => {
    return overlayDriver;
  };

  const hintPress = () => {
    return hintPressableDriver.press();
  };

  const hintPressOnBackground = () => {
    return overlayDriver.press();
  };

  return {
    getBackgroundColor,
    getModal,
    getIcon,
    getMessage,
    getHintPressable,
    getOverlay,
    hintPress,
    hintPressOnBackground,
    ...driver
  };
};
