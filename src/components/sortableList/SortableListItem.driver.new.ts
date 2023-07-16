import _ from 'lodash';
import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {useDraggableDriver} from '../../testkit/new/useDraggable.driver';
import {SortableListItemProps} from './types';
import {DEFAULT_LIST_ITEM_HEIGHT} from './SortableListItem';

export const SortableListItemDriver = (props: ComponentProps) => {
  const driver = useDraggableDriver<SortableListItemProps>(useComponentDriver(props));

  const dragUp = async (indices: number) => {
    validateIndices(indices);
    const data = _.times(indices, index => {
      return {
        translationY: -DEFAULT_LIST_ITEM_HEIGHT * (index + 1)
      };
    });

    driver.drag(data);
  };

  const dragDown = async (indices: number) => {
    validateIndices(indices);
    const data = _.times(indices, index => {
      return {
        translationY: DEFAULT_LIST_ITEM_HEIGHT * (index + 1)
      };
    });

    driver.drag(data);
  };

  const validateIndices = (indices: number) => {
    if (indices <= 0 || !Number.isInteger(indices)) {
      throw Error('indices must be a positive integer');
    }
  };

  return {...driver, dragUp, dragDown};
};
