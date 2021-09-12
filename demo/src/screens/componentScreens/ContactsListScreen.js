import React, {Component} from 'react';
import {StyleSheet, Alert, FlatList} from 'react-native';
import {View as AnimatableView} from 'react-native-animatable';
import {Colors, ListItem, Text, Avatar, AvatarHelper} from 'react-native-ui-lib'; //eslint-disable-line
import conversations from '../../data/conversations';


export default class ContactsListScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      onEdit: false,
      updating: false
    };
  }

  getEntranceByIndex = (index = 0, options) => {
    return {
      animation: 'itemEntrance',
      easing: 'ease-out-quint',
      duration: 600,
      delay: 10 + (Number(index) % 12) * 100,
      useNativeDriver: true,
      ...options
    };
  };

  keyExtractor = item => item.name;

  renderRow(row, id) {
    const initials = AvatarHelper.getInitials(row.name);
    const animationProps = this.getEntranceByIndex(id);

    return (
      <AnimatableView {...animationProps}>
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
    borderColor: Colors.dark70
  }
});
