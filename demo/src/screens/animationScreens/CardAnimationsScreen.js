import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {AnimatableManager, Colors, View, Button, Card, Text} from 'react-native-ui-lib';//eslint-disable-line


const items = [
  {text: 'Card'},
  {text: 'Card'},
  {text: 'Card'},
  // {text: 'Card'},
  // {text: 'Card'},
  // {text: 'Card'},
];

const animationType = {
  FADE_IN: 'fadeIn',
  ENTRANCE: 'entrance',
  ADDING: 'adding',
};

export default class CardAnimationsScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cards: items,
      visible: true,
      fadeInAnimation: true,
      entranceAnimation: true,
      addingAnimation: false,
      animation: animationType.ENTRANCE,
    };
  }

  onAnimationEnd = () => {
    // NOTE: must reset animation to invoke cards' re-render
    this.setState({animation: undefined});
  }

  reloadCards(animation) {
    this.setState({visible: false, animation});

    setTimeout(() => {
      this.setState({visible: true});
    }, 200);
  }

  addCard() {
    items.splice(0, 0, {text: 'Card'});
    this.setState({cards: items, animation: animationType.ADDING});
  }

  renderRow(item, index) {
    const {animation} = this.state;
    let animationProps;
    switch (animation) {
      case animationType.FADE_IN:
        animationProps = AnimatableManager.getFadeIn();
        break;
      case animationType.ENTRANCE:
        animationProps = AnimatableManager.getEntranceByIndex(index);
        break;
      case animationType.ADDING:
        animationProps = AnimatableManager.getZoomInSlideDown(index, {onAnimationEnd: this.onAnimationEnd});
        break;
      default:
        break;
    }

    return (
      <Card key={index} marginH-20 marginV-10 height={100} style={styles.card} {...animationProps}>
        <View flex center>
          <Text text50 white>{item.text} #{index}</Text>
        </View>
      </Card>
    );
  }

  render() {
    const {visible, cards} = this.state;
    return (
      <ScrollView style={{flex: 1}}>
        <View row center>
          <Button outline size="medium" margin-10 label="Entrance" onPress={() => this.reloadCards(animationType.ENTRANCE)}/>
          <Button outline size="medium" margin-10 label="Fade In" onPress={() => this.reloadCards(animationType.FADE_IN)}/>
          <Button outline size="medium" margin-10 label="Add Card" onPress={() => this.addCard()}/>
        </View>
        {visible && _.map(cards, (item, index) => this.renderRow(item, index))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark60,
  },
});
