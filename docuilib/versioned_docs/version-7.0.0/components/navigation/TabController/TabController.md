---
sidebar_position: 1
id: TabController
title: TabController
sidebar_label: TabController
---

A performant solution for a tab controller with lazy load mechanism  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
``` jsx live
<TabController items={[{label: 'First'}, {label: 'Second'}, {label: 'Third'}]}>
  <TabController.TabBar enableShadows/>
  <View flex>
    <TabController.TabPage index={0}>{renderFirstPage()}</TabController.TabPage>
    <TabController.TabPage index={1} lazy>{renderSecondPage()}</TabController.TabPage>
    <TabController.TabPage index={2} lazy>{renderThirdPage()}</TabController.TabPage>
  </View>
</TabController>
```
## API
### asCarousel
When using TabController.PageCarousel this should be turned on
`boolean ` 

### carouselPageWidth;
Pass for custom carousel page width
`number ` 

### initialIndex
Initial selected index
`number ` 

### items
The list of tab bar items
`TabControllerItemProps[] ` 

### nestedInScrollView
#### Does not work with asCarousel
Pass when TabController is render inside a ScrollView (with a header)
`boolean ` 

### onChangeIndex
Callback for when index has change (will not be called on ignored items)
`(index: number, prevIndex: number | null) => void ` 


