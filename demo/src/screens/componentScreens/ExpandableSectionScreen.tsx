import _ from 'lodash';
import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Text, Image, ListItem, Carousel, Spacings, View, ExpandableSection} from 'react-native-ui-lib';

const cardImage2 = require('../../assets/images/empty-state.jpg');
const cardImage = require('../../assets/images/card-example.jpg');
const chevronDown = require('../../assets/icons/chevronDown.png');
const chevronUp = require('../../assets/icons/chevronUp.png');

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

class ExpandableSectionScreen extends PureComponent {
  state = {
    expanded: false
  };

  onExpand() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  getHeaderElement() {
    return (
      <TouchableOpacity onPress={() => this.onExpand()}>
        <Text margin-10 dark10 text60>
          ExpandableSection's sectionHeader
        </Text>
        <View style={styles.header}>
          <Image style={styles.icon} source={!this.state.expanded ? chevronUp : chevronDown} />
        </View>
      </TouchableOpacity>
    );
  }

  getBodyElement() {
    return (
      <Carousel pageWidth={350} itemSpacings={Spacings.s2}>
        {_.map(elements, (element, key) => {
          return (
            <View key={key} margin-12>
              {element}
            </View>
          );
        })}
      </Carousel>
    );
  }

  render() {
    const {expanded} = this.state;

    return (
      <ScrollView>
        <ExpandableSection expanded={expanded} sectionHeader={this.getHeaderElement()}>
          {this.getBodyElement()}
        </ExpandableSection>
        <ListItem>
          <Text dark10 text60 marginL-10>
            {'The next item'}
          </Text>
        </ListItem>
      </ScrollView>
    );
  }
}

export default ExpandableSectionScreen;

const styles = StyleSheet.create({
  header: {
    marginLeft: 380,
    marginTop: 20,
    position: 'absolute'
  },
  icon: {
    backgroundColor: 'transparent'
  }
});
