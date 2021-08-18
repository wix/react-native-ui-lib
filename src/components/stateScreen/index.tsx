import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {LogService} from '../../services';
import {Constants} from '../../helpers';
import {Typography, Colors} from '../../style';
import {asBaseComponent} from '../../commons/new';
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
    
    if (props.testId) {
      LogService.deprecationWarn({component: 'StateScreen', oldProp: 'testId', newProp: 'testID'});

    }
    if (props.source) {
      LogService.deprecationWarn({component: 'StateScreen', oldProp: 'source', newProp: 'imageSource'});
    }

    this.generateStyles();
  }

  generateStyles() {
    const {source, imageSource} = this.props;
    const finalSource = imageSource || source;

    const isRemoteImage = _.isObject(finalSource) && Boolean(finalSource.uri);
    this.styles = createStyles(isRemoteImage);
  }

  render() {
    // TODO: remove testId and source after deprecation
    const {title, subtitle, source, imageSource, ctaLabel, onCtaPress, testId, testID} = this.props;
    const finalSource = imageSource || source;

    return (
      <View style={this.styles.container} testID={testID || testId}>
        <Image style={this.styles.image} resizeMode={'contain'} source={finalSource}/>
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
      color: Colors.dark10,
      fontWeight: '300'
    },
    subtitle: {
      textAlign: 'center',
      ...Typography.text70,
      color: Colors.dark40,
      fontWeight: '300',
      marginTop: 12
    },
    ctaLabel: {
      color: Colors.primary,
      ...Typography.text70
    }
  });
}
