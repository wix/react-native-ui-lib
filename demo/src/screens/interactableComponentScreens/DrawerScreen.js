import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, Alert, ScrollView} from 'react-native';
import {Colors, Typography, View, Drawer, Text, Button, ListItem, Avatar, AvatarHelper} from 'react-native-ui-lib'; //eslint-disable-line
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import conversations from '../../data/conversations';


const collectionsIcon = require('../../assets/icons/collections.png');
const starIcon = require('../../assets/icons/star.png');
const shareIcon = require('../../assets/icons/share.png');
const videoIcon = require('../../assets/icons/video.png');
const tagsIcon = require('../../assets/icons/tags.png');

class DrawerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsTintColor: undefined,
      leftItem: {icon: collectionsIcon, text: 'Archive', onPress: this.onLeftItemPressed},
      rightItems: [
        {icon: starIcon, text: 'Accessories', onPress: this.onItemPress, background: Colors.violet10},
        {icon: shareIcon, text: 'Share', onPress: this.onItemPress, background: Colors.violet30},
        {icon: videoIcon, text: 'Video', onPress: this.onItemPress, background: Colors.violet40},
        // {icon: tagsIcon, text: 'Video', background: Colors.red30},
      ],
    };
  }

  onItemPress = () => {
    Alert.alert('Right drawer item pressed');
    
    this.toggleDynamicItem();
    this.firstDrawer.closeDrawer();
  };
  onItemPress2 = () => {
    const {itemsTintColor} = this.state;
    const color = itemsTintColor === undefined ? Colors.blue30 : undefined;
    
    this.setState({itemsTintColor: color});
  };
  onLeftItemPressed = () => {
    Alert.alert('Left drawer item pressed');
  };
  onContentPress(id) {
    Alert.alert(`List item #${id + 1} pressed`);
  }
  onButtonPress(id) {
    Alert.alert(`Button '${id}' pressed`);
  }

  async setItemWidth(item) {
    if (item && !item.width && !_.isEmpty(item.text)) {
      const horizontalPadding = 12;
      const typography = Typography.text70;
      const width = await Typography.measureWidth(item.text, typography);
      const itemCopy = item;
      itemCopy.width = width + horizontalPadding * 2;
      return itemCopy;
    }
  }

  toggleDynamicItem() {
    const {rightItems} = this.state;
    let newItem;
    if (rightItems[0].text === 'Accessories') {
      newItem = {icon: starIcon, text: 'More', onPress: this.onItemPress, background: Colors.violet10};
    } else {
      newItem = {
        icon: starIcon,
        text: 'Accessories',
        onPress: this.onItemPress,
        background: Colors.violet10
      };
    }
    rightItems[0] = newItem;
    this.setState({rightItems});
  }

  renderContent(id, row) {
    const initials = AvatarHelper.getInitials(row.name);
    return (
      <ListItem key={id} onPress={() => this.onContentPress(id)} style={styles.listContent}>
        <ListItem.Part left>
          <Avatar
            imageSource={row.thumbnail ? {uri: row.thumbnail} : null}
            label={initials}
            badgeProps={{backgroundColor: Number(id) % 3 === 0 ? Colors.green30 : undefined}}
            containerStyle={{marginHorizontal: 18}}
            backgroundColor={Colors.white}
          />
        </ListItem.Part>
        <ListItem.Part middle containerStyle={styles.border}>
          <Text text70>{row.name}</Text>
        </ListItem.Part>
      </ListItem>
    );
  }

  render() {
    const {leftItem, rightItems} = this.state;

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Drawer
          migrate
          leftItem={leftItem}
          rightItems={rightItems}
          style={styles.drawer}
          ref={r => this.firstDrawer = r}
        >
          {this.renderContent('0', conversations[0])}
        </Drawer>

        <Drawer
          migrate
          leftItem={leftItem}
          rightItems={[
            {icon: shareIcon, text: 'Share', onPress: this.onItemPress},
            {icon: videoIcon, text: 'Video', onPress: this.onItemPress, background: Colors.blue10},
          ]}
          style={styles.drawer}
        >
          {this.renderContent('1', conversations[1])}
        </Drawer>

        {/* <Drawer
          migrate
          // leftItem={leftItem}
          rightItems={rightItems}
          style={styles.drawer}
          equalWidths
        >
          {this.renderContent('1', conversations[1])}
        </Drawer> */}

        <Drawer
          migrate
          leftItem={{text: 'Archive', background: Colors.green10, width: 100, onPress: this.onLeftItemPressed}}
          // rightItems={rightItems}
          style={styles.drawer}
          itemsTextStyle={{fontSize: 18, fontWeight: 'bold'}}
        >
          {this.renderContent('2', conversations[2])}
        </Drawer>

        <View style={{paddingHorizontal: 50}}>
          <Drawer
            migrate
            leftItem={leftItem}
            rightItems={[rightItems[1], rightItems[2]]}
            style={styles.drawer}
            >
            {this.renderContent('3', conversations[3])}
          </Drawer>
        </View>

        <Drawer
          migrate
          leftItem={{icon: collectionsIcon, background: Colors.blue10, width: 100}}
          rightItems={[
            {icon: starIcon, background: Colors.dark60},
            {icon: shareIcon, background: Colors.yellow20},
            {icon: videoIcon, background: Colors.red30, onPress: this.onItemPress2},
            {icon: tagsIcon, background: Colors.green30},
          ]}
          style={styles.drawer}
          itemsIconSize={30}
          itemsTintColor={this.state.itemsTintColor}
        >
          {this.renderContent('4', conversations[4])}
        </Drawer>

        <Drawer
          migrate
          leftItem={leftItem}
          rightItems={rightItems}
          style={styles.drawer}
          itemsTextStyle={{fontSize: 12}}
        >
          <View style={styles.rowContent}>
            <View style={styles.rowIcon}/>
            <View>
              <Text style={styles.rowTitle}>Row Title</Text>
              <Text style={styles.rowSubtitle}>Drag the row left and right</Text>
            </View>
            <View style={styles.rowButtonContainer}>
              <Button
                label={'1'}
                size={'small'}
                round
                backgroundColor={Colors.yellow30}
                white
                onPress={() => this.onButtonPress('1')}
              />
            </View>
          </View>
        </Drawer>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white
  },
  contentContainer: {
    paddingBottom: 50
  },
  drawer: {
    marginTop: 20
  },
  listContent: {
    backgroundColor: Colors.dark80
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark80
  },
  rowIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.violet40,
    margin: 20
  },
  rowTitle: {
    ...Typography.text70,
    fontWeight: 'bold',
    color: Colors.dark20
  },
  rowSubtitle: {
    ...Typography.text80,
    color: Colors.dark30
  },
  rowButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    padding: 10
  }
});

export default gestureHandlerRootHOC(DrawerScreen);
