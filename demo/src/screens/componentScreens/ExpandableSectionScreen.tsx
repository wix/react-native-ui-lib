import _ from 'lodash';
import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Card, Text, Image, ListItem, Carousel, Spacings, View, ExpandableSection, Switch} from 'react-native-ui-lib';

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
    <Card.Section source={cardImage2} imageStyle={{height: 120}} />
  </Card>,
  <Card style={{marginBottom: 10}} onPress={() => {}}>
    <Card.Section
      content={[
        {text: 'Card #2', text70: true, dark10: true},
        {text: 'card description', text90: true, dark50: true}
      ]}
      style={{padding: 20}}
    />
    <Card.Section source={cardImage} imageStyle={{height: 120}} />
  </Card>,
  <Card style={{marginBottom: 10}} onPress={() => {}}>
    <Card.Section
      content={[
        {text: 'Card #3', text70: true, dark10: true},
        {text: 'card description', text90: true, dark50: true}
      ]}
      style={{padding: 20}}
    />
    <Card.Section source={cardImage2} imageStyle={{height: 120}} />
  </Card>
];

class ExpandableSectionScreen extends PureComponent {
  state = {
    expanded: false,
    top: false
  };

  onExpand() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  getChevron() {
    if (this.state.expanded) {
      return this.state.top ? chevronDown : chevronUp;
    }
    return this.state.top ? chevronUp : chevronDown;
  }

  getHeaderElement() {
    return (
      <View margin-10 spread row>
        <Text dark10 text60>
          ExpandableSection's sectionHeader
        </Text>
        <Image style={styles.icon} source={this.getChevron()}/>
      </View>
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
    const {expanded, top} = this.state;

    return (
      <ScrollView>
        <View row center margin-20>
          <Text dark10 text70 marginR-10>
            Open section on top
          </Text>
          <Switch
            value={this.state.top}
            onValueChange={() => {
              this.setState({top: !this.state.top});
            }}
          ></Switch>
        </View>
        <ExpandableSection
          top={top}
          expanded={expanded}
          sectionHeader={this.getHeaderElement()}
          onPress={() => this.onExpand()}
        >
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
  icon: {
    alignSelf: 'center'
  }
});
