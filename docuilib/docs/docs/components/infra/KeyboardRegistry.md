---
id: KeyboardRegistry
title: KeyboardRegistry
sidebar_label: KeyboardRegistry
---

import UILivePreview from '@site/src/components/UILivePreview';

used for registering keyboards and performing certain actions on the keyboards.  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/nativeComponentScreens/keyboardAccessory/demoKeyboards.js)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
<UILivePreview code={`KeyboardRegistry.registerKeyboard('keyboardName', () => KeyboardComponent)`}/>

## API
### addListener
Add a listener for a callback.
globalID (string) - ID that includes the componentID and the event name
                     (i.e. if componentID='kb1' globalID='kb1.onItemSelected')
callback (function) - the callback to be called when the said event happens
`static function ` 

### getAllKeyboards
Get all keyboards
`static function ` 

### getKeyboard
Get a specific keyboard
componentID (string) - the ID of the keyboard.
`static function ` 

### getKeyboards
Get keyboards by IDs
componentIDs (string[]) - the ID of the keyboard.
`static function ` 

### notifyListeners
Notify that an event has occurred.
globalID (string) - ID that includes the componentID and the event name
                    (i.e. if componentID='kb1' globalID='kb1.onItemSelected')
args (object) - data to be sent to the listener.
`static function ` 

### onItemSelected
Default event to be used for when an item on the keyboard has been pressed.
componentID (string) - the ID of the keyboard.
args (object) - data to be sent to the listener.
`static function ` 

### registerKeyboard
Register a new keyboard.
componentID (string) - the ID of the keyboard.
generator (function) - a function for the creation of the keyboard.
params (object) - to be returned when using other methods (i.e. getKeyboards and getAllKeyboards).
`static function ` 

### removeListeners
Remove a listener for a callback.
globalID (string) - ID that includes the componentID and the event name
                    (i.e. if componentID='kb1' globalID='kb1.onItemSelected')
`static function ` 

### requestShowKeyboard
Request to show the keyboard
componentID (string) - the ID of the keyboard.
`static function ` 


