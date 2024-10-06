import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {View, Text, Card, Image, TabController} from 'react-native-ui-lib';
import _ from 'lodash';

const IMAGE_URL =
  'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=500&dpr=1';
const items = [
  {key: 'tab1', label: 'Tab 1'},
  {key: 'tab2', label: 'Tab 2'}
];

export default class TabControllerWithStickyHeaderScreen extends Component {
  renderHeader = () => {
    return (
      <View bg-red30 height={280} bottom>
        <Image source={{uri: IMAGE_URL}} style={{flex: 1}}/>
      </View>
    );
  };

  renderTab1 = () => {
    return (
      <View bg-green80 paddingT-s5>
        {_.times(7, i => {
          return (
            <Card key={i} height={100} marginB-s5 marginH-s5 center>
              <Text text40>item {i}</Text>
            </Card>
          );
        })}
      </View>
    );
  };

  renderTab2 = () => {
    return (
      <View bg-orange40 paddingT-s5>
        {_.times(15, i => {
          return (
            <View key={i} height={100} marginB-s5 marginH-s5 center bg-orange60>
              <Text text40> item {i}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  render() {
    return (
      <TabController items={items} nestedInScrollView>
        <ScrollView
          // stickyHeaderHiddenOnScroll
          stickyHeaderIndices={[1]}
        >
          {this.renderHeader()}
          <TabController.TabBar/>

          <View flex>
            <TabController.TabPage index={0}>{this.renderTab1()}</TabController.TabPage>
            <TabController.TabPage index={1}>{this.renderTab2()}</TabController.TabPage>
          </View>
        </ScrollView>
      </TabController>
    );
  }
}
