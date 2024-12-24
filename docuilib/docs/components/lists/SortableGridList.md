---
id: SortableGridList
title: SortableGridList
sidebar_label: SortableGridList
---

import UILivePreview from '@site/src/components/UILivePreview';

An sortable grid list (based on GridList component)  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SortableGridListScreen.tsx)
:::info
This component extends **[GridList](/docs/components/lists/GridList)** props.
:::
:::note
This component supports square items only
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
<UILivePreview code={`function Example(props) {
  const [shouldOrderByIndex, setShouldOrderByIndex] = useState(false);
  const data = Data.products.map(product => ({...product}));

  renderItem = ({item}) => {
    return (
      <Card flex customValue={item.id}>
        <Card.Section
          imageSource={{uri: item.mediaUrl}}
          imageStyle={{width: '100%', height: 108.7, borderRadius: BorderRadiuses.br10}}
          imageProps={{
            customOverlayContent: (
              <Text margin-s1 h1 orange30>
                {item.id}
              </Text>
            )
          }}
        />
      </Card>
    );
  };

  return (
      <View flex>
        <Playground.ToggleControl title={'Order by index'} state={shouldOrderByIndex} setState={setShouldOrderByIndex}/>
        <SortableGridList
          data={data}
          flexMigration
          // onOrderChange={onOrderChange}
          maxItemWidth={140}
          renderItem={renderItem}
          itemSpacing={Spacings.s3}
          listPadding={Spacings.s5}
          orderByIndex={shouldOrderByIndex}
        />
      </View>
  );
}`}/>

## API
### data
#### Do not update 'data' in 'onOrderChange' (i.e. for each order change); only update it when you change the items (i.g. adding and removing an item).
Data of items with an id prop as unique identifier
`any[] & {id: string} ` 

### extraData
Pass any extra data that should trigger a re-render
`any ` 

### flexMigration
A temporary migration flag for enabling flex on the list's container (like it should be by default)
`boolean ` 

### onOrderChange
Order change callback
`(newData: T[], newOrder: ItemsOrder) => void ` 

### orderByIndex
Wether to reorder the items by index instead of by swapping locations.
Items will move to the new index by pushing other items ahead or aback instead of swapping places with the item at the new index.
`boolean ` 

### renderItem
Custom render item callback
`FlatListProps['renderItem'] ` 


