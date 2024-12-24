---
sidebar_position: 1
id: Dialog
title: Dialog
sidebar_label: Dialog
---

import UILivePreview from '@site/src/components/UILivePreview';

Component for displaying custom content inside a popup dialog  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/DialogScreen.js)
:::tip
This component support **alignment** modifiers.
:::
:::note
Use alignment modifiers to control the dialog position (top, bottom, centerV, centerH, etc... by default the dialog is aligned to center)
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Dialog/Dialog.gif?raw=true'}/>

</div>

### Usage
<UILivePreview code={`<Dialog
 visible={isVisible}
 onDismiss={() => console.log('dismissed')}
 panDirection={PanningProvider.Directions.DOWN}
>
 <Text text60>Content</Text>
</Dialog>`}/>

## API
### containerStyle
Component's container style
`ViewStyle ` 

### height
Height
`string | number ` 

### ignoreBackgroundPress
Whether or not to ignore background press
`boolean ` 

### onDialogDismissed
Called once the dialog has been dismissed completely
`(props: any) => void ` 

### onDismiss
Called when clicking on the background
`(props?: any) => void ` 

### overlayBackgroundColor
The color of the overlay background
`string ` 

### panDirection
The direction of the allowed pan
`UP | DOWN | LEFT | RIGHT ` 

### pannableHeaderProps
The props that will be passed to the pannable header
`any ` 

### renderPannableHeader
#### If this is added only the header will be pannable. Props are transferred to the 'renderPannableHeader'
For scrollable content (the children of the dialog)
`(props: any) => JSX.Element ` 

### testID
The test id for e2e tests
`string ` 

### useSafeArea
In iOS, use safe area, in case component attached to the bottom
`boolean ` 

### visible
Control visibility of the component
`boolean ` 

### width
Width
`string | number ` 


