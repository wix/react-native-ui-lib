import React, {Component} from 'react';
import {Alert, StyleSheet, ScrollView, FlatList} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {AnimatableManager, ThemeManager, Colors, View, Button, ListItem, Text} from 'react-native-ui-lib';//eslint-disable-line


const listItems = [
  {id: '0', text: 'Item'},
  {id: '1', text: 'Item'},
  {id: '2', text: 'Item'},
  // {id: '3', text: 'Item'},
  // {id: '4', text: 'Item'},
  // {id: '5', text: 'Item'},
];

const animationType = {
  FADE_IN: 'fadeIn',
  ENTRANCE: 'entrance',
  ADDING: 'adding',
};

export default class ListAnimationsScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: listItems,
      visible: true,
      fadeInAnimation: true,
      entranceAnimation: true,
      addingAnimation: false,
      animation: animationType.ENTRANCE,
      counter: 0,
    };
  }

  onAnimationEnd = () => {
    // NOTE: must reset animation to invoke list' re-render
    this.setState({animation: undefined});
  }

  keyExtractor = item => item.id;

  reload(animation) {
    this.setState({visible: false, animation});

    setTimeout(() => {
      this.setState({visible: true});
    }, 200);
  }

  addItem() {
    const {items, counter} = this.state;
    const itemsCopy = [...items];
    itemsCopy.splice(counter, 0, {id: `${itemsCopy.length}-new`, text: 'Item'});
    this.setState({items: itemsCopy, animation: animationType.ADDING});
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
        animationProps = AnimatableManager.getSlideInSlideDown(index, {onAnimationEnd: this.onAnimationEnd}, counter);
        break;
      default:
        break;
    }

    return (
      <Animatable.View key={index} {...animationProps}>
        <ListItem
          onPress={() => Alert.alert(`pressed on contact #${index + 1}`)}
        >
          <ListItem.Part middle containerStyle={styles.item}>
            <Text text50 white>{item.text} #{item.id}</Text>
          </ListItem.Part>
        </ListItem>
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
          {visible && 
          <FlatList
            data={items}
            renderItem={({item, index}) => this.renderItem(item, index)}
            keyExtractor={this.keyExtractor}
          />}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 20,
    backgroundColor: Colors.dark60,
    borderBottomWidth: 2,
    borderColor: ThemeManager.dividerColor,
  },
});
