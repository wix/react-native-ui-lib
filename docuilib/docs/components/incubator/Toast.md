---
id: Toast
title: Incubator.Toast
sidebar_label: Toast
---

import UILivePreview from '@site/src/components/UILivePreview';

A toast component for displaying non-disruptive messages to the user  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/incubatorScreens/IncubatorToastScreen.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
<UILivePreview code={`<Toast
  visible={isVisible}
  position={'top'}
  autoDismiss={5000}
  onDismiss={onDismiss}
>`}/>

## API
### action
A single action for the user (showLoader will override this)
`ButtonProps ` 

### autoDismiss
Time of milliseconds to automatically invoke the onDismiss callback
`number ` 

### backgroundColor
The toast background color
`string ` 

### centerMessage
Should message be centered in the toast
`boolean ` 

### containerStyle
Toast container style
`ViewStyle ` 

### elevation
#### Android only
Custom elevation
`number ` 

### enableHapticFeedback
Whether to trigger an haptic feedback once the toast is shown (requires react-native-haptic-feedback dependency)
`boolean ` 

### icon
A custom icon to render on the left side of the toast
`ImageSourcePropType ` 

### iconColor
The icon color
`string ` 

### message
Toast message
`string ` 

### messageProps
Toast message props
`TextProps ` 

### messageStyle
Toast message style
`StyleProp<TextStyle> ` 

### onAnimationEnd
Callback for end of toast animation
`(visible?: boolean) => void ` 

### onDismiss
Callback for the toast dismissal
`() => void ` 

### position
The position of the toast. 'top' or 'bottom'.
`'top' | 'bottom' ` 

### preset
Pass to have preset UI
`ToastPreset ('success' | 'failure' | 'general' | 'offline') ` 

### renderAttachment
Render a custom view that will appear permanently above or below a Toast, depends on the Toast's position and animate with it when the Toast is made visible or dismissed
`() => JSX.Element | undefined ` 

### showLoader
Whether to show a loader
`boolean ` 

### style
Toast style
`ViewStyle ` 

### swipeable
Whether to support dismissing the toast with a swipe gesture. Requires to pass onDismiss method to control visibility
`boolean ` 

### testID
The component test id
`string ` 

### visible
Whether to show or hide the toast
`boolean ` 

### zIndex
Custom zIndex for toast
`number ` 


