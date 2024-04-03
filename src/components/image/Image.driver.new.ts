import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';

export const ImageDriver = (props: ComponentProps) => {
  const driver = useComponentDriver(props);
  return driver;
};
