import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import * as Constants from '../../helpers/Constants';
import {ComponentsColors} from '../../style';

/**
 * Component that shows a full screen for a certain state like an empty state
 */
export default class StateScreen extends Component {
  static displayName = 'StateScreen';
  static propTypes = {
    /**
     * Image that's showing at the top. use an image that was required locally
     */
    image: PropTypes.number,
    /**
     * To to show as the title
     */
    title: PropTypes.string.isRequired,
    /**
     * Text to to show as the subtitle
     */
    subtitle: PropTypes.any,
    /**
     * Text to to show in the "call to action" button
     */
    ctaLabel: PropTypes.string,
    /**
     * Action handler for "call to action" button
     */
    onCtaPress: PropTypes.func,
    /**
     * Use to identify the container in tests
     */
    containerTestId: PropTypes.string,
    /**
     * Use to identify the label in tests
     */
    labelTestId: PropTypes.string,
  };

  render() {
    const {title, subtitle, image, ctaLabel, onCtaPress, containerTestId, labelTestId} = this.props;
    return (
      <View style={styles.container} testID={containerTestId}>
        <View>
          <Image style={styles.image} resizeMode={'contain'} source={image} />
        </View>
        <View>
          <Text style={[styles.title]}>{title}</Text>
          <Text style={[styles.subtitle]}>{subtitle}</Text>
        </View>
        <View style={styles.cta}>
          <TouchableOpacity onPress={onCtaPress}>
            <Text testID={labelTestId} style={{color: ComponentsColors.CTA, fontSize: Constants.typography.text1}}>
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
    marginTop: 30,
  },
});
