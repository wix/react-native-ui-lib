---
sidebar_position: 1
id: Modal
title: Modal
sidebar_label: Modal
---

import UILivePreview from '@site/src/components/UILivePreview';

Component that present content on top of the invoking screen  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ModalScreen.tsx)
:::info
This component extends **[Modal](https://reactnative.dev/docs/modal)** props.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://media.giphy.com/media/3oFzmfSX8KgvctI4Ks/giphy.gif'}/>

</div>

### Usage
<UILivePreview code={`<Modal visible={isVisible} onBackgroundPress={() => console.log('background pressed')}>
 <Text text60>Content</Text>
</Modal>`}/>

## API
### accessibilityLabel
Overrides the text that's read by the screen reader when the user interacts with the element.\By default, the label is constructed by traversing all the children and accumulating all the Text nodes separated by space.
`string ` 

### blurView
A custom view to use as a BlurView instead of the default one
`JSX.Element ` 

### enableModalBlur
#### iOS only
Blurs the modal background when transparent
`boolean ` 

### onBackgroundPress
allow dismissing a modal when clicking on its background
`(event: GestureResponderEvent) => void ` 

### overlayBackgroundColor
The background color of the overlay
`string ` 

### testID
The modal's end-to-end test identifier
`string ` 

### useGestureHandlerRootView
Should add a GestureHandlerRootView
`boolean ` 


