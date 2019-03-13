import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet, Alert} from 'react-native';
import _ from 'lodash';
import {Avatar, AvatarHelper, Colors, Typography} from 'react-native-ui-lib'; //eslint-disable-line

const star = require('../../assets/icons/star.png');

const onlineColor = Colors.green30;

const examples = [
  {title: 'Custom Background', backgroundColor: Colors.violet60},
  {title: 'Empty Avatar with ribbon', ribbonLabel: 'New'},
  {
    title: 'Initials with Color',
    label: 'AD',
    backgroundColor: Colors.yellow60,
    labelColor: Colors.orange20,
    ribbonLabel: 'New',
    ribbonStyle: {backgroundColor: Colors.purple30},
  },
  {title: 'Initials, badge ("online")', label: 'ES', badgeProps: {backgroundColor: onlineColor}},
  {
    title: 'Image, badge ("away")',
    imageSource: {
      uri:
        'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg',
    },
    badgeProps: {size: 'pimpleBig', backgroundColor: Colors.yellow30},
  },

  {
    title: 'Smaller size',
    size: 40,
    imageSource: {
      uri:
        'https://lh3.googleusercontent.com/-CMM0GmT5tiI/AAAAAAAAAAI/AAAAAAAAAAA/-o9gKbC6FVo/s181-c/111308920004613908895.jpg',
    },
  },
  {
    title: 'Image with fade in animation',
    size: 60,
    animate: true,
    imageProps: {animationDuration: 1000},
    imageSource: {uri: 'https://static.pexels.com/photos/60628/flower-garden-blue-sky-hokkaido-japan-60628.jpeg'},
  },
  {
    title: 'Big pimple, bottom right',
    size: 70,
    backgroundColor: 'red',
    imageSource: {
      uri: 'https://randomuser.me/api/portraits/women/24.jpg',
    },
    badgeProps: {size: 'pimpleHuge', borderWidth: 0, backgroundColor: onlineColor},
    badgePosition: 'BOTTOM_RIGHT',
  },
  {
    title: 'Icon badge',
    size: 60,
    imageSource: {
      uri: 'https://randomuser.me/api/portraits/women/24.jpg',
    },
    badgeProps: {
      icon: star,
      size: 'pimpleHuge',
      borderWidth: 1.5,
      borderColor: Colors.white,
      iconStyle: {backgroundColor: Colors.yellow20},
    },
  },
  {
    title: 'Invalid Gravatar (see logs)',
    label: '🤦',
    backgroundColor: Colors.dark60,
    imageSource: {uri: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=404'},
    onImageLoadStart: () => console.log('AvatarScreen: Invalid avatar load STARTED...'), // eslint-disable-line
    onImageLoadEnd: () => console.log('AvatarScreen: Invalid avatar load ENDED'), // eslint-disable-line
    onImageLoadError: () => console.log('AvatarScreen: Invalid avatar load FAILED'), // eslint-disable-line
  },
  {
    title: 'Monitored Avatar (see logs)',
    label: '?!',
    backgroundColor: Colors.blue20,
    imageSource: {uri: 'https://static.altomusic.com/media/catalog/product/M/A/MAJ100SBK_0.jpg'},
    onImageLoadStart: () => console.log('AvatarScreen: Monitored avatar load STARTED...'), // eslint-disable-line
    onImageLoadEnd: () => console.log('AvatarScreen: Monitored avatar load ENDED'), // eslint-disable-line
  },
  {
    title: 'Empty Gravatar',
    backgroundColor: Colors.red60,
    imageSource: {uri: 'https://www.gravatar.com/avatar/2497473d558a37020c558bf26e380a7c?d=blank'},
  },
];

export default class AvatarsScreen extends Component {
  constructor(props) {
    super(props);

    this.onAvatarPress = this.onAvatarPress.bind(this);
  }

  onAvatarPress(item) {
    const {title, imageSource, label} = item;
    const uri = _.get(imageSource, 'uri');
    const isGravatar = !!uri && AvatarHelper.isGravatarUrl(uri);
    const patchedGravatar = isGravatar ? AvatarHelper.patchGravatarUrl(uri) : undefined;
    const message = `Label: ${label}\n\nImage-source: ${uri}\n\nIs Gravatar: ${isGravatar}\n\n${
      patchedGravatar ? `Patched-uri: ${patchedGravatar}` : ''
    }`;
    Alert.alert(title, message);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {_.map(examples, (example, i) => (
          <View key={i} style={styles.section}>
            <Text style={{...Typography.text80}}>{example.title}</Text>
            <Avatar containerStyle={{marginVertical: 5}} {...example} onPress={() => this.onAvatarPress(example)} />
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
