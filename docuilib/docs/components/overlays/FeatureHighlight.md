---
id: FeatureHighlight
title: FeatureHighlight
sidebar_label: FeatureHighlight
---

import UILivePreview from '@site/src/components/UILivePreview';

Component for feature discovery  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FeatureHighlightScreen.tsx)
:::note
FeatureHighlight component must be a direct child of the root view returned in render(),If the element to be highlighted doesn't have a style attribute add 'style=\{\{opacity: 1\}\}' so the Android OS can detect it,FeatureHighlight uses a native library. You MUST add and link the native library to both iOS and Android projects. For instruction please see: https://facebook.github.io/react-native/docs/linking-libraries-ios.html
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/FeatureHighlight/FeatureHighlight.gif?raw=true'}/>

</div>

### Usage
<UILivePreview code={`<FeatureHighlight
 visible={isVisible}
 title={'Title'}
 message={'Message goes here'}
 getTarget={targets[currentTarget]}
 confirmButtonProps={{label: 'Got It', onPress: () => console.log('confirmed')}}
 onBackgroundPress={() => console.log('background pressed')}
/>`}/>

## API
### borderColor
Color of the border around the highlighted element
`string ` 

### borderRadius
Border radius for the border corners around the highlighted element
`number ` 

### borderWidth
Width of the border around the highlighted element
`number ` 

### confirmButtonProps
Props that will be passed to the dismiss button
`ButtonProps ` 

### getTarget
Callback that extract the ref of the element to be highlighted
`() => any ` 

### highlightFrame
Frame of the area to highlight \{x, y, width, height\}
`HighlightFrame ` 

### innerPadding
The padding of the highlight frame around the highlighted element's frame (only when passing ref in 'getTarget')
`number ` 

### message
Message to be displayed
`string ` 

### messageNumberOfLines
Message's max number of lines
`number ` 

### messageStyle
Message text style
`TextStyle ` 

### minimumRectSize
#### Android API 21+, and only when passing a ref in 'getTarget'
The minimum size of the highlighted component
`RectSize ` 

### onBackgroundPress
Called the background pressed
`TouchableWithoutFeedbackProps['onPress'] ` 

### overlayColor
Color of the content's background (usually includes alpha for transparency)
`string ` 

### pageControlProps
PageControl component's props
`PageControlProps ` 

### testID
The test id for e2e tests
`string ` 

### textColor
Color of the content's text
`string ` 

### title
Title of the content to be displayed
`string ` 

### titleNumberOfLines
Title's max number of lines
`number ` 

### titleStyle
Title text style
`TextStyle ` 

### visible
Determines if to present the feature highlight component
`boolean ` 


