---
id: MaskedInput
title: MaskedInput
sidebar_label: MaskedInput
---

Mask Input to create custom looking inputs with custom formats  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/MaskedInputScreen.tsx)
:::info
This component extends **[TextInput](https://reactnative.dev/docs/textinput)** props.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://camo.githubusercontent.com/61eedb65e968845d5eac713dcd21a69691571fb1/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f4b5a5a7446666f486f454b334b2f67697068792e676966'}/>

</div>

### Usage
``` jsx live
function Example(props) {
  const [value, setValue] = useState('15');

  const renderTimeText = useCallback((value) => {
    const paddedValue = _.padStart(value, 4, '0');
    const hours = paddedValue.substr(0, 2);
    const minutes = paddedValue.substr(2, 2);

    return (
      <Text text20 grey20 center>
        {hours}
        <Text red10>h</Text>
        {minutes}
        <Text red10>m</Text>
      </Text>
    );
  }, []);

  const formatter = useCallback(value => value?.replace(/\D/g, ''), []);
  return (
    <div>
      <MaskedInput
        migrate
        renderMaskedText={renderTimeText}
        formatter={formatter}
        keyboardType={'numeric'}
        maxLength={4}
        initialValue={value}
        // onChangeText={setValue}
      />
    </div>
  );
}
```
## API
### containerStyle
container style for the masked input container
`ViewStyle ` 

### renderMaskedText
callback for rendering the custom input out of the value returns from the actual input
`React.ReactElement ` 


