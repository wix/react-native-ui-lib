import {FlatListProps} from 'react-native';
import {WheelPickerProps, WheelPickerItemProps, ITEM_HEIGHT} from './index';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {useScrollableDriver} from '../../testkit/new/useScrollable.driver';
import {TextDriver} from '../../components/Text/Text.driver.new';

export const WheelPickerDriver = (props: ComponentProps) => {
  const driver = useComponentDriver<WheelPickerProps>(props);

  const listDriver = useScrollableDriver<FlatListProps<WheelPickerItemProps>>(useComponentDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.list`
  }));

  const itemsLength = listDriver.getProps().data?.length ?? 0;

  const moveToItem = (index: number, itemHeight: number = ITEM_HEIGHT, numberOfRows: number = itemsLength) => {
    listDriver.triggerEvent('onMomentumScrollEnd', {
      contentOffset: {x: 0, y: itemHeight * index},
      contentSize: {height: numberOfRows * itemHeight, width: 400},
      layoutMeasurement: {height: 100, width: 400}
    });
  };

  const getListHeight = () => {
    //@ts-expect-error
    return listDriver.getProps().height;
  };

  const labelDriver = TextDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.label`
  });

  const getLabel = () => {
    return labelDriver.getText();
  };

  return {...driver, ...listDriver, getListHeight, moveToItem, getLabel};
};
