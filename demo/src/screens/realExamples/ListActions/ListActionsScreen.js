import React, {Component} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {Colors} from 'react-native-ui-lib'; //eslint-disable-line
import ActionsList from './ActionsList';


const listItems = [
  {id: '0', text: 'Item'},
  {id: '1', text: 'Item'},
  {id: '2', text: 'Item'},
  {id: '3', text: 'Item'},
  {id: '4', text: 'Item'},
  {id: '5', text: 'Item'},
];

export default class ListActionsScreen extends Component {
  
  keyExtractor = item => item.id;

  renderItem = (item, index) => {
    return (
      <ActionsList item={item} index={index}/>
    );
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        data={listItems}
        renderItem={({item, index}) => this.renderItem(item, index)}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark80,
  }
});
