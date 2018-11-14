import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Colors, Typography, View, Drawer, Text} from 'react-native-ui-lib'; //eslint-disable-line


const collectionsIcon = require('../../assets/icons/collections.png');
const starIcon = require('../../assets/icons/star.png');
const sharIcon = require('../../assets/icons/share.png');
const videoIcon = require('../../assets/icons/video.png');

export default class DrawerScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      damping: 1 - 0.6,
      tension: 300,
    };
  }

  onPress = () => {
    alert('Drawer pressed');
  }

  onItemPress = (id) => {
    alert(`Item ${id} pressed`);
  }

  render() {
    const leftItem = {id: 'left1', icon: collectionsIcon, text: 'Add', style: {backgroundColor: Colors.red30}};
    const rightItems = [
      {id: 'right1', icon: starIcon, text: 'Star', style: {backgroundColor: Colors.green40}},
      {id: 'right2', icon: sharIcon, text: 'Share', style: {backgroundColor: Colors.violet40}},
      {id: 'right3', icon: videoIcon, text: 'Video', style: {backgroundColor: Colors.violet50}},
    ];
    
    return (
      <View style={styles.container}>
        <Drawer
          height={75}
          damping={this.state.damping}
          tension={this.state.tension}
          leftItem={leftItem}
          rightItems={rightItems}
          style={{marginTop: 20}}
          onPress={this.onPress}
          onItemPress={this.onItemPress}
        >
          <View style={styles.rowContent}>
            <View style={styles.rowIcon} />
            <View>
              <Text style={styles.rowTitle}>Row Title</Text>
              <Text style={styles.rowSubtitle}>Drag the row left and right</Text>
            </View>
          </View>
        </Drawer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  rowContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.dark70,
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
});
