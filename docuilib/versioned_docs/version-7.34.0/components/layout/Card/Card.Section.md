---
id: Card.Section
title: Card.Section
sidebar_label: Section
---

Inner component for rendering content easily inside a Card component  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.tsx)
:::info
This component extends **[View](/docs/components/basic/View)** props.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
``` jsx live
<Card.Section
 content={[{text: 'Card content here', text70: true, grey10: true}]}
 contentStyle={{alignItems: 'center'}}
/>
```
## API
### backgroundColor
Background color
`string ` 

### content
Text content. Example: content=\{[\{text: 'You’re Invited!', text70: true, grey10: true}\]}\
`ContentType[] ` 

### contentStyle
Component's container style
`ViewStyle ` 

### imageProps
Other image props that will be passed to the image
`ImageProps ` 

### imageSource
Will be used for the background when provided
`ImageSourcePropType ` 

### imageStyle
The style for the background image
`ImageStyle ` 

### leadingIcon
Image props for a leading icon to render before the text
`ImageProps ` 

### trailingIcon
Image props for a trailing icon to render after the text
`ImageProps ` 


