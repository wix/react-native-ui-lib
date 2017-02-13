import React, {PropTypes} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import _ from 'lodash';
import {BaseComponent} from '../commons';

/**
 * BaseListItem component
 */
export default class BaseListItem extends BaseComponent {
  static displayName = 'BaseList';
  static propTypes = {
    onPress: PropTypes.func,
  };

  renderElement1() {
    return null;
  }

  renderElement2() {
    return null;
  }

  renderElement3() {
    return null;
  }

  renderElement4() {
    return null;
  }

  renderElement5() {
    return null;
  }

  renderElement6() {
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
        <View>
          {this.renderElement1()}
        </View>
        <View style={this.styles.middleContainer}>
          <View style={this.styles.middleTopContainer}>
            {this.renderElement2()}
            {this.renderElement3()}
          </View>
          <View style={this.styles.middleBottomContainer}>
            {this.renderElement4()}
            {this.renderElement5()}
          </View>
        </View>
        <View>
          {this.renderElement6()}
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
    middleContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    middleTopContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    middleBottomContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }, overrides));
}
