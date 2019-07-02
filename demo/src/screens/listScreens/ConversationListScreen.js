import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, Alert, FlatList} from 'react-native';
import {View as AnimatableView} from 'react-native-animatable';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {
  AnimatableManager, ThemeManager, Colors, ListItem, Text, Avatar, AvatarHelper, Drawer, Button
} from 'react-native-ui-lib'; //eslint-disable-line
import conversations from '../../data/conversations';


const collectionsIcon = require('../../assets/icons/collections.png');
const starIcon = require('../../assets/icons/star.png');
const shareIcon = require('../../assets/icons/share.png');
const batchSize = 15;

class ConversationListScreen extends Component {

  constructor(props) {
    super(props);
    
    this.refArray = [];
    this.lastIndex = undefined;
    this.batchCounter = 0;

    this.state = {
      items: this.createItems({min: 0, max: batchSize})
    };
  }

  createItems(batch) {
    const data = conversations.slice(batch.min, batch.max);

    const map = _.map(data, (item, index) => {
      const initials = AvatarHelper.getInitials(item.name);
      const animationProps = AnimatableManager.getEntranceByIndex(index);
      const avatarBadgeProps = {backgroundColor: Number(index) < 3 ? Colors.green30 : undefined};
      const buttonPress = () => Alert.alert('Badge button press');
      const listOnPress = () => Alert.alert(`Pressed on contact #${index + 1}`);
      const imageSource = item.thumbnail ? {uri: item.thumbnail} : null;
      const rightButtons = [
        {
          text: 'More',
          icon: shareIcon,
          background: Colors.dark60,
          onPress: () => Alert.alert(`More button pressed for item #${item.name}`)
        },
        {
          text: 'Archive',
          icon: collectionsIcon,
          background: Colors.blue30,
          onPress: () => Alert.alert(`Archive button pressed for item #${item.name}`)
        },
      ];
      const leftButton = {
        text: 'Read',
        icon: starIcon,
        background: Colors.green30,
        onPress: () => Alert.alert(`Read button pressed for item #${item.name}`)
      };

      return {
        ...item,
        initials,
        animationProps,
        avatarBadgeProps,
        buttonPress,
        listOnPress,
        imageSource,
        rightButtons,
        leftButton
      };
    });

    return map;
  }

  getNewItems() {
    this.batchCounter++;
    const newItems = this.createItems({
      min: batchSize * this.batchCounter, 
      max: batchSize + (batchSize * this.batchCounter)
    });
    const items = _.concat(this.state.items, newItems);
    this.setState({items});
  }

  closeLast(index) {
    if (this.lastIndex !== undefined) {
      this.closeDrawer(this.lastIndex);
    }
    this.lastIndex = index;
  }

  closeDrawer(index) {
    this.refArray[index].closeDrawer();
  }

  addRef = (ref, index) => {
    this.refArray[index] = ref;
  }

  onDragStart = (props) => {
    this.closeLast(props.index);
  }

  onEndReached = () => {
    this.getNewItems();
  }

  renderItem = ({item, index}) => {
    return (
      <AnimatableView {...item.animationProps}>
        <Drawer
          migrate
          leftItem={item.leftButton}
          rightItems={item.rightButtons}
          // itemsMinWidth={80}
          ref={r => this.addRef(r, index)}
          onDragStart={this.onDragStart}
          index={index} // sent for the 'closeLast' functionality
        >
          <ListItem
            height={75.8}
            onPress={item.listOnPress}
          >
            <ListItem.Part left>
              <Avatar
                size={54}
                imageSource={item.imageSource}
                label={item.initials}
                badgeProps={item.avatarBadgeProps}
                containerStyle={styles.avatar}
              />
            </ListItem.Part>
            <ListItem.Part middle column containerStyle={styles.border}>
              <ListItem.Part containerStyle={styles.middle}>
                <Text style={styles.text} text70 color={Colors.dark10} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.subtitle} text90 color={Colors.dark50}>{item.timestamp}</Text>
              </ListItem.Part>
              <ListItem.Part>
                <Text style={styles.text} text80 color={Colors.dark40} numberOfLines={1}>{item.text}</Text>
                {item.count > 0 && <Button round size={'small'} label={item.count} onPress={item.buttonPress}/>}
              </ListItem.Part>
            </ListItem.Part>
          </ListItem>
        </Drawer>
      </AnimatableView>
    );
  }

  keyExtractor = (item, index) => `${item.name}-${index}`;

  render() {
    return (
      <FlatList
        data={this.state.items}
        // extraData={this.state}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onEndReached={this.onEndReached}
        // onEndReachedThreshold={0.7}
      />
    );
  }
}

export default gestureHandlerRootHOC(ConversationListScreen);

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
    paddingRight: 17
  },
  avatar: {
    marginHorizontal: 18
  },
  middle: {
    marginBottom: 3
  },
  text: {
    flex: 1, 
    marginRight: 10
  },
  subtitle: {
    marginTop: 2
  }
});
