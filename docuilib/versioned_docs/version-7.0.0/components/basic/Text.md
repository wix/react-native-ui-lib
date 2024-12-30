---
id: Text
title: Text
sidebar_label: Text
---

A wrapper for Text component with extra functionality like modifiers support  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TextScreen.tsx)
:::info
This component extends **[Text](https://reactnative.dev/docs/text)** props.
:::
:::tip
This component support **margins, color, typography** modifiers.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Modifiers.png?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Highlights.png?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Transformation.png?raw=true'}/>

</div>

### Usage
``` jsx live
<Text text30>Text goes here</Text>
```
## API
### animated
Use Animated.Text as a container
`boolean ` 

### center
Whether to center the text (using textAlign)
`boolean ` 

### color
Color of the text
`string ` 

### highlightString
Substring to highlight. Can be a simple string or a HighlightStringProps object, or an array of the above
`HighlightString | HighlightString[] ` 

### highlightStyle
Custom highlight style for highlight string
`TextStyle ` 

### recorderTag
Recorder Tag
`'mask' | 'unmask' ` 

### underline
Whether to add an underline
`boolean ` 

### uppercase
Whether to change the text to uppercase
`boolean ` 


