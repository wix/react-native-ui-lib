// TODO: delete whole file in v8
import { useEffect } from 'react';
import { MomentPackage as moment } from "../../optionalDependencies";
import { LogService } from "../../services";

// This file will be deleted in the next major version,
// duplicating these here will make this less complicated
// than removing the duplication

const useOldApi = props => {
  const {
    dateFormat,
    dateFormatter,
    timeFormat,
    timeFormatter
  } = props;
  useEffect(() => {
    if (!moment && (dateFormat || timeFormat)) {
      // eslint-disable-next-line max-len
      LogService.error(`RNUILib DateTimePicker component with date/time format requires installing "moment" dependency`);
    }
  }, [dateFormat, timeFormat]);
  const getStringValue = (value, mode) => {
    if (value) {
      switch (mode) {
        case 'date':
          return dateFormatter ? dateFormatter(value) : dateFormat && moment ? moment(value).format(dateFormat) : value.toLocaleDateString();
        case 'time':
          return timeFormatter ? timeFormatter(value) : timeFormat && moment ? moment(value).format(timeFormat) : value.toLocaleTimeString();
      }
    }
  };
  return {
    getStringValue
  };
};
export default useOldApi;