---
sidebar_position: 1
id: Card
title: Card
sidebar_label: Card
---

Customizable card component that handles press events  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.tsx)
:::info
This component extends **[TouchableOpacity](/docs/components/basic/TouchableOpacity)** props.
:::
:::tip
This component support **margin, padding** modifiers.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Card/Cards_01.png?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Card/Cards_02.png?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Card/Cards_03.png?raw=true'}/>

</div>

### Usage
``` jsx live
<Card  width={70} height={70} onPress={() => console.log('pressed')}>
 <Card.Image
   width={70}
   height={70}
   source={{uri: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=200'}}
 />
</Card>
```
## API
### blurOptions
Blur options for blur effect according to @react-native-community/blur lib (make sure enableBlur is on)
`object ` 

### borderRadius
Card border radius (will be passed to inner Card.Image component)
`number ` 

### containerStyle
Additional styles for the card container
`ViewStyle ` 

### elevation
#### Android only
Elevation value
`number ` 

### enableBlur
#### iOS only
Enable blur effect
`boolean ` 

### enableShadow
Whether the card should have shadow or not
`boolean ` 

### height
Card custom height
`number | string ` 

### onPress
Callback function for card press event
`function ` 

### row
Should inner card flow direction be horizontal
`boolean ` 

### selected
Adds visual indication that the card is selected
`boolean ` 

### selectionOptions
Custom options for styling the selection indication
`CardSelectionOptions ` 

### width
Card custom width
`number | string ` 


