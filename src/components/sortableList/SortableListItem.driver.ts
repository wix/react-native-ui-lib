import _ from 'lodash';
import {type SortableListProps, type SortableListItemProps} from './types';
import {ComponentDriver} from '../../testkit/Component.driver';

/**
 * Please run clear after each test
 */
export class SortableListItemDriver<ItemT extends SortableListItemProps> extends ComponentDriver<SortableListProps<ItemT>> {
  dragUp = async (indices: number) => {
    this.validateIndices(indices);
    const data = _.times(indices, index => {
      return {
        translationY: -52 * (index + 1)
      };
    });

    await this.uniDriver.selectorByTestId(this.testID).then(driver => driver.drag(data));
  };

  dragDown = async (indices: number) => {
    this.validateIndices(indices);
    const data = _.times(indices, index => {
      return {
        translationY: 52 * (index + 1)
      };
    });

    await this.uniDriver.selectorByTestId(this.testID).then(driver => driver.drag(data));
  };

  private validateIndices = (indices: number) => {
    if (indices <= 0 || !Number.isInteger(indices)) {
      throw Error('indices must be a positive integer');
    }
  };
}
