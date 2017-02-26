import React, {PropTypes} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {BaseComponent} from '../../commons';
import {Constants} from '../../helpers';
import {Colors, Typography, ThemeManager, BorderRadiuses} from '../../style';

/**
 * GridListNewItem component
 */
export default class GridListItem extends BaseComponent {
  static displayName = 'Grid List New Item';
  static propTypes = {
    index: PropTypes.number.isRequired,
    imageSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    onPress: PropTypes.func,
    height: PropTypes.number,
  };

  static defaultProps = {
    height: 210,
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  renderTop() {
    return (
      <View style={this.styles.topContainer}>
        {this.renderImage()}
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

  renderBottom() {
    return (
      <View style={this.styles.bottomContainer}>
        {this.renderTitle()}
      </View>
    );
  }

  renderTitle() {
    const {title} = this.props;
    return (
      <Text style={this.styles.titleText}>
        {title}
      </Text>
    );
  }

  render() {
    const {onPress} = this.props;
    const Container = onPress ? TouchableOpacity : View;

    return (
      <Container style={this.styles.container} onPress={onPress}>
        <View style={this.styles.innerContainer}>
          {this.renderTop()}
          {this.renderBottom()}
        </View>
      </Container>
    );
  }
}

function createStyles({index, height}) {
  const isLeftItem = index % 2 === 0;
  return StyleSheet.create({
    container: {
      width: Constants.screenWidth / 2,
      paddingRight: isLeftItem ? 0 : 7.5,
      paddingLeft: !isLeftItem ? 0 : 7.5,
      marginTop: 15,
      height,
    },
    innerContainer: {
      height,
      marginHorizontal: 7.5,
      backgroundColor: Colors.white,
      borderRadius: BorderRadiuses.br30,
      overflow: 'hidden',
    },
    topContainer: {
      height: 157,
    },
    bottomContainer: {
      alignItems: 'center',
      flex: 1,
    },
    titleText: {
      ...Typography.text70,
      fontWeight: '400',
      color: ThemeManager.titleColor,
    },
    imageContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {},
  });
}
