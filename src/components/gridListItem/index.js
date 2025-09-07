import _isNil from "lodash/isNil";
import _isPlainObject from "lodash/isPlainObject";
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import memoize from 'memoize-one';
import * as Modifiers from "../../commons/modifiers";
import { Spacings } from "../../style";
import View from "../view";
import TouchableOpacity from "../touchableOpacity";
import Text from "../text";
import Image from "../image";
export let HorizontalAlignment = /*#__PURE__*/function (HorizontalAlignment) {
  HorizontalAlignment["left"] = "left";
  HorizontalAlignment["center"] = "center";
  HorizontalAlignment["right"] = "right";
  return HorizontalAlignment;
}({});
/**
 * @description: A single grid view/list item component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/GridViewScreen.tsx
 */
class GridListItem extends Component {
  static displayName = 'GridListItem';
  static horizontalAlignment = HorizontalAlignment;
  static defaultProps = {
    itemSize: 48
  };
  state = {};
  onItemPress = () => {
    this.props.onPress?.(this.props);
  };
  getItemSizeObj() {
    const {
      itemSize
    } = this.props;
    if (_isPlainObject(itemSize)) {
      return itemSize;
    }
    return {
      width: itemSize,
      height: itemSize
    };
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
  renderContent(text, textProps) {
    const {
      alignToStart,
      horizontalAlignment
    } = this.props;
    const textAlign = alignToStart ? 'left' : horizontalAlignment;
    if (text) {
      return <Text {...textProps} style={[textProps.style, {
        textAlign
      }]}>
          {text}
        </Text>;
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
    const {
      width
    } = itemSize;
    const alignItems = alignToStart ? 'flex-start' : this.getContainerHorizontalAlignment(horizontalAlignment);
    const textContainerStyle = overlayText && {
      style: [styles.overlayText, overlayTextContainerStyle]
    };
    const {
      hitSlop,
      ...otherContainerProps
    } = containerProps; // eslint-disable-line

    return <Container style={[styles.container, {
      alignItems
    }, {
      width
    }, containerStyle]} {...otherContainerProps} onPress={onPress && this.onItemPress} accessible={renderCustomItem ? true : undefined} {...Modifiers.extractAccessibilityProps(this.props)}>
        {imageProps && <Image {...imageProps} style={[itemSize, imageProps?.style]} customOverlayContent={children} />}
        {!_isNil(renderCustomItem) && <View style={{
        width
      }}>{renderCustomItem()}</View>}
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
      </Container>;
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