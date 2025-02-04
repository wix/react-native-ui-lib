---
id: KeyboardAwareInsetsView
title: KeyboardAwareInsetsView
sidebar_label: KeyboardAwareInsetsView
---

Used to add an inset when a keyboard is used and might hide part of the screen.  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TextFieldScreen.tsx)
:::info
This component extends **[KeyboardTrackingView](/docs/components/infra/KeyboardTrackingView)** props.
:::
:::note
This view is useful only for iOS.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
``` jsx live
<ScrollView>
  <TextField/>
  <TextField/>
  <KeyboardAwareInsetsView/>
<ScrollView>
```
## API

