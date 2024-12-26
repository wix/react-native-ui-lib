---
id: TabController.TabPage
title: TabController.TabPage
sidebar_label: TabPage
---

TabController's TabPage component  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
``` jsx live
<TabController.TabPage key={'key1'} lazy index={index}>
```
## API
### index
The index of the the TabPage
`number ` 

### lazy
Whether this page should be loaded lazily
`boolean ` 

### lazyLoadTime
How long to wait till lazy load complete (good for showing loader screens)
`number ` 

### renderLoading
Render a custom loading page when lazy loading
`() => JSX.Element ` 

### testID
The component test id
`string ` 


