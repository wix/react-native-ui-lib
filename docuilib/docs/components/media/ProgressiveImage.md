---
id: ProgressiveImage
title: ProgressiveImage
sidebar_label: ProgressiveImage
---

import UILivePreview from '@site/src/components/UILivePreview';

Image component that loads first a small thumbnail of the images, and fades-in the full-sized image with animation once it's loaded  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ProgressiveImageScreen.js)
:::info
This component extends **[AnimatedImage](/docs/components/media/AnimatedImage)** props.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
<UILivePreview code={`<ProgressiveImage
  source={{uri: , cache: 'reload'}}
  thumbnailSource={{uri: , cache: 'reload'}}
/>`}/>

## API
### thumbnailSource
Small thumbnail source to display while the full-size image is loading
`ImageSource ` 


