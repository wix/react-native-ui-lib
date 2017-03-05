import React, {PropTypes} from 'react';
import {View, Text, Image} from 'react-native';
import GridListItem from './GridListItem';
import createStyles from './style';
import {Colors} from '../../style';

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
    const {imageSource, disabled} = this.props;
    if (imageSource) {
      return (
        <View style={this.styles.imageContainer}>
          <Image style={[this.styles.image, disabled && this.styles.imageDisabled]} source={imageSource}/>
        </View>
      );
    }
    return null;
  }

  renderTitle() {
    const {title, disabled} = this.props;
    return (
      <Text style={[this.styles.titleText, disabled && this.styles.titleTextDisabled]}>
        {title}
      </Text>
    );
  }
}

const customStyle = {
  innerContainerDisabled: {
    borderColor: Colors.dark70,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  topContainer: {
    height: 157,
  },
  bottomContainer: {
    alignItems: 'center',
    flex: 1,
  },
  titleTextDisabled: {
    color: Colors.dark60,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: null,
  },
  imageDisabled: {
    tintColor: Colors.dark60,
  },
};
