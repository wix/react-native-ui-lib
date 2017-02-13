import React, {PropTypes} from 'react';
import {View, StyleSheet} from 'react-native';
import BaseListItem from '../BaseListItem';
import {Colors, ThemeManager} from '../../style';

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
    this.styles = createStyles();
  }

  renderElement1() {
    const {avatar} = this.props;
    return avatar;
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      paddingVertical: 11,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: ThemeManager.dividerColor,
    },
  });
}
