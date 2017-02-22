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
    avatar: PropTypes.element,
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    subtitle: PropTypes.string,
    subtitleStyle: PropTypes.object,
    timestamp: PropTypes.string,
    timestampStyle: PropTypes.object,
    unreadMessages: PropTypes.number,
  };

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

function createStyles({titleStyle, subtitleStyle, timestampStyle}) {
  return {
    container: {
      paddingVertical: 11,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: ThemeManager.dividerColor,
    },
    middleContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingRight: 19,
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
