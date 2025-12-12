import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';

export const SortableListDriver = (props: ComponentProps) => {
  return useComponentDriver(props);
};
