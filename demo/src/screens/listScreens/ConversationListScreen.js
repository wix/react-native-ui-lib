import React, {Component} from 'react';
import {StyleSheet, Alert, FlatList} from 'react-native';
import {View as AnimatableView} from 'react-native-animatable';
import {AnimatableManager, ThemeManager, Colors, ListItem, Text, Badge, Avatar, AvatarHelper, Drawer} from 'react-native-ui-lib'; //eslint-disable-line
import conversations from '../../data/conversations';


const collectionsIcon = require('../../assets/icons/collections.png');
const starIcon = require('../../assets/icons/star.png');
const sharIcon = require('../../assets/icons/share.png');

export default class ConversationListScreen extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      onEdit: false,
      updating: false,
    };
  }

  closeLast(item) {
    if (this.last && this.last !== item) {
      this.last.drawer.closeDrawer();
    }
    this.last = item;
  }

  keyExtractor = item => item.name;

  renderItem(item, id) {
    const initials = AvatarHelper.getInitials(item.name);
    const animationProps = AnimatableManager.getEntranceByIndex(id);

    const rightButtons = [
      {
        text: 'More',
        icon: sharIcon,
        background: Colors.dark60,
        onPress: () => Alert.alert(`More press for item #${id}`),
        width: 80,
      },
      {
        text: 'Archive',
        icon: collectionsIcon,
        background: Colors.blue30,
        onPress: () => Alert.alert(`Archive press for item #${id}`),
        width: 80,
      },
    ];
    const leftButton = {
      text: 'Read',
      icon: starIcon,
      background: Colors.green30,
      onPress: () => Alert.alert(`Read press for item #${id}`),
      width: 80,
    };

    return (
      <AnimatableView {...animationProps}>
        <Drawer
          leftItem={leftButton}
          rightItems={rightButtons}
          ref={r => item.drawer = r}
          onDragStart={() => this.closeLast(item)}
        >
          <ListItem
            height={75.8}
            onPress={() => Alert.alert(`pressed on contact #${id + 1}`)}
          >
            <ListItem.Part left>
              <Avatar
                size={54}
                imageSource={item.thumbnail ? {uri: item.thumbnail} : null}
                label={initials}
                badgeProps={{backgroundColor: Number(id) < 3 ? Colors.green30 : undefined}}
                containerStyle={{marginHorizontal: 18}}
              />
            </ListItem.Part>
            <ListItem.Part middle column containerStyle={[styles.border, {paddingRight: 17}]}>
              <ListItem.Part containerStyle={{marginBottom: 3}}>
                <Text style={{flex: 1, marginRight: 10}} text70 color={Colors.dark10} numberOfLines={1}>{item.name}</Text>
                <Text style={{marginTop: 2}} text90 color={Colors.dark50}>{item.timestamp}</Text>
              </ListItem.Part>
              <ListItem.Part>
                <Text style={{flex: 1, marginRight: 10}} text80 color={Colors.dark40} numberOfLines={1}>{item.text}</Text>
                {item.count > 0 && <Badge label={item.count} animation='fadeIn' duration={400}/>}
              </ListItem.Part>
            </ListItem.Part>
          </ListItem>
        </Drawer>
      </AnimatableView>
    );
  }

  render() {
    return (
      <FlatList
        data={conversations}
        renderItem={({item, index}) => this.renderItem(item, index)}
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
