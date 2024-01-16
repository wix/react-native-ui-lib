import {HintProps} from './index';
import {useComponentDriver, ComponentProps, usePressableDriver, ViewDriver} from '../../testkit';
import {ViewStyle, StyleSheet} from 'react-native';

export const HintDriver = (props: ComponentProps) => {
  const driver = usePressableDriver<HintProps>(useComponentDriver(props));

  const modalDriver = ViewDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.modal`
  });

  const contentDriver = ViewDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.message`
  });

  const getContentStyle = (): ViewStyle => {
    return StyleSheet.flatten(contentDriver.getProps().style) as ViewStyle;
  };

  const getModalExists = (): boolean => {
    return modalDriver.exists();
  };

  return {getContentStyle, getModalExists, ...driver};
};
