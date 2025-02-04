---
id: Slider
title: Incubator.Slider
sidebar_label: Slider
---

A Slider component  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/incubatorScreens/IncubatorSliderScreen.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
``` jsx live
<Incubator.Slider
  value={0}
  minimumValue={0}
  maximumValue={10}
  onValueChange={value => console.log(`value changed: ${value}`)}
/>
```
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

### disabledThumbTintColor
Disabled thumb color
`string ` 

### enableThumbShadow
Whether the thumb will have a shadow (with 'migrate' true only)
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

### throttleTime
Control the throttle time of the onValueChange and onRangeChange callbacks
`number ` 

### thumbHitSlop
Defines how far a touch event can start away from the thumb
`number ` 

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


