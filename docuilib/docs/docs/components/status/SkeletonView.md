---
id: SkeletonView
title: SkeletonView
sidebar_label: SkeletonView
---

import UILivePreview from '@site/src/components/UILivePreview';

Allows showing a temporary skeleton view while your real view is loading  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SkeletonViewScreen.tsx)
:::tip
This component support **margin** modifiers.
:::
:::note
Requires installing the 'react-native-shimmer-placeholder' and 'react-native-linear-gradient' libraries
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Skeleton/Skeleton.gif?raw=true'}/>

</div>

### Usage
<UILivePreview code={`<SkeletonView
  template={SkeletonView.templates.LIST_ITEM}
  showContent={isAvailable}
  renderContent={<ListItem><Text grey10 text60 marginL-10>The item</Text></ListItem>}
  times={10}
/>`}/>

## API
### borderRadius
The border radius of the skeleton view
`number ` 

### circle
Whether the skeleton is a circle (will override the borderRadius)
`boolean ` 

### colors
The colors of the skeleton view, the array length has to be >=2
`string[] ` 

### customValue
Custom value of any type to pass on to SkeletonView and receive back in the renderContent callback.
`any ` 

### height
The height of the skeleton view
`number ` 

### listProps
Props that are available when using template=\{SkeletonView.templates.LIST_ITEM\}
`SkeletonListProps ` 

### renderContent
A function that will render the content once the content is ready (i.e. showContent is true). The method will be called with the Skeleton's customValue (i.e. renderContent(props?.customValue))
`(customValue?: any) => React.ReactNode ` 

### shimmerStyle
Additional style to the skeleton view
`ViewStyle ` 

### showContent
The content has been loaded, start fading out the skeleton and fading in the content
`boolean ` 

### style
Override container styles
`ViewStyle ` 

### template
#### Accessible through SkeletonView.templates.xxx
The type of the skeleton view.
`listItem | content ` 

### testID
The component test id
`string ` 

### times
Generates duplicate skeletons
`number ` 

### timesKey
A key prefix for the duplicated SkeletonViews
`string ` 

### width
The width of the skeleton view
`number ` 


