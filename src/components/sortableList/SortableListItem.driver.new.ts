import _ from 'lodash';
import {SortableListItemProps} from './types';
import {useComponentDriver, ComponentProps} from '../../testkit/new/useComponent.driver';
import {useDraggableDriver} from '../../testkit/new/useDraggable.driver';

export const SortableListItemDriver = (props: ComponentProps) => {
  const driver = useDraggableDriver<SortableListItemProps>(useComponentDriver(props));

  const dragUp = async (indices: number) => {
    validateIndices(indices);
    const data = _.times(indices, index => {
      return {
        translationY: -52 * (index + 1)
      };
    });

    driver.draggable.drag(data);
  };

  const dragDown = async (indices: number) => {
    validateIndices(indices);
    const data = _.times(indices, index => {
      return {
        translationY: 52 * (index + 1)
      };
    });

    driver.draggable.drag(data);
  };

  const validateIndices = (indices: number) => {
    if (indices <= 0 || !Number.isInteger(indices)) {
      throw Error('indices must be a positive integer');
    }
  };

  return {...driver, dragUp, dragDown};
};
