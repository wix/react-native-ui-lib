import _ from 'lodash';
import React, {Component} from 'react';
import {type DimensionValue, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import memoize from 'memoize-one';
import * as Modifiers from '../../commons/modifiers';
import {Spacings} from 'style';
import View, {ViewProps} from '../view';
import TouchableOpacity, {TouchableOpacityProps} from '../touchableOpacity';
import Text, {type TextProps} from '../text';
import Image, {ImageProps} from '../image';

export enum HorizontalAlignment {
  left = 'left',
  center = 'center',
  right = 'right'
}

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
  renderCustomItem?: () => React.ReactElement<any>;
  /**
   * The item size
   */
  itemSize?: number | ImageSize;
  /**
   * Title content text
   */
  title?: string | React.ReactElement<any>;
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
  subtitle?: string | React.ReactElement<any>;
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
  description?: string | React.ReactElement<any>;
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
   * Content horizontal alignment (default is center)
   */
  horizontalAlignment?: HorizontalAlignment | `${HorizontalAlignment}`;
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
  renderOverlay?: () => React.ReactElement<any>;
  /**
   * Test ID for component
   */
  testID?: string;
  children?: React.ReactElement<any> | React.ReactElement<any>[];
}

/**
 * @description: A single grid view/list item component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/GridViewScreen.tsx
 */
class GridListItem extends Component<GridListItemProps> {
  static displayName = 'GridListItem';

  static horizontalAlignment = HorizontalAlignment;

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

  getContainerHorizontalAlignment = memoize(horizontalAlignment => {
    switch (horizontalAlignment) {
      case HorizontalAlignment.left:
        return 'flex-start';
      case HorizontalAlignment.right:
        return 'flex-end';
      case HorizontalAlignment.center:
        return 'center';
      default:
        undefined;
    }
  });

  renderContent(text: string | React.ReactElement<any> | undefined, textProps: Partial<TextProps>) {
    const {alignToStart, horizontalAlignment} = this.props;
    const textAlign = alignToStart ? 'left' : horizontalAlignment;
    if (text) {
      return (
        <Text {...textProps} style={[textProps.style, {textAlign}]}>
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
      horizontalAlignment,
      containerStyle,
      containerProps = {},
      renderCustomItem,
      children,
      title,
      titleTypography = 'bodySmallBold',
      titleColor,
      titleLines,
      overlayText,
      overlayTextContainerStyle,
      subtitle,
      subtitleTypography = 'subtext',
      subtitleColor,
      subtitleLines,
      description,
      descriptionTypography = 'subtext',
      descriptionColor,
      descriptionLines,
      onPress,
      renderOverlay
    } = this.props;
    const Container = onPress ? TouchableOpacity : View;
    const TextContainer = overlayText ? View : React.Fragment;
    const itemSize = this.getItemSizeObj();
    const {width} = itemSize;
    const alignItems = alignToStart ? 'flex-start' : this.getContainerHorizontalAlignment(horizontalAlignment);
    const textContainerStyle = overlayText && {
      style: [styles.overlayText, overlayTextContainerStyle]
    };
    const {hitSlop, ...otherContainerProps} = containerProps; // eslint-disable-line

    return (
      <Container
        style={[styles.container, {alignItems}, {width}, containerStyle]}
        accessible={renderCustomItem ? true : undefined}
        {...otherContainerProps}
        onPress={onPress && this.onItemPress}
        {...Modifiers.extractAccessibilityProps(this.props)}
      >
        {imageProps && <Image {...imageProps} style={[itemSize, imageProps?.style]} customOverlayContent={children}/>}
        {!_.isNil(renderCustomItem) && <View style={{width}}>{renderCustomItem()}</View>}
        {renderOverlay && <View style={[styles.overlay, itemSize]}>{renderOverlay()}</View>}
        <TextContainer {...textContainerStyle}>
          {this.renderContent(title, {
            testID: `${testID}.title`,
            [titleTypography]: true,
            color: titleColor,
            numberOfLines: titleLines,
            style: styles.title
          })}
          {this.renderContent(subtitle, {
            testID: `${testID}.subtitle`,
            [subtitleTypography]: true,
            color: subtitleColor,
            numberOfLines: subtitleLines,
            style: styles.subtitle
          })}
          {this.renderContent(description, {
            testID: `${testID}.description`,
            [descriptionTypography]: true,
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
  title: {
    marginTop: Spacings.s1,
    textAlign: 'center'
  },
  subtitle: {
    textAlign: 'center'
  },
  description: {
    textAlign: 'center'
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0
  },
  overlayText: {
    position: 'absolute',
    bottom: 0,
    padding: Spacings.s3
  }
});

export default GridListItem;

interface ImageSize {
  width?: DimensionValue;
  height?: DimensionValue;
}
