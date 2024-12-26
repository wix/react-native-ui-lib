---
id: Slider
title: Slider
sidebar_label: Slider
---

A Slider component  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SliderScreen.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Slider/Slider.gif?raw=true'}/>

</div>

## API
### accessible
If true the component will have accessibility features enabled
`boolean ` 

### activeThumbStyle
The active (during press) thumb style
`ViewStyle ` 

### containerStyle
The container style
`ViewStyle ` 

### disableActiveStyling
If true the Slider will not change it's style on press
`boolean ` 

### disableRTL
If true the Slider will stay in LTR mode even if the app is on RTL mode
`boolean ` 

### disabled
If true the Slider will be disabled and will appear in disabled color
`boolean ` 

### initialMaximumValue
#### Only when `useRange` is true
Initial maximum value
`number ` 

### initialMinimumValue
#### Only when `useRange` is true
Initial minimum value
`number ` 

### maximumTrackTintColor
The track color
`string ` 

### maximumValue
Track maximum value
`number ` 

### migrate
Temporary prop required for migration to the Slider's new implementation
`boolean ` 

### minimumTrackTintColor
The color used for the track from minimum value to current value
`string ` 

### minimumValue
Track minimum value
`number ` 

### onRangeChange
Callback for onRangeChange. Returns values object with the min and max values
`SliderOnRangeChange ` 

### onReset
Callback that notifies when the reset function was invoked
`() => void ` 

### onSeekEnd
Callback that notifies about slider seeking is finished
`() => void ` 

### onSeekStart
Callback that notifies about slider seeking is started
`() => void ` 

### onValueChange
Callback for onValueChange
`SliderOnValueChange ` 

### renderTrack
Custom render instead of rendering the track
`() => ReactElement | ReactElement[] ` 

### step
Step value of the slider. The value should be between 0 and (maximumValue - minimumValue)
`number ` 

### testID
The component test id
`string ` 

### thumbStyle
The thumb style
`ViewStyle ` 

### thumbTintColor
Thumb color
`string ` 

### trackStyle
The track style
`ViewStyle ` 

### useGap
If true the min and max thumbs will not overlap
`boolean ` 

### useRange
If true the Slider will display a second thumb for the min value
`boolean ` 

### value
Initial value
`number ` 


