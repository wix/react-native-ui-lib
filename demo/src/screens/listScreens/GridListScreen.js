import React, {Component} from 'react';
import {ListView, View, Alert} from 'react-native';
import {GridList, Avatar, Badge, AvatarHelper, Colors, Card, Constants, Text} from 'react-native-ui-lib';//eslint-disable-line
import products from '../../data/products';

import * as GridItemExamples from './GridItemExamples';

const plusIcon = require('../../assets/icons/plus.png');

export default class BasicListScreen extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(products.concat(products)),
      onEdit: false,
      updating: false,
    };

    this.renderItem = this.renderItem.bind(this);
  }

  onItemPressed(id) {
    alert(`item pressed: ${id}`); // eslint-disable-line
  }

  renderItem(row, id) {
    const props = {
      id,
      imageSource: row.mediaUrl ? {uri: row.mediaUrl} : null,
      title: row.name,
      secondaryTitle: row.formattedPrice,
      subtitle: row.inventory.status,
      onPress: () => alert(`pressed on row id: ${id}`),
      animation: 'gridListEntrance',
      duration: 600,
      delay: (Number(id) % 6) * 40,
      easing: 'ease-in-expo',
      // duration: _.sample([200, 400, 600, 700]),
      // duration: (Number(id) % 6) * 200,
      // animationDelay: _.sample([100, 200]),
      // disabled: true,
    };

    return (
      <GridItemExamples.ProducItem key={id} {...props} />
    );

    // Enable it to see another example, also set the appropriate itemsInRow in GridList
    // return (
    //   <GridItemExamples.SimpleItem key={id}/>
    // );
  }

  render() {
    return (
      <GridList
        contentContainerStyle={{padding: 15, paddingBottom: 0}}
        renderItem={this.renderItem}
        items={products.concat(products)}
        itemsInRow={GridItemExamples.ProducItem.itemsPerRow}
      />
    );
  }
}
