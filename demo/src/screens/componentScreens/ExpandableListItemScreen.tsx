import _ from 'lodash';
import React, {PureComponent} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {ExpandableListItem, Card, Colors, Text, ListItem, Carousel, Spacings, View} from 'react-native-ui-lib';

const cardImage2 = require('../../assets/images/empty-state.jpg');
const cardImage = require('../../assets/images/card-example.jpg');

const elements = [
  <Card style={{marginBottom: 10}} onPress={() => {}}>
    <Card.Section
      content={[
        {text: 'Card #1', text70: true, dark10: true},
        {text: 'card description', text90: true, dark50: true}
      ]}
      style={{padding: 20}}
    />
    <Card.Section imageSource={cardImage2} imageStyle={{height: 120}} />
  </Card>,
  <Card style={{marginBottom: 10}} onPress={() => {}}>
    <Card.Section
      content={[
        {text: 'Card #2', text70: true, dark10: true},
        {text: 'card description', text90: true, dark50: true}
      ]}
      style={{padding: 20}}
    />
    <Card.Section imageSource={cardImage} imageStyle={{height: 120}} />
  </Card>,
  <Card style={{marginBottom: 10}} onPress={() => {}}>
    <Card.Section
      content={[
        {text: 'Card #3', text70: true, dark10: true},
        {text: 'card description', text90: true, dark50: true}
      ]}
      style={{padding: 20}}
    />
    <Card.Section imageSource={cardImage2} imageStyle={{height: 120}} />
  </Card>
];

const textElement = (
  <Text dark10 text60 numberOfLines={1}>
    Text Element of ExpandableListItem
  </Text>
);

const contentElement = (
  <Carousel pageWidth={350} itemSpacings={Spacings.s2}>
    {_.map(elements, (element, key) => {
      return (
        <View key={key} style={{margin: 12}}>
          {element}
        </View>
      );
    })}
  </Carousel>
);

class ExpandableListItemScreen extends PureComponent {
  render() {
    return (
      <ScrollView>
        <ExpandableListItem
          iconColor={Colors.blue10}
          textElement={textElement}
          contentElement={contentElement}
        ></ExpandableListItem>
        <ListItem>
          <Text dark10 text60 center numberOfLines={1} style={{marginLeft: 10}}>
            {'The next list item'}
          </Text>
        </ListItem>
      </ScrollView>
    );
  }
}

export default ExpandableListItemScreen;
