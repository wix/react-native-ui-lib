let DateTimePickerPackage: any;
try {
  DateTimePickerPackage = require('@react-native-community/datetimepicker')?.default;
} catch (error) {}

export default DateTimePickerPackage;
