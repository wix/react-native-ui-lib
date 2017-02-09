import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import * as Constants from '../../helpers/Constants';
import {ComponentsColors} from '../../style';
import {BaseComponent} from '../../commons';

/**
 * Component that shows a full screen for a certain state like an empty state
 */
export default class StateScreen extends BaseComponent {
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
    testId: PropTypes.string,
  };

  generateStyles() {
    this.styles = createStyles();
  }

  render() {
    const {title, subtitle, image, ctaLabel, onCtaPress, testId} = this.props;
    return (
      <View style={this.styles.container} testID={testId}>
        <View>
          <Image style={this.styles.image} resizeMode={'contain'} source={image} />
        </View>
        <View>
          <Text style={[this.styles.title]}>{title}</Text>
          <Text style={[this.styles.subtitle]}>{subtitle}</Text>
        </View>
        <View style={this.styles.cta}>
          <TouchableOpacity onPress={onCtaPress}>
            <Text style={{color: ComponentsColors.CTA, fontSize: Constants.typography.text1}}>
              {Constants.isAndroid ? _.toUpper(ctaLabel) : ctaLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function createStyles() {
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
  return styles;
}
