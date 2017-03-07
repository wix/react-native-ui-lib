import React, {PropTypes} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {BaseComponent} from '../../commons';

export default class CardImage extends BaseComponent {

  static displayName = 'Card Image';

  static propTypes = {
    imageSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    testId: PropTypes.string,
  };

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

function createStyles() {
  return StyleSheet.create({
    container: {
      height: 150,
    },
    image: {
      width: null,
      height: null,
      flex: 1,
      resizeMode: 'cover',
    },
  });
}
