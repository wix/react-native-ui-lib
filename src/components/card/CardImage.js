import React, {PropTypes} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Constants} from '../../helpers';
import {BorderRadiuses} from '../../style';
import {BaseComponent} from '../../commons';

export default class CardImage extends BaseComponent {

  static displayName = 'Card Image';

  static propTypes = {
    /**
     * Image soruce, either remove source or local
     */
    imageSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * Image height
     */
    height: PropTypes.number,
    /**
     * determine the top border radius (for Android)
     */
    top: PropTypes.bool,
    /**
     * determine the left border radius (for Android)
     */
    left: PropTypes.bool,
    /**
     * determine the right border radius (for Android)
     */
    right: PropTypes.bool,
    /**
     * determine the bottom border radius (for Android)
     */
    bottom: PropTypes.bool,
    testID: PropTypes.string,
  };

  static defaultProps = {
    height: 150,
    width: 115,
  }

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

function generateBorderRadiusStyle({top, bottom, left, right}) {
  const borderRaidusStyle = {};
  if (Constants.isAndroid) {
    borderRaidusStyle.borderTopLeftRadius = (top || left) ? BorderRadiuses.br10 : undefined;
    borderRaidusStyle.borderTopRightRadius = (top || right) ? BorderRadiuses.br10 : undefined;
    borderRaidusStyle.borderBottomLeftRadius = (bottom || left) ? BorderRadiuses.br10 : undefined;
    borderRaidusStyle.borderBottomRightRadius = (bottom || right) ? BorderRadiuses.br10 : undefined;
  }

  return borderRaidusStyle;
}

function createStyles({width, height, top, bottom, left, right}) {
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
