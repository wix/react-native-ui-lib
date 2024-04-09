import React, {useState} from 'react';
import {View, TabController, Card, TextField, Button} from 'react-native-ui-lib';

const MANY_TABS = [
  {label: 'Challenges2', testID: 'tabItem.challenges'},
  {label: 'A6', testID: 'tabItem.A6'},
  {label: 'Challenges3', testID: 'tabItem.challenges3'}
];

export default function PlaygroundScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tabs, setTabs] = useState(MANY_TABS.map(tab => ({...tab, key: tab.label})));
  const [spreadItems, setSpreadItems] = useState(false);

  return (
    <View flex padding-page>
      <TabController asCarousel key={`key`} items={tabs}>
        <TabController.TabBar selectedIndex={selectedIndex} centerSelected spreadItems={spreadItems} />
      </TabController>
    </View>
  );
}
