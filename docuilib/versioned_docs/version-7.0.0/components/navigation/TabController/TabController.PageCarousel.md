---
id: TabController.PageCarousel
title: TabController.PageCarousel
sidebar_label: PageCarousel
---

TabController's PageCarousel component  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx)
:::info
This component extends **[ScrollView](https://reactnative.dev/docs/scrollview)** props.
:::
:::note
You must pass `asCarousel` flag to TabController and render your TabPages inside a PageCarousel
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
``` jsx live
<TabController.PageCarousel>
  {_.map(items, (item, key) => {
   return ();
  })}
</TabController.PageCarousel>
```
## API

