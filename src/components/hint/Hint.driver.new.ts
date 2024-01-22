import {HintProps} from './index';
import {TouchableOpacityProps} from '../touchableOpacity';
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
  const driver = usePressableDriver<HintProps>(useComponentDriver(props));

  const modalDriver = ModalDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.modal`
  });

  const contentDriver = ViewDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.message`
  });

  const hintTouchableDriver = usePressableDriver<TouchableOpacityProps>(useComponentDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}`
  }));

  const overlayTouchableDriver = usePressableDriver<TouchableOpacityProps>(useComponentDriver({
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

  const getContentStyle = (): ViewStyle => {
    return StyleSheet.flatten(contentDriver.getProps().style) as ViewStyle;
  };

  const getHintTouchable = () => {
    return hintTouchableDriver;
  };

  const getOverlayTouchable = () => {
    return overlayTouchableDriver;
  };

  return {getContentStyle, getModal, getIcon, getHintTouchable, getOverlayTouchable, ...driver};
};
