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

  const getIcon = () => {
    return iconDriver;
  };

  return {getLabel, getIcon, ...driver};
};
