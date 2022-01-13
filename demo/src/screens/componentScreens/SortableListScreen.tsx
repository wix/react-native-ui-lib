import _ from 'lodash';
import React, {Component} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {View, Text, SortableList} from 'react-native-ui-lib'; //eslint-disable-line

export default class SortableListScreen extends Component {
  state = {
    items: _.times(10, i => i)
  };

  renderItem = ({item}: {item: number}) => {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };

  onOrderChange = (items: number[]) => {
    Alert.alert(`new order is:
    ${items.map((item, index) => `\n[${index}] ==> ${item}`)}
    `);
  };

  render() {
    const {items} = this.state;
    return (
      <View flex padding-page>
        <Text h1>Sortable List</Text>
        <SortableList items={items} renderItem={this.renderItem} itemHeight={50} onOrderChange={this.onOrderChange} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
