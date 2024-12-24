---
id: Chip
title: Chip
sidebar_label: Chip
---

import UILivePreview from '@site/src/components/UILivePreview';

Chip component  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ChipScreen.tsx)
:::info
This component extends **[TouchableOpacity, View](https://github.com/wix/react-native-ui-lib/blob/master/src/components/touchableOpacity/index.tsx,https://github.com/wix/react-native-ui-lib/blob/master/src/components/view/index.tsx)** props.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://user-images.githubusercontent.com/1780255/119636022-e9743180-be1c-11eb-8f02-22eeab6558cd.png'}/>

</div>

### Usage
<UILivePreview code={`<Chip label={'Chip'} onPress={() => console.log('pressed')}/>`}/>

## API
### avatarProps
Avatar props object
`AvatarProps ` 

### backgroundColor
Background color
`string ` 

### badgeProps
Badge props object
`BadgeProps ` 

### borderRadius
Border radius
`number ` 

### containerStyle
Component's container style
`ViewStyle ` 

### dismissColor
Dismiss color
`string ` 

### dismissContainerStyle
Dismiss container style
`ImageStyle ` 

### dismissIcon
Dismiss asset
`ImageSourcePropType ` 

### dismissIconStyle
Dismiss style
`ImageStyle ` 

### iconProps
Additional icon props
`Omit<ImageProps, 'source'> ` 

### iconSource
Left icon's source
`ImageSourcePropType ` 

### iconStyle
Icon style
`ImageStyle ` 

### label
Main Chip text
`string ` 

### labelStyle
Label's style
`TextStyle ` 

### leftElement
Left custom element
`JSX.Element ` 

### onDismiss
Adds a dismiss button and serves as its callback
`(props: any) => void ` 

### onPress
On Chip press callback
`(props: any) => void ` 

### resetSpacings
Disables all internal elements default spacings. Helps reach a custom design
`boolean ` 

### rightElement
Right custom element
`JSX.Element ` 

### rightIconSource
Right icon's source
`ImageSourcePropType ` 

### size
Chip's size. Number or a width and height object
`number | {{width: number, height: number}} ` 

### testID
The test id for e2e tests
`string ` 

### useCounter
Display badge as counter (no background)
`boolean ` 

### useSizeAsMinimum
Uses size as minWidth and minHeight
`boolean ` 


