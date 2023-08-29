import {CarouselProps} from './types';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {useScrollableDriver, ScrollProps} from '../../testkit/new/useScrollable.driver';

export const CarouselDriver = (props: ComponentProps) => {
  const driver = useScrollableDriver<CarouselProps>(useComponentDriver(props));

  const scroll = (props: ScrollProps) => {
    const {contentOffset, options} = props;
    return driver.scroll(contentOffset, options);
  };

  return {...driver, scroll};
};
