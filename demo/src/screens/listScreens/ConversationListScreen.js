import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {Component, PureComponent} from 'react';
import {StyleSheet, Alert, FlatList} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {ThemeManager, Colors, ListItem, Text, Avatar, AvatarHelper, Drawer, Button} from 'react-native-ui-lib'; //eslint-disable-line
import conversations from '../../data/conversations';


const collectionsIcon = require('../../assets/icons/collections.png');
const starIcon = require('../../assets/icons/star.png');
const shareIcon = require('../../assets/icons/share.png');
const batchSize = 10;

class ConversationListScreen extends Component {

  constructor(props) {
    super(props);
    
    this.lastIndex = undefined;
    this.refArray = [];
    this.batchCounter = 0;

    this.state = {
      items: this.createItems({min: 0, max: batchSize})
    };
  }

  createItems(batch) {
    const data = conversations.slice(batch.min, batch.max);

    const map = _.map(data, (item, index) => {
      const initials = AvatarHelper.getInitials(item.name);
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

  onEndReached = () => {
    this.getNewItems();
  }

  onSwipeableWillOpen = (props) => {
    this.closeLast(props.index);
  }

  renderItem = ({item, index}) => {
    return <ContactItem item={item} index={index} addRef={this.addRef} onSwipeableWillOpen={this.onSwipeableWillOpen}/>
  }

  keyExtractor = (item, index) => `${item.name}-${index}`;

  render() {
    return (
      <FlatList
        data={this.state.items}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onEndReached={this.onEndReached}
      />
    );
  }
}

export default gestureHandlerRootHOC(ConversationListScreen);

class ContactItem extends PureComponent {
  static propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    addRef: PropTypes.func,
    onSwipeableWillOpen: PropTypes.func
  }

  render() {
    const {item, index, addRef, onSwipeableWillOpen} = this.props;

    return (
      <Drawer
        migrate
        leftItem={item.leftButton}
        rightItems={item.rightButtons}
        // itemsMinWidth={80}
        ref={r => addRef(r, index)}
        onDragStart={this.onDragStart}
        index={index} // sent for the 'closeLast' functionality
        onSwipeableWillOpen={onSwipeableWillOpen} // sent for the 'closeLast' functionality
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
              {item.count > 0 && <Button size={'small'} label={item.count} onPress={item.buttonPress}/>}
            </ListItem.Part>
          </ListItem.Part>
        </ListItem>
      </Drawer>
    );
  }
}

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
