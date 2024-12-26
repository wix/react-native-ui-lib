---
id: GridList
title: GridList
sidebar_label: GridList
---

An auto-generated grid list that calculate item size according to given props  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/GridListScreen.tsx)
:::info
This component extends **[FlatList](https://reactnative.dev/docs/flatlist)** props.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
``` jsx live
<GridList>
 data={items}
 maxItemWidth={140}
 numColumns={2}
 itemSpacing={Spacings.s3}
 listPadding={Spacings.s5}
/>
```
## API
### containerWidth
Pass when you want to use a custom container width for calculation
`number ` 

### contentContainerStyle
Custom content container style
`ScrollView[contentContainerStyle] ` 

### itemSpacing
Spacing between each item
`number ` 

### keepItemSize
whether to keep the items initial size when orientation changes, in which case the apt number of columns will be calculated automatically.
`boolean ` 

### listPadding
List padding (used for item size calculation)
`number ` 

### maxItemWidth
Allow a responsive item width to the maximum item width
`number ` 

### numColumns
Number of items to show in a row (ignored when passing maxItemWidth)
`number ` 


