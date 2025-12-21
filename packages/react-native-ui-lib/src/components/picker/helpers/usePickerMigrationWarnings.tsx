import {useEffect} from 'react';
import {LogService} from '../../../services';
import {PickerProps} from '../types';

// TODO: Remove this whole file when migration is completed
type UsePickerMigrationWarnings = Pick<PickerProps, 'children' | 'onShow'>;

const usePickerMigrationWarnings = (props: UsePickerMigrationWarnings) => {
  const {children, onShow} = props;
  useEffect(() => {
    if (children) {
      LogService.warn(`UILib Picker will stop supporting the 'children' prop in the next major version, please pass 'items' prop instead`);
    }

    if (onShow) {
      LogService.warn(`UILib Picker will stop supporting the 'onShow' prop in the next major version, please pass the 'onShow' prop from the 'pickerModalProps' instead`);
    }
  }, []);
};

export default usePickerMigrationWarnings;
