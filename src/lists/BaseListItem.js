import React, {PropTypes} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import _ from 'lodash';
import {BaseComponent} from '../commons';
import {ThemeManager} from '../style';

/**
 * BaseListItem component
 */
export default class BaseListItem extends BaseComponent {
  static displayName = 'BaseList';
  static propTypes = {
    onPress: PropTypes.func,
  };

  renderLeft() {
    return null;
  }

  renderMiddle() {
    return (
      <View>
        {this.renderMiddleTop()}
        {this.renderMiddleBottom()}
      </View>
    );
  }

  renderMiddleTop() {
    return null;
  }

  renderMiddleBottom() {
    return null;
  }

  renderRight() {
    return null;
  }

  generateStyles(overrides) {
    this.styles = createStyles(overrides);
  }

  render() {
    const {onPress} = this.props;
    const Container = onPress ? TouchableOpacity : View;

    return (
      <Container style={this.styles.container} onPress={onPress}>
        <View style={this.styles.leftContainer}>
          {this.renderLeft()}
        </View>
        <View style={this.styles.middleContainer}>
          {this.renderMiddle()}
        </View>
        <View style={this.styles.rightContainer}>
          {this.renderRight()}
        </View>
      </Container>
    );
  }
}

function createStyles(overrides) {
  return StyleSheet.create(_.merge({
    container: {
      flexDirection: 'row',
      flex: 1,
    },
    leftContainer: {
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
    rightContainer: {
    },
  }, overrides));
}
