---
id: SortableList
title: SortableList
sidebar_label: SortableList
---

A sortable list component  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SortableListScreen.tsx)
:::info
This component extends **[FlatList](https://reactnative.dev/docs/flatlist)** props.
:::
:::note
We've seen a case where not all items are rendered on some Android devices, this appears to be a bug with `FlatList` that is using `CellRendererComponent`, our current workaround is for you to add `initialNumToRender={data.length}`.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
``` jsx live
function Example(props) {
  const data = Array.from({length: 10}, (_, index) => {
    let text = `${index}`;
    if (index === 3) {
      text = 'Locked item';
    }
  
    return {
      text,
      id: `${index}`,
      locked: index === 3
    };
  });

  const renderItem = useCallback(({item, index: _index}: {item: Item; index: number}) => {
    const {locked} = item;
    return (
      <View
        style={{height: 52, borderColor: Colors.$outlineDefault, borderBottomWidth: 1}}
        centerV
        centerH={locked}
        paddingH-10
      >
        <View flex row spread centerV>
          {!locked && <Icon source={Assets.icons.demo.drag} tintColor={Colors.$iconDisabled}/>}
          <Text center $textDefault={!locked} $textNeutralLight={locked}>
            {item.text}
          </Text>
          {!locked && <Icon source={Assets.icons.demo.chevronRight} tintColor={Colors.$iconDefault}/>}
        </View>
      </View>
    );
  }, []);

  const keyExtractor = useCallback((item: Item) => {
    return `${item.id}`;
  }, []);

  return (
    <div>
      <SortableList
        data={data}
        flexMigration
        // onOrderChange={onOrderChange}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </div>
  );
}
```
## API
### data
#### Do not update 'data' in 'onOrderChange' (i.e. for each order change); only update it when you change the items (i.g. adding and removing an item).
The data of the list, with an id prop as unique identifier.
`ItemT[] (ItemT extends {id: string}) ` 

### enableHaptic
Whether to enable the haptic feedback.
(please note that react-native-haptic-feedback does not support the specific haptic type on Android starting on an unknown version, you can use 1.8.2 for it to work properly)
`boolean ` 

### flexMigration
A temporary migration flag for enabling flex on the list's container (like it should be by default)
`boolean ` 

### itemProps
Extra props for the item.
`{margins?: {marginTop?: number; marginBottom?: number; marginLeft?: number; marginRight?: number}} ` 

### onOrderChange
A callback to get the new order (or swapped items) and info about the change (from and to indices).
`(data: ItemT[], info: OrderChangeInfo) => void ` 

### scale
Scale the item once dragged.
`number ` 


