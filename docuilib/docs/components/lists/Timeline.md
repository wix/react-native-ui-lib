---
id: Timeline
title: Timeline
sidebar_label: Timeline
---

import UILivePreview from '@site/src/components/UILivePreview';

A timeline item to render as part of a timeline list  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TimelineScreen.tsx)
:::info
This component extends **[View](https://reactnative.dev/docs/view)** props.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
<UILivePreview code={`<Timeline 
  renderContent={}
  state={Timeline.states.NEXT}/>
  topLine={{
    state: Timeline.states.ERROR
  }}
  bottomLine={{
    type: Timeline.lineTypes.DASHED,
    color: Colors.orange40
  }}
  point={{
    type: Timeline.pointTypes.OUTLINE,
    color: Colors.orange40,
    icon: Assets.icons.demo.camera,
    targetContainerRef: targetContainer,
    alignmentTargetRef: target
  }}
/>`}/>

## API
### backgroundColor
Background color for the item
`string ` 

### bottomLine
The bottom line props
`LineProps ` 

### point
The point props
`PointProps ` 

### renderContent
Custom content to render right to the timeline indicator
`any ` 

### state
The state of the timeline. Will affect the color of the indication (use static 'states')
`current | next | error | success ` 

### testID
The test id for e2e tests
`string ` 

### topLine
The top line props
`LineProps ` 


