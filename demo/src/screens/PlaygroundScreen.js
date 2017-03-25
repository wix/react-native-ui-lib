import {Navigation} from 'react-native-navigation';
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Assets, Text, Constants, Card, Button, Colors, Typography} from 'react-native-ui-lib';//eslint-disable-line

import products from '../data/products';

const SCREEN_PADDING = 15;
const CARD_WIDTH = (Constants.screenWidth - (SCREEN_PADDING * 2)) / 2;
const CARD_HEIGHT = 210;


export default class PlaygroundScreen extends Component {

  static id = 'example.Playground'

  render() {
    const product = products[1];
    return (
      <View style={styles.container}>
        <Card style={{width: CARD_WIDTH, height: CARD_HEIGHT}}>
          <Card.Image
            imageSource={{uri: product.mediaUrl}}
            height={183} style={{position: 'absolute', top: 0, left: 0, right: 0}}/>
          <Card.Section
            body
            enableBlur
            blurOptions={{blurType: 'xlight'}}
            style={{position: 'absolute', paddingVertical: 12, bottom: 0, left: 0, right: 0}}
          >
            <Card.Section footer style={{justifyContent: 'center'}}>
              <Card.Item column style={{alignItems: 'center'}}>
                <Text text70 dark10 style={{fontWeight: '400', marginBottom: 4}}>{product.name}</Text>
                <Text text70 dark10 style={{marginBottom: 4}}>{product.formattedPrice}</Text>
                <Text text90 dark50>{product.inventory.quantity} In Stock</Text>
              </Card.Item>
            </Card.Section>
          </Card.Section>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.dark80,
  },
});


Navigation.registerComponent('example.PlaygroundScreen', () => PlaygroundScreen);
