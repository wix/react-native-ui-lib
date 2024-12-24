---
id: GridListItem
title: GridListItem
sidebar_label: GridListItem
---

import UILivePreview from '@site/src/components/UILivePreview';

A single grid view/list item component  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/GridViewScreen.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
<UILivePreview code={`<GridListItem key={index} title={'Title'} subtitle={'Subtitle'} description={'Description goes here'}/>`}/>

## API
### alignToStart
Should content be align to start
`boolean ` 

### containerProps
Props to pass on to the touchable container
`TouchableOpacityProps | ViewProps ` 

### containerStyle
Custom container style
`ViewStyle ` 

### description
Description content text
`string | React.ReactElement ` 

### descriptionColor
Description content color
`string ` 

### descriptionLines
Description content number of lines
`number ` 

### descriptionTypography
Description content typography
`string ` 

### horizontalAlignment
Content horizontal alignment
`HorizontalAlignment ` 

### imageProps
Image props object for rendering an image item
`ImageProps ` 

### itemSize
The item size
`number | ImageSize ` 

### onPress
The item's action handler
`TouchableOpacityProps['onPress'] ` 

### overlayText
Renders the title, subtitle and description inside the item
`boolean ` 

### overlayTextContainerStyle
Custom container styling for inline text
`ViewStyle ` 

### renderCustomItem
Custom GridListItem to be rendered in the GridView
`() => React.ReactElement ` 

### renderOverlay
Renders an overlay on top of the image
`() => React.ReactElement ` 

### subtitle
Subtitle content text
`string | React.ReactElement ` 

### subtitleColor
Subtitle content color
`string ` 

### subtitleLines
Subtitle content number of lines
`number ` 

### subtitleTypography
Subtitle content typography
`string ` 

### testID
Test ID for component
`string ` 

### title
Title content text
`string | React.ReactElement ` 

### titleColor
Title content color
`string ` 

### titleLines
Title content number of lines
`number ` 

### titleTypography
Title content typography
`string ` 


