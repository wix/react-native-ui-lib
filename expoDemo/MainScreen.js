import React from 'react';
import {ScrollView, TextInput} from 'react-native';
import {Colors, View, Text, TouchableOpacity} from 'react-native-ui-lib';
import {menuStructure} from 'unicorn-demo-app';
import _ from 'lodash';

export default function MainScreen({navigation}) {
  const [searchText, setSearchText] = React.useState('');

  return (
    <View>
      <TextInput
        style={{padding: 10, marginBottom:0, fontSize: 18}}
        placeholder= 'Search for your component...'
        onChangeText={text => setSearchText(text)}
        value={searchText}
      />
      <ScrollView>
        <View bg-white>
          {_.map(menuStructure, section => {
            return (
              <View key={section.title}>
                <Text text50 marginL-s5 marginV-s3>
                  {section.title}
                </Text>
                {_.map(section.screens, screen => {
                  return (
                    <TouchableOpacity
                      activeOpacity={1}
                      bg-blue40
                      paddingH-s5
                      paddingV-s4
                      key={screen.title}
                      activeBackgroundColor={Colors.blue20}
                      style={{borderBottomWidth: 1, borderColor: Colors.white}}
                      onPress={() => {
                        // convert "unicorn.components.ActionBarScreen" -> "ActionBar"
                        const screenId = _.chain(screen.screen)
                          .split('.')
                          .last()
                          .replace('Screen', '')
                          .value();
                        navigation.navigate(screenId);
                      }}
                    >
                      <Text white text70M>
                        {screen.title}
                      </Text>
                    </TouchableOpacity>
                  );
                }).filter(item => item.key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
