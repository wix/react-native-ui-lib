---
id: Avatar
title: Avatar
sidebar_label: Avatar
---

Avatar component for displaying user profile images  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/AvatarsScreen.tsx)
:::info
This component extends **[TouchableOpacity](/docs/components/basic/TouchableOpacity), [Image](/docs/components/media/Image)** props.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Avatar/Avarat_1.png?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Avatar/Avarat_2.png?raw=true'}/>

</div>

### Usage
``` jsx live
<Avatar source={{uri: 'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg'}} label={IT}/>
```
## API
### animate
Adds fade in animation when Avatar image loads
`boolean ` 

### autoColorsConfig
Send this to use the name to infer a backgroundColor
`AutoColorsProps ` 

### backgroundColor
Background color for Avatar
`string ` 

### badgePosition
Badge location on Avatar
`TOP_RIGHT | TOP_LEFT | BOTTOM_RIGHT | BOTTOM_LEFT ` 

### badgeProps
Badge props passed down to Badge component
`BadgeProps ` 

### containerStyle
Additional spacing styles for the container
`ViewStyle ` 

### customRibbon
Custom ribbon
`JSX.Element ` 

### imageProps
Image props object
`ImageProps ` 

### imageStyle
Image style object used to pass additional style props by components which render image
`ImageStyle ` 

### isOnline
Determine if to show online badge
`boolean ` 

### label
Label that can represent initials
`string ` 

### labelColor
The label color
`string ` 

### name
The name of the avatar user. If no label is provided, the initials will be generated from the name. autoColorsConfig will use the name to create the background color of the Avatar.
`string ` 

### onImageLoadEnd
Listener-callback for when an image's (uri) loading either succeeds or fails (equiv. to Image.onLoadEnd()).
`ImagePropsBase['onLoadEnd'] ` 

### onImageLoadError
Listener-callback for when an image's (uri) loading fails (equiv. to Image.onError()).
`ImagePropsBase['onError'] ` 

### onImageLoadStart
Listener-callback for when an image's (uri) loading starts (equiv. to Image.onLoadStart()).
`ImagePropsBase['onLoadStart'] ` 

### onPress
Press handler
`(props: any) => void ` 

### ribbonLabel
Ribbon label to display on the avatar
`string ` 

### ribbonLabelStyle
Ribbon label custom style
`TextStyle ` 

### ribbonStyle
Ribbon custom style
`ViewStyle ` 

### size
Custom size for the Avatar
` number ` 

### source
The image source (external or from assets)
`ImageSourcePropType ` 

### status
AWAY, ONLINE, OFFLINE or NONE mode (if set to a value other then 'NONE' will override isOnline prop)
`StatusModes ` 

### testID
Test identifier
`string ` 

### useAutoColors
Hash the name (or label) to get a color, so each name will have a specific color. Default is false.
`boolean ` 


