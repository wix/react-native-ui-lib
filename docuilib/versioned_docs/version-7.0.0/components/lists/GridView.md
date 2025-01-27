---
id: GridView
title: GridView
sidebar_label: GridView
---

An auto-generated grid view that calculate item size according to given props  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/GridViewScreen.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
``` jsx live
<GridView
 items={[{title: 'item 1', onPress: () => console.log('item 1 pressed')}, {title: 'item 2', onPress: () => console.log('item 2 pressed')}]}
 numColumns={2}
 lastItemLabel={'+'}
 lastItemOverlayColor={'Colors.rgba(Colors.blue30)'}
/>
```
## API
### itemSpacing
Spacing between each item
`number ` 

### items
The list of items based on GridListItem props
`GridListItemProps[] ` 

### keepItemSize
whether to keep the items initial size when orientation changes, in which case the apt number of columns will be calculated automatically.
`boolean ` 

### lastItemLabel
overlay label for the last item
`string | number ` 

### lastItemOverlayColor
color of overlay label for the last item
`string ` 

### numColumns
Number of items to show in a row
`number ` 

### renderCustomItem
Pass to render a custom item
`(item: GridListItemProps) => React.ReactElement ` 

### viewWidth
pass the desired grid view width (will improve loading time)
`number ` 


