---
id: DateTimePicker
title: DateTimePicker
sidebar_label: DateTimePicker
---

import UILivePreview from '@site/src/components/UILivePreview';

Date and Time Picker Component that wraps RNDateTimePicker for date and time modes. See: https://github.com/react-native-community/react-native-datetimepicker#react-native-datetimepicker  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/DateTimePickerScreen.tsx)
:::info
This component extends **[TextField](/docs/components/form/TextField)** props.
:::
:::note
DateTimePicker uses a native library. You MUST add and link the native library to both iOS and Android projects
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/DateTimePicker/DateTimePicker_iOS.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/DateTimePicker/DateTimePicker_Android.gif?raw=true'}/>

</div>

### Usage
<UILivePreview code={`<DateTimePicker title={'Select time'} placeholder={'Placeholder'} mode={'time'}/>`}/>

## API
### cancelButtonProps
Cancel button props
`ButtonProps ` 

### confirmButtonProps
Confirm button props
`ButtonProps ` 

### dateTimeFormatter
A callback function to format the time or date
`(value: Date, mode: DateTimePickerMode) => string ` 

### dialogProps
Props to pass the Dialog component
`DialogProps ` 

### display
Defines the visual display of the picker. The default value is 'spinner' on iOS and 'default' on Android. The list of all possible values are default, spinner, calendar or clock on Android and default, spinner, compact or inline for iOS. Full list can be found here: https://github.com/react-native-datetimepicker/datetimepicker#display-optional
`string ` 

### editable
Should this input be editable or disabled
`boolean ` 

### headerStyle
Style to apply to the iOS dialog header
`ViewStyle ` 

### is24Hour
#### Android only
Allows changing of the time picker to a 24 hour format
`boolean ` 

### locale
#### iOS only
Allows changing of the locale of the component
`string ` 

### maximumDate
The maximum date or time value to use
`Date ` 

### minimumDate
The minimum date or time value to use
`Date ` 

### minuteInterval
#### iOS only
The interval at which minutes can be selected. Possible values are: 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30
`number ` 

### mode
The type of picker to display ('date' or 'time')
`DATE | TIME ` 

### onChange
Called when the date/time change
`() => Date ` 

### renderInput
Render custom input
`JSX.Element ` 

### themeVariant
Override system theme variant (dark or light mode) used by the date picker
`LIGHT | DARK ` 

### timeZoneOffsetInMinutes
#### iOS only
Allows changing of the timeZone of the date picker. By default it uses the device's time zone
`number ` 

### value
#### Defaults to device's date and time
The initial value to set the picker to
`Date ` 


