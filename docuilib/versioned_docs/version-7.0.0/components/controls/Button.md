---
id: Button
title: Button
sidebar_label: Button
---

Customizable button component that handles press events  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ButtonsScreen.tsx)
:::info
This component extends **[TouchableOpacity](/docs/components/basic/TouchableOpacity)** props.
:::
:::tip
This component support **margin, background** modifiers.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Sizes.png?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Typographies.png?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Outlines.png?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Corners.png?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Custom.png?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Inspirations.png?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Round.png?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Full.png?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Button/Button%20Animated.gif?raw=true'}/>

</div>

### Usage
``` jsx live
<Button label={'Press'} size={Button.sizes.medium} backgroundColor={Colors.red30}/>
```
## API
### animateLayout
should animate layout change
`boolean ` 

### animateTo
the direction of the animation ('left' and 'right' will effect the button's own alignment)
`ButtonAnimationDirection ` 

### avoidInnerPadding
avoid inner button padding
`boolean ` 

### avoidMinWidth
avoid minimum width constraints
`boolean ` 

### backgroundColor
Color of the button background
`string ` 

### borderRadius
Custom border radius.
`number ` 

### color
The Button text color (inherited from Text component)
`string ` 

### disabled
Disable interactions for the component
`boolean ` 

### disabledBackgroundColor
Color of the disabled button background
`string ` 

### enableShadow
Control shadow visibility (iOS-only)
`boolean ` 

### fullWidth
should the button act as a coast to coast button (no border radius)
`boolean ` 

### getActiveBackgroundColor
callback for getting activeBackgroundColor \(e.g. \(calculatedBackgroundColor, prop) => \{...\})\. Better set using ThemeManager
`(backgroundColor: string, props: any) => string ` 

### hyperlink
Button will look like a hyperlink
`boolean ` 

### iconOnRight
Should the icon be right to the label
`boolean ` 

### iconProps
Icon image props
`Partial<ImageProps> ` 

### iconSource
Icon image source or a callback function that returns a source
`ImageProps['source'] | Function ` 

### iconStyle
Icon image style
`ImageStyle ` 

### label
Text to show inside the button
`string ` 

### labelProps
Props that will be passed to the button's Text label.
`TextProps ` 

### labelStyle
Additional styles for label text
`TextStyle ` 

### link
Button will look like a link
`boolean ` 

### linkColor
label color for when it's displayed as link or hyperlink
`string ` 

### onPress
Actions handler
`(props: any) => void ` 

### outline
Button will have outline style
`boolean ` 

### outlineColor
The outline color
`string ` 

### outlineWidth
The outline width
`number ` 

### round
should the button be a round button
`boolean ` 

### size
Size of the button [large, medium, small, xSmall]
`ButtonSize ` 

### supportRTL
whether the icon should flip horizontally on RTL locals
`boolean ` 


