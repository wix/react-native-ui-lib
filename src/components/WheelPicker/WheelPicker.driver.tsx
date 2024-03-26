import {ITEM_HEIGHT} from './index';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {ScrollableDriverResult, useScrollableDriver} from '../../testkit/new/useScrollable.driver';
import {TextDriver, TextDriverInterface} from '../../components/text/Text.driver.new';

type MoveItemFunction = (index: number, itemHeight?: number, numberOfRows?: number) => void;
export interface WheelPickerDriverInterface extends ScrollableDriverResult {
  getListHeight: () => number;
  moveToItem: MoveItemFunction;
  getLabel: TextDriverInterface['getText'];
}

export const WheelPickerDriver = (props: ComponentProps): WheelPickerDriverInterface => {
  const driver = useComponentDriver(props);

  const listDriver = useScrollableDriver(useComponentDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.list`
  }));

  const itemsLength = listDriver.getElement().props.data?.length ?? 0;

  const moveToItem: MoveItemFunction = (index, itemHeight = ITEM_HEIGHT, numberOfRows = itemsLength) => {
    listDriver.triggerEvent('onMomentumScrollEnd', {
      contentOffset: {x: 0, y: itemHeight * index},
      contentSize: {height: numberOfRows * itemHeight, width: 400},
      layoutMeasurement: {height: 100, width: 400}
    });
  };

  const getListHeight = () => {
    return listDriver.getElement().props.height;
  };

  const labelDriver = TextDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.label`
  });

  return {...driver, ...listDriver, getListHeight, moveToItem, getLabel: labelDriver.getText};
};
