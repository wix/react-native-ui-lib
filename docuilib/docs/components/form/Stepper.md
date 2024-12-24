---
id: Stepper
title: Stepper
sidebar_label: Stepper
---

import UILivePreview from '@site/src/components/UILivePreview';

A stepper component  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/StepperScreen.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
<UILivePreview code={`<Stepper/>`}/>

## API
### accessibilityLabel
Component accessibility label
`string ` 

### disabled
Disables interaction with the stepper
`boolean ` 

### maxValue
Maximum value
`number ` 

### minValue
Minimum value
`number ` 

### onValueChange
Value change callback function
`(value: number, testID?: string) => void ` 

### small
Renders a small sized Stepper
`boolean ` 

### step
The step to increase and decrease by (default is 1)
`number ` 

### testID
Test id for component
`string ` 

### type
Stepper style type
`StepperType ` 

### value
Stepper value
`number ` 


