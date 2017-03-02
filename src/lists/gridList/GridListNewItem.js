import React, {PropTypes} from 'react';
import {View, Text, Image} from 'react-native';
import GridListItem from './GridListItem';
import createStyles from './style';

/**
 * GridListNewItem component
 */
export default class GridListNewItem extends GridListItem {
  static displayName = 'Grid List New Item';
  static propTypes = {
    index: PropTypes.number.isRequired,
    imageSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    imageSize: PropTypes.number,
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    onPress: PropTypes.func,
    height: PropTypes.number,
  };

  static defaultProps = {
    ...GridListItem.defaultProps,
    imageSize: 46,
  }

  generateStyles() {
    this.styles = createStyles(this.props, customStyle);
  }

  renderTop() {
    return (
      <View style={this.styles.topContainer}>
        {this.renderImage()}
      </View>
    );
  }

  renderBottom() {
    return (
      <View style={this.styles.bottomContainer}>
        {this.renderTitle()}
      </View>
    );
  }

  renderImage() {
    const {imageSource} = this.props;
    if (imageSource) {
      return (
        <View style={this.styles.imageContainer}>
          <Image style={this.styles.image} source={imageSource}/>
        </View>
      );
    }
    return null;
  }

  renderTitle() {
    const {title} = this.props;
    return (
      <Text style={this.styles.titleText}>
        {title}
      </Text>
    );
  }
}

const customStyle = {
  topContainer: {
    height: 157,
  },
  bottomContainer: {
    alignItems: 'center',
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: null,
  },
};
