import React, {Component} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, FlatList, Image} from 'react-native';
import {Constants, Colors, View, Text} from 'react-native-ui-lib'; //eslint-disable-line
import songs from '../../data/songs';


const GUTTER_SIZE = 24;
const NUMBER_OF_COLUMNS = 2;

class AppleMusic extends Component {
  render() {
    return (
      <View flex>
        <ScrollView>
          <View paddingL-24>
            <View row spread bottom paddingR-24 style={styles.separator}>
              <Text text20 style={{lineHeight: 70}} >
                Library
              </Text>
              <Text text70 red20 marginB-10>
                Edit
              </Text>
            </View>
          </View>
          {/* Menu List */}
          <View paddingL-24>
            <FlatList
              data={['Playlist', 'Artists', 'Albums', 'Songs', 'Downloaded Music']}
              keyExtractor={item => item}
              renderItem={({item}) => <ListItem item={item}/>}
            />
          </View>
          {/* Grid List of Recently Added */}
          <View paddingH-24 marginT-30>
            <Text text40>
              Recently Added
            </Text>
            <View marginT-20>
              <FlatList
                horizontal={false}
                numColumns={NUMBER_OF_COLUMNS}
                keyExtractor={item => item.url}
                data={songs}
                renderItem={props => <GridListItem {...props}/>}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.dark60,
  },
});

export default AppleMusic;


const ListItem = ({item}) => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View
        height={60}
        centerV
        style={[styles.separator]}
      >
        <Text text60 red20>
          {item}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const GridListItem = ({item, index}) => {
  const itemSize = (Constants.screenWidth - (GUTTER_SIZE * (NUMBER_OF_COLUMNS + 1))) / NUMBER_OF_COLUMNS;
  return (
    <View flex marginL-24={index % NUMBER_OF_COLUMNS !== 0} marginB-24>
      <View height={itemSize} bg-dark80>
        <Image style={{flex: 1}} source={{uri: item.image[3]['#text']}}/>
      </View>
      <View paddingT-2>
        <Text text70 dark20 numberOfLines={1}>{item.name}</Text>
        <Text text80 dark40>{item.artist.name}</Text>
      </View>
    </View>
  );
};

// todo: add border radius modifier
// todo: add border modifier
// todo: re-create grid list using FlatList
// todo: add font-weight modifier
