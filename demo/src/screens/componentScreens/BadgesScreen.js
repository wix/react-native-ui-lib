import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Badge, Colors} from 'react-native-ui-lib';//eslint-disable-line

const BadgesSpace = 30;

export default class ButtonsScreen extends Component {

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Badge label={'1'} containerStyle={{marginRight: BadgesSpace}} />
        <Badge label={'10'} containerStyle={{marginRight: BadgesSpace}} backgroundColor={Colors.red40} />
        <Badge label={'27'} containerStyle={{marginRight: BadgesSpace}} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
});
