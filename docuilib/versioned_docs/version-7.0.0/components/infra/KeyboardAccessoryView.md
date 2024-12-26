---
id: KeyboardAccessoryView
title: KeyboardAccessoryView
sidebar_label: KeyboardAccessoryView
---

View that allows replacing the default keyboard with other components  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/nativeComponentScreens/keyboardAccessory/KeyboardAccessoryViewScreen.js)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/KeyboardAccessoryView/KeyboardAccessoryView.gif?raw=true'}/>

</div>

### Usage
``` jsx live
<KeyboardAccessoryView
 renderContent={this.renderContent()}
 kbInputRef={this.inputRef}
 kbComponent={}
 kbInitialProps={}
 onHeightChanged={this.onHeightChanged()}
 scrollBehavior={KeyboardAccessoryView.scrollBehaviors.NONE}
/>
```
## API
### kbComponent
The keyboard ID (the componentID sent to KeyboardRegistry)
`string ` 

### kbInitialProps
The props that will be sent to the KeyboardComponent
`any ` 

### kbInputRef
#### iOS only
The reference to the actual text input (or the keyboard may not reset when instructed to, etc.).
`any ` 

### onHeightChanged
A callback for when the height is changed
`(height: number) => void ` 

### onItemSelected
Callback that will be called when an item on the keyboard has been pressed.
`() => void ` 

### onKeyboardResigned
Callback that will be called once the keyboard has been closed
`() => void ` 

### onRequestShowKeyboard
Callback that will be called if KeyboardRegistry.requestShowKeyboard is called.
`() => void ` 

### renderContent
Content to be rendered above the keyboard
`() => React.ReactElement ` 


