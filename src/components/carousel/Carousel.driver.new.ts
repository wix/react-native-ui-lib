import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {useScrollableDriver, ScrollProps} from '../../testkit/new/useScrollable.driver';

export const CarouselDriver = (props: ComponentProps) => {
  const driver = useScrollableDriver(useComponentDriver(props));

  const scroll = (props: ScrollProps) => {
    return driver.scroll(props);
  };

  return {...driver, scroll};
};
