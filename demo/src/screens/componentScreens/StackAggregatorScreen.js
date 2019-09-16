import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Constants, Colors, View, Text, TextField, Card, StackAggregator} from 'react-native-ui-lib'; //eslint-disable-line


const items = [
  {height: 100}, 
  {height: 120/* , backgroundColor: 'yellow' */}, 
  {height: 140/* , backgroundColor: 'red' */},
  {height: 200/* , backgroundColor: 'blue' */}
];
// const cardImage = require('../../assets/images/card-example.jpg');
const cardHorizontalMargin = 20;

export default class StackAggregatorScreen extends Component {
  
  onItemPress = (item, index) => {
    console.warn('INBAL Screen item pressed: ', item);
  }

  renderItem = (item, index) => {
    return (
      <Card
        key={index}
        height={item.height}
        width={Constants.screenWidth - (cardHorizontalMargin * 2)}
        style={{marginHorizontal: cardHorizontalMargin, backgroundColor: item.backgroundColor || Colors.white/* , height: item.height, width: Constants.screenWidth - (cardHorizontalMargin * 2) */}}
        center
        activeOpacity={1}
        onPress={() => this.onItemPress(item, index)}
      >
        {/* <Card.Image height={'100%'} imageSource={cardImage} style={{width: '30%'}}/> */}
        <Text text50>{index}</Text>
        <Text marginH-10>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
      </Card>
    );
  }

  render() {
    return (
      <ScrollView bg-dark80 flex keyboardShouldPersistTaps={'handled'}>
        <StackAggregator
          items={items}
          renderItem={this.renderItem}
          // collapsed={false}
          containerStyle={{marginTop: 50}}
        />
        <Text marginH-20>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
        <TextField
          placeholder="Search.."
          margin-20
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});
