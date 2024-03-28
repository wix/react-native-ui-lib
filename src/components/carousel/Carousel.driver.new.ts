import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {useScrollableDriver, ScrollProps, ScrollableDriverResult} from '../../testkit/new/useScrollable.driver';

export interface CarouselDriverInterface extends ScrollableDriverResult {
  scroll: (props: ScrollProps) => void;
}

export const CarouselDriver = (props: ComponentProps): CarouselDriverInterface => {
  const driver = useScrollableDriver(useComponentDriver(props));

  return {...driver, scroll: driver.scroll};
};
