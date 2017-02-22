import React, {PropTypes} from 'react';
import {View, Text} from 'react-native';
import BaseListItem from '../BaseListItem';
import {Colors, Typography, ThemeManager} from '../../style';

/**
 * BaseListItem component
 */
export default class ConversationListItem extends BaseListItem {
  static displayName = 'ConversationListItem';
  static propTypes = {
    /**
     * Avatar component to render contact avatar
     */
    avatar: PropTypes.element,
    /**
     * Title, usually the contact name
     */
    title: PropTypes.string,
    /**
     * Custom Style for title
     */
    titleStyle: PropTypes.object,
    /**
     * Subtitle, secondary title, usually message preview
     */
    subtitle: PropTypes.string,
    /**
     * Custom Style for subtitle
     */
    subtitleStyle: PropTypes.object,
    /**
     * Timestamp, displayed text representing message time
     */
    timestamp: PropTypes.string,
    /**
     * Custom Style for timestamp
     */
    timestampStyle: PropTypes.object,
    /**
     * Unread messages counter to display inside a badge
     */
    unreadMessages: PropTypes.number,
    /**
     * Custom height for the item
     */
    height: PropTypes.number,
  };

  static defaultProps = {
    height: 75,
  }

  generateStyles() {
    super.generateStyles(createStyles(this.props));
  }

  renderLeft() {
    const {avatar} = this.props;
    if (avatar) {
      return (<View style={this.styles.avatarContainer}>
        {avatar}
      </View>);
    }
    return null;
  }

  renderMiddle() {
    return (
      <View>
        <View style={this.styles.middleTopContainer}>
          {this.renderTitle()}
          {this.renderTimestamp()}
        </View>
        <View style={this.styles.middleBottomContainer}>
          {this.renderSubtitle()}
          {this.renderBadge()}
        </View>
      </View>
    );
  }

  renderTitle() {
    const {title} = this.props;
    return (<Text style={this.styles.titleText} numberOfLines={1}>
      {title}
    </Text>);
  }

  renderTimestamp() {
    const {timestamp} = this.props;
    return (<Text style={this.styles.timestampText}>
      {timestamp}
    </Text>);
  }

  renderSubtitle() {
    const {subtitle} = this.props;
    return (<Text style={this.styles.subtitleText} numberOfLines={1}>
      {subtitle}
    </Text>);
  }

  renderBadge() {
    const {badge} = this.props;
    if (badge) {
      return (<View style={this.styles.badgeContainer}>
        {badge}
      </View>);
    }
    return null;
  }
}

function createStyles({titleStyle, subtitleStyle, timestampStyle, height}) {
  return {
    container: {
      flexDirection: 'row',
      height,
    },
    middleContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingRight: 19,
      borderBottomWidth: 1,
      borderColor: ThemeManager.dividerColor,
    },
    middleTopContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 3,
    },
    middleBottomContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    avatarContainer: {
      paddingHorizontal: 18,
      justifyContent: 'center',
      flex: 1,
    },
    badgeContainer: {
      marginLeft: 10,
    },
    titleText: {
      ...Typography.text70,
      color: ThemeManager.titleColor,
      ...titleStyle,
      flex: 1,
    },
    subtitleText: {
      ...Typography.text80,
      color: ThemeManager.subtitleColor,
      ...subtitleStyle,
      flex: 1,
    },
    timestampText: {
      ...Typography.text90,
      color: Colors.dark50,
      ...timestampStyle,
    },
  };
}
