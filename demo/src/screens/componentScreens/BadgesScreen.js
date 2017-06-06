import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {View, Badge, Colors} from 'react-native-ui-lib';//eslint-disable-line

const BadgesSpace = 30;

export default class ButtonsScreen extends Component {

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View row>
          <Badge label={'1'} containerStyle={{marginRight: BadgesSpace}} />
          <Badge label={'10'} containerStyle={{marginRight: BadgesSpace}} backgroundColor={Colors.red40} />
          <Badge label={'272'} containerStyle={{marginRight: BadgesSpace}} />
        </View>
        
        <View row marginT-20>
          <Badge size="small" label={'1'} containerStyle={{marginRight: BadgesSpace}} />
          <Badge size="small" label={'10'} containerStyle={{marginRight: BadgesSpace}} backgroundColor={Colors.red40} />
          <Badge size="small" label={'272'} containerStyle={{marginRight: BadgesSpace}} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
});
