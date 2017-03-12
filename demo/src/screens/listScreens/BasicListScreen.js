import React, {Component} from 'react';
import {ListView, Image, StyleSheet, Alert} from 'react-native';
import {ListItem, Avatar, Text, BasicList, BorderRadiuses, Badge, AvatarHelper, Colors, ThemeManager} from 'react-native-ui-lib';//eslint-disable-line
import orders from '../../data/orders';

export default class BasicListScreen extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(orders),
      onEdit: false,
      updating: false,
    };
  }

  onItemPressed(id) {
    alert(`item pressed: ${id}`); // eslint-disable-line
  }

  renderRow(row, id) {
    const statusColor = row.inventory.status === 'Paid' ? Colors.green30 : Colors.red30;
    return (
      <ListItem
        height={77.5}
        onPress={() => Alert.alert(`pressed on contact # ${id}`)}
      >
        <ListItem.Part left>
          <Image source={{uri: row.mediaUrl}} style={styles.image}/>
        </ListItem.Part>
        <ListItem.Part middle column containerStyle={[styles.border, {paddingRight: 17}]}>
          <ListItem.Part containerStyle={{marginBottom: 3}}>
            <Text style={{flex: 1, marginRight: 10}} text70 color={Colors.dark10} numberOfLines={1}>{row.name}</Text>
            <Text style={{marginTop: 2}} text70 color={Colors.dark50}>{row.formattedPrice}</Text>
          </ListItem.Part>
          <ListItem.Part>
            <Text style={{flex: 1, marginRight: 10}} text90 color={Colors.dark40} numberOfLines={1}>{`${row.inventory.quantity} item`}</Text>
            <Text text90 color={statusColor} numberOfLines={1}>{row.inventory.status}</Text>
          </ListItem.Part>
        </ListItem.Part>
      </ListItem>
    );

    // return (
    //   <BasicList.Item {...props}/>
    // );
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

const styles = StyleSheet.create({
  image: {
    width: 54,
    height: 54,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
  },
});
