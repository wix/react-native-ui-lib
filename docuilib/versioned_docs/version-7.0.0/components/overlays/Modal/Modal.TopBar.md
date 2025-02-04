---
id: Modal.TopBar
title: Modal.TopBar
sidebar_label: TopBar
---

Modal.TopBar, inner component for configuring the Modal component's title, buttons and statusBar  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ModalScreen.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://media.giphy.com/media/3oFzmfSX8KgvctI4Ks/giphy.gif'}/>

</div>

### Usage
``` jsx live
<Modal.TopBar
 title={'Title'}
 onCancel={() => console.log('cancel')}
 onDone={() => console.log('done')}
/>
```
## API
### cancelButtonProps
Cancel action props
`ButtonProps ` 

### cancelIcon
Cancel action icon
`ImageSource ` 

### cancelLabel
Cancel action label
`string ` 

### containerStyle
Style for the TopBar container
`ViewStyle ` 

### doneButtonProps
Done action props
`ButtonProps ` 

### doneIcon
Done action icon
`ImageSource ` 

### doneLabel
Done action label
`string ` 

### includeStatusBar
Whether to include status bar or not (height calculations)
`boolean ` 

### leftButtons
Buttons to render on the left side of the top bar
`topBarButtonProp | topBarButtonProp[] ` 

### onCancel
Cancel action callback
`(props?: any) => void ` 

### onDone
Done action callback
`(props?: any) => void ` 

### rightButtons
Buttons to render on the right side of the top bar
`topBarButtonProp | topBarButtonProp[] ` 

### subtitle
Subtitle to display below the top bar title
`string ` 

### subtitleStyle
Subtitle custom style
`TextStyle ` 

### title
Title to display in the center of the top bar
`string ` 

### titleStyle
Title custom style
`TextStyle ` 


