import React, {Component} from 'react';
import {ListView, View, Text, StyleSheet} from 'react-native';
import _ from 'lodash';
import {ConversationList, Avatar} from 'react-native-ui-lib';//eslint-disable-line
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

  getInitials(name) {
    let ret = '';
    if (name) {
      name.split(' ').forEach(s => ret += s[0] ? s[0].toUpperCase() : '');
    }
    return ret.substr(0, 2);
  }

  renderRow(row, id) {
    const props = {
      avatar: <Avatar
        imageSource={row.thumbnail ? {uri: row.thumbnail} : null}
      />,
      title: row.name,
      subtitle: row.text,
      timestamp: row.timestamp,
    };

    return (
      <ConversationList.Item {...props}/>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(row, sectionId, rowId) => this.renderRow(row, rowId)}
        contentContainerStyle={{flex: 1}}

      />
    );
  }
}
