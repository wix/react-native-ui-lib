import _ from 'lodash';
import {View, Text, Image, Colors, Constants, Avatar, GridView, Shadows, Card} from 'react-native-ui-lib';
import React, {Component} from 'react';
import {Alert, ScrollView} from 'react-native';
import conversations from '../../data/conversations';
import products from '../../data/products';

class GridViewScreen extends Component {
  state = {
    contacts: _.chain(conversations)
      .take(15)
      .map(contact => ({
        imageProps: {source: {uri: contact.thumbnail}, borderRadius: 999, style: {backgroundColor: Colors.grey60}},
        title: _.split(contact.name, ' ')[0],
        onPress: () => Alert.alert('My name is ' + contact.name)
      }))
      .value(),
    products: _.chain(products)
      .take(8)
      .map((product, index) => ({
        imageProps: {
          source: {uri: product.mediaUrl},
          borderRadius: 4,
          style: {backgroundColor: Colors.grey60, borderWidth: 1, borderColor: Colors.grey50}
        },
        title: product.name,
        titleTypography: 'subtextBold',
        onPress: () => Alert.alert('My price is ' + product.formattedPrice),
        renderOverlay: () => {
          if (index < 7) {
            return <Text text={product.price} style={{alignSelf: 'center', marginTop: 3}}/>;
          }
        }
      }))
      .value(),
    pairs: _.chain(products)
      .take(2)
      .map(product => ({
        containerProps: {useNative: true, activeScale: 0.97, activeOpacity: 1},
        renderCustomItem: () => {
          return (
            <Card height={150} activeOpacity={1}>
              <Card.Image style={{flex: 1}} source={{uri: product.mediaUrl}}/>
            </Card>
          );
        },
        title: product.name,
        subtitle: (
          <Text>
            <Text style={{textDecorationLine: 'line-through', color: Colors.grey30}}>{product.formattedPrice}</Text>
            <Text style={{textDecorationLine: 'none'}}> $50</Text>
          </Text>
        ),
        description: product.inventory.status,
        descriptionLines: 2,
        alignToStart: true,
        onPress: () => Alert.alert('My price was ' + product.formattedPrice + ', now it is $50')
      }))
      .value(),
    dynamicLayout: _.chain(products)
      .take(3)
      .map(product => ({
        imageProps: {
          source: {
            uri: product.mediaUrl
          }
        },
        itemSize: {height: 90},
        title: 'Title',
        subtitle: 'subtitle',
        description: product.name,
        descriptionLines: 2,
        alignToStart: true,
        onPress: () => Alert.alert('Click!')
      }))
      .value(),
    overlayText: _.chain(products)
      .take(2)
      .map((product, index) => ({
        imageProps: {
          source: {
            uri: product.mediaUrl
          },
          overlayType: Image.overlayTypes.VERTICAL,
          overlayColor: Colors.white
        },
        itemSize: {height: 240},
        overlayText: true,
        title: product.name,
        subtitle: (
          <Text>
            <Text style={{textDecorationLine: 'line-through', color: Colors.grey30}}>{product.formattedPrice}</Text>
            <Text style={{textDecorationLine: 'none'}}>{product.formattedPrice}</Text>
          </Text>
        ),
        description: '4 items',
        descriptionLines: 2,
        alignToStart: true,
        onPress: () => Alert.alert('My price was ' + product.formattedPrice + ', now it is $50'),
        renderOverlay: () => {
          if (index === 0) {
            return (
              <Text margin-10 text80BO style={{alignSelf: 'flex-start', marginTop: 12, marginLeft: 12}}>
                {product.formattedPrice}
              </Text>
            );
          }
        }
      }))
      .value(),
    avatars: _.chain(conversations)
      .take(9)
      .map(item => ({
        renderCustomItem: () => {
          const imageElementElement = item.thumbnail;
          return (
            <View flex center marginB-10>
              <Avatar size={100} source={{uri: imageElementElement}}/>
            </View>
          );
        },
        onPress: () => Alert.alert('Your choose is  ' + item.name),
        title: item.name,
        titleLines: 2,
        titleTypography: 'bodySmall'
      }))
      .value(),
    squares: [Colors.red30, Colors.yellow30, Colors.blue30, Colors.violet30, Colors.green30].map(color => ({
      renderCustomItem: () => <View height={50} backgroundColor={color}/>
    })),
    orientation: Constants.orientation
  };

  onLayout = () => {
    if (this.state.orientation !== Constants.orientation) {
      // Basically just for triggering render - can be any other variable
      // (Constants.orientation is already up-to-date and can be used directly)
      this.setState({
        orientation: Constants.orientation
      });
    }
  };

  render() {
    const {contacts, dynamicLayout, overlayText, avatars, products, pairs, squares} = this.state;

    return (
      <ScrollView onLayout={this.onLayout}>
        <View padding-page>
          <Text center h1>
            GridView
          </Text>

          <Text h3 marginV-s5>
            Avatars
          </Text>
          <GridView
            items={contacts}
            // viewWidth={300}
            numColumns={6}
            lastItemOverlayColor={Colors.primary}
            lastItemLabel={7}
          />

          <Text h3 marginV-s5>
            Thumbnails
          </Text>
          <GridView
            items={products}
            numColumns={4}
            lastItemOverlayColor={Colors.primary}
            lastItemLabel={42}
            keepItemSize
          />

          <Text marginV-s5 text60BO>
            Pairs
          </Text>
          <GridView items={pairs} numColumns={2}/>
          <Text marginV-s5 text60BO>
            Dynamic itemSize
          </Text>
          <GridView items={dynamicLayout} numColumns={3}/>
          <Text marginV-s5 text60BO>
            OverlayText
          </Text>
          <GridView items={overlayText} numColumns={2}/>
          <Text marginV-s5 text60BO>
            Custom content (Avatars)
          </Text>
          <GridView items={avatars} numColumns={Constants.orientation === 'landscape' ? 6 : 3}/>
          <Text marginV-s5 text60BO>
            Custom content (Squares)
          </Text>
          <GridView items={squares} numColumns={3}/>
        </View>
      </ScrollView>
    );
  }
}

export default GridViewScreen;
