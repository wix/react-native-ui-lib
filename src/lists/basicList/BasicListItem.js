import React, {PropTypes} from 'react';
import {View, Text, Image} from 'react-native';
import BaseListItem from '../BaseListItem';
import {Typography, ThemeManager, BorderRadiuses} from '../../style';

/**
 * BaseListItem component
 */
export default class BasicListItem extends BaseListItem {
  static displayName = 'Basic List Item';
  static propTypes = {
    /**
     * Image source to be display on the left side of the item
     */
    imageSource: PropTypes.object,
    /**
     * Title, main title of the item displayed of left side
     */
    leftTitle: PropTypes.string,
    /**
     * Custom Style for left title
     */
    leftTitleStyle: PropTypes.object,
    /**
     * Title, main title of the item displayed of right side
     */
    rightTitle: PropTypes.string,
    /**
     * Custom Style for right title
     */
    rightTitleStyle: PropTypes.object,
    /**
     * Subtitle, secondary title, displayed under the left title
     */
    leftSubtitle: PropTypes.string,
    /**
     * Custom Style for left subtitle
     */
    leftSubtitleStyle: PropTypes.object,
    /**
     * Subtitle, secondary title, displayed under the right title
     */
    rightSubtitle: PropTypes.string,
    /**
     * Custom Style for right subtitle
     */
    rightSubtitleStyle: PropTypes.object,
    /**
     * Custom height for the item
     */
    height: PropTypes.number,
  };

  static defaultProps = {
    height: 77,
  }

  generateStyles() {
    super.generateStyles(createStyles(this.props));
  }

  renderLeft() {
    const {imageSource} = this.props;
    if (imageSource) {
      return (<View style={this.styles.imageContainer}>
        <Image style={this.styles.image} source={imageSource}/>
      </View>);
    }
    return null;
  }

  renderMiddleTop() {
    return (
      <View style={this.styles.middleTopContainer}>
        {this.renderLeftTitle()}
        {this.renderRightTitle()}
      </View>
    );
  }

  renderMiddleBottom() {
    return (
      <View style={this.styles.middleBottomContainer}>
        {this.renderLeftSubtitle()}
        {this.renderRightSubtitle()}
      </View>
    );
  }

  renderLeftTitle() {
    const {leftTitle, leftTitleStyle} = this.props;
    return (<Text style={[this.styles.titleText, leftTitleStyle]} numberOfLines={1}>
      {leftTitle}
    </Text>);
  }

  renderRightTitle() {
    const {rightTitle, rightTitleStyle} = this.props;
    return (<Text style={[this.styles.titleText, rightTitleStyle]}>
      {rightTitle}
    </Text>);
  }

  renderLeftSubtitle() {
    const {leftSubtitle, leftSubtitleStyle} = this.props;
    return (<Text style={[this.styles.subtitleText, leftSubtitleStyle]} numberOfLines={1}>
      {leftSubtitle}
    </Text>);
  }

  renderRightSubtitle() {
    const {rightSubtitle, rightSubtitleStyle} = this.props;
    return (<Text style={[this.styles.subtitleText, rightSubtitleStyle]} numberOfLines={1}>
      {rightSubtitle}
    </Text>);
  }
}

function createStyles({height}) {
  return {
    container: {
      flexDirection: 'row',
      height,
    },
    imageContainer: {
      paddingHorizontal: 18,
      justifyContent: 'center',
      flex: 1,
    },
    image: {
      height: 54,
      width: 54,
      borderRadius: BorderRadiuses.br20,
    },
    badgeContainer: {
      marginLeft: 10,
    },
    titleText: {
      ...Typography.text70,
      color: ThemeManager.titleColor,
    },
    subtitleText: {
      ...Typography.text90,
      color: ThemeManager.subtitleColor,
    },
  };
}
