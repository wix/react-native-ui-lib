---
id: Image
title: Image
sidebar_label: Image
---

Image wrapper with extra functionality like source transform and assets support  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ImageScreen.tsx)
:::info
This component extends **[Image](https://reactnative.dev/docs/image)** props.
:::
:::tip
This component support **margin** modifiers.
:::
:::note
please note that for SVG support you need to add both `react-native-svg` and `react-native-svg-transformer` and also configure them (see `metro.config.js`)
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
``` jsx live
<Image width={50} height={50} source={{uri: 'https://images.pexels.com/photos/748837/pexels-photo-748837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}}/>
```
## API
### aspectRatio
The aspect ratio for the image
`number ` 

### assetGroup
the asset group, default is icons
`string ` 

### assetName
if provided image source will be driven from asset name
`string ` 

### cover
Show image as a cover, full width, image (according to aspect ratio, default: 16:8)
`boolean ` 

### customOverlayContent
Render an overlay with custom content
`JSX.Element ` 

### errorSource
Default image source in case of an error
`ImageSourcePropType ` 

### imageId
An imageId that can be used in sourceTransformer logic
`string ` 

### overlayColor
Pass a custom color for the overlay
`string ` 

### overlayIntensity
OverlayIntensityType
`LOW | MEDIUM | HIGH ` 

### overlayType
#### the image MUST have proper size, see examples in: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/OverlaysScreen.tsx
The type of overlay to place on top of the image.
`VERTICAL | TOP | BOTTOM | SOLID ` 

### recorderTag
Recorder Tag
`'mask' | 'unmask' ` 

### sourceTransformer
custom source transform handler for manipulating the image source (great for size control)
`(props: any) => ImageSourcePropType ` 

### supportRTL
whether the image should flip horizontally on RTL locals
`boolean ` 

### tintColor
the asset tint
`string ` 

### useBackgroundContainer
Use a container for the Image, this can solve issues on Android when animation needs to be performed on the same view; i.e. animation related crashes on Android.
`boolean ` 


