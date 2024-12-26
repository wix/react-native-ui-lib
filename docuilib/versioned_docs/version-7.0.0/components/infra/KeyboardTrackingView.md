---
id: KeyboardTrackingView
title: KeyboardTrackingView
sidebar_label: KeyboardTrackingView
---

A UI component that enables 'keyboard tracking' for this view and it's sub-views.
Would typically be used when you have a TextField or TextInput inside this view.  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/nativeComponentScreens/KeyboardTrackingViewScreen.js)
:::note
This view is useful only for iOS.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/KeyboardTrackingView/KeyboardTrackingView.gif?raw=true'}/>

</div>

### Usage
``` jsx live
<KeyboardTrackingView
 style={}
 trackInteractive
 useSafeArea
>
 
</KeyboardTrackingView>
```
## API
### addBottomView
#### iOS only
Add a view beneath the KeyboardAccessoryView.
`boolean ` 

### allowHitsOutsideBounds
#### iOS only
Allow hitting sub-views that are placed beyond the view bounds.
`boolean ` 

### bottomViewColor
#### iOS only
The bottom view's color.
`string ` 

### manageScrollView
#### iOS only
Set to false to turn off inset management and manage it yourself.
`boolean ` 

### ref

`any ` 

### requiresSameParentToManageScrollView
#### iOS only
Set to true manageScrollView is set to true and still does not work,
it means that the ScrollView found is the wrong one and you'll have
to have the KeyboardAccessoryView and the ScrollView as siblings
and set this to true.
`boolean ` 

### revealKeyboardInteractive
#### iOS only
Show the keyboard on a negative scroll.
`boolean ` 

### scrollBehavior
#### iOS only
The scrolling behavior (use KeyboardTrackingView.scrollBehaviors.NONE | SCROLL_TO_BOTTOM_INVERTED_ONLY | FIXED_OFFSET)
`number ` 

### scrollToFocusedInput
Should the scrollView scroll to the focused input
`boolean ` 

### style

`ViewStyle ` 

### trackInteractive
Enables tracking of the keyboard when it's dismissed interactively (false by default).
Why? When using an external keyboard (BT),
you still get the keyboard events and the view just hovers when you focus the input.
Also, if you're not using interactive style of dismissing the keyboard
(or if you don't have an input inside this view) it doesn't make sense to track it anyway.
(This is caused because of the usage of inputAccessory to be able to track the keyboard interactive change and it introduces this bug)
`boolean ` 

### useSafeArea
#### iOS only
Whether or not to handle SafeArea.
`boolean ` 

### usesBottomTabs
#### iOS only
Whether or not to include bottom tab bar inset.
`boolean ` 


