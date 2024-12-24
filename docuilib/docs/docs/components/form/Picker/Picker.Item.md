---
id: Picker.Item
title: Picker.Item
sidebar_label: Item
---

import UILivePreview from '@site/src/components/UILivePreview';

Picker.Item, for configuring the Picker's selectable options  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PickerScreen.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Picker/Default.gif?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Picker/MultiPicker.gif?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Picker/DialogPicker.gif?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Picker/CustomPicker.gif?raw=true'}/>

</div>

### Usage
<UILivePreview code={`<Picker.Item key={index} value={item}/>`}/>

## API
### disabled
Is the item disabled
`boolean ` 

### getItemLabel
Custom function for the item label
`(value: string | number) => string ` 

### isSelected
Is the item selected
`boolean ` 

### label
Item's label
`string ` 

### labelStyle
Item's label style
`ViewStyle ` 

### onPress
Callback for onPress action, will stop selection if false is returned
`(selected: boolean | undefined, props: any) => void | Promise<boolean>; ` 

### onSelectedLayout
Callback for onLayout event
`(event: LayoutChangeEvent) => void ` 

### selectedIcon
Pass to change the selected icon
`string ` 

### selectedIconColor
Pass to change the selected icon color
`ImageSource ` 

### value
Item's value
`string | number ` 


