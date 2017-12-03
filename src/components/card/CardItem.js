import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {BaseComponent} from '../../commons';

/**
 * Card.Item, a sub Card component for layout-ing inside a card
 */
export default class CardItem extends BaseComponent {

  static displayName = 'Card.Item';

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
    const {style} = this.props;
    return (
      <View style={[this.styles.container, style]}>
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
