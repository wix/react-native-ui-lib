---
id: Overlay
title: Overlay
sidebar_label: Overlay
---

import UILivePreview from '@site/src/components/UILivePreview';

Overlay view with types  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/OverlaysScreen.tsx)
:::info
This component extends **[Image](https://reactnative.dev/docs/image)** props.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
<UILivePreview code={`<Image
 source={{uri: 'https://github.com/wix/react-native-ui-lib/blob/master/demo/src/assets/images/card-example.jpg'}}
 overlayType={Image.overlayTypes.BOTTOM}
/>`}/>

## API
### color
The overlay color
`string ` 

### customContent
Custom overlay content to be rendered on top of the image
`JSX.Element ` 

### intensity
The intensity of the gradient.
`low | medium | high ` 

### type
The type of overlay to set on top of the image
`vertical | top | bottom | solid (OverlayTypeType) ` 


