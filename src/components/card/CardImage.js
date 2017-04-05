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
     * determing the top border radius (for Android)
     */
    top: PropTypes.bool,
    /**
     * determing the bottom border radius (for Android)
     */
    bottom: PropTypes.bool,
    testId: PropTypes.string,
  };

  static defaultProps = {
    height: 150,
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

function generateBorderRadiusStyle({top, bottom}) {
  const borderRaidusStyle = {};
  if (Constants.isAndroid) {
    if (top) {
      borderRaidusStyle.borderTopLeftRadius = BorderRadiuses.br10;
      borderRaidusStyle.borderTopRightRadius = BorderRadiuses.br10;
    }

    if (bottom) {
      borderRaidusStyle.borderBottomLeftRadius = BorderRadiuses.br10;
      borderRaidusStyle.borderBottomRightRadius = BorderRadiuses.br10;
    }
  }

  return borderRaidusStyle;
}

function createStyles({height, top, bottom}) {
  const borderRadiusStyle = generateBorderRadiusStyle({top, bottom});
  return StyleSheet.create({
    container: {
      height,
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
