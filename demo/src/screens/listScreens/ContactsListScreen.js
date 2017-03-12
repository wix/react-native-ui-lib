import React, {Component} from 'react';
import {ListView, Alert, StyleSheet} from 'react-native';
import {ListItem, Text, Avatar, Badge, ThemeManager, AvatarHelper} from 'react-native-ui-lib';//eslint-disable-line
import conversations from '../../data/conversations';

export default class ContactsListScreen extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(conversations),
      onEdit: false,
      updating: false,
    };
  }

  onItemPressed(id) {
    alert(`item pressed: ${id}`); // eslint-disable-line
  }

  renderRow(row, id) {
    const initials = AvatarHelper.getInitials(row.name);
    const animationProps = {
      animation: 'basicListEntrance',
      duration: 600,
      delay: 10 + ((Number(id) % 12) * 40),
      easing: 'ease-out-quint',
    };
    return (
      <ListItem
        onPress={() => Alert.alert(`pressed on contact # ${id}`)}
        {...animationProps}
      >
        <ListItem.Part left>
          <Avatar
            imageSource={row.thumbnail ? {uri: row.thumbnail} : null}
            label={initials}
            isOnline={Number(id) % 3 === 0}
            containerStyle={{marginHorizontal: 18}}
          />
        </ListItem.Part>
        <ListItem.Part middle containerStyle={styles.border}>
          <Text text70>{row.name}</Text>
        </ListItem.Part>
      </ListItem>
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

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
  },
});
