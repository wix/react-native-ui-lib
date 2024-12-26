---
id: ConnectionStatusBar
title: ConnectionStatusBar
sidebar_label: ConnectionStatusBar
---

Top bar to show a 'no internet' connection status  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ConnectionStatusBarScreen.tsx)
:::note
Run on real device for best results,The component requires installing the '@react-native-community/netinfo' native library
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://user-images.githubusercontent.com/33805983/34683190-f3b1904c-f4a9-11e7-9d46-9a340bd35448.png'}/>

<img style={{maxHeight: '420px'}} src={'https://user-images.githubusercontent.com/33805983/34484206-edc6c6e4-efcb-11e7-88b2-cd394c19dd5e.png'}/>

</div>

### Usage
``` jsx live
<ConnectionStatusBar onConnectionChange={() => console.log('connection changed')}/>
```
## API
### allowDismiss
Whethere to allow the user to dismiss
`boolean ` 

### label
Text to show as the status
`string ` 

### onConnectionChange
Handler to get connection change events propagation
`(isConnected: boolean, isInitial: boolean) => void ` 

### useAbsolutePosition
Use absolute position for the component
`boolean ` 


