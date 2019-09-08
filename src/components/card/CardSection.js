import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {BaseComponent} from '../../commons';
import {Constants} from '../../helpers';
import View from '../view';

/**
 * @description: Card.Section, a sub Card component for layout-ing inside a card
 * @extends: BlurView
 * @extendsnotes: (iOS only)
 * @extendslink: https://github.com/react-native-community/react-native-blur/blob/master/src/BlurView.ios.js
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.js
 */
export default class CardSection extends BaseComponent {
  constructor(props) {
    super(props);

    console.warn('uilib will depreciate "Card.Section" soon, please use "View" component with modifiers instead');
  }

  static displayName = 'Card.Section';

  static propTypes = {
    /**
     * Enable blur view for the section
     */
    enableBlur: PropTypes.bool,
    /**
     * Blur options
     */
    blurOptions: PropTypes.object,
    /**
     * thid modifier apply inner padding
     */
    body: PropTypes.bool,
    /**
     * style as a footer, remove bottom spacing
     */
    footer: PropTypes.bool
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {enableBlur, blurOptions, style, ...others} = this.props;
    const Container = Constants.isIOS && enableBlur ? BlurView : View;
    const {paddings} = this.state;
    return (
      <Container {...blurOptions} style={[this.styles.container, paddings, style]} {...others}>
        {this.props.children}
      </Container>
    );
  }
}

function createStyles({body, footer}) {
  return StyleSheet.create({
    container: {
      flexDirection: body ? undefined : 'row',
      justifyContent: body ? undefined : 'space-between',
      alignItems: body ? undefined : 'center',
      marginBottom: footer || body ? undefined : 10,
      padding: body ? 21 : undefined,
      flexGrow: 1,
      flexShrink: 1
    }
  });
}
