---
id: TouchableOpacity
title: TouchableOpacity
sidebar_label: TouchableOpacity
---

A wrapper for TouchableOpacity component. Support onPress, throttling and activeBackgroundColor  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/src/components/touchableOpacity/index.tsx)
:::info
This component extends **[TouchableOpacity](https://reactnative.dev/docs/touchableopacity)** props.
:::
:::tip
This component support **margins, paddings, alignments, background, borderRadius** modifiers.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://media.giphy.com/media/xULW8AMIgw7l31zjm8/giphy.gif'}/>

</div>

### Usage
``` jsx live
<TouchableOpacity onPress={() => console.log('pressed')}><Text text40>Click Me!</Text></TouchableOpacity>
```
## API
### activeBackgroundColor
Apply background color on TouchableOpacity when active (press is on)
`string ` 

### backgroundColor
Background color for TouchableOpacity
`string ` 

### customValue
Custom value of any type to pass on to TouchableOpacity and receive back in onPress callback
`any ` 

### onPress
On press callback
`(props?: TouchableOpacityProps & {event: GestureResponderEvent} | any) => void ` 

### recorderTag
Recorder Tag
`'mask' | 'unmask' ` 

### style
Custom style
`ViewStyle ` 

### throttleOptions
Throttle options
`ThrottleOptions ` 

### throttleTime
Throttle time in MS for onPress callback
`number ` 

### useNative
Should use an enhanced native implementation with extra features
`boolean ` 


