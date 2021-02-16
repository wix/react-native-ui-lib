import React, {useCallback} from 'react';
import {SectionList, StyleSheet} from 'react-native';
import {Colors, View, Text, TouchableOpacity, Spacings, Image, Assets, Incubator} from 'react-native-ui-lib';
import {menuStructure} from 'unicorn-demo-app';
import _ from 'lodash';
import fuzzysearch from 'fuzzysearch';

const {TextField} = Incubator;

const sections = _.map(menuStructure, (section, key) => {
  return {
    key,
    data: section.screens
  };
});

export default function MainScreen({navigation}) {
  const [searchText, setSearchText] = React.useState('');

  const includedInSearch = (text = '') => {
    return fuzzysearch(searchText.toLowerCase(), text.toLowerCase());
  };

  const onItemPress = useCallback(({customValue: screenId}) => {
    // convert "unicorn.components.ActionBarScreen" -> "ActionBar"
    navigation.navigate(screenId);
  });

  const renderSectionHeader = useCallback(({section}) => {
    if (!_.find(section.data, screen => includedInSearch(screen.title))) {
      return null;
    }

    return (
      <View paddingV-s1 paddingH-s5 bg-primary>
        <Text text90BO uppercase grey70>
          {section.key}
        </Text>
      </View>
    );
  },
  [searchText]);

  const renderItem = useCallback(({item}) => {
    if (!includedInSearch(item.title)) {
      return null;
    }

    if (!item.title) {
      return <View height={Spacings.s2} bg-grey70/>;
    }

    const screenId = _.chain(item.screen).split('.').last().replace('Screen', '').value();

    return (
      <TouchableOpacity
        activeOpacity={1}
        key={item.title}
        style={styles.sectionItem}
        activeBackgroundColor={Colors.violet80}
        customValue={screenId}
        onPress={onItemPress}
      >
        <Text grey10 text70M>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  },
  [searchText]);

  return (
    <View flex bg-white>
      <SectionList
        ListHeaderComponent={
          <TextField
            migrate
            placeholder="Search component name"
            onChangeText={text => setSearchText(text)}
            value={searchText}
            preset={null}
            text70
            fieldStyle={styles.fieldStyle}
            leadingAccessory={<Image source={Assets.icons.search} marginH-s2/>}
          />
        }
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fieldStyle: {
    paddingVertical: Spacings.s3
  },
  sectionItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey60,
    paddingHorizontal: Spacings.s5,
    paddingVertical: Spacings.s3
  }
});
