import {FlatListProps} from 'react-native';
import {WheelPickerProps, WheelPickerItemProps} from './index';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {useScrollableDriver} from '../../testkit/new/useScrollable.driver';

export const WheelPickerDriver = (props: ComponentProps) => {
  const driver = useComponentDriver<WheelPickerProps>(props);

  const moveToItem = (index: number, numberOfRows: number, itemHeight: number) => {
    const nativeEvent = {
      contentSize: {height: numberOfRows * itemHeight, width: 400},
      layoutMeasurement: {height: 100, width: 400}
    };

    listDriver.triggerEvent('onMomentumScrollEnd', {
      contentOffset: {x: 0, y: itemHeight * index}, 
      ...nativeEvent
    });
  };

  const listDriver = useScrollableDriver<FlatListProps<WheelPickerItemProps>>(useComponentDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.list`
  }));

  const getListHeight = () => {
    //@ts-expect-error
    return listDriver.getProps().height;
  };

  return {...driver, ...listDriver, getListHeight, moveToItem};
};
