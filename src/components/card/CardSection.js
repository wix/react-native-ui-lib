import _isUndefined from "lodash/isUndefined";
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";
import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { asBaseComponent } from "../../commons/new";
import View from "../view";
import Text from "../text";
import Image from "../image";
import asCardChild from "./asCardChild";
/**
 * @description: Card.Section for rendering content easily inside a card
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.tsx
 */
class CardSection extends PureComponent {
  static displayName = 'Card.Section';
  renderContent = () => {
    const {
      content,
      leadingIcon,
      trailingIcon,
      contentStyle,
      testID
    } = this.props;
    if (!leadingIcon && !trailingIcon && _isEmpty(content)) {
      return;
    }
    return <>
        {leadingIcon && <Image testID={`${testID}.leadingIcon`} {...leadingIcon} />}
        <View testID={`${testID}.contentContainer`} style={[contentStyle]}>
          {_map(content,
        // @ts-ignore
        ({
          text,
          ...others
        } = {}, index) => {
          return !_isUndefined(text) && <Text testID={`${testID}.text.${index}`} key={index} {...others}>
                    {text}
                  </Text>;
        })}
        </View>
        {trailingIcon && <Image testID={`${testID}.trailingIcon`} {...trailingIcon} />}
      </>;
  };
  renderImage = () => {
    const {
      imageSource,
      imageStyle,
      imageProps,
      testID
    } = this.props;

    // not actually needed, instead of adding ts-ignore
    if (imageSource) {
      return <Image testID={`${testID}.image`} source={imageSource} style={imageStyle} customOverlayContent={this.renderContent()} {...imageProps} />;
    }
  };
  render() {
    const {
      imageSource,
      context: {
        borderStyle
      },
      style,
      ...others
    } = this.props;
    return <View style={[styles.container, borderStyle, style]} {...others}>
        {imageSource && this.renderImage()}
        {!imageSource && this.renderContent()}
      </View>;
  }
}
export default asBaseComponent(asCardChild(CardSection));
const styles = StyleSheet.create({
  container: {
    borderColor: 'transparent',
    overflow: 'hidden'
  }
});