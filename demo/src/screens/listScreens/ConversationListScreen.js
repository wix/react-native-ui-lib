import React, {Component} from 'react';
import {StyleSheet, Alert, FlatList} from 'react-native';
import {AnimatableManager, ThemeManager, Colors, ListItem, Text, Badge, Avatar, AvatarHelper} from 'react-native-ui-lib'; //eslint-disable-line
import conversations from '../../data/conversations';


export default class ConversationListScreen extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      onEdit: false,
      updating: false,
    };
  }

  keyExtractor = (item, index) => item.name;

  renderRow(row, id) {
    const initials = AvatarHelper.getInitials(row.name);
    const animationProps = AnimatableManager.getEntranceByIndexPreset(AnimatableManager.animations.listEntrance, id);

    return (
      <ListItem
        key={id}
        height={75.8}
        onPress={() => Alert.alert(`pressed on contact #${id + 1}`)}
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
    borderColor: ThemeManager.dividerColor,
  },
});
