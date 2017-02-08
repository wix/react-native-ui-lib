import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import * as Constants from '../constants';
import {ComponentsColors} from '../style';

export default class StateScreen extends Component {

  static propTypes = {
    image: PropTypes.number,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.any,
    ctaLabel: PropTypes.string,
    onCtaPress: PropTypes.func,
  }

  render() {
    const {title, subtitle, image, ctaLabel, onCtaPress, testID} = this.props;
    return (
      <View style={styles.container} testID={testID || 'empty-state'}>
        <View>
          <Image style={styles.image} resizeMode={'contain'} source={image}/>
        </View>
        <View>
          <Text style={[styles.title]}>{title}</Text>
          <Text style={[styles.subtitle]}>{subtitle}</Text>
        </View>
        <View style={styles.cta}>
          <TouchableOpacity onPress={onCtaPress}>
            <Text testID="empty-state-cta" style={{color: ComponentsColors.CTA, fontSize: Constants.typography.text1}}>
              {Constants.isAndroid ? _.toUpper(ctaLabel) : ctaLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    height: 200,
  },
  title: {
    textAlign: 'center',
    fontSize: Constants.typography.header1,
    color: Constants.paletteColors.gray10,
    fontWeight: '300',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: Constants.typography.text1,
    color: Constants.paletteColors.gray20,
    fontWeight: '300',
    marginTop: 12,
  },
  cta: {
    marginTop: 30
  }
});
