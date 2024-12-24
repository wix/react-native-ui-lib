---
id: Drawer
title: Drawer
sidebar_label: Drawer
---

import UILivePreview from '@site/src/components/UILivePreview';

Drawer Component  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/DrawerScreen.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Drawer/Drawer.gif?raw=true'}/>

</div>

## API
### bounciness
The drawer animation bounciness
`number ` 

### customValue
Custom value of any type to pass on to the component and receive back in the action callbacks
`any ` 

### disableHaptic
Whether to disable the haptic
`boolean ` 

### fullLeftThreshold
Threshold for a left full swipe (0-1)
`number ` 

### fullRightThreshold
Threshold for a right full swipe (0-1)
`number ` 

### fullSwipeLeft
Whether to allow a full left swipe
`boolean ` 

### fullSwipeRight
Whether to allow a full right swipe
`boolean ` 

### itemsIconSize
The items' icon size
`number ` 

### itemsMinWidth
Set a different minimum width
`number ` 

### itemsTextStyle
The items' text style
`TextStyle ` 

### itemsTintColor
The color for the text and icon tint of the items
`string ` 

### leftItem
The bottom layer's item to appear when opened from the left (a single item)
`ItemProps ` 

### onDragStart
Called when drag gesture starts
`() => any ` 

### onFullSwipeLeft
Callback for left item full swipe
`() => void ` 

### onFullSwipeRight
Callback for right item full swipe
`() => void ` 

### onSwipeableWillClose
Callback for close action
`() => void ` 

### onSwipeableWillOpen
Callback for open action
`() => void ` 

### onToggleSwipeLeft
Callback for left item toggle swipe
`() => {rowWidth, leftWidth, dragX, resetItemPosition} ` 

### onWillFullSwipeLeft
Callback for just before left item full swipe
`() => void ` 

### onWillFullSwipeRight
Callback for just before right item full swipe
`() => void ` 

### rightItems
The bottom layer's items to appear when opened from the right
`ItemProps[] ` 

### style
Component's style
`ViewStyle ` 

### testID
The test id for e2e tests
`string ` 

### useNativeAnimations
Perform the animation in natively
`boolean ` 


