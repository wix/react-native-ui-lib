---
id: Wizard.Step
title: Wizard.Step
sidebar_label: Step
---

import UILivePreview from '@site/src/components/UILivePreview';

A wizard presents a series of steps in  prescribed order. That the user needs to complete in order to accomplish a goal (e.g. purchase a product)  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/WizardScreen.tsx)
:::note
Use Wizard with nested Wizard.Step(s) to achieve the desired result.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Wizard/Wizard.gif?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Wizard/WizardPresets.png?raw=true'}/>

</div>

### Usage
<UILivePreview code={`<Wizard.Step state={Wizard.States.ENABLED} label={'Label'}/>`}/>

## API
### accessibilityInfo
Extra text to be read in accessibility mode
`string ` 

### circleBackgroundColor
Circle's background color
`string ` 

### circleColor
Color of the circle
`string ` 

### circleSize
The step's circle size (diameter)
`number ` 

### color
Color of the step index (or of the icon, when provided)
`string ` 

### connectorStyle
Additional styles for the connector
`ViewStyle ` 

### enabled
Whether the step should be enabled
`boolean ` 

### icon
Icon to replace the (default) index
`ImageProps ` 

### indexLabelStyle
Additional styles for the index's label (when icon is not provided)
`TextStyle ` 

### label
The label of the item
`string ` 

### labelStyle
Additional styles for the label
`TextStyle ` 

### state
The state of the step (Wizard.States.X)
`WizardStepStates ` 


