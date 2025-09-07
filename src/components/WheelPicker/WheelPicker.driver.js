import { ITEM_HEIGHT } from "./index";
import { useComponentDriver } from "../../testkit/new/Component.driver";
import { useScrollableDriver } from "../../testkit/new/useScrollable.driver";
import { TextDriver } from "../../components/text/Text.driver.new";
export const WheelPickerDriver = props => {
  const driver = useComponentDriver(props);
  const listDriver = useScrollableDriver(useComponentDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.list`
  }));
  const itemsLength = listDriver.getElement().props.data?.length ?? 0;
  const moveToItem = (index, itemHeight = ITEM_HEIGHT, numberOfRows = itemsLength) => {
    listDriver.triggerEvent('onScrollBeginDrag');
    listDriver.triggerEvent('onMomentumScrollEnd', {
      contentOffset: {
        x: 0,
        y: itemHeight * index
      },
      contentSize: {
        height: numberOfRows * itemHeight,
        width: 400
      },
      layoutMeasurement: {
        height: 100,
        width: 400
      }
    });
  };
  const getListHeight = () => {
    return listDriver.getElement().props.height;
  };
  const labelDriver = TextDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.label`
  });
  const getLabel = () => {
    return labelDriver.getText();
  };
  return {
    ...driver,
    ...listDriver,
    getListHeight,
    moveToItem,
    getLabel
  };
};