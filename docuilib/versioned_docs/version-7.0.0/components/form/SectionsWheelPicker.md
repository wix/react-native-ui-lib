---
id: SectionsWheelPicker
title: SectionsWheelPicker
sidebar_label: SectionsWheelPicker
---

SectionsWheelPicker component for presenting set of WheelPickers  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SectionsWheelPickerScreen.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/SectionsWheelPicker/SectionsWheelPicker.gif?raw=true'}/>

</div>

### Usage
``` jsx live
<SectionsWheelPicker sections={sections}/>
```
## API
### activeTextColor
Text color for the focused row
`string ` 

### faderProps
Custom props for fader.
`FaderProps ` 

### inactiveTextColor
Text color for other, non-focused rows
`string ` 

### itemHeight
Describe the height of each item in the WheelPicker
`number ` 

### numberOfVisibleRows
Describe the number of rows visible
`number ` 

### sections
Array of sections
`WheelPickerProps ` 

### testID
The component test id
`string ` 

### textStyle
Row text style
`TextStyle ` 


