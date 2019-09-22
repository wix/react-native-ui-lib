import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {View, Text, TextField, StackAggregator} from 'react-native-ui-lib'; //eslint-disable-line


const contents = [
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
]

export default class StackAggregatorScreen extends Component {
  
  onItemPress = (item, index) => {
    console.warn('INBAL Screen item pressed: ', item);
  }

  renderItem = (item, index) => {
    return (
      <View key={index} center padding-12>
        <Text text50 marginB-10>{index}</Text>
        <Text>{contents[index]}</Text>
      </View>
    );
  }

  render() {
    return (
      <ScrollView bg-dark80 flex keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
        <StackAggregator
          // collapsed={false}
          containerStyle={{marginTop: 50}}
        >
          {_.map(contents, (item, index) => {
            return this.renderItem(item, index);
          })}
        </StackAggregator>

        <StackAggregator
          // collapsed={false}
          containerStyle={{marginTop: 50}}
        >
          {_.map(contents, (item, index) => {
            return this.renderItem(item, index);
          })}
        </StackAggregator>

        {/* <View>
          <Text marginH-20 text60 red30>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
        </View> */}
        {/* <TextField
          placeholder="Search.."
          margin-20
        /> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});
