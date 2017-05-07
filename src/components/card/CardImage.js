import React, {PropTypes} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Constants} from '../../helpers';
import {BorderRadiuses} from '../../style';
import {BaseComponent} from '../../commons';

export default class CardImage extends BaseComponent {

  static displayName = 'Card Image';

  static propTypes = {
    /**
     * Image source, either remote source or local
     */
    imageSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * Image height
     */
    height: PropTypes.number,
    /**
     * Image position to determine the right flex-ness and border radius (for Android)
     */
    position: PropTypes.string,
    testID: PropTypes.string,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {imageSource, style} = this.props;
    if (imageSource) {
      return (
        <View style={[this.styles.container, style]}>
          <Image source={imageSource} style={this.styles.image}/>
        </View>
      );
    }

    return null;
  }
}

function extractPositionValues(position) {
  const top = position === 'top';
  const left = position === 'left';
  const right = position === 'right';
  const bottom = position === 'bottom';

  return {top, left, right, bottom};
}

function generateBorderRadiusStyle({position}) {
  const {top, left, right, bottom} = extractPositionValues(position);

  const borderRaidusStyle = {};
  if (Constants.isAndroid) {
    borderRaidusStyle.borderTopLeftRadius = (top || left) ? BorderRadiuses.br10 : undefined;
    borderRaidusStyle.borderTopRightRadius = (top || right) ? BorderRadiuses.br10 : undefined;
    borderRaidusStyle.borderBottomLeftRadius = (bottom || left) ? BorderRadiuses.br10 : undefined;
    borderRaidusStyle.borderBottomRightRadius = (bottom || right) ? BorderRadiuses.br10 : undefined;
  }

  return borderRaidusStyle;
}

function createStyles({width, height, position}) {
  const {top, left, right, bottom} = extractPositionValues(position);
  const borderRadiusStyle = generateBorderRadiusStyle({top, bottom, left, right});
  return StyleSheet.create({
    container: {
      height: (left || right) ? undefined : height,
      width: (top || bottom) ? undefined : width,
      ...borderRadiusStyle,
    },
    image: {
      width: null,
      height: null,
      flex: 1,
      resizeMode: 'cover',
      ...borderRadiusStyle,
    },
  });
}
