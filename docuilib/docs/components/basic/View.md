---
id: View
title: View
sidebar_label: View
---

import UILivePreview from '@site/src/components/UILivePreview';

An enhanced View component  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ViewScreen.js)
:::info
This component extends **[View](https://reactnative.dev/docs/view)** props.
:::
:::tip
This component support **margins, paddings, alignments, background, borderRadius** modifiers.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
<UILivePreview code={`<View row gap-s5 centerV>
  <View style={{width: 200, height: 200}} bg-purple40 centerH>
  <View style={{width: 60, height: 60}} bg-green20/>
  </View>
  <View style={{width: 150, height: 150}} bg-orange30 bottom right>
  <View style={{width: 50, height: 50}} bg-yellow40 br100 margin-s2/>
  </View>
</View>`}/>

## API
### animated
Use Animate.View as a container
`boolean ` 

### backgroundColor
Set background color
`string ` 

### inaccessible
Turn off accessibility for this view and its nested children
`boolean ` 

### reanimated
Use Animate.View (from react-native-reanimated) as a container
`boolean ` 

### recorderTag
Recorder Tag
`'mask' | 'unmask' ` 

### renderDelay
Experimental: Pass time in ms to delay render
`number ` 

### style
Custom style
`ViewStyle ` 

### useSafeArea
If true, will render as SafeAreaView
`boolean ` 


