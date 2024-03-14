import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';

export const ViewDriver = (props: ComponentProps) => {
  const driver = useComponentDriver(props);

  const getStyle = () => {
    return driver.getElement().props.style;
  };
  return {...driver, getStyle};
};
