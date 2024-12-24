---
id: TabController.TabBarItem
title: TabController.TabBarItem
sidebar_label: TabBarItem
---

import UILivePreview from '@site/src/components/UILivePreview';

TabController's TabBarItem component  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
<UILivePreview code={`<TabBarItem label={'Item'}/>`}/>

## API
### activeBackgroundColor
 Apply background color on press for TouchableOpacity
`string ` 

### activeOpacity
The active opacity when pressing a tab
`number ` 

### backgroundColor
 Apply background color for the tab bar item
`string ` 

### badge
Badge component props to display next the item label
`BadgeProps ` 

### icon
Icon of the tab
`number ` 

### iconColor
Icon tint color
`string ` 

### ignore
Ignore tab presses
`boolean ` 

### label
Label of the tab
`string ` 

### labelColor
The default label color
`string ` 

### labelProps
Extra label props to pass to label Text element
`TextProps ` 

### labelStyle
Custom label style
`TextStyle ` 

### leadingAccessory
Pass to render a leading element
`ReactElement ` 

### onPress
Callback for when pressing a tab
`(index: number) => void ` 

### selectedIconColor
Icon selected tint color
`string ` 

### selectedLabelColor
The selected label color
`string ` 

### selectedLabelStyle
Custom selected label style
`TextStyle ` 

### style
Pass custom style
`ViewStyle ` 

### testID
Used as a testing identifier
`string ` 

### trailingAccessory
Pass to render a trailing element
`ReactElement ` 

### uppercase
Whether to change the text to uppercase
`boolean ` 

### width
A fixed width for the item
`number ` 


