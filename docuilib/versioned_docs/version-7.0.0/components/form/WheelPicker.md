---
id: WheelPicker
title: WheelPicker
sidebar_label: WheelPicker
---

A customizable WheelPicker component  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/WheelPickerScreen.tsx)
:::note
When using Android by default the FlatList will have <code>maxToRenderPerBatch</code> prop set to <code>items.length</code> to solve FlatList bug on Android, you can override it by passing your own <code>flatListProps</code> with <code>maxToRenderPerBatch</code> prop.<br/>See the RN FlatList issue for more info: https://github.com/facebook/react-native/issues/15990
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
``` jsx live
<WheelPicker
  items={[{label: 'Yes', value: 'yes'}, {label: 'No', value: 'no'}, {label: 'Maybe', value: 'maybe'}]}
  initialValue={'yes'}
  onChange={() => console.log('changed')}
/>
```
## API
### activeTextColor
Text color for the focused row
`string ` 

### align
Align the content to center, right ot left
`WheelPickerAlign ` 

### flatListProps
Props to be sent to the FlatList.
`FlatListProps ` 

### inactiveTextColor
Text color for other, non-focused rows
`string ` 

### initialValue
Initial value (uncontrolled)
`number | string ` 

### itemHeight
Height of each item in the WheelPicker
`number ` 

### items
Data source for WheelPicker
`WheelPickerItemProps[] ` 

### label
Additional label to render next to the items text
`string ` 

### labelProps
Additional label's props
`TextProps ` 

### labelStyle
Additional label's style
`TextStyle ` 

### numberOfVisibleRows
Number of rows visible
`number ` 

### onChange
Change item event callback
`(item: string | number, index: number) => void ` 

### separatorsStyle
Extra style for the separators
`ViewStyle ` 

### style
#### height is computed according to itemHeight * numberOfVisibleRows
Container's custom style
`ViewStyle ` 

### testID
test identifier
`string ` 

### textStyle
Row text custom style
`TextStyle ` 


