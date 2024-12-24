---
sidebar_position: 1
id: ListItem
title: ListItem
sidebar_label: ListItem
---

import UILivePreview from '@site/src/components/UILivePreview';

List item component to render inside a List component  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/BasicListScreen.tsx)
:::info
This component extends **[TouchableOpacity](https://reactnative.dev/docs/touchableopacity)** props.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://media.giphy.com/media/l1IBjHowyPcOTWAY8/giphy.gif'}/>

</div>

### Usage
<UILivePreview code={`<ListItem onPress={() => console.log('pressed')}>
 <Text grey10 text60 marginL-10>The item</Text>
</ListItem>`}/>

## API
### containerElement
The container element to wrap the ListItem
`React.ComponentType<ListItemProps | TouchableOpacityProps> ` 

### containerStyle
Additional styles for the top container
`ViewStyle ` 

### height
the list item height
`ViewStyle['height'] ` 

### onLongPress
action for when long pressing the item
`() => void ` 

### onPress
action for when pressing the item
`() => void ` 

### style
The inner element style
`ViewStyle ` 

### testID
The test id for e2e tests
`string ` 

### underlayColor
The inner element pressed backgroundColor
`string ` 


