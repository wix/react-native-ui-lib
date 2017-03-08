import React, {PropTypes} from 'react';
import {View, StyleSheet} from 'react-native';
import {BaseComponent} from '../../commons';

export default class CardItem extends BaseComponent {

  static displayName = 'Card Item';

  static propTypes = {
    /**
     * align flex as a row (default)
     */
    row: PropTypes.bool,
    /**
     * align flex as a column
     */
    column: PropTypes.bool,
  };

  defaultProps = {
    row: true,
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    return (
      <View style={this.styles.container}>
        {this.props.children}
      </View>
    );
  }
}

function createStyles({column}) {
  return StyleSheet.create({
    container: {
      flexDirection: column ? 'column' : 'row',
    },
  });
}
