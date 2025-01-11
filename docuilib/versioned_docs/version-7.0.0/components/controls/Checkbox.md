---
id: Checkbox
title: Checkbox
sidebar_label: Checkbox
---

Checkbox component for toggling boolean value related to some context  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CheckboxScreen.tsx)
:::info
This component extends **[TouchableOpacity](/docs/components/basic/TouchableOpacity)** props.
:::
:::tip
This component support **margin, background** modifiers.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Checkbox/Checkbox.gif?raw=true'}/>

</div>

### Usage
``` jsx live
function Example(props) {
  const [value, setValue] = useState(false);
  return (
    <div>
      <Checkbox value={value} onValueChange={setValue}/>
    </div>
  );
}
```
## API
### borderRadius
The Checkbox border radius
`number ` 

### color
The Checkbox color
`string ` 

### containerStyle
Custom styling for the checkbox and label container
`ViewStyle ` 

### disabled
Whether the checkbox should be disabled
`boolean ` 

### iconColor
The selected icon color
`string ` 

### label
Add a label to the Checkbox
`string ` 

### labelProps
Props to pass on to the label component
`TextProps ` 

### labelStyle
Pass to style the label
`TextStyle ` 

### onChangeValidity
Callback for when field validity has changed
`(isValid: boolean) => void ` 

### onValueChange
Callback function for value change event
`(value) => void ` 

### outline
Alternative Checkbox outline style
`boolean ` 

### required
Whether the checkbox is required
`boolean ` 

### selectedIcon
The icon asset to use for the selected indication
`ImageRequireSource ` 

### size
The Checkbox size, affect both width and height
`number ` 

### style
Custom styling for the Checkbox
`ViewStyle ` 

### value
The Checkbox value. If true the switch will be turned on. Default value is false
`boolean ` 


