import React, {Component} from 'react';
import {StyleSheet, ListView, Alert} from 'react-native';
import {Avatar, AvatarHelper, Badge, Colors, ListItem, Text, ConversationList, ThemeManager} from 'react-native-ui-lib';//eslint-disable-line
import conversations from '../../data/conversations';

export default class ConversationListScreen extends Component {

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
      duration: 400,
      delay: 10 + ((Number(id) % 12) * 40),
      easing: 'ease-out-quart',
    };

    return (
      <ListItem
        height={75.8}
        onPress={() => Alert.alert(`pressed on contact # ${id}`)}
        {...animationProps}
      >
        <ListItem.Part left>
          <Avatar
            size={54}
            imageSource={row.thumbnail ? {uri: row.thumbnail} : null}
            label={initials}
            isOnline={Number(id) < 3}
            containerStyle={{marginHorizontal: 18}}
          />
        </ListItem.Part>
        <ListItem.Part middle column containerStyle={[styles.border, {paddingRight: 17}]}>
          <ListItem.Part containerStyle={{marginBottom: 3}}>
            <Text style={{flex: 1, marginRight: 10}} text70 color={Colors.dark10} numberOfLines={1}>{row.name}</Text>
            <Text style={{marginTop: 2}} text90 color={Colors.dark50}>{row.timestamp}</Text>
          </ListItem.Part>
          <ListItem.Part>
            <Text style={{flex: 1, marginRight: 10}} text80 color={Colors.dark40} numberOfLines={1}>{row.text}</Text>
            {row.count > 0 && <Badge label={row.count} animation="fadeIn" duration={400}/>}
          </ListItem.Part>
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
