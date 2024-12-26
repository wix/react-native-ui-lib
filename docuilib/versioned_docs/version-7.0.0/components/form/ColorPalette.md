---
id: ColorPalette
title: ColorPalette
sidebar_label: ColorPalette
---

A component for displaying a color palette  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ColorPickerScreen.tsx)
:::note
This is a screen width component
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ColorPalette/ColorPalette.gif?raw=true'}/>

</div>

### Usage
``` jsx live
<ColorPalette
 colors={['transparent', Colors.green30, Colors.yellow30, Colors.red30]}
 value={selectedColor}
 onValueChange={() => console.log('value changed')}
/>
```
## API
### animatedIndex
#### Default is last
The index of the item to animate at first render
`number ` 

### backgroundColor
The ColorPalette's background color
`string ` 

### colors
Array of colors to render in the palette
`string[] ` 

### containerStyle
Component's container style
`ViewStyle ` 

### containerWidth
The container margins
`number ` 

### loop
Whether the colors pagination scrolls in a loop
`boolean ` 

### numberOfRows
The number of color rows from 2 to 5
`number ` 

### onValueChange
Invoked once when value changes by selecting one of the swatches in the palette
`(value: string, colorInfo: ColorInfo) => void ` 

### style
Component's style
`ViewStyle ` 

### swatchStyle
Style to pass all the ColorSwatches in the palette
`ViewStyle ` 

### testID
The test id for e2e tests
`string ` 

### usePagination
Whether to use pagination when number of colors exceeds the number of rows
`boolean ` 

### value
The value of the selected swatch
`string ` 


