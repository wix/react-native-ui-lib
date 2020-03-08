import React from 'react';
import {ScrollView} from 'react-native';
import {Colors, View, Text, TouchableOpacity} from 'react-native-ui-lib';
import {menuStructure} from 'unicorn-demo-app';
import _ from 'lodash';

export default function MainScreen({navigation}) {
  return (
    <ScrollView>
      <View>
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
              })}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
