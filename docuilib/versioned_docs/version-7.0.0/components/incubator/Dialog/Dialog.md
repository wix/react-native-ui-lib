---
sidebar_position: 1
id: Dialog
title: Incubator.Dialog
sidebar_label: Dialog
---

Component for displaying custom content inside a popup dialog  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/incubatorScreens/IncubatorDialogScreen.tsx)
:::tip
This component support **alignment** modifiers.
:::
:::note
Use alignment modifiers to control the dialog position (top, bottom, centerV, centerH, etc... by default the dialog is aligned to center).  
When adding a `FlatList` \ `ScrollView` to the content be sure to use one from `react-native-gesture-handler` (see [this link](https://github.com/software-mansion/react-native-gesture-handler/issues/1380) for `SectionList`).
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
``` jsx live
<Dialog
  visible={isVisible}
  onDismiss={() => console.log('dismissed')}
  panDirection={PanningProvider.Directions.DOWN}
>
  <Text text60>Content</Text>
</Dialog>
```
## API
### containerProps
Extra props for the container
`ViewProps ` 

### containerStyle
The Dialog`s container style (it is set to {position: 'absolute'})
`ViewStyle ` 

### direction
The direction from which and to which the dialog is animating \ panning (default down).
`up | down | left | right ` 

### headerProps
The Dialog's header (title, subtitle etc)
`DialogHeaderProps ` 

### ignoreBackgroundPress
Whether or not to ignore background press.
`boolean ` 

### modalProps
Pass props to the dialog modal
`ModalProps ` 

### onDismiss
Callback that is called after the dialog's dismiss (after the animation has ended).
`(props?: DialogProps) => void ` 

### showClose
Show the close button
`boolean ` 

### testID
Used to locate this view in end-to-end tests.  
The container has the original id.  
Supported inner elements IDs:  
`${TestID}.modal` - the Modal's id.  
`${TestID}.overlayFadingBackground` - the fading background id.
`string ` 

### visible
The visibility of the dialog
`boolean ` 


