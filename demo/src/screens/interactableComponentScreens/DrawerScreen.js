import React, {Component} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {Colors, Typography, View, Drawer, Text, Button, ListItem, Avatar, AvatarHelper} from 'react-native-ui-lib'; //eslint-disable-line
import conversations from '../../data/conversations';


const collectionsIcon = require('../../assets/icons/collections.png');
const starIcon = require('../../assets/icons/star.png');
const sharIcon = require('../../assets/icons/share.png');
const videoIcon = require('../../assets/icons/video.png');

export default class DrawerScreen extends Component {

  constructor(props) {
    super(props);
    
    this.state = {};
  }

  onPress = () => {
    Alert.alert('Drawer pressed');
  }
  onItemPress = (id) => {
    Alert.alert(`Item ${id} pressed`);
    if (id === 'right-1') {
      this.firstDrawer.closeDrawer();
    }
  }

  onButtonPress(id) {
    Alert.alert(`Button '${id}' pressed`);
  }
  onContentPress(id) {
    Alert.alert(`List item #${id + 1} pressed`);
    this.firstDrawer.closeDrawer();
  }

  renderContent(id, row) {
    const initials = AvatarHelper.getInitials(row.name);
    return (
      <ListItem
        key={id}
        onPress={() => this.onContentPress(id)}
        style={{height: '100%', backgroundColor: Colors.dark80}}
      >
        <ListItem.Part left>
          <Avatar
            imageSource={row.thumbnail ? {uri: row.thumbnail} : null}
            label={initials}
            isOnline={Number(id) % 3 === 0}
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
    const leftItem = {id: 'left', icon: collectionsIcon, text: 'Archive'};
    const rightItems = [
      {id: 'right-1', icon: starIcon, text: 'Accessories', width: 110},
      {id: 'right-2', icon: sharIcon, text: 'Share'},
      {id: 'right-3', icon: videoIcon, text: 'Video', closeDrawer: true},
    ];
    
    return (
      <View style={styles.container}>
        <Drawer
          height={96}
          leftItem={leftItem}
          rightItems={rightItems}
          style={{marginTop: 20}}
          onItemPress={this.onItemPress}
          ref={r => this.firstDrawer = r}
        >
          {this.renderContent('0', conversations[0])}
        </Drawer>
        <Drawer
          height={96}
          width={250}
          leftItem={leftItem}
          rightItems={[rightItems[1], rightItems[2]]}
          style={{marginTop: 20, marginLeft: 50}}
          onPress={this.onPress}
          onItemPress={this.onItemPress}
        >
          {this.renderContent('2', conversations[2])}
        </Drawer>
        
        <Drawer
          // leftItem={leftItem}
          rightItems={rightItems}
          style={{marginTop: 20}}
          onPress={this.onPress}
          onItemPress={this.onItemPress}
        >
          {this.renderContent('1', conversations[1])}
        </Drawer>

        <Drawer
          leftItem={{id: 'left', icon: collectionsIcon, width: 120}}
          rightItems={[
            {id: 'right-1', icon: starIcon},
            {id: 'right-2', icon: sharIcon},
            {id: 'right-3', icon: videoIcon, closeDrawer: true},
          ]}
          style={{marginTop: 20}}
          onPress={this.onPress}
          onItemPress={this.onItemPress}
          itemsIconSize={36}
        >
          {this.renderContent('3', conversations[3])}
        </Drawer>
        
        <Drawer
          height={56}
          leftItem={leftItem}
          rightItems={rightItems}
          style={{marginTop: 20}}
          onPress={this.onPress}
          onItemPress={this.onItemPress}
          itemsTintColor={Colors.black}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  rowContent: {
    flex: 1,
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
