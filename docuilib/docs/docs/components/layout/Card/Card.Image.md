---
id: Card.Image
title: Card.Image
sidebar_label: Image
---

import UILivePreview from '@site/src/components/UILivePreview';

Inner component for the Card component (better be a direct child)  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.tsx)
:::info
This component extends **[Image](/docs/components/media/Image)** props.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
<UILivePreview code={`<Card.Image source={{uri: 'https://github.com/wix/react-native-ui-lib/blob/master/demo/src/assets/images/card-example.jpg'}} height={115}/>`}/>

## API
### height
Height
`number ` 

### position
The Image position which determines the appropriate flex-ness of the image and border radius (for Android) this prop derived automatically from Card parent component if it rendered as a direct child of the Card component
`string[] ` 

### width
Width
`number ` 


