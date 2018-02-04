import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import _ from 'lodash';
import {Avatar, Colors, Typography} from 'react-native-ui-lib';//eslint-disable-line

const examples = [
  {title: 'Empty Avatar', ribbonLabel: 'New'},
  {title: 'Custom Background', backgroundColor: Colors.violet60},
  {title: 'Initials (online)', label: 'ES', isOnline: true, status: Avatar.modes.NONE},
  {title: 'Initials with Color', label: 'AD', backgroundColor: Colors.yellow60, labelColor: Colors.orange20, ribbonLabel: 'New', ribbonStyle: {backgroundColor: Colors.purple30}},
  {title: 'Image (online)', imageSource: {uri: 'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg'}, isOnline: true},
  {
    title: 'Monitored Avatar (see logs)',
    backgroundColor: Colors.red60,
    imageSource: {uri: 'https://static.altomusic.com/media/catalog/product/M/A/MAJ100SBK_0.jpg'},
    onImageLoadStart: () => console.log('Monitored image load STARTED...'), // eslint-disable-line
    onImageLoadEnd: () => console.log('Monitored image load ENDED'), // eslint-disable-line
  },
  {title: 'Smaller', size: 40, imageSource: {uri: 'https://lh3.googleusercontent.com/-CMM0GmT5tiI/AAAAAAAAAAI/AAAAAAAAAAA/-o9gKbC6FVo/s181-c/111308920004613908895.jpg'}},
  {title: 'Bigger', size: 60, backgroundColor: 'red', imageSource: {uri: 'https://lh3.googleusercontent.com/-NQvYunR8V0U/AAAAAAAAAAI/AAAAAAAAAAA/lGLfZ92rPeE/s181-c/108911355181327993622.jpg'}},
  {title: 'Empty Gravatar', backgroundColor: Colors.red60, imageSource: {uri: 'https://gravatar.com/avatar/2497473d558a37020c558bf26e380a7c?d=blank'}},
  {title: 'Status (offline)', status: Avatar.modes.OFFLINE},
  {title: 'Status (away) overrides isOnline', isOnline: true, status: Avatar.modes.AWAY},
];

export default class AvatarsScreen extends Component {

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {_.map(examples, (example, i) => (
          <View key={i} style={styles.section}>
            <Text style={{...Typography.text70}}>{example.title}</Text>
            <Avatar containerStyle={{marginVertical: 5}} {...example}/>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});
