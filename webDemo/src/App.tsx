import React, {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {TabController, View, Text, Colors, Button} from 'react-native-ui-lib';
interface ItemToRender {
  title: string;
  FC: React.FC;
}
const MANY_TABS = [
  {label: 'Challenges2', testID: 'tabItem.challenges'},
  {label: 'A6', testID: 'tabItem.A6'},
  {label: 'Challenges3', testID: 'tabItem.challenges3'}
];

const itemsToRender: ItemToRender[] = [
  {
    title: 'TabController',
    FC: () => {
      const [selectedIndex, setSelectedIndex] = useState(0);
      const [tabs, setTabs] = useState(MANY_TABS.map(tab => ({...tab, key: tab.label})));
      const [spreadItems, setSpreadItems] = useState(true);

      return (
        <View flex padding-page>

          <TabController asCarousel key={`key`} items={tabs}>
            <TabController.TabBar selectedIndex={selectedIndex} centerSelected spreadItems={spreadItems} />
          </TabController>
        </View>
      );
    }
  }
];

function App() {
  return (
    <View flex>
      <ScrollView>
        <View padding-page>
          <Text style={styles.title}>Welcome to react-native-ui-lib for Web</Text>
        </View>

        {itemsToRender.map(({title, FC}: ItemToRender) => (
          <View bg-grey80 paddingT-s5 paddingB-s5 center style={styles.componentContainer} key={'component_' + title}>
            <Text style={styles.compTitle}> {title} </Text>
            <FC />
          </View>
        ))}
      </ScrollView>
      {/* <FloatingButton
        visible={true}
        button={{ label: 'Approve', onPress: () => console.log('approved') }}
        secondaryButton={{ label: 'Not now', color: Colors.$textDangerLight }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20
  },
  componentContainer: {
    width: '100%',
    borderColor: 'white',
    borderBottomWidth: 5
  },
  compTitle: {
    fontWeight: 'bold',
    fontSize: '1rem',
    marginVertical: 4,
    textAlign: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginVertical: '1em',
    textAlign: 'center'
  }
});

export default App;
