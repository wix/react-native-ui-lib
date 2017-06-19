import React, {PropTypes} from 'react';
import _ from 'lodash';
import {StyleSheet, Text, View, Image} from 'react-native';
import * as Constants from '../../helpers/Constants';
import {Typography, ThemeManager} from '../../style';
import {BaseComponent} from '../../commons';
import TouchableOpacity from '../../components/touchableOpacity';

/**
 * Component that shows a full screen for a certain state like an empty state
 */
export default class StateScreen extends BaseComponent {
  static displayName = 'StateScreen';
  static propTypes = {
    /**
     * The image source that's showing at the top. use an image that was required locally
     */
    imageSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
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
    testId: PropTypes.string,
  };

  generateStyles() {
    const {imageSource} = this.props;
    const isRemoteImage = _.isObject(imageSource) && Boolean(imageSource.uri);
    this.styles = createStyles(isRemoteImage);
  }

  render() {
    const {title, subtitle, imageSource, ctaLabel, onCtaPress, testId} = this.props;
    return (
      <View style={this.styles.container} testID={testId}>
        <View>
          <Image style={this.styles.image} resizeMode={'contain'} source={imageSource} />
        </View>
        <View>
          <Text style={[this.styles.title]}>{title}</Text>
          <Text style={[this.styles.subtitle]}>{subtitle}</Text>
        </View>
        <View style={this.styles.cta}>
          <TouchableOpacity onPress={onCtaPress}>
            <Text style={this.styles.ctaLabel}>
              {Constants.isAndroid ? _.toUpper(ctaLabel) : ctaLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function createStyles(isRemoteImage) {
  const imageStyle = _.merge({height: 200}, isRemoteImage && {width: Constants.screenWidth * 0.9});
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 80,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    image: imageStyle,
    title: {
      textAlign: 'center',
      ...Typography.text50,
      color: ThemeManager.titleColor,
      fontWeight: '300',
    },
    subtitle: {
      textAlign: 'center',
      ...Typography.text70,
      color: ThemeManager.subtitleColor,
      fontWeight: '300',
      marginTop: 12,
    },
    cta: {
      marginTop: 30,
    },
    ctaLabel: {
      color: ThemeManager.primaryColor,
      ...Typography.text70,
    },
  });
}
