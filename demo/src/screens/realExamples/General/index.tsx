import React, {useCallback} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {NavigationComponentProps} from 'react-native-navigation';
import {View, Text, Image, Spacings, Colors, TouchableOpacity} from 'react-native-ui-lib';
import {push} from 'rnn-copilot';

const SCREENS = [
  {
    id: 'unicorn.examples.General.Example1',
    title: 'Example #1',
    description: 'Showcase for Carousel and general form inputs'
  }
];

export default (props: NavigationComponentProps) => {
  const pushScreen = useCallback(({customValue: screenId}) => {
    push(screenId, props.componentId).go();
  },
  [props.componentId]);

  const renderItem = screen => {
    return (
      <TouchableOpacity key={screen.id} style={styles.item} onPress={pushScreen} customValue={screen.id}>
        <Text h3>{screen.title}</Text>
        <Text body grey30 numberOfLines={2}>
          {screen.description}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <Text h1 margin-page>
        General inspirations
      </Text>

      {SCREENS.map(renderItem)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey50,
    paddingHorizontal: Spacings.page,
    paddingVertical: Spacings.s4
  }
});
