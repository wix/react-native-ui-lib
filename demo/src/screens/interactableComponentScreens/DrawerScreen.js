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
    
    this.state = {};
  }

  onPress = () => {
    console.log('Drawer pressed');
  }

  onItemPress = (id) => {
    console.log(`Item ${id} pressed`);
  }

  render() {
    const leftItem = {id: 'left', icon: collectionsIcon, text: 'Save', background: Colors.red30};
    const rightItems = [
      {id: 'right-1', icon: starIcon, text: 'Accessories', width: 110},
      {id: 'right-2', icon: sharIcon, text: 'Share', background: Colors.violet40},
      {id: 'right-3', icon: videoIcon, text: 'Video', background: Colors.violet50},
    ];
    
    return (
      <View style={styles.container}>
        <Drawer
          height={96}
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
        
        <Drawer
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
        
        <Drawer
          height={56}
          leftItem={leftItem}
          rightItems={rightItems}
          style={{marginTop: 20}}
          onPress={this.onPress}
          onItemPress={this.onItemPress}
        >
          <View style={styles.rowContent}>
            <View style={[styles.rowIcon, {width: 38, height: 38, borderRadius: 19}]}/>
            <View>
              <Text style={[styles.rowTitle, {...Typography.text70, fontWeight: 'bold'}]}>Row Title</Text>
              <Text style={[styles.rowSubtitle, {...Typography.text80}]}>Drag the row left and right</Text>
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
