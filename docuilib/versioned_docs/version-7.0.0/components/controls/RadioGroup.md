---
id: RadioGroup
title: RadioGroup
sidebar_label: RadioGroup
---

Wrap a group of Radio Buttons to automatically control their selection  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/RadioButtonScreen.js)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Default.gif?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Alignment.gif?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Custom.gif?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/RadioButton/Individual.png?raw=true'}/>

</div>

### Usage
``` jsx live
function Example(props) {
  const [currentValue, setCurrentValue] = useState('yes');
  return (
    <div>
      <RadioGroup initialValue={currentValue} onValueChange={setCurrentValue}>
        <RadioButton value={'yes'} label={'Yes'}/>
        <RadioButton marginT-10 value={'no'} label={'No'}/>
      </RadioGroup>
    </div>
  );
}
```
## API
### initialValue
The initial value of the selected radio button
`string | number | boolean ` 

### onValueChange
Invoked once when value changes, by selecting one of the radio buttons in the group
`((value?: string) => void) | ((value?: number) => void) | ((value?: boolean) => void) | ((value?: any) => void) ` 


