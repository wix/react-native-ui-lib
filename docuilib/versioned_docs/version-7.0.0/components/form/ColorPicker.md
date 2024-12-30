---
id: ColorPicker
title: ColorPicker
sidebar_label: ColorPicker
---

A picker component for color selection  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ColorPickerScreen.tsx)
:::note
This is a screen width component
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ColorPicker/ColorPicker.gif?raw=true'}/>

</div>

### Usage
``` jsx live
<ColorPicker
 colors={[Colors.green10, Colors.green20, Colors.green30, Colors.green40, Colors.green50, Colors.green60, Colors.green70]}
 initialColor={Colors.green10}
 value={currentColor}
 onDismiss={() => console.log('dismissed')}
 onSubmit={() => console.log('submit')}
 onValueChange={() => console.log('value changed')}
/>
```
## API
### accessibilityLabels
Accessibility labels as an object of strings
`{
 addButton: string,
 dismissButton: string,
 doneButton: string,
 input: string} ` 

### animatedIndex
#### Default is last
The index of the item to animate at first render
`number ` 

### backgroundColor
The ColorPicker's background color
`string ` 

### colors
Array of colors for the picker's color palette (hex values)
`string[] ` 

### onValueChange
Callback for the picker's color palette change
`(value: string, colorInfo: ColorInfo) => void ` 

### testID
The test id for e2e tests
`string ` 

### value
The value of the selected swatch
`string ` 


