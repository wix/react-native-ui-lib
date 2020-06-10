import _ from 'lodash';
import React, {PureComponent} from 'react';
import {ViewStyle} from 'react-native';
import {asBaseComponent} from '../../commons/new';
import View, {ViewPropTypes} from '../view';
import Text, {TextPropTypes} from '../text';
import Image, {ImageProps} from '../image';
import asCardChild, {asCardChildProps} from './asCardChild';

type ContentType = TextPropTypes & {text?: string};

export type CardSectionProps = ViewPropTypes & {
  /**
   * Text content for the CardSection.
   * Example: content={[{text: 'You’re Invited!', text70: true, dark10: true}]}
   */
  content?: ContentType[];
  /**
   * Style for the content
   */
  contentStyle?: ViewStyle;
  /**
   * Image props for a leading icon to render before the text
   */
  leadingIcon?: ImageProps;
  /**
   * Image props for a trailing icon to render after the text
   */
  trailingIcon?: ImageProps;
};

type Props = CardSectionProps & asCardChildProps;

/**
 * @description: Card.Section for rendering content easily inside a card
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.js
 */
class CardSection extends PureComponent<Props> {
  static displayName = 'Card.Section';

  render() {
    const {
      content,
      leadingIcon,
      trailingIcon,
      context: {borderStyle},
      contentStyle,
      style,
      ...others
    } = this.props;
    return (
      <View style={[{...borderStyle}, style]} {...others}>
        {leadingIcon && <Image {...leadingIcon} />}
        <View style={contentStyle}>
          {_.map(
            content,
            // @ts-ignore
            ({text, ...others} = {}, index) => {
              return (
                !_.isUndefined(text) && (
                  <Text key={index} {...others}>
                    {text}
                  </Text>
                )
              );
            }
          )}
        </View>
        {trailingIcon && <Image {...trailingIcon} />}
      </View>
    );
  }
}

export default asBaseComponent<CardSectionProps>(asCardChild(CardSection));
