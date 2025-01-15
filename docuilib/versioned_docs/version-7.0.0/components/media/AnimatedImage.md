---
id: AnimatedImage
title: AnimatedImage
sidebar_label: AnimatedImage
---

Image component that fades-in the image with animation once it's loaded  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/AnimatedImageScreen.js)
:::info
This component extends **[Image](/docs/components/media/Image)** props.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://media.giphy.com/media/l0HU7jj0ivEFyZIA0/giphy.gif'}/>

</div>

### Usage
``` jsx live
<AnimatedImage source={{uri: 'https://github.com/wix/react-native-ui-lib/blob/master/demo/src/assets/images/card-example.jpg'}}/>
```
## API
### animationDuration
Duration for the fade animation when the image is loaded
`number ` 

### containerStyle
Additional spacing styles for the container
`ViewStyle ` 

### loader
A component to render while the image is loading
`JSX.element ` 


