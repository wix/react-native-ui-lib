import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Colors, View, Text, Button, StackAggregator} from 'react-native-ui-lib';

const TEXTS = [
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
];

export default class StackAggregatorScreen extends Component {
  state = {
    contents: TEXTS,
    collapsed: true
  };

  onItemPress = (index: number) => {
    console.warn('item pressed: ', index);
  };

  onPress = (index: number) => {
    console.warn('item\'s button pressed: ', index);
  };

  refreshItems = () => {
    const newItems = _.clone(this.state.contents);
    newItems.push('New Item');
    this.setState({contents: newItems});
  };

  toggleCollapsed = () => {
    this.setState({collapsed: !this.state.collapsed});
  };

  renderItem = (_: string, index: number) => {
    return (
      <View key={index} center padding-12>
        <Button label={`${index}`} marginB-10 size={Button.sizes.small} onPress={() => this.onPress(index)}/>
        <Text>{this.state.contents[index]}</Text>
      </View>
    );
  };

  render() {
    const {collapsed} = this.state;

    return (
      <ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
        <View row spread margin-5>
          <Button link label={collapsed ? 'Open Stack' : 'Close Stack'} onPress={this.toggleCollapsed}/>
          <Button link label="Update content" onPress={this.refreshItems}/>
        </View>
        <Text center grey40 text90 marginT-20>
          Thu, 10 Dec, 11:29
        </Text>
        <StackAggregator containerStyle={{marginTop: 12}} onItemPress={this.onItemPress} collapsed={collapsed}>
          {_.map(this.state.contents, (item, index) => {
            return this.renderItem(item, index);
          })}
        </StackAggregator>

        <Text center grey40 text90 marginT-20>
          Thu, 11 Dec, 13:03
        </Text>
        <StackAggregator
          containerStyle={{marginTop: 12}}
          onItemPress={this.onItemPress}
          collapsed={false}
          backgroundColor={Colors.red70}
          // itemBorderRadius={10}
          // buttonProps={{color: Colors.green30, labelStyle: {...Typography.text80, fontWeight: '500'}}}
        >
          {_.map(this.state.contents, (item, index) => {
            return this.renderItem(item, index);
          })}
        </StackAggregator>
      </ScrollView>
    );
  }
}
