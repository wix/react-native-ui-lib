import React, {Component} from 'react';
import {ListView, Alert} from 'react-native';
import {BasicList, Avatar, Badge, AvatarHelper, Colors} from 'react-native-ui-lib';//eslint-disable-line
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

  renderRow(row, id) {
    const props = {
      imageSource: row.mediaUrl ? {uri: row.mediaUrl} : null,
      leftTitle: row.name,
      leftSubtitle: `${row.inventory.quantity} item`,
      rightTitle: row.formattedPrice,
      rightSubtitle: row.inventory.status,
      rightSubtitleStyle: row.inventory.quantity === 0 ? {color: Colors.red30} : undefined,
      onPress: () => Alert.alert(`pressed on row id: ${id}`),
      animation: 'basicListEntrance',
      duration: 600,
      delay: 10 + (Number(id) % 10) * 80,
      easing: 'ease-out-quint',
    };

    return (
      <BasicList.Item {...props}/>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(row, sectionId, rowId) => this.renderRow(row, rowId)}
      />
    );
  }
}
