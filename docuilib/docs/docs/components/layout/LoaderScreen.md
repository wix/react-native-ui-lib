---
id: LoaderScreen
title: LoaderScreen
sidebar_label: LoaderScreen
---

import UILivePreview from '@site/src/components/UILivePreview';

Component that shows a full screen with an activity indicator  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/LoadingScreen.tsx)
:::info
This component extends **[ActivityIndicator](https://reactnative.dev/docs/activityindicator)** props.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
<UILivePreview code={`<LoaderScreen message={'Message goes here'} color={Colors.grey40}/>`}/>

## API
### backgroundColor
Color of the loader background (only when passing 'overlay')
`string ` 

### containerStyle
Custom container style
`ViewStyle ` 

### customLoader
Custom loader
`React.ReactChild ` 

### loaderColor
Color of the loading indicator
`string ` 

### message
loader message
`string ` 

### messageStyle
message style
`TextStyle ` 

### overlay
Show the screen as an absolute overlay
`boolean ` 


