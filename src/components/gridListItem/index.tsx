import _ from 'lodash';
import React, {Component} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import * as Modifiers from '../../commons/modifiers';
import {Colors, Spacings, Typography} from 'style';
import View, {ViewProps} from '../view';
import TouchableOpacity, {TouchableOpacityProps} from '../touchableOpacity';
import Text from '../text';
import Image, {ImageProps} from '../image';

export interface GridListItemProps {
  /**
   * Image props object for rendering an image item
   */
  imageProps?: ImageProps;
  /**
   * Props to pass on to the touchable container
   */
  containerProps?: Omit<TouchableOpacityProps | ViewProps, 'style'>;
  /**
   * Custom GridListItem to be rendered in the GridView
   */
  renderCustomItem?: () => React.ReactElement;
  /**
   * The item size
   */
  itemSize?: number | ImageSize;
  /**
   * Title content text
   */
  title?: string | React.ReactElement;
  /**
   * Title content typography
   */
  titleTypography?: string;
  /**
   * Title content color
   */
  titleColor?: string;
  /**
   * Title content number of lines
   */
  titleLines?: number;
  /**
   * Subtitle content text
   */
  subtitle?: string | React.ReactElement;
  /**
   * Subtitle content typography
   */
  subtitleTypography?: string;
  /**
   * Subtitle content color
   */
  subtitleColor?: string;
  /**
   * Subtitle content number of lines
   */
  subtitleLines?: number;
  /**
   * Description content text
   */
  description?: string | React.ReactElement;
  /**
   * Description content typography
   */
  descriptionTypography?: string;
  /**
   * Description content color
   */
  descriptionColor?: string;
  /**
   * Description content number of lines
   */
  descriptionLines?: number;
  /**
   * Renders the title, subtitle and description inside the item
   */
  overlayText?: boolean;
  /**
   * Custom container styling for inline text
   */
  overlayTextContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Should content be align to start (default is center)
   */
  alignToStart?: boolean;
  /**
   * Custom container style
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * The item's action handler
   */
  onPress?: TouchableOpacityProps['onPress'];
  /**
   * Renders an overlay on top of the image
   */
  renderOverlay?: () => React.ReactElement;
  /**
   * Test ID for component
   */
  testID?: string;
  children?: React.ReactNode;
}

interface RenderContentType {
  text?: string | React.ReactElement;
  typography?: string;
  color?: string;
  numberOfLines?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * @description: A single grid view/list item component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/GridViewScreen.tsx
 */
class GridListItem extends Component<GridListItemProps> {
  static displayName = 'GridListItem';

  static defaultProps = {
    itemSize: 48
  };

  state = {};

  onItemPress = () => {
    this.props.onPress?.(this.props);
  };

  getItemSizeObj(): ImageSize {
    const {itemSize} = this.props;

    if (_.isPlainObject(itemSize)) {
      return itemSize as ImageSize;
    }
    return {width: itemSize as number, height: itemSize as number};
  }

  renderContent({text, typography, color, numberOfLines = 1, style, testID}: RenderContentType) {
    const {alignToStart} = this.props;
    if (text) {
      return (
        <Text
          testID={testID}
          // @ts-ignore
          style={[style, Typography[typography], color && {color}, alignToStart && styles.contentAlignedToStart]}
          numberOfLines={numberOfLines}
        >
          {text}
        </Text>
      );
    }
  }

  render() {
    const {
      testID,
      imageProps,
      alignToStart,
      containerStyle,
      containerProps,
      renderCustomItem,
      children,
      title,
      titleTypography,
      titleColor = Colors.$textDefault,
      titleLines,
      overlayText,
      overlayTextContainerStyle,
      subtitle,
      subtitleTypography,
      subtitleColor = Colors.$textDefault,
      subtitleLines,
      description,
      descriptionTypography,
      descriptionColor = Colors.$textDefault,
      descriptionLines,
      onPress,
      renderOverlay
    } = this.props;
    const hasPress = _.isFunction(onPress);
    const hasOverlay = _.isFunction(renderOverlay);
    const Container = hasPress ? TouchableOpacity : View;
    const imageStyle = {...this.getItemSizeObj()};
    const width = _.get(imageStyle, 'width');
    const TextContainer = overlayText ? View : React.Fragment;
    const textContainerStyle = overlayText ? {style: [styles.overlayText, overlayTextContainerStyle]} : null;
    const imageBorderRadius = imageProps?.borderRadius;

    return (
      <Container
        style={[styles.container, alignToStart && styles.containerAlignedToStart, {width}, containerStyle]}
        {...containerProps}
        onPress={hasPress ? this.onItemPress : undefined}
        accessible={renderCustomItem ? true : undefined}
        {...Modifiers.extractAccessibilityProps(this.props)}
      >
        {imageProps && (
          <View style={[{borderRadius: imageBorderRadius}, imageStyle]}>
            <Image {...imageProps} style={[imageStyle, imageProps?.style]}/>
            {children}
          </View>
        )}
        {!_.isNil(renderCustomItem) && <View style={{width}}>{renderCustomItem()}</View>}
        {hasOverlay && <View style={[styles.overlay, this.getItemSizeObj()]}>{renderOverlay?.()}</View>}
        <TextContainer {...textContainerStyle}>
          {this.renderContent({
            testID: `${testID}.title`,
            text: title,
            typography: titleTypography,
            color: titleColor,
            numberOfLines: titleLines,
            style: styles.title
          })}
          {this.renderContent({
            testID: `${testID}.subtitle`,
            text: subtitle,
            typography: subtitleTypography,
            color: subtitleColor,
            numberOfLines: subtitleLines,
            style: styles.subtitle
          })}
          {this.renderContent({
            testID: `${testID}.description`,
            text: description,
            typography: descriptionTypography,
            color: descriptionColor,
            numberOfLines: descriptionLines,
            style: styles.description
          })}
        </TextContainer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    alignItems: 'center'
  },
  containerAlignedToStart: {
    alignItems: 'flex-start'
  },
  title: {
    marginTop: Spacings.s1,
    textAlign: 'center',
    ...Typography.bodySmallBold
  },
  subtitle: {
    textAlign: 'center',
    ...Typography.subtext
  },
  description: {
    textAlign: 'center',
    ...Typography.subtext
  },
  contentAlignedToStart: {
    textAlign: 'left'
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0
  },
  overlayText: {
    position: 'absolute',
    bottom: 10,
    left: 10
  }
});

export default GridListItem;

interface ImageSize {
  width?: number;
  height?: number;
}
