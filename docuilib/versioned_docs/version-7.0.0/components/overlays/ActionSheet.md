---
id: ActionSheet
title: ActionSheet
sidebar_label: ActionSheet
---

Cross platform Action Sheet, with a support for native iOS solutions  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ActionSheetScreen.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://media.giphy.com/media/l0HUpXOR6RqB2ct5S/giphy.gif'}/>

</div>

### Usage
``` jsx live
<ActionSheet
 title={'Title'}
 message={'Message goes here'}
 cancelButtonIndex={3}
 destructiveButtonIndex={0}
 options={[
  {label: '', onPress: },
  {label: '', onPress: },
  {label: 'Cancel', onPress: () => console.log('cancel')0}
 ]}
/>
```
## API
### cancelButtonIndex
Index of the option represents the cancel action (to be displayed as the separated bottom bold button)
`number ` 

### containerStyle
Add or override style of the action sheet (wraps the title and actions)
`ViewStyle ` 

### destructiveButtonIndex
Index of the option represents the destructive action (will display red text. Usually used for delete or abort actions)
`number ` 

### dialogStyle
Add or override style of the dialog wrapping the action sheet
`ViewStyle ` 

### message
Message of the action sheet
`string ` 

### onDismiss
Called when dismissing the action sheet (usually used for setting 'visible' prop to false)
`DialogProps['onDismiss'] ` 

### onModalDismissed
#### iOS only, modal only
Called once the modal has been dismissed
`DialogProps['onDialogDismissed'] ` 

### options
List of options for the action sheet, follows the Button prop types (supply 'label' string and 'onPress' function)
`Array<ButtonProps> ` 

### optionsStyle
Add or override style of the options list
`ViewStyle ` 

### renderAction
#### You will need to call 'onOptionPress' so the option's 'onPress' will be called
Render custom action
`
(
option: ButtonProps, 
index: number, 
onOptionPress: ActionSheetOnOptionPress
) => JSX.Element ` 

### renderTitle
Render custom title
`() => JSX.Element ` 

### showCancelButton
When passed (only with useNativeIOS), will display a cancel button at the bottom (overrides cancelButtonIndex)
`boolean ` 

### testID
The test id for e2e tests
`string ` 

### title
#### If both 'title' and 'message' are not passed will not render the title view at all
Title of the action sheet
`string ` 

### useNativeIOS
Should use the native action sheet for iOS
`boolean ` 

### useSafeArea
In iOS, use safe area, in case component attached to the bottom
`boolean ` 

### visible
Whether to show the action sheet or not
`boolean ` 


