---
id: NumberInput
title: NumberInput
sidebar_label: NumberInput
---

Number Input to create an input with a formatted number  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/NumberInputScreen.tsx)
:::note
This requires RN67 to work on Android.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
``` jsx live
<NumberInput initialValue={1506} onChange={onChange} placeholder={'Price'}/>
```
## API
### containerStyle
Container style of the whole component
`ViewStyle ` 

### contextMenuHidden
#### Requires @react-native-community/clipboard to be installed.
If true, context menu is hidden.
`boolean ` 

### fractionDigits
Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
`number ` 

### initialNumber
A valid number (in en locale, i.e. only digits and a decimal point).
`number ` 

### leadingText
A leading text
`string ` 

### leadingTextStyle
The style of the leading text
`TextStyle ` 

### onChangeNumber
Callback that is called when the number value has changed.
`(data: NumberInputData) => void ` 

### textFieldProps
Most of TextField's props can be applied, except for ones that are passed directly via named props.
`TextFieldProps ` 

### trailingText
A trailing text
`string ` 

### trailingTextStyle
The style of the trailing text
`TextStyle ` 


