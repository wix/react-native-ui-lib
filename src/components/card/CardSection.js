import React, {PropTypes} from 'react';
import {StyleSheet} from 'react-native';
import {BlurView} from 'react-native-blur';
import {BaseComponent} from '../../commons';
import {Constants} from '../../helpers';
import View from '../view';

/**
 * CardSection, a sub Card component for layout-ing inside a card
 */
export default class CardSection extends BaseComponent {

  static displayName = 'CardSection';

  static propTypes = {
    ...View.propTypes,
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
    footer: PropTypes.bool,
    testId: PropTypes.string,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {enableBlur, blurOptions, style, ...others} = this.props;
    const Container = (Constants.isIOS && enableBlur) ? BlurView : View;
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
      marginBottom: (footer || body) ? undefined : 10,
      padding: body ? 21 : undefined,
      flexGrow: 1,
      flexShrink: 1,
    },
  });
}
