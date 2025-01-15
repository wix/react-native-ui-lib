---
id: Badge
title: Badge
sidebar_label: Badge
---

Round colored badge, typically used to show a number  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/BadgesScreen.tsx)
:::info
This component extends **[TouchableOpacity](/docs/components/basic/TouchableOpacity), [View](/docs/components/basic/View)** props.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://user-images.githubusercontent.com/33805983/34480753-df7a868a-efb6-11e7-9072-80f5c110a4f3.png'}/>

</div>

### Usage
``` jsx live
<Badge label={'999'} size={16}/>
```
## API
### backgroundColor
Background color
`string ` 

### borderColor
Color of border around the badge
`ImageStyle['borderColor'] ` 

### borderRadius
Radius of border around the badge
`number ` 

### borderWidth
Width of border around the badge
`number ` 

### containerStyle
Additional styles for the top container
`ViewStyle ` 

### customElement
Custom element to render instead of an icon
`JSX.Element ` 

### hitSlop
Defines how far a touch event can start away from the badge
`ViewProps['hitSlop'] ` 

### icon
Renders an icon badge
`ImageSourcePropType ` 

### iconProps
Additional props passed to icon
`ImageProps ` 

### iconStyle
Additional styling to badge icon
`ImageStyle ` 

### label
#### Passing a label (undefined) will present a pimple badge
Text to show inside the badge
`string ` 

### labelFormatterLimit
#### Beyond the max number for that digit length, a '+' will show at the end. 
If set to a value not included in LABEL_FORMATTER_VALUES, no formatting will occur. 
Example: labelLengthFormatter={2}, label={124}, label will present '99+'
Receives a number from 1 to 4, representing the label's max digit length
`LabelFormatterValues ` 

### labelStyle
Additional styles for the badge label
`TextStyle ` 

### onPress
Called when the badge is pressed
`(props: any) => void ` 

### size
Badge's size
`number ` 


