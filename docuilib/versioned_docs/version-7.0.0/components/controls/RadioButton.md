---
id: RadioButton
title: RadioButton
sidebar_label: RadioButton
---

A Radio Button component, should be wrapped with a RadioGroup  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/RadioButtonScreen.js)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Default.gif?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Alignment.gif?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Custom.gif?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Individual.png?raw=true'}/>

</div>

### Usage
``` jsx live
function Example(props) {
  const [value, setValue] = useState(false);
  return (
    <div>
      <RadioButton label={'Individual Radio Button'} selected={value} onPress={() => setValue(!value)}/>
    </div>
  );
}
```
## API
### borderRadius
The radio button border radius
`number ` 

### color
The color of the radio button
`string ` 

### containerStyle
Additional styling for the container
`ViewStyle ` 

### contentOnLeft
Should the content be rendered left to the button
`boolean ` 

### disabled
Whether the radio button should be disabled
`boolean ` 

### iconOnRight
Should the icon be on the right side of the label
`boolean ` 

### iconSource
Icon image source
`ImageSource ` 

### iconStyle
Icon image style
`ImageStyle ` 

### label
A label for the radio button description
`string ` 

### labelStyle
Label style
`TextStyle ` 

### onPress
Invoked when pressing the button
`(selected: boolean) => void ` 

### selected
When using RadioButton without a RadioGroup, use this prop to toggle selection
`boolean ` 

### size
The size of the radio button, affect both width & height
`number ` 

### value
The identifier value of the radio button. must be different than other RadioButtons in the same group
`string | number | boolean ` 


