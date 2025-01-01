---
sidebar_position: 1
id: Wizard
title: Wizard
sidebar_label: Wizard
---

A wizard presents a series of steps in  prescribed order. That the user needs to complete in order to accomplish a goal (e.g. purchase a product)  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/WizardScreen.tsx)
:::note
Use Wizard with nested Wizard.Step(s) to achieve the desired result.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Wizard/Wizard.gif?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Wizard/WizardPresets.png?raw=true'}/>

</div>

### Usage
``` jsx live
<Wizard activeIndex={0} onActiveIndexChanged={() => console.log('changed')}>
  {_.map(items, item => (
   return renderItem(item, index);
  ))}
</Wizard>
```
## API
### activeConfig
The configuration of the active step (see Wizard.Step.propTypes)
`WizardStepProps ` 

### activeIndex
The active step's index
`number ` 

### containerStyle
Add or override style of the container
`ViewStyle ` 

### onActiveIndexChanged
Callback that is called when the active step is changed (i.e. a step was clicked on). The new activeIndex will be the input of the callback
`(index: number) => void ` 

### testID
The component test id
`string ` 


