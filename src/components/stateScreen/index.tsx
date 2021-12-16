import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Typography, Colors} from '../../style';
import {Constants, asBaseComponent} from '../../commons/new';
import View from '../../components/view';
import Image from '../../components/image';
import Button from '../../components/button';
import Text from '../../components/text';
import {StateScreenProps} from './types';


class StateScreen extends Component<StateScreenProps> {
  static displayName = 'StateScreen';

  styles: any;
  constructor(props: StateScreenProps) {
    super(props);

    this.generateStyles();
  }

  generateStyles() {
    const {imageSource} = this.props;

    const isRemoteImage = _.isObject(imageSource) && Boolean(imageSource.uri);
    this.styles = createStyles(isRemoteImage);
  }

  render() {
    const {title, subtitle, imageSource, ctaLabel, onCtaPress, testID} = this.props;

    return (
      <View style={this.styles.container} testID={testID}>
        <Image style={this.styles.image} resizeMode={'contain'} source={imageSource}/>
        <Text style={[this.styles.title]}>{title}</Text>
        <Text style={[this.styles.subtitle]}>{subtitle}</Text>
        <Button
          link
          marginT-30
          onPress={onCtaPress}
          labelStyle={this.styles.ctaLabel}
          label={Constants.isAndroid ? _.toUpper(ctaLabel) : ctaLabel}
        />
      </View>
    );
  }
}

export {StateScreenProps};
export default asBaseComponent<StateScreenProps>(StateScreen);

function createStyles(isRemoteImage: boolean) {
  const imageStyle = _.merge({height: 200}, isRemoteImage && {width: Constants.screenWidth * 0.9});
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 80,
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    image: imageStyle,
    title: {
      textAlign: 'center',
      ...Typography.text50,
      color: Colors.grey10,
      fontWeight: '300'
    },
    subtitle: {
      textAlign: 'center',
      ...Typography.text70,
      color: Colors.grey40,
      fontWeight: '300',
      marginTop: 12
    },
    ctaLabel: {
      color: Colors.primary,
      ...Typography.text70
    }
  });
}
