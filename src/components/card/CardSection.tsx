import _ from 'lodash';
import React, {PureComponent} from 'react';
import {StyleSheet, ViewStyle, ImageStyle, ImageSourcePropType, StyleProp} from 'react-native';
import {LogService} from '../../services';
import {asBaseComponent} from '../../commons/new';
import View, {ViewProps} from '../view';
import Text, {TextProps} from '../text';
import Image, {ImageProps} from '../image';
import asCardChild, {asCardChildProps} from './asCardChild';

type ContentType = TextProps & {text?: string};

export type CardSectionProps = ViewProps & {
  /**
   * Text content for the CardSection.
   * Example: content={[{text: 'You’re Invited!', text70: true, dark10: true}]}
   */
  content?: ContentType[];
  /**
   * Style for the content
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * Give the section a background color
   */
  backgroundColor?: string;
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
  source?: ImageSourcePropType; // TODO: remove after deprecation
  /**
   * The style for the background image
   */
  imageStyle?: StyleProp<ImageStyle>;
  /**
   * Other image props that will be passed to the image
   */
  imageProps?: Partial<ImageProps>;
};

type Props = CardSectionProps & asCardChildProps;

/**
 * @description: Card.Section for rendering content easily inside a card
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.tsx
 */
class CardSection extends PureComponent<Props> {
  static displayName = 'Card.Section';

  constructor(props: Props) {
    super(props);

    if (props.source) {
      LogService.deprecationWarn({component: 'CardSection', oldProp: 'source', newProp: 'imageSource'});
    }
  }

  renderContent = () => {
    const {content, leadingIcon, trailingIcon, contentStyle, testID} = this.props;
    if (!leadingIcon && !trailingIcon && _.isEmpty(content)) {
      return;
    }

    return (
      <>
        {leadingIcon && <Image testID={`${testID}.leadingIcon`} {...leadingIcon}/>}
        <View testID={`${testID}.contentContainer`} style={[contentStyle]}>
          {_.map(content,
            // @ts-ignore
            ({text, ...others} = {}, index) => {
              return (
                !_.isUndefined(text) && (
                  <Text testID={`${testID}.text.${index}`} key={index} {...others}>
                    {text}
                  </Text>
                )
              );
            })}
        </View>
        {trailingIcon && <Image testID={`${testID}.trailingIcon`} {...trailingIcon}/>}
      </>
    );
  };

  renderImage = () => {
    const {source, imageSource, imageStyle, imageProps, testID} = this.props;
    const finalSource = imageSource || source;

    // not actually needed, instead of adding ts-ignore
    if (finalSource) {
      return (
        <Image
          testID={`${testID}.image`}
          source={finalSource}
          style={imageStyle}
          customOverlayContent={this.renderContent()}
          {...imageProps}
        />
      );
    }
  };

  render() {
    const {
      source,
      imageSource,
      context: {borderStyle},
      style,
      ...others
    } = this.props;
    const finalSource = imageSource || source;

    return (
      <View style={[styles.container, borderStyle, style]} {...others}>
        {finalSource && this.renderImage()}
        {!finalSource && this.renderContent()}
      </View>
    );
  }
}

export default asBaseComponent<CardSectionProps>(asCardChild(CardSection));

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  }
});
