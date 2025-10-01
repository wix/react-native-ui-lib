import { useComponentDriver } from "../../testkit/new/Component.driver";
import { useScrollableDriver } from "../../testkit/new/useScrollable.driver";
export const CarouselDriver = props => {
  const driver = useScrollableDriver(useComponentDriver(props));
  const scroll = props => {
    return driver.scroll(props);
  };
  return {
    ...driver,
    scroll
  };
};