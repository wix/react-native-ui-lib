import _ from 'lodash';
import React, {PureComponent} from 'react';
import {StyleSheet, ViewStyle, ImageSourcePropType} from 'react-native';
import {asBaseComponent} from '../../commons/new';
import View, {ViewPropTypes} from '../view';
import Text, {TextPropTypes} from '../text';
import Image, {ImageProps} from '../image';
import {OverlayTypeType} from '../overlay';
import asCardChild, {asCardChildProps} from './asCardChild';
import * as CardPresenter from './CardPresenter';

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
  /**
   * Will be used for the background when provided
   */
  imageSource?: ImageSourcePropType;
  /**
   * The type of overly to place on top of the image. Note: the image MUST have proper size, see examples in:
   * https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/OverlaysScreen.js
   */
  overlayType?: OverlayTypeType;
  /**
   * The style for the background image
   */
  imageStyle?: ViewStyle;
};

type Props = CardSectionProps & asCardChildProps;

/**
 * @description: Card.Section for rendering content easily inside a card
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.js
 */
class CardSection extends PureComponent<Props> {
  static displayName = 'Card.Section';

  styles: any;

  constructor(props: Props) {
    super(props);
    this.styles = createStyles(props);
  }

  renderContent = () => {
    const {
      content,
      leadingIcon,
      trailingIcon,
      contentStyle,
      testID
    } = this.props;
    return (
      <>
        {leadingIcon && (
          <Image testID={`${testID}.leadingIcon`} {...leadingIcon} />
        )}
        <View testID={`${testID}.contentContainer`} style={contentStyle}>
          {_.map(
            content,
            // @ts-ignore
            ({text, ...others} = {}, index) => {
              return (
                !_.isUndefined(text) && (
                  <Text
                    testID={`${testID}.text.${index}`}
                    key={index}
                    {...others}
                  >
                    {text}
                  </Text>
                )
              );
            }
          )}
        </View>
        {trailingIcon && (
          <Image testID={`${testID}.trailingIcon`} {...trailingIcon} />
        )}
      </>
    );
  };

  renderImage = () => {
    const {
      imageSource,
      overlayType,
      imageStyle = this.styles.image,
      testID
    } = this.props;
    // not actually needed, instead of adding ts-ignore
    if (imageSource) {
      return (
        <Image
          testID={`${testID}.mainImage`}
          source={imageSource}
          style={imageStyle}
          overlayType={overlayType}
          customOverlayContent={this.renderContent()}
        />
      );
    }
  };

  render() {
    const {
      imageSource,
      context: {borderStyle},
      style,
      ...others
    } = this.props;
    return (
      <View style={[this.styles.container, borderStyle, style]} {...others}>
        {imageSource && this.renderImage()}
        {!imageSource && this.renderContent()}
      </View>
    );
  }
}

export default asBaseComponent<CardSectionProps>(asCardChild(CardSection));

function createStyles({width, height, context: {position}}: Props) {
  const {top, left, right, bottom} = CardPresenter.extractPositionValues(
    position
  );
  return StyleSheet.create({
    container: {
      height: left || right ? undefined : height,
      width: top || bottom ? undefined : width,
      overflow: 'hidden'
    },
    image: {
      width: undefined,
      height: undefined,
      flex: 1,
      resizeMode: 'cover'
    }
  });
}
