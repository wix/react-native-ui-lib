import React, {Component} from 'react';
import {ListView, Alert} from 'react-native';
import {GridList, Avatar, Badge, AvatarHelper, Colors} from 'react-native-ui-lib';//eslint-disable-line
import products from '../../data/products';

export default class BasicListScreen extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(products),
      onEdit: false,
      updating: false,
    };
  }

  onItemPressed(id) {
    alert(`item pressed: ${id}`); // eslint-disable-line
  }

  getInitials(name) {
    let ret = '';
    if (name) {
      name.split(' ').forEach(s => ret += s[0] ? s[0].toUpperCase() : '');
    }
    return ret.substr(0, 2);
  }

  renderRow(row, id) {
    const props = {
      index: Number(id),
      imageSource: row.mediaUrl ? {uri: row.mediaUrl} : null,
      title: row.name,
      secondaryTitle: row.formattedPrice,
      subtitle: row.inventory.status,
      onPress: () => Alert.alert(`pressed on row id: ${id}`),
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
