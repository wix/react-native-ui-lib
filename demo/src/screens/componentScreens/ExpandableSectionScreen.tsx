import _ from 'lodash';
import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import {ExpandableSection, Card, Colors, Text, ListItem, Carousel, Spacings, View} from 'react-native-ui-lib';

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
  <Text marginB-12 dark10 text60 numberOfLines={1}>
    ExpandableSection's sectionHeader
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

class ExpandableSectionScreen extends PureComponent {
  render() {
    return (
      <ScrollView>
        <ExpandableSection
          iconColor={Colors.blue10}
          sectionHeader={textElement}
        >{contentElement}</ExpandableSection>
        <ListItem>
          <Text dark10 text60 center numberOfLines={1} style={{marginLeft: 10}}>
            {'The next item'}
          </Text>
        </ListItem>
      </ScrollView>
    );
  }
}

export default ExpandableSectionScreen;
