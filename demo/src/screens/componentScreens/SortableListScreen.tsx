import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, SortableList} from 'react-native-ui-lib'; //eslint-disable-line

export default class SortableListScreen extends Component {
  state = {
    items: _.times(10, i => i)
  };

  renderItem = ({item}) => {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };

  render() {
    const {items} = this.state;
    return (
      <View flex padding-page>
        <Text h1>Sortable List</Text>
        <SortableList items={items} renderItem={this.renderItem}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
