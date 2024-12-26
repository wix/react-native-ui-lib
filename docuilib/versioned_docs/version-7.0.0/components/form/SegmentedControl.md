---
id: SegmentedControl
title: SegmentedControl
sidebar_label: SegmentedControl
---

SegmentedControl component for toggling two values or more  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SegmentedControlScreen.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
``` jsx live
<SegmentedControl segments={[{label: '1st'}, {label: '2nd'}]}/>
```
## API
### activeBackgroundColor
The background color of the active segment
`string ` 

### activeColor
The color of the active segment label
`string ` 

### backgroundColor
The background color of the inactive segments
`string ` 

### borderRadius
The segmentedControl borderRadius
`number ` 

### containerStyle
Additional spacing styles for the container
`ViewStyle ` 

### iconOnRight
Should the icon be on right of the label
`boolean ` 

### initialIndex
Initial index to be active
`number ` 

### label
SegmentedControl label
`string ` 

### labelProps
Pass props for the SegmentedControl label
`TextProps ` 

### onChangeIndex
Callback for when index has change.
`(index: number) => void ` 

### outlineColor
The color of the active segment outline
`string ` 

### outlineWidth
The width of the active segment outline
`number ` 

### segmentLabelStyle
Segment label style
`TextStyle ` 

### segments
Array on segments
`SegmentedControlItemProps ` 

### segmentsStyle
Additional style for the segments
`ViewStyle ` 

### style
Custom style to inner container
`ViewStyle ` 

### testID
Component test id
`string ` 

### throttleTime
Trailing throttle time of changing index in ms.
`number ` 


