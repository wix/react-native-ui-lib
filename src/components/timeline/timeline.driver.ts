import {StyleSheet} from 'react-native';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {TextDriver} from '../text/Text.driver.new';
import {ImageDriver} from '../image/Image.driver.new';
import {ViewDriver} from '../view/View.driver.new';

export const TimelineDriver = (props: ComponentProps) => {
  const driver = useComponentDriver(props);

  const pointDriver = ViewDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.point.container`
  });

  const labelDriver = TextDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.point.label`
  });

  const iconDriver = ImageDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.point.icon`
  });

  const solidTopLineDriver = ViewDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.topLine.solidLine`
  });

  const dashedTopLineDriver = ViewDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.topLine.dashedLine`
  });

  const topLinePointDriver = ViewDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.topLine.startPoint`
  });

  const solidBottomLineDriver = ViewDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.bottomLine.solidLine`
  });

  const dashedBottomLineDriver = ViewDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.bottomLine.dashedLine`
  });

  const bottomLinePointDriver = ViewDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.bottomLine.endPoint`
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

  const getPoint = () => {
    const exists = (): boolean => {
      return pointDriver.exists();
    };
    const getStyle = () => {
      return StyleSheet.flatten(pointDriver.getElement().props.style);
    };
    return {exists, getStyle};
  };

  const getTopLine = () => {
    const exists = (): boolean => {
      return solidTopLineDriver.exists() || dashedTopLineDriver.exists();
    };
    const getTopLineStyle = () => {
      if (dashedTopLineDriver.exists()) {
        return StyleSheet.flatten(dashedTopLineDriver.getElement().props.style);
      } else if (solidTopLineDriver.exists()) {
        return StyleSheet.flatten(solidTopLineDriver.getElement().props.style);
      }
    };
    const getTopLinePointStyle = () => {
      return StyleSheet.flatten(topLinePointDriver.getElement().props.style);
    };
    return {exists, getTopLineStyle, getTopLinePointStyle};
  };

  const getBottomLine = () => {
    const exists = (): boolean => {
      return solidBottomLineDriver.exists() || dashedBottomLineDriver.exists();
    };
    const getBottomLineStyle = () => {
      if (dashedBottomLineDriver.exists()) {
        return StyleSheet.flatten(dashedBottomLineDriver.getElement().props.style);
      } else if (solidBottomLineDriver.exists()) {
        return StyleSheet.flatten(solidBottomLineDriver.getElement().props.style);
      }
    };
    const getBottomLinePointStyle = () => {
      return StyleSheet.flatten(bottomLinePointDriver.getElement().props.style);
    };
    return {exists, getBottomLineStyle, getBottomLinePointStyle};
  };

  return {
    ...driver,
    getPoint,
    getLabel,
    getIcon,
    getTopLine,
    getBottomLine
  };
};
