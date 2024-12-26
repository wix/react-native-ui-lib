---
id: Hint
title: Hint
sidebar_label: Hint
---

Hint component for displaying a tooltip over wrapped component  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/HintsScreen.tsx)
:::note
You can either wrap a component or pass a specific targetFrame
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Hint/Hint.gif?raw=true'}/>

</div>

### Usage
``` jsx live
<Hint visible={isVisible} message={'Message goes here'} color={Colors.red30} onBackgroundPress={() => setVisible(false)}>
  <Text>Text to hint</Text>
</Hint>
```
## API
### backdropColor
Color for background overlay (require onBackgroundPress)
`string ` 

### borderRadius
The hint's border radius
`number ` 

### color
The hint background color
`string ` 

### containerWidth
The hint container width
`number ` 

### customContent
Custom content element to render inside the hint container
`JSX.Element ` 

### edgeMargins
Hint margins from screen edges
`number ` 

### enableShadow
Enable shadow (for hint with white background only)
`boolean ` 

### icon
Icon to show next to the hint's message
`ImageSourcePropType ` 

### iconStyle
The icon's style
`ImageStyle ` 

### message
The hint message
`string | ReactElement ` 

### messageStyle
The hint message custom style
`TextStyle ` 

### offset
Hint offset from target
`number ` 

### onBackgroundPress
Callback for the background press
`(event: GestureResponderEvent) => void ` 

### onPress
Callback for Hint press
`() => void ` 

### position
The hint's position
`TOP | BOTTOM ` 

### removePaddings
Remove all hint's paddings
`boolean ` 

### style
Additional styling
`ViewStyle ` 

### targetFrame
Provide custom target position instead of wrapping a child
`{x?: number, y?: number, width?: number, height?: number} ` 

### testID
The hint's test identifier
`string ` 

### useModal
Open the hint using a Modal component
`boolean ` 

### useSideTip
Show side tips instead of the middle tip
`boolean ` 

### visible
Control the visibility of the hint
`boolean ` 


