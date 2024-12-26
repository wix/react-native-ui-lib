---
id: ChipsInput
title: ChipsInput
sidebar_label: ChipsInput
---

A chips input  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ChipsInputScreen.tsx)
:::info
This component extends **[TextField](/docs/components/form/TextField)** props.
:::
:::tip
This component support **margin, color, typography** modifiers.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
``` jsx live
<ChipsInput
  placeholder={'Placeholder'}
  chips={[{label: 'Falcon 9'}, {label: 'Enterprise'}, {label: 'Challenger', borderRadius: 0}]}
/>
```
## API
### chips
List of chips to render
`ChipProps[] ` 

### defaultChipProps
Default set of props to pass by default to all chips
`ChipProps ` 

### maxChips
The maximum chips to allow adding
`number ` 

### onChange
Callback for chips change (adding or removing chip)
`(newChips, changeReason, updatedChip) => void ` 


