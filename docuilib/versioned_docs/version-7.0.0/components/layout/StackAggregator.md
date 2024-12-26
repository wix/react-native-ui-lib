---
id: StackAggregator
title: StackAggregator
sidebar_label: StackAggregator
---

Stack aggregator component  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/StackAggregatorScreen.tsx)
:::tip
This component support **margin, padding** modifiers.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
``` jsx live
<StackAggregator
 onItemPress={() => console.log('pressed')}
>
  {_.map(items, (item, index) => {
    return renderItem(item, index);
  })}
</StackAggregator>
```
## API
### buttonProps
Props passed to the 'show less' button
`ButtonProps ` 

### children
Component Children
`JSX.Element | JSX.Element[] ` 

### collapsed
The initial state of the stack
`boolean ` 

### containerStyle
The container style
`ViewStyle ` 

### contentContainerStyle
The content container style
`ViewStyle ` 

### disablePresses
A setting that disables pressability on cards
`boolean ` 

### itemBorderRadius
The items border radius
`number ` 

### onCollapseChanged
A callback for collapse state change (value is collapsed state)
`(changed: boolean) => void ` 

### onCollapseWillChange
A callback for collapse state will change (value is future collapsed state)
`(changed: boolean) => void ` 

### onItemPress
A callback for item press
`(index: number) => void ` 


