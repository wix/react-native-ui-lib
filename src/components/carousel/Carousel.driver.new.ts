import {useComponentDriver, type ComponentProps} from '../../testkit/new/Component.driver';
import {useScrollableDriver, type ScrollProps} from '../../testkit/new/useScrollable.driver';

export const CarouselDriver = (props: ComponentProps) => {
  const driver = useScrollableDriver(useComponentDriver(props));

  const scroll = (props: ScrollProps) => {
    return driver.scroll(props);
  };

  return {...driver, scroll};
};
