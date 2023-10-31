import {ViewProps} from './index';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';

export const ViewDriver = (props: ComponentProps) => {
  const driver = useComponentDriver<ViewProps>(props);

  const getStyle = () => {
    return driver.getProps().style;
  };
  return {...driver, getStyle};
};
