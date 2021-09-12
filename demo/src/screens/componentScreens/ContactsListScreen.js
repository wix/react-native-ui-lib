import React, {Component} from 'react';
import {StyleSheet, Alert, FlatList} from 'react-native';
import {Colors, View, ListItem, Text, Avatar, AvatarHelper} from 'react-native-ui-lib'; //eslint-disable-line
import conversations from '../../data/conversations';


export default class ContactsListScreen extends Component {
  keyExtractor = (item, index) => `${item.name}.${index}`;

  renderRow(row, id) {
    const initials = AvatarHelper.getInitials(row.name);

    return (
      <View>
        <ListItem
          key={id}
          onPress={() => Alert.alert(`pressed on contact #${id + 1}`)}
        >
          <ListItem.Part left>
            <Avatar
              source={row.thumbnail ? {uri: row.thumbnail} : null}
              label={initials}
              badgeProps={{backgroundColor: Number(id) % 3 === 0 ? Colors.green30 : undefined}}
              containerStyle={{marginHorizontal: 18}}
            />
          </ListItem.Part>
          <ListItem.Part middle containerStyle={styles.border}>
            <Text text70>{row.name}</Text>
          </ListItem.Part>
        </ListItem>
      </View>
    );
  }

  render() {
    return (
      <FlatList
        data={conversations}
        renderItem={({item, index}) => this.renderRow(item, index)}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey70
  }
});
