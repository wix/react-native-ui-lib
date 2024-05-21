import {useEffect} from 'react';
import {LogService} from '../../../services';
import {PickerProps} from '../types';

// TODO: Remove this whole file when migration is completed
type UsePickerMigrationWarnings = Pick<PickerProps, 'children' | 'migrate' | 'getItemLabel' | 'getItemValue'>;

const usePickerMigrationWarnings = (props: UsePickerMigrationWarnings) => {
  const {children, migrate, getItemLabel, getItemValue} = props;
  useEffect(() => {
    if (children) {
      LogService.warn(`UILib Picker will stop supporting the 'children' prop in the next major version, please pass 'items' prop instead`);
    }

    if (migrate) {
      LogService.warn(`UILib Picker will stop supporting the 'migrate' prop in the next major version, please stop using it`);
    }

    if (getItemLabel) {
      LogService.warn(`UILib Picker will stop supporting the 'getItemLabel' prop in the next major version, please stop using it`);
    }

    if (getItemValue) {
      LogService.warn(`UILib Picker will stop supporting the 'getItemValue' prop in the next major version, please stop using it`);
    }
  }, []);
};

export default usePickerMigrationWarnings;
