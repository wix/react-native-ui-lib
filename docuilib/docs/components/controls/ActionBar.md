---
id: ActionBar
title: ActionBar
sidebar_label: ActionBar
---

import UILivePreview from '@site/src/components/UILivePreview';

Quick actions bar, each action support Button component props  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ActionBarScreen.tsx)
:::info
This component extends **[View](/docs/components/basic/View)** props.
:::
:::tip
This component support **margin, padding** modifiers.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ActionBar/ActionBar.gif?raw=true'}/>

</div>

### Usage
<UILivePreview code={`<View marginT-40>
  <ActionBar
    actions={[
      {label: 'Delete', onPress: () => console.log('delete')},
      {label: 'Replace Photo', onPress: () => console.log('replace photo')},
      {label: 'Edit', onPress: () => console.log('edit')}
    ]}
  />
</View>`}/>

## API
### actions
The actions for the action bar
`ButtonProps[] ` 

### backgroundColor
Background color
`string ` 

### centered
Should action be equally centered
`boolean ` 

### height
Height
`number ` 

### keepRelative
Keep the action bar position relative instead of it absolute position
`boolean ` 

### style
Component's style
`ViewStyle ` 

### useSafeArea
In iOS, use safe area, in case component attached to the bottom
`boolean ` 


