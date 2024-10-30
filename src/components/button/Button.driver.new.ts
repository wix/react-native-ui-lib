import {StyleSheet} from 'react-native';
import {useComponentDriver, ComponentProps, usePressableDriver, TextDriver, ImageDriver} from '../../testkit';

export const ButtonDriver = (props: ComponentProps) => {
  const driver = usePressableDriver(useComponentDriver(props));

  const labelDriver = TextDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.label`
  });

  const iconDriver = ImageDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.icon`
  });

  const getLabel = () => {
    return labelDriver;
  };

  const getLabelStyle = () => {
    return labelDriver?.getStyle();
  };

  const getIcon = () => {
    return iconDriver;
  };

  const getIconStyle = () => {
    return StyleSheet.flatten(iconDriver?.getElement().props.style);
  };

  const getStyle = () => {
    return StyleSheet.flatten(driver.getElement().props.style);
  };

  return {getStyle, getLabel, getLabelStyle, getIconStyle, getIcon, ...driver};
};
