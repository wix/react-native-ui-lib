import {useEffect} from 'react';
import {LogService} from '../../../services';
import {PickerProps} from '../types';

// TODO: Remove this whole file when migration is completed
type UsePickerMigrationWarnings = Pick<PickerProps, 'children' | 'getItemLabel' | 'getItemValue' | 'onShow'>;

const usePickerMigrationWarnings = (props: UsePickerMigrationWarnings) => {
  const {children, getItemLabel, getItemValue, onShow} = props;
  useEffect(() => {
    if (children) {
      LogService.warn(`UILib Picker will stop supporting the 'children' prop in the next major version, please pass 'items' prop instead`);
    }

    if (getItemLabel) {
      LogService.warn(`UILib Picker will stop supporting the 'getItemLabel' prop in the next major version, please pass the 'getItemLabel' prop to the specific item instead`);
    }

    if (getItemValue) {
      LogService.warn(`UILib Picker will stop supporting the 'getItemValue' prop in the next major version, please stop using it. The value will be extract from 'items' prop instead`);
    }

    if (onShow) {
      LogService.warn(`UILib Picker will stop supporting the 'onShow' prop in the next major version, please pass the 'onShow' prop from the 'pickerModalProps' instead`);
    }
  }, []);
};

export default usePickerMigrationWarnings;
