import React, {Component} from 'react';
import {Alert} from 'react-native';
import {Chip, Colors, Spacings, Text, Typography, View} from 'react-native-ui-lib';

const avatarImage = {
  uri: 'https://randomuser.me/api/portraits/women/24.jpg'
};
const checkmark = require('../../assets/icons/check-small.png');

export default class ChipScreen extends Component {
  renderExample = (text: string, chip: JSX.Element) => {
    return (
      <View row spread marginB-12>
        <Text text70> {text} </Text>
        {chip}
      </View>
    );
  };

  render() {
    return (
      <View style={{padding: 20}}>
        <Text marginB-20 text40>
          Chip
        </Text>
        <Text marginB-10 text70BO>
          Default
        </Text>
        {this.renderExample('label', <Chip label={'Chip'}/>)}
        {this.renderExample(
          'label with onPress',
          <Chip label={'Chip'} onPress={() => Alert.alert('onPress')}/>
        )}
        {this.renderExample(
          'Icon',
          <Chip
            iconSource={checkmark}
            iconColor={Colors.black}
            iconStyle={{width: 24, height: 24}}
          />
        )}
        {this.renderExample(
          'label + icon',
          <Chip
            label={'Chip'}
            iconSource={checkmark}
            iconStyle={{width: 24, height: 24}}
            iconColor={Colors.black}
          />
        )}
        {this.renderExample(
          'label + Avatar',
          <Chip label={'Chip'} avatar={{source: avatarImage, size: 20}}/>
        )}
        {this.renderExample(
          'label + onDismiss (tag)',
          <Chip
            label={'Chip'}
            iconColor={Colors.black}
            onDismiss={() => Alert.alert('onDismiss')}
            onPress={() => Alert.alert('onPress')}
            dismissIconStyle={{width: 10, height: 10}}
          />
        )}
        {this.renderExample(
          'label + counter',
          <Chip label={'Chip'} counterLabel={'4'}/>
        )}
        {this.renderExample(
          'label + badge counter',
          <Chip
            label={'Chip'}
            counterLabel={'4'}
            useBadge
          />
        )}

        <Text marginT-20 marginB-10 text70BO>
          Custom
        </Text>
        <View center row >
          <Chip
            iconSource={checkmark}
            label={'Chip'}
            labelStyle={{color: Colors.green20}}
            iconColor={Colors.green20}
            containerStyle={{borderColor: Colors.green20}}
          />
          <Chip
            iconSource={checkmark}
            label={'Chip'}
            labelStyle={{color: Colors.white}}
            iconColor={Colors.white}
            containerStyle={{borderColor: Colors.green20, backgroundColor: Colors.green20, marginLeft: Spacings.s3}}
          />
          <Chip
            resetSpacings
            label={'Chip'}
            labelStyle={{color: Colors.red20, marginHorizontal: Spacings.s3, ...Typography.text70BO}}
            iconStyle={{width: 16, height: 16}}
            iconColor={Colors.black}
            avatar={{source: avatarImage, size: 28}}
            onDismiss={() => Alert.alert('onDismiss')}
            dismissIconStyle={{width: 10, height: 10, marginRight: Spacings.s3}}
            dismissColor={Colors.red20}
            containerStyle={{
              borderColor: Colors.red20,
              borderBottomRightRadius: 0,
              marginLeft: Spacings.s3
            }}
          />
          <Chip
            label={'Chip'}
            counterLabel={'44'}
            useBadge
            badgeProps={{
              size: 'small',
              backgroundColor: Colors.white,
              borderWidth: 2,
              borderColor: Colors.black,
              labelStyle: {color: Colors.black}
            }}
            containerStyle={{
              borderWidth: 0,
              marginLeft: Spacings.s3
            }}
          />
        </View>
      </View>
    );
  }
}
