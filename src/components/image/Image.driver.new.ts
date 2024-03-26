import {useComponentDriver, ComponentProps, ComponentDriverResult} from '../../testkit/new/Component.driver';

// eslint-disable-next-line
export interface ImageDriverInterface extends ComponentDriverResult {}

export const ImageDriver = (props: ComponentProps): ImageDriverInterface => {
  const driver = useComponentDriver(props);
  return driver;
};
