import React, {Component} from 'react';
import {StyleSheet, Alert, FlatList} from 'react-native';
import {View as AnimatableView} from 'react-native-animatable';
import {AnimatableManager, Colors, ThemeManager, ListItem, Text, Avatar, AvatarHelper} from 'react-native-ui-lib'; //eslint-disable-line
import conversations from '../../data/conversations';


export default class ContactsListScreen extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      onEdit: false,
      updating: false,
    };
  }

  keyExtractor = item => item.name;

  renderRow(row, id) {
    const initials = AvatarHelper.getInitials(row.name);
    const animationProps = AnimatableManager.getEntranceByIndex(id);

    return (
      <AnimatableView {...animationProps}>
        <ListItem
          key={id}
          onPress={() => Alert.alert(`pressed on contact #${id + 1}`)}
        >
          <ListItem.Part left>
            <Avatar
              imageSource={row.thumbnail ? {uri: row.thumbnail} : null}
              label={initials}
              badgeProps={{backgroundColor: Number(id) % 3 === 0 ? Colors.green30 : undefined}}
              containerStyle={{marginHorizontal: 18}}
            />
          </ListItem.Part>
          <ListItem.Part middle containerStyle={styles.border}>
            <Text text70>{row.name}</Text>
          </ListItem.Part>
        </ListItem>
      </AnimatableView>
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
