import {useEffect} from 'react';
import _ from 'lodash';
import {LogService} from '../../../services';
import {PickerProps, PickerModes} from '../types';

type UsePickerMigrationWarnings = Pick<PickerProps, 'value' | 'mode'>;

const usePickerMigrationWarnings = (props: UsePickerMigrationWarnings) => {
  const {value, mode} = props;
  useEffect(() => {
    if (mode === PickerModes.SINGLE && Array.isArray(value)) {
      LogService.warn('Picker in SINGLE mode cannot accept an array for value');
    }
    if (mode === PickerModes.MULTI && !Array.isArray(value)) {
      LogService.warn('Picker in MULTI mode must accept an array for value');
    }

    if (_.isPlainObject(value)) {
      LogService.warn('UILib Picker will stop supporting passing object as value in the next major version. Please use either string or a number as value');
    }
  }, []);
};

export default usePickerMigrationWarnings;
