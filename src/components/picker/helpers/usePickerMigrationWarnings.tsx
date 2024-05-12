import {useEffect} from 'react';
import _ from 'lodash';
import {LogService} from '../../../services';
import {PickerProps, PickerModes} from '../types';

// @ts-expect-error TODO: Remove this whole file when migration is completed
type UsePickerMigrationWarnings = Pick<PickerProps, 'value' | 'mode' | 'useNativePicker' | 'children'>;

const usePickerMigrationWarnings = (props: UsePickerMigrationWarnings) => {
  const {value, mode, useNativePicker, children} = props;
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

    if (useNativePicker) {
      LogService.warn(`UILib Picker will stop supporting the 'useNativePicker' prop soon, please pass instead the 'useWheelPicker' prop and handle relevant TextField migration if required to`);
    }

    if (children) {
      LogService.warn(`UILib Picker will stop supporting the 'children' prop soon, please pass 'items' prop instead`);
    }
  }, []);
};

export default usePickerMigrationWarnings;
