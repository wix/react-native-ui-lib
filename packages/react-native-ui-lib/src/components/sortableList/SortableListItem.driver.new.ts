import _ from 'lodash';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {useDraggableDriver} from '../../testkit/new/useDraggable.driver';
import {DEFAULT_LIST_ITEM_SIZE} from './SortableListItem';

export const SortableListItemDriver = (props: ComponentProps) => {
  const driver = useDraggableDriver(useComponentDriver(props));

  const dragUp = async (indices: number) => {
    validateIndices(indices);
    const data = _.times(indices, index => {
      return {
        translationY: -DEFAULT_LIST_ITEM_SIZE * (index + 1)
      };
    });

    driver.drag(data);
  };

  const dragDown = async (indices: number) => {
    validateIndices(indices);
    const data = _.times(indices, index => {
      return {
        translationY: DEFAULT_LIST_ITEM_SIZE * (index + 1)
      };
    });

    driver.drag(data);
  };

  const dragLeft = async (indices: number) => {
    validateIndices(indices);
    const data = _.times(indices, index => {
      return {
        translationX: -DEFAULT_LIST_ITEM_SIZE * (index + 1)
      };
    });

    driver.drag(data);
  };

  const dragRight = async (indices: number) => {
    validateIndices(indices);
    const data = _.times(indices, index => {
      return {
        translationX: DEFAULT_LIST_ITEM_SIZE * (index + 1)
      };
    });

    driver.drag(data);
  };

  const validateIndices = (indices: number) => {
    if (indices <= 0 || !Number.isInteger(indices)) {
      throw Error('indices must be a positive integer');
    }
  };

  return {...driver, dragUp, dragDown, dragLeft, dragRight};
};
