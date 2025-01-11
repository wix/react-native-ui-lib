---
sidebar_position: 1
id: Picker
title: Picker
sidebar_label: Picker
---

Picker Component, support single or multiple selection, blurModel and native wheel picker  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PickerScreen.tsx)
:::tip
This component support **margin, padding, position** modifiers.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Picker/Default.gif?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Picker/MultiPicker.gif?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Picker/DialogPicker.gif?raw=true'}/>

<img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Picker/CustomPicker.gif?raw=true'}/>

</div>

### Usage
``` jsx live
<Picker
  value={currentValue}
  placeholder={'Placeholder'}
  onChange={() => console.log('changed')}
>
  {_.map(items, item => (
   return renderItem(item, index);
  ))}
</Picker>
```
## API
### customLoaderElement
Custom loader element
`ReactNode ` 

### customPickerProps
Custom picker props (when using renderPicker, will apply on the button wrapper)
`object ` 

### enableModalBlur
#### iOS only
Adds blur effect to picker modal
`boolean ` 

### fieldType
Pass for different field type UI (form, filter or settings)
`PickerFieldTypes ` 

### getLabel
A function that returns the label to show for the selected Picker value
`(value: string | number) => void ` 

### items
Data source for Picker
`{label: string, value: string | number}[] ` 

### listProps
Pass props to the list component that wraps the picker options (allows to control FlatList behavior)
`FlatListProps ` 

### migrate
Temporary prop required for migration to Picker's new API
`boolean ` 

### mode
SINGLE mode or MULTI mode
`SINGLE | MULTI ` 

### onChange
Callback for when picker value change
`(value: string | number) => void ` 

### onPress
Add onPress callback for when pressing the picker
`() => void ` 

### onSearchChange
Callback for picker modal search input text change (only when passing showSearch)
`(searchValue: string, filteredItems?: PickerFilteredItems) => void ` 

### pickerModalProps
Pass props to the picker modal
`ModalProps ` 

### renderCustomModal
Render custom picker modal
`({visible, children, toggleModal}) => void) ` 

### renderCustomSearch
Render custom search input (only when passing showSearch)
`(props) => void ` 

### renderItem
Render custom picker item
`(value, {{...props, isSelected}}, itemLabel) => void ` 

### renderPicker
Render custom picker - input will be value (see above)\Example:\renderPicker = \(selectedItem) => \{...\}\
`(selectedItem, itemLabel) => void ` 

### searchPlaceholder
Placeholder text for the search input (only when passing showSearch)
`string ` 

### searchStyle
Style object for the search input (only when passing showSearch)
`{color: string, placeholderTextColor: string, selectionColor: string} ` 

### selectionLimit
Limit the number of selected items
`number ` 

### showLoader
Show a loader (while items are loading/fetching)
`boolean ` 

### showSearch
Show search input to filter picker items by label
`boolean ` 

### topBarProps
The picker modal top bar props
`Modal's TopBarProps ` 

### useSafeArea
Add safe area in the Picker modal view
`boolean ` 

### useWheelPicker
Use wheel picker instead of a list picker
`boolean ` 

### value
Picker current value
`string | number ` 


