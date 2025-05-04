import {StyleSheet} from 'react-native';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {TextDriver} from '../text/Text.driver.new';
import {ImageDriver} from '../image/Image.driver.new';
import {ViewDriver} from '../view/View.driver.new';

export const TimelineDriver = (props: ComponentProps) => {
  const driver = useComponentDriver(props);

  const labelDriver = TextDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.point.label`
  });

  const iconDriver = ImageDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.point.icon`
  });

  const topLineDriver = ViewDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.topLine`
  });

  const topLinePointDriver = ViewDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.topLine.startPoint`
  });

  const bottomLineDriver = ViewDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.topLine`
  });

  const bottomLinePointDriver = ViewDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.bottom.endPoint`
  });

  const getLabel = () => {
    const exists = (): boolean => {
      return labelDriver.exists();
    };
    const getText = () => {
      return labelDriver.getText();
    };
    return {exists, getText};
  };

  const getIcon = () => {
    const exists = (): boolean => {
      return iconDriver.exists();
    };
    const getIconSource = () => {
      return iconDriver.getElement().props.source;
    };
    const getIconStyle = () => {
      return StyleSheet.flatten(iconDriver.getElement().props.style);
    };

    return {exists, getIconSource, getIconStyle};
  };

  const getTopLine = () => {
    const getTopLineStyle = () => {
      return StyleSheet.flatten(topLineDriver.getElement().props.style);
    };

    const getTopLinePointStyle = () => {
      return StyleSheet.flatten(topLinePointDriver.getElement().props.style);
    };
    return {getTopLineStyle, getTopLinePointStyle};
  };

  const getBottomLine = () => {
    const getBottomLineStyle = () => {
      return StyleSheet.flatten(bottomLineDriver.getElement().props.style);
    };

    const getBottomLinePointStyle = () => {
      return StyleSheet.flatten(bottomLinePointDriver.getElement().props.style);
    };
    return {getBottomLineStyle, getBottomLinePointStyle};
  };

  return {
    ...driver,
    getLabel,
    getIcon,
    getTopLine,
    getBottomLine
  };
};
