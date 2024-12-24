---
id: ColorSwatch
title: ColorSwatch
sidebar_label: ColorSwatch
---

import UILivePreview from '@site/src/components/UILivePreview';

A color swatch component  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ColorPickerScreen.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ColorPalette/ColorPalette.gif?raw=true'}/>

</div>

### Usage
<UILivePreview code={`<ColorSwatch color={Colors.red30} selected={true} onPress={() => console.log('pressed')}/>`}/>

## API
### animated
Is first render should be animated
`boolean ` 

### color
The color of the ColorSwatch
`string ` 

### index
The index of the Swatch if in array
`number ` 

### onPress
Callback from press event
`(value: string, colorInfo: ColorInfo) => void ` 

### selected
Is the initial state is selected
`boolean ` 

### size
Color Swatch size
`number ` 

### style
Component's style
`ViewStyle ` 

### unavailable
Is the initial state is unavailable
`boolean ` 

### value
#### Must be different than other ColorSwatches in the same group
The identifier value of the ColorSwatch in a ColorSwatch palette
`string ` 


