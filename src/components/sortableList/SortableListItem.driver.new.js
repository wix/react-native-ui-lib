import _times from "lodash/times";
import { useComponentDriver } from "../../testkit/new/Component.driver";
import { useDraggableDriver } from "../../testkit/new/useDraggable.driver";
import { DEFAULT_LIST_ITEM_SIZE } from "./SortableListItem";
export const SortableListItemDriver = props => {
  const driver = useDraggableDriver(useComponentDriver(props));
  const dragUp = async indices => {
    validateIndices(indices);
    const data = _times(indices, index => {
      return {
        translationY: -DEFAULT_LIST_ITEM_SIZE * (index + 1)
      };
    });
    driver.drag(data);
  };
  const dragDown = async indices => {
    validateIndices(indices);
    const data = _times(indices, index => {
      return {
        translationY: DEFAULT_LIST_ITEM_SIZE * (index + 1)
      };
    });
    driver.drag(data);
  };
  const dragLeft = async indices => {
    validateIndices(indices);
    const data = _times(indices, index => {
      return {
        translationX: -DEFAULT_LIST_ITEM_SIZE * (index + 1)
      };
    });
    driver.drag(data);
  };
  const dragRight = async indices => {
    validateIndices(indices);
    const data = _times(indices, index => {
      return {
        translationX: DEFAULT_LIST_ITEM_SIZE * (index + 1)
      };
    });
    driver.drag(data);
  };
  const validateIndices = indices => {
    if (indices <= 0 || !Number.isInteger(indices)) {
      throw Error('indices must be a positive integer');
    }
  };
  return {
    ...driver,
    dragUp,
    dragDown,
    dragLeft,
    dragRight
  };
};