---
id: FloatingButton
title: FloatingButton
sidebar_label: FloatingButton
---

Hovering button with gradient background  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FloatingButtonScreen.tsx)
:::tip
This component support **margin, background, color** modifiers.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/FloatingButton/FloatingButton.gif?raw=true'}/>

</div>

### Usage
``` jsx live
<FloatingButton visible={isVisible} button={{label: 'Approve', onPress: () => console.log('approved')}}}/>
```
## API
### bottomMargin
The bottom margin of the button, or secondary button if passed
`number ` 

### button
Props for the Button component
`ButtonProps ` 

### buttonLayout
Button layout direction: vertical or horizontal
`FloatingButtonLayouts ` 

### duration
The duration of the button's animations (show/hide)
`number ` 

### fullWidth
#### Relevant to vertical layout only
Whether the buttons get the container's full with
`boolean ` 

### hideBackgroundOverlay
Whether to show background overlay
`boolean ` 

### secondaryButton
Props for the secondary Button component
`ButtonProps ` 

### testID
#### Use `testID.button` for the main button or `testID.secondaryButton` for the secondary
The test id for e2e tests
`string ` 

### visible
Whether the component is visible
`boolean ` 

### withoutAnimation
Whether to show/hide the button without animation
`boolean ` 


