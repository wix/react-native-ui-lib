---
id: TextField
title: TextField
sidebar_label: TextField
---

An enhanced customizable TextField with validation support  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TextFieldScreen.tsx)
:::info
This component extends **[TextInput](https://reactnative.dev/docs/textinput)** props.
:::
:::tip
This component support **margin, color, typography** modifiers.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Incubator.TextField/FloatingPlaceholder.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Incubator.TextField/Validation.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Incubator.TextField/ColorByState.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Incubator.TextField/CharCounter.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Incubator.TextField/Hint.gif?raw=true'}/>

</div>

### Usage
``` jsx live
<TextField
  placeholder={'Placeholder'}
  floatingPlaceholder
  onChangeText={text => console.log(text)}
  enableErrors
  validateOnChange
  validate={['required', (value) => value.length > 6]}
  validationMessage={['Field is required', 'Password is too short']}
  showCharCounter
  maxLength={30}
/>
```
## API
### centered
Whether to center the TextField - container and label
`boolean ` 

### charCounterStyle
Pass custom style to character counter text
`TextStyle ` 

### color
Input color
`ColorType ` 

### containerProps
Container props of the whole component
`Omit<ViewProps, 'style'> ` 

### containerStyle
Container style of the whole component
`ViewStyle ` 

### enableErrors
Should support showing validation error message
`boolean ` 

### fieldStyle
Internal style for the field container to style the field underline, outline and fill color
`ViewStyle | (context: FieldContextType, props) => ViewStyle ` 

### floatOnFocus
Should placeholder float on focus or when start typing
`boolean ` 

### floatingPlaceholder
Pass to add floating placeholder support
`boolean ` 

### floatingPlaceholderColor
The floating placeholder color
`ColorType ` 

### floatingPlaceholderStyle
Custom style for the floating placeholder
`TextStyle ` 

### formatter
Custom formatter for the input value (used only when input if not focused)
`(value) => string | undefined ` 

### helperText
Text to display under the input
`string ` 

### hint
A hint text to display when focusing the field
`string ` 

### innerFlexBehavior
#### This may cause flex issues when the field is inside a row container
Set the inner container to use flex behavior to resolve text overflow issues when using leading or trailing accessories
`boolean ` 

### label
Field label
`string ` 

### labelColor
Field label color. Either a string or color by state map \(\{default, focus, error, disabled, readonly\})\
`ColorType ` 

### labelProps
Pass extra props to the label Text element
`TextProps ` 

### labelStyle
Custom style for the field label
`TextStyle ` 

### leadingAccessory
Pass to render a leading element
`ReactElement ` 

### onChangeValidity
Callback for when field validity has changed
`(isValid: boolean) => void ` 

### onClear
On clear button callback
`() => void ` 

### onValidationFailed
Callback for when field validated and failed
`(failedValidatorIndex: number) => void ` 

### placeholder
The placeholder for the field
`string ` 

### placeholderTextColor
Placeholder text color
`ColorType ` 

### preset
Predefined preset to use for styling the field
`Presets | `$\{Presets\}` | null | string ` 

### readonly
A UI preset for read only state
`boolean ` 

### recorderTag
Recorder Tag
`'mask' | 'unmask' ` 

### retainValidationSpace
Keep the validation space even if there is no validation message
`boolean ` 

### showCharCounter
Should show a character counter (works only with maxLength)
`boolean ` 

### showClearButton
Should show a clear button when there is a value
`boolean ` 

### showMandatoryIndication
Whether to show a mandatory field indication
`boolean ` 

### topTrailingAccessory
Pass to render a top trailing element
`ReactElement ` 

### trailingAccessory
Pass to render a trailing element
`ReactElement ` 

### useGestureHandlerInput
Use react-native-gesture-handler instead of react-native for the base TextInput
`boolean ` 

### validate
A single or multiple validator. Can be a string (required, email) or custom function.
`Validator | Validator[] ` 

### validateOnBlur
Should validate when losing focus of TextField
`boolean ` 

### validateOnChange
Should validate when the TextField value changes
`boolean ` 

### validateOnStart
Should validate when the TextField mounts
`boolean ` 

### validationIcon
Icon left to the validation message
`IconProps ` 

### validationMessage
The validation message to display when field is invalid (depends on validate)
`string | string[] ` 

### validationMessagePosition
The position of the validation message (top/bottom)
`ValidationMessagePosition ` 

### validationMessageStyle
Custom style for the validation message
`TextStyle ` 


