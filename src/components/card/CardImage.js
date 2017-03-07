import React, {PropTypes} from 'react';
import {View, Image, StyleSheet} from 'react-native';
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
    testId: PropTypes.string,
  };

  static defaultProps = {
    height: 150,
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {imageSource} = this.props;
    if (imageSource) {
      return (
        <View style={this.styles.container}>
          <Image source={imageSource} style={this.styles.image}/>
        </View>
      );
    }

    return null;
  }
}

function createStyles({height}) {
  return StyleSheet.create({
    container: {
      height,
    },
    image: {
      width: null,
      height: null,
      flex: 1,
      resizeMode: 'cover',
    },
  });
}
