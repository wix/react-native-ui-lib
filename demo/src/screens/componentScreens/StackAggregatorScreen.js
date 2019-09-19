import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Constants, Colors, View, Text, TextField, Card, StackAggregator} from 'react-native-ui-lib'; //eslint-disable-line


const contents = [
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
]
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
        width={Constants.screenWidth - (cardHorizontalMargin * 2)}
        style={{marginHorizontal: cardHorizontalMargin, backgroundColor: item.backgroundColor || Colors.white}}
        center
        activeOpacity={1}
        onPress={() => this.onItemPress(item, index)}
        // padding-15
        // paddingB-50={index > 1}
      >
        {/* <Card.Image height={'100%'} imageSource={cardImage} style={{width: '30%'}}/> */}
          <Text text50 marginB-10>{index}</Text>
          <Text margin-10>{contents[index]}</Text>
      </Card>
    );
  }

  render() {
    return (
      <ScrollView bg-dark80 flex keyboardShouldPersistTaps={'handled'}>
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
