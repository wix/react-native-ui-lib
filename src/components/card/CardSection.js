import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {ViewPropTypes} from 'react-native';
import {BaseComponent} from '../../commons';
import View from '../view';
import Text from '../text';
import Image from '../image';
import asCardChild from './asCardChild';

/**
 * @description: Card.Image, part of the Card component belongs inside a Card (better be a direct child)
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.js
 */
class CardSection extends BaseComponent {
  static displayName = 'Card.Section';

  static propTypes = {
    /**
     * Text content for the CardSection.
     * Example: content={[{text: 'You’re Invited!', props: {text70: true, dark10: true}}]}
     */
    content: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      props: Text.propTypes
    })),
    /**
     * Image props for a leading icon to render before the text
     */
    leadingIcon: PropTypes.shape(Image.propTypes),
    /**
     * Image props for a trailing icon to render after the text
     */
    trailingIcon: PropTypes.shape(Image.propTypes)
  };

  render() {
    const {content, leadingIcon, trailingIcon, context: {borderStyle}, style, ...others} = this.getThemeProps();
    return (
      <View style={[{...borderStyle}, style]} {...others}>
        {leadingIcon && <Image {...leadingIcon}/>}
        {_.map(content, ({text, props}, index) => {
          return <Text key={index} {...props}>{text}</Text>;
        })}
        {trailingIcon && <Image {...trailingIcon}/>}
      </View>
    );
  }
}

export default asCardChild(CardSection);
