import React, {Component} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {View, Text, Card, SegmentedControl} from 'react-native-ui-lib';

// Generate a long list of items to demonstrate the issue
const generateItems = (count: number) => {
  return Array.from({length: count}, (_, i) => ({
    id: i.toString(),
    title: `Item ${i + 1}`
  }));
};

const longList = generateItems(50);

interface Item {
  id: string;
  title: string;
}

export default class PlaygroundScreen extends Component {
  state = {
    segmentIndex: 0
  };

  renderItem = ({item}: {item: Item}) => {
    return (
      <Card marginV-s3 padding-s4 onPress={() => console.log('Pressed item:', item.title)}>
        <Text>{item.title}</Text>
      </Card>
    );
  };

  setSegmentIndex = (index: number) => {
    this.setState({segmentIndex: index});
  };

  render() {
    const {segmentIndex} = this.state;
    
    return (
      <View bg-grey80 flex padding-20>
        <Text text40 center marginB-s4>SegmentedControl with List Issue</Text>
        <Text text70 center marginB-s4>Issue #3598: Items below the fold aren't pressable on Android</Text>
        
        <SegmentedControl
          margin-s2
          segments={[
            {label: 'Version'},
            {label: 'Plan'},
          ]}
          onChangeIndex={this.setSegmentIndex}
          preset="form"
        />
        
        {segmentIndex === 0 && (
          <FlatList
            data={longList}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
        )}
        
        {segmentIndex === 1 && (
          <View flex center>
            <Text text60>Plan Tab Content</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    flex: 1
  }
});
