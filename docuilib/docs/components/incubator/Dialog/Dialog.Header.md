---
id: Dialog.Header
title: Incubator.Dialog.Header
sidebar_label: Header
---

import UILivePreview from '@site/src/components/UILivePreview';

Component for displaying the header of a popup dialog  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/incubatorScreens/IncubatorDialogScreen.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
<UILivePreview code={`<Dialog.Header title={'Title'} subtitle={'Subtitle'} trailingAccessory={renderAccessory}/>`}/>

## API
### bottomAccessory
Pass to render a bottom element below the subtitle
`ReactElement ` 

### contentContainerStyle
Style for the leading + content + trailing components (without the bottomAccessory)
`ViewProps['style'] ` 

### leadingAccessory
Pass to render a leading element
`ReactElement ` 

### onPress
onPress callback for the inner content
`() => void ` 

### showDivider
Show the header's divider
`boolean ` 

### showKnob
Show the header's knob
`boolean ` 

### subtitle
Subtitle
`string ` 

### subtitleProps
Subtitle extra props
`TextProps ` 

### subtitleStyle
Subtitle text style
`StyleProp<TextStyle> ` 

### title
Title
`string ` 

### titleProps
Title extra props
`TextProps ` 

### titleStyle
Title text style
`StyleProp<TextStyle> ` 

### topAccessory
Pass to render a top element above the title
`ReactElement ` 

### trailingAccessory
Pass to render a trailing element
`ReactElement ` 


