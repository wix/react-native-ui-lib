import React, {Component} from 'react';
import {ListView, Alert} from 'react-native';
import _ from 'lodash';
import {GridList, Avatar, Badge, AvatarHelper, Colors} from 'react-native-ui-lib';//eslint-disable-line
import products from '../../data/products';
const plusIcon = require('../../assets/icons/plus.png');

export default class BasicListScreen extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(products.concat(products).concat(products)),
      onEdit: false,
      updating: false,
    };
  }

  onItemPressed(id) {
    alert(`item pressed: ${id}`); // eslint-disable-line
  }

  renderRow(row, id) {
    if (id === '0') {
      const props = {
        index: Number(id),
        imageSource: plusIcon,
        title: 'Add Product',
        onPress: () => Alert.alert(`pressed on row id: ${id}`),
      };

      return (
        <GridList.NewItem {...props}/>
      );
    }

    const props = {
      index: Number(id),
      imageSource: row.mediaUrl ? {uri: row.mediaUrl} : null,
      title: row.name,
      secondaryTitle: row.formattedPrice,
      subtitle: row.inventory.status,
      onPress: () => Alert.alert(`pressed on row id: ${id}`),
      animationType: 'FADE_IN_DOWN',
      // animationDuration: _.sample([200, 400, 600, 700]),
      animationDuration: (Number(id) % 6) * 200,
      // animationDelay: _.sample([100, 200]),
    };

    return (
      <GridList.Item {...props}/>
    );
  }

  render() {
    return (
      <ListView
        contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', backgroundColor: Colors.dark80, paddingBottom: 15}}
        dataSource={this.state.dataSource}
        renderRow={(row, sectionId, rowId) => this.renderRow(row, rowId)}
      />
    );
  }
}
