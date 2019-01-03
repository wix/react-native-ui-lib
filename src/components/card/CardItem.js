import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {BaseComponent} from '../../commons';

/**
 * @description: Card.Item, a sub Card component for layout-ing inside a card
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.js
 */
export default class CardItem extends BaseComponent {
  constructor(props) {
    super(props);

    console.warn('uilib will depreciate "Card.Item" soon, please use "View" component with modifiers instead');
  }

  static displayName = 'Card.Item';

  static propTypes = {
    /**
     * align flex as a row (default)
     */
    row: PropTypes.bool,
    /**
     * align flex as a column
     */
    column: PropTypes.bool
  };

  static defaultProps = {
    row: true
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {style} = this.props;
    return <View style={[this.styles.container, style]}>{this.props.children}</View>;
  }
}

function createStyles({column}) {
  return StyleSheet.create({
    container: {
      flexDirection: column ? 'column' : 'row'
    }
  });
}
