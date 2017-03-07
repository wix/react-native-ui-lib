import React, {PropTypes} from 'react';
import {View, StyleSheet} from 'react-native';
import {BaseComponent} from '../../commons';

export default class CardSection extends BaseComponent {

  static displayName = 'Card Section';

  static propTypes = {
    /**
     * style as a body, apply inner padding
     */
    body: PropTypes.bool,
    /**
     * style as a footer, remove bottom spacing
     */
    footer: PropTypes.bool,
    testId: PropTypes.string,
  };

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

function createStyles({body, footer}) {
  return StyleSheet.create({
    container: {
      flexDirection: body ? undefined : 'row',
      justifyContent: body ? undefined : 'space-between',
      alignItems: body ? undefined : 'center',
      marginBottom: (footer || body) ? undefined : 10,
      padding: body ? 21 : undefined,
    },
  });
}
