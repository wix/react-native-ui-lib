---
id: AnimatedScanner
title: AnimatedScanner
sidebar_label: AnimatedScanner
---

description  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardScannerScreen.js)
:::info
This component extends **[Animated.View](https://reactnative.dev/docs/animated)** props.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://media.giphy.com/media/l49JVcxoclUXbryiA/giphy.gif'}/>

</div>

### Usage
``` jsx live
<AnimatedScanner progress={55} duration={1600}/>
```
## API
### backgroundColor
Background color
`string ` 

### containerStyle
Component's container style
`ViewStyle ` 

### duration
Duration of current break (can be change between breaks)
`number ` 

### hideScannerLine
Whether to hide the scanner line
`boolean ` 

### onBreakpoint
Breakpoint callback
`({progress, isDone}) => void ` 

### opacity
Opacity
`number ` 

### progress
Animated value between 0 and 100
`number ` 

### testID
Used as a testing identifier
`string ` 


