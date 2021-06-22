import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {View, Text, Button, ButtonSize, StackAggregator} from 'react-native-ui-lib';


const contents = [
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
];

export default class StackAggregatorScreen extends Component {
  
  onItemPress = (index: number) => {
    console.warn('item pressed: ', index);
  }

  onPress = (index: number) => {
    console.warn('item\'s button pressed: ', index);
  }

  renderItem = (_: string, index: number) => {
    return (
      <View key={index} center padding-12>
        <Button label={`${index}`} marginB-10 size={ButtonSize.small} onPress={() => this.onPress(index)}/>
        <Text>{contents[index]}</Text>
      </View>
    );
  }

  render() {
    return (
      <ScrollView bg-dark80 keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
        <Text center dark40 text90 marginT-20>Thu, 10 Dec, 11:29</Text>
        <StackAggregator
          containerStyle={{marginTop: 12}}
          onItemPress={this.onItemPress}
        >
          {_.map(contents, (item, index) => {
            return this.renderItem(item, index);
          })}
        </StackAggregator>

        <Text center dark40 text90 marginT-20>Thu, 11 Dec, 13:03</Text>
        <StackAggregator
          containerStyle={{marginTop: 12}}
          onItemPress={this.onItemPress}
          collapsed={false}
          // contentContainerStyle={{backgroundColor: Colors.red30}}
          // itemBorderRadius={10}
          // buttonProps={{color: Colors.green30, labelStyle: {...Typography.text80, fontWeight: '500'}}}
        >
          {_.map(contents, (item, index) => {
            return this.renderItem(item, index);
          })}
        </StackAggregator>
      </ScrollView>
    );
  }
}
