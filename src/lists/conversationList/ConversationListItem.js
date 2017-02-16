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
    subtitle: PropTypes.string,
    timestamp: PropTypes.string,
    unreadMessages: PropTypes.number,
    isNew: PropTypes.bool,
  };

  generateStyles() {
    super.generateStyles(createStyles(this.props));
  }

  renderElement1() {
    const {avatar} = this.props;
    if (avatar) {
      return (<View style={this.styles.avatarContainer}>
        {avatar}
      </View>);
    }
    return null;
  }

  renderElement2() {
    const {title} = this.props;
    return (<Text style={this.styles.titleText} numberOfLines={1}>
      {title}
    </Text>);
  }

  renderElement3() {
    const {timestamp} = this.props;
    return (<Text style={this.styles.timestampText}>
      {timestamp}
    </Text>);
  }

  renderElement4() {
    const {subtitle} = this.props;
    return (<Text style={this.styles.subtitleText} numberOfLines={1}>
      {subtitle}
    </Text>);
  }

  renderElement5() {
    const {badge} = this.props;
    if (badge) {
      return (<View style={this.styles.badgeContainer}>
        {badge}
      </View>);
    }
    return null;
  }
}

function createStyles({isNew}) {
  return {
    container: {
      paddingVertical: 11,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: ThemeManager.dividerColor,
    },
    middleContainer: {
      paddingRight: 19,
    },
    middleTopContainer: {
      marginBottom: 3,
    },
    avatarContainer: {
      paddingHorizontal: 18,
    },
    badgeContainer: {
      marginLeft: 10,
    },
    titleText: {
      ...Typography.text70,
      fontWeight: isNew ? '500' : Typography.text70.fontWeight,
      color: ThemeManager.titleColor,
      flex: 1,
    },
    subtitleText: {
      ...Typography.text80,
      color: ThemeManager.subtitleColor,
      flex: 1,
    },
    timestampText: {
      ...Typography.text90,
      color: Colors.dark50,
    },
  };
}
