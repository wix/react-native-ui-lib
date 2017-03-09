import React, {Component} from 'react';
import {ListView, Alert} from 'react-native';
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
    const props = {
      index: Number(id),
      imageSource: row.mediaUrl ? {uri: row.mediaUrl} : null,
      onPress: () => Alert.alert(`pressed on row id: ${id}`),
      animation: 'gridListEntrance',
      duration: 600,
      delay: (Number(id) % 6) * 40,
      easing: 'ease-in-expo',
      // duration: _.sample([200, 400, 600, 700]),
      // duration: (Number(id) % 6) * 200,
      // animationDelay: _.sample([100, 200]),
      // disabled: true,
    };

    let Item;
    if (id === '0') {
      Item = GridList.NewItem;

      props.imageSource = plusIcon;
      props.title = 'Add Product';
      // props.delay = 0;
      // props.disabled = true;
    } else {
      Item = GridList.Item;

      props.title = row.name;
      props.secondaryTitle = row.formattedPrice;
      props.subtitle = row.inventory.status;
    }

    return (
      <Item {...props}/>
    );
  }

  render() {
    return (
      <GridList
        dataSource={this.state.dataSource}
        renderRow={(row, sectionId, rowId) => this.renderRow(row, rowId)}
      />
    );
  }
}
