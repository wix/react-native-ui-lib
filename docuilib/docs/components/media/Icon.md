---
id: Icon
title: Icon
sidebar_label: Icon
---

import UILivePreview from '@site/src/components/UILivePreview';

Icon component  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/IconScreen.tsx)
:::info
This component extends **[Image](https://reactnative.dev/docs/image)** props.
:::
:::tip
This component support **margin** modifiers.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
<UILivePreview code={`<Icon source={Assets.icons.demo.drag} tintColor={Colors.grey40}/>`}/>

## API
### assetGroup
the asset group, default is icons
`string ` 

### assetName
if provided icon source will be driven from asset name
`string ` 

### recorderTag
Recorder Tag
`'mask' | 'unmask' ` 

### size
The icon size
`number ` 

### supportRTL
whether the image should flip horizontally on RTL locals
`boolean ` 

### tintColor
The icon tint
`string ` 


