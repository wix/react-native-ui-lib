import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, StyleSheet, Alert} from 'react-native';
import {Avatar, AvatarHelper, View, Text, Colors, Typography, AvatarProps} from 'react-native-ui-lib';


const star = require('../../assets/icons/star.png');
const onlineColor = Colors.$backgroundSuccessHeavy;
const examples = [
  {title: 'Custom Background', backgroundColor: Colors.violet60},
  {title: 'Empty Avatar with ribbon', ribbonLabel: 'New'},
  {
    title: 'Initials with Color',
    label: 'AD',
    backgroundColor: Colors.$backgroundWarningLight,
    labelColor: Colors.$textMajor,
    ribbonLabel: 'New',
    ribbonStyle: {backgroundColor: Colors.purple30}
  },
  {title: 'Initials, badge ("online")', label: 'ES', badgeProps: {backgroundColor: onlineColor}},
  {
    title: 'Image, badge ("away")',
    source: {
      uri:
        'https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg'
    },
    badgeProps: {size: 10, backgroundColor: Colors.$backgroundWarningHeavy},
    badgePosition: 'BOTTOM_RIGHT' as AvatarProps['badgePosition']
  },

  {
    title: 'Smaller size, Badge ("offline")',
    size: 40,
    source: {
      uri:
        'https://lh3.googleusercontent.com/-CMM0GmT5tiI/AAAAAAAAAAI/AAAAAAAAAAA/-o9gKbC6FVo/s181-c/111308920004613908895.jpg'
    },
    badgeProps: {size: 10, backgroundColor: Colors.$backgroundDisabled},
    badgePosition: 'BOTTOM_LEFT' as AvatarProps['badgePosition']
  },
  {
    title: 'Image with fade in animation',
    size: 60,
    animate: true,
    imageProps: {animationDuration: 1000},
    source: {uri: 'https://lh3.googleusercontent.com/-CMM0GmT5tiI/AAAAAAAAAAI/AAAAAAAAAAA/-o9gKbC6FVo/s181-c/111308920004613908895.jpg'}
  },
  {
    title: 'Big pimple',
    size: 70,
    backgroundColor: 'red',
    source: {
      uri: 'https://randomuser.me/api/portraits/women/24.jpg'
    },
    badgeProps: {size: 14, borderWidth: 0, backgroundColor: onlineColor},
    badgePosition: 'TOP_LEFT' as AvatarProps['badgePosition']
  },
  {
    title: 'Icon badge',
    size: 60,
    source: {
      uri: 'https://randomuser.me/api/portraits/women/24.jpg'
    },
    badgeProps: {
      icon: star,
      size: 14,
      borderWidth: 1.5,
      borderColor: Colors.$outlineInverted,
      iconStyle: {backgroundColor: Colors.$backgroundWarningHeavy}
    }
  },
  {
    title: 'GIF',
    size: 48,
    source: {
      uri: 'https://media.giphy.com/media/3oEdv8elIVRa3daNl6/giphy.gif'
    }
  },
  {
    title: 'Invalid Gravatar (see logs)',
    label: '🤦',
    backgroundColor: Colors.$backgroundNeutralMedium,
    source: {uri: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=404'},
    onImageLoadStart: () => console.log('AvatarScreen: Invalid avatar load STARTED...'), // eslint-disable-line
    onImageLoadEnd: () => console.log('AvatarScreen: Invalid avatar load ENDED'), // eslint-disable-line
    onImageLoadError: () => console.log('AvatarScreen: Invalid avatar load FAILED') // eslint-disable-line
  },
  {
    title: 'Monitored Avatar (see logs)',
    label: '?!',
    backgroundColor: Colors.$backgroundGeneralHeavy,
    source: {uri: 'https://static.altomusic.com/media/catalog/product/M/A/MAJ100SBK_0.jpg'},
    onImageLoadStart: () => console.log('AvatarScreen: Monitored avatar load STARTED...'), // eslint-disable-line
    onImageLoadEnd: () => console.log('AvatarScreen: Monitored avatar load ENDED') // eslint-disable-line
  },
  {
    title: 'Empty Gravatar',
    backgroundColor: Colors.$backgroundDangerLight,
    source: {uri: 'https://www.gravatar.com/avatar/2497473d558a37020c558bf26e380a7c?d=blank'}
  },
  {
    title: 'With custom badge label',
    label: 'LD',
    backgroundColor: Colors.$backgroundDangerLight,
    badgePosition: 'BOTTOM_RIGHT' as AvatarProps['badgePosition'],
    badgeProps: {
      label: '+2',
      size: 24,
      borderWidth: 1.5,
      borderColor: Colors.$outlineInverted
    }
  }
];

export default class AvatarsScreen extends Component {
  
  onAvatarPress = (item: any) => {
    const {title, source, label} = item;
    const uri = _.get(source, 'uri');
    const isGravatar = !!uri && AvatarHelper.isGravatarUrl(uri);
    const patchedGravatar = isGravatar ? AvatarHelper.patchGravatarUrl(uri) : undefined;
    const message = `Label: ${label}\n\nImage-source: ${uri}\n\nIs Gravatar: ${isGravatar}\n\n${
      patchedGravatar ? `Patched-uri: ${patchedGravatar}` : ''
    }`;
    Alert.alert(title, message);
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {_.map(examples, (example, i) => (
          <View key={i} style={styles.section}>
            <Text $textDefault style={{...Typography.text80}}>{example.title}</Text>
            <Avatar containerStyle={{marginVertical: 5}} {...example} onPress={() => this.onAvatarPress(example)}/>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: Colors.$backgroundDefault
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15
  }
});
