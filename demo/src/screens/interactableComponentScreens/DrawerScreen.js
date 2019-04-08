import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, Alert, ScrollView} from 'react-native';
import {Colors, Typography, View, Drawer, Text, Button, ListItem, Avatar, AvatarHelper} from 'react-native-ui-lib'; //eslint-disable-line
import conversations from '../../data/conversations';


const collectionsIcon = require('../../assets/icons/collections.png');
const starIcon = require('../../assets/icons/star.png');
const sharIcon = require('../../assets/icons/share.png');
const videoIcon = require('../../assets/icons/video.png');

export default class DrawerScreen extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      itemsTintColor: undefined,
      leftItem: {icon: collectionsIcon, text: 'Archive', onPress: this.onLeftItemPressed},
      rightItems: [
        {icon: starIcon, text: 'Accessories', onPress: this.onItemPress, background: Colors.violet10},
        {icon: sharIcon, text: 'Share', onPress: this.onItemPress, background: Colors.violet30},
        {icon: videoIcon, text: 'Video', onPress: this.onItemPress, background: Colors.violet40},
        // {icon: videoIcon, text: 'Video', background: Colors.green30},
        // {icon: videoIcon, text: 'Video', background: Colors.red30},
      ],
    };

    this.setItemsWidths();
  }

  onPress = () => {
    // Alert.alert('Drawer pressed');
  }
  onItemPress = () => {
    // Alert.alert('Item pressed');
    this.toggleDynamicItem();
    this.firstDrawer.closeDrawer();
  }
  onItemPress2 = () => {
    const {itemsTintColor} = this.state;
    const color = itemsTintColor === undefined ? Colors.blue30 : undefined;
    this.setState({itemsTintColor: color});
  }
  onLeftItemPressed = () => {
    Alert.alert('Left item pressed');
  }

  onButtonPress(id) {
    Alert.alert(`Button '${id}' pressed`);
  }
  onContentPress(id) {
    // Alert.alert(`List item #${id + 1} pressed`);
    if (id === '0') {
      this.firstDrawer.closeDrawer();
    }
    if (id === '1') {
      this.secondDrawer.closeDrawer();
    }
  }

  // Measure item text to calculate items' widths
  async setItemsWidths() {
    const {rightItems, leftItem} = this.state;
    
    if (rightItems) {
      const promises = rightItems.map((item) => {
        return this.setItemWidth(item);
      });
      const data = await Promise.all(promises);
      this.setState({rightItems: data});
    }

    if (leftItem) {
      const item = await this.setItemWidth(leftItem);
      this.setState({leftItem: item});
    }
  }
  async setItemWidth(item) {
    if (item && !item.width && !_.isEmpty(item.text)) {
      const horizontalPadding = 12;
      const typography = Typography.text70;
      const width = await Typography.measureWidth(item.text, typography);
      const itemCopy = item;
      itemCopy.width = width + (horizontalPadding * 2);
      return itemCopy;
    }
  }

  toggleDynamicItem() {
    const {rightItems} = this.state;
    let newItem;
    if (rightItems[0].text === 'Accessories') {
      newItem = {icon: starIcon, text: 'More', onPress: this.onItemPress, background: Colors.violet10, width: 90};
    } else {
      newItem = {icon: starIcon, text: 'Accessories', onPress: this.onItemPress, background: Colors.violet10, width: 200};
    }
    rightItems[0] = newItem;
    this.setState({rightItems});
  }

  renderContent(id, row) {
    const initials = AvatarHelper.getInitials(row.name);
    return (
      <ListItem
        key={id}
        onPress={() => this.onContentPress(id)}
        style={styles.listContent}
      >
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
      <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 50}}>
        <Drawer
          leftItem={leftItem}
          rightItems={rightItems}
          style={{marginTop: 20}}
          ref={r => this.firstDrawer = r}
        >
          {this.renderContent('0', conversations[0])}
        </Drawer>
        <Drawer
          leftItem={leftItem}
          rightItems={[
            {icon: sharIcon, text: 'Share', onPress: this.onItemPress},
            {icon: videoIcon, text: 'Video', onPress: this.onItemPress, background: Colors.violet40},
          ]}
          style={{marginTop: 20}}
        >
          {this.renderContent('0', conversations[0])}
        </Drawer>
        
        <Drawer
          // leftItem={leftItem}
          rightItems={rightItems}
          style={{marginTop: 20}}
          onPress={this.onPress}
          equalWidths
        >
          {this.renderContent('1', conversations[1])}
        </Drawer>

        <Drawer
          leftItem={{text: 'Archive', background: Colors.blue10, width: 100, onPress: this.onLeftItemPressed}}
          // rightItems={rightItems}
          style={{marginTop: 20}}
          itemsTextStyle={{fontSize: 18}}
          onPress={this.onPress}
          ref={r => this.secondDrawer = r}
        >
          {this.renderContent('1', conversations[1])}
        </Drawer>

        <Drawer
          leftItem={leftItem}
          rightItems={[rightItems[1], rightItems[2]]}
          style={{marginTop: 20, marginLeft: 50, marginRight: 50}}
          onPress={this.onPress}
        >
          {this.renderContent('2', conversations[2])}
        </Drawer>
        
        {/* <View style={{width: 250}}>
          <Drawer
            leftItem={leftItem}
            rightItems={[rightItems[1], rightItems[2]]}
            style={{marginTop: 20, marginLeft: 50}}
            onPress={this.onPress}
          >
            {this.renderContent('2', conversations[2])}
          </Drawer>
        </View> */}

        <Drawer
          leftItem={{icon: collectionsIcon, background: Colors.blue10, width: 100}}
          rightItems={[
            {icon: starIcon, background: Colors.dark60},
            {icon: sharIcon, background: Colors.yellow20},
            {icon: videoIcon, background: Colors.red30, onPress: this.onItemPress2},
            // {icon: videoIcon, background: Colors.green30},
          ]}
          style={{marginTop: 20}}
          onPress={this.onPress}
          itemsIconSize={30}
          itemsTintColor={this.state.itemsTintColor}
        >
          {this.renderContent('3', conversations[3])}
        </Drawer>
        
        <Drawer
          leftItem={leftItem}
          rightItems={rightItems}
          style={{marginTop: 20}}
          onPress={this.onPress}
          itemsTextStyle={{fontSize: 12}}
        >
          <View style={styles.rowContent}>
            <View style={[styles.rowIcon, {width: 38, height: 38, borderRadius: 19}]}/>
            <View>
              <Text style={[styles.rowTitle, {...Typography.text70, fontWeight: 'bold'}]}>Row Title</Text>
              <Text style={[styles.rowSubtitle, {...Typography.text80}]}>Drag the row left and right</Text>
            </View>
            <View style={styles.rowButtonContainer}>
              <Button
                label={'Button'}
                size={'small'}
                backgroundColor={Colors.blue30}
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
    backgroundColor: Colors.white,
  },
  listContent: {
    backgroundColor: Colors.dark80,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark80,
  },
  rowIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.violet40,
    margin: 20,
  },
  rowTitle: {
    ...Typography.text60,
    fontWeight: 'bold',
    color: Colors.dark20,
  },
  rowSubtitle: {
    ...Typography.text70,
    color: Colors.dark30,
  },
  rowButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    padding: 10,
  },
});
