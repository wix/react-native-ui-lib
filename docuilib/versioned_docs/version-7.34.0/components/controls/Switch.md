---
id: Switch
title: Switch
sidebar_label: Switch
---

Switch component for toggling boolean value related to some context  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SwitchScreen.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Switch/Switch.gif?raw=true'}/>

</div>

### Usage
``` jsx live
function Example(props) {
  const [value, setValue] = useState(false);
  return (
    <div>
      <Switch value={value} onValueChange={setValue}/>
    </div>
  );
}
```
## API
### disabled
Whether the switch should be disabled
`boolean ` 

### disabledColor
The Switch background color when it's disabled
`string ` 

### height
The Switch height
`number ` 

### id
Component id
`string ` 

### offColor
The Switch background color when it's turned off
`string ` 

### onColor
The Switch background color when it's turned on
`string ` 

### onValueChange
Invoked with the new value when the value changes
`(value: boolean) => void ` 

### style
Custom style
`ViewStyle ` 

### testID
Component test id
`string ` 

### thumbColor
The Switch's thumb color
`string ` 

### thumbSize
The Switch's thumb size (width & height)
`number ` 

### thumbStyle
The Switch's thumb style
`ViewStyle ` 

### value
The value of the switch. If true the switch will be turned on. Default value is false
`boolean ` 

### width
The Switch width
`number ` 


