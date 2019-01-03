import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {AnimatableManager, Colors, View, Button, Card, Text} from 'react-native-ui-lib';//eslint-disable-line


const cards = [
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
      items: cards,
      visible: true,
      fadeInAnimation: true,
      entranceAnimation: true,
      addingAnimation: false,
      animation: animationType.ENTRANCE,
      counter: 2,
    };
  }

  onAnimationEnd = () => {
    // NOTE: must reset animation to invoke items' re-render
    this.setState({animation: undefined});
  }

  reload(animation) {
    this.setState({visible: false, animation});

    setTimeout(() => {
      this.setState({visible: true});
    }, 200);
  }

  addItem() {
    const {counter} = this.state;
    cards.splice(counter, 0, {text: 'Card'});
    this.setState({items: cards, animation: animationType.ADDING});
  }

  renderItem(item, index) {
    const {animation, counter} = this.state;
    let animationProps;
    switch (animation) {
      case animationType.FADE_IN:
        animationProps = AnimatableManager.presets.fadeIn;
        break;
      case animationType.ENTRANCE:
        animationProps = AnimatableManager.getEntranceByIndex(index);
        break;
      case animationType.ADDING:
        animationProps = AnimatableManager.getZoomInSlideDown(index, {onAnimationEnd: this.onAnimationEnd}, counter);
        break;
      default:
        break;
    }

    return (
      <Animatable.View key={index} {...animationProps}>
        <Card marginH-20 marginV-10 height={100} style={styles.item}>
          <View flex center>
            <Text text50 white>{item.text} #{index}</Text>
          </View>
        </Card>
      </Animatable.View>
    );
  }

  render() {
    const {visible, items, counter} = this.state;
    return (
      <View flex>
        <View row center>
          <Button outline size='medium' margin-10 label='Entrance' onPress={() => this.reload(animationType.ENTRANCE)}/>
          <Button outline size='medium' margin-10 label='Fade In' onPress={() => this.reload(animationType.FADE_IN)}/>
        </View>
        <View row center>
          <Button outline size='medium' margin-10 label={`Add at index: ${counter}`} onPress={() => this.addItem()}/>
          <Button 
            round outline size='large' label='+' 
            onPress={() => this.setState({counter: counter < items.length ? counter + 1 : counter})}
          />
          <Button 
            round outline size='large' margin-10 label='-' 
            onPress={() => this.setState({counter: counter !== 0 ? counter - 1 : 0})}
          />
        </View>
        <ScrollView style={{flex: 1}}>
          {visible && _.map(items, (item, index) => this.renderItem(item, index))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.dark60,
  },
});
