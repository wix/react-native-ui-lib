import _times from "lodash/times";
import _isFunction from "lodash/isFunction";
import _merge from "lodash/merge";
import _isUndefined from "lodash/isUndefined";
import React, { Component } from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';
import memoize from 'memoize-one';
import { BorderRadiuses, Colors, Dividers, Spacings } from "../../style";
import { createShimmerPlaceholder, LinearGradientPackage } from "../../optionalDependencies";
import View from "../view";
import { Constants } from "../../commons/new";
import { LogService } from "../../services";
const LinearGradient = LinearGradientPackage?.default;
let ShimmerPlaceholder;
const ANIMATION_DURATION = 400;
export let Template = /*#__PURE__*/function (Template) {
  Template["LIST_ITEM"] = "listItem";
  Template["TEXT_CONTENT"] = "content";
  return Template;
}({});
export let Size = /*#__PURE__*/function (Size) {
  Size["SMALL"] = "small";
  Size["LARGE"] = "large";
  return Size;
}({});
export let ContentType = /*#__PURE__*/function (ContentType) {
  ContentType["AVATAR"] = "avatar";
  ContentType["THUMBNAIL"] = "thumbnail";
  return ContentType;
}({});
/**
 * @description: Allows showing a temporary skeleton view while your real view is loading.
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SkeletonViewScreen.tsx
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Skeleton/Skeleton.gif?raw=true
 * @notes: View requires installing the 'react-native-shimmer-placeholder' and 'react-native-linear-gradient' library
 */
class SkeletonView extends Component {
  static displayName = 'SkeletonView';
  static defaultProps = {
    size: Size.SMALL,
    // listProps: {size: Size.SMALL}, TODO: once size is deprecated remove it and add this
    borderRadius: BorderRadiuses.br10
  };
  static templates = Template;
  static sizes = Size;
  static contentTypes = ContentType;
  setAccessibilityProps(template) {
    const isListItem = template === Template.LIST_ITEM;
    const accessibilityProps = {
      accessible: true,
      accessibilityLabel: isListItem ? 'Loading list item' : 'Loading content'
    };
    if (isListItem) {
      this.listItemAccessibilityProps = accessibilityProps;
    } else {
      this.contentAccessibilityProps = accessibilityProps;
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      isAnimating: props.showContent === false,
      opacity: new Animated.Value(0)
    };
    if (_isUndefined(LinearGradientPackage?.default)) {
      LogService.error(`RNUILib SkeletonView's requires installing "react-native-linear-gradient" dependency`);
    } else if (_isUndefined(createShimmerPlaceholder)) {
      LogService.error(`RNUILib SkeletonView's requires installing "react-native-shimmer-placeholder" dependency`);
    } else if (ShimmerPlaceholder === undefined) {
      ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
    }
    this.setAccessibilityProps(props.template);
  }
  componentDidMount() {
    if (this.state.isAnimating) {
      this.fadeInAnimation = this.fade(true);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.showContent && !prevProps.showContent) {
      this.fadeInAnimation?.stop();
      this.fade(false, this.showChildren);
    }
  }
  fade(isFadeIn, onAnimationEnd) {
    const animation = Animated.timing(this.state.opacity, {
      toValue: isFadeIn ? 1 : 0,
      easing: Easing.ease,
      duration: ANIMATION_DURATION,
      useNativeDriver: true
    });
    animation.start(onAnimationEnd);
    return animation;
  }
  showChildren = () => {
    this.setState({
      isAnimating: false
    });
  };
  getDefaultSkeletonProps = input => {
    const {
      circleOverride,
      style
    } = input || {};
    const {
      circle,
      colors,
      width,
      height = 0,
      shimmerStyle
    } = this.props;
    let {
      borderRadius
    } = this.props;
    let size;
    if (circle || circleOverride) {
      borderRadius = BorderRadiuses.br100;
      size = Math.max(width || 0, height);
    }
    return {
      shimmerColors: colors || [Colors.$backgroundNeutral, Colors.$backgroundNeutralMedium, Colors.$backgroundNeutral],
      isReversed: Constants.isRTL,
      style: [{
        borderRadius
      }, style],
      width: size || width,
      height: size || height,
      shimmerStyle
    };
  };
  get contentSize() {
    const {
      listProps
    } = this.props;
    return listProps?.size === Size.LARGE ? 48 : 40;
  }
  renderListItemLeftContent = () => {
    const {
      listProps
    } = this.props;
    const contentType = listProps?.contentType;
    if (contentType) {
      const circleOverride = contentType === ContentType.AVATAR;
      const style = {
        marginRight: listProps?.size === Size.LARGE ? 16 : 14
      };
      return <ShimmerPlaceholder {...this.getDefaultSkeletonProps({
        circleOverride,
        style
      })} width={this.contentSize} height={this.contentSize} />;
    }
  };
  renderStrip = (isMain, length, marginTop) => {
    return <ShimmerPlaceholder {...this.getDefaultSkeletonProps()} width={length} height={isMain ? 12 : 8} style={[{
      marginTop
    }]} />;
  };
  renderListItemContentStrips = () => {
    const {
      listProps
    } = this.props;
    const size = listProps?.size;
    const customLengths = listProps?.contentType === ContentType.AVATAR ? [undefined, 50] : undefined;
    const height = size === Size.LARGE ? 95 : 75;
    const lengths = _merge([90, 180, 160], customLengths);
    const topMargins = [0, size === Size.LARGE ? 16 : 8, 8];
    return <View flex height={height} centerV style={!listProps?.hideSeparator && Dividers.d10} row>
        <View>
          {this.renderStrip(true, lengths[0], topMargins[0])}
          {this.renderStrip(false, lengths[1], topMargins[1])}
          {size === Size.LARGE && this.renderStrip(false, lengths[2], topMargins[2])}
        </View>
        {listProps?.renderEndContent?.()}
      </View>;
  };
  getListItemStyle = memoize(style => {
    return [styles.listItem, style];
  });
  renderListItemTemplate = () => {
    const {
      style,
      ...others
    } = this.props;
    return <View style={this.getListItemStyle(style)} {...this.listItemAccessibilityProps} {...others}>
        {this.renderListItemLeftContent()}
        {this.renderListItemContentStrips()}
      </View>;
  };
  renderTextContentTemplate = () => {
    return <View {...this.contentAccessibilityProps} {...this.props}>
        {this.renderStrip(true, 235, 0)}
        {this.renderStrip(true, 260, 12)}
        {this.renderStrip(true, 190, 12)}
      </View>;
  };
  renderTemplate = () => {
    const {
      template
    } = this.props;
    switch (template) {
      case Template.LIST_ITEM:
        return this.renderListItemTemplate();
      case Template.TEXT_CONTENT:
        return this.renderTextContentTemplate();
      default:
        // just so we won't crash
        return this.renderAdvanced();
    }
  };
  renderAdvanced = () => {
    const {
      children,
      renderContent,
      showContent,
      style,
      testID,
      ...others
    } = this.props;
    const data = showContent && _isFunction(renderContent) ? renderContent(this.props) : children;
    return <View style={style} {...this.contentAccessibilityProps} testID={testID} {...others}>
        <ShimmerPlaceholder {...this.getDefaultSkeletonProps()} testID={`${testID}.shimmer`} {...others}>
          {showContent && data}
        </ShimmerPlaceholder>
      </View>;
  };
  renderWithFading = skeleton => {
    const {
      isAnimating
    } = this.state;
    const {
      children,
      renderContent,
      customValue
    } = this.props;
    if (isAnimating) {
      return <Animated.View style={{
        opacity: this.state.opacity
      }} pointerEvents="none">
          {skeleton}
        </Animated.View>;
    } else if (_isFunction(renderContent)) {
      return renderContent(customValue);
    } else {
      return children;
    }
  };
  renderSkeleton() {
    const {
      template,
      showContent,
      children,
      renderContent
    } = this.props;
    let skeleton;
    if (template) {
      skeleton = this.renderTemplate();
    } else {
      skeleton = this.renderAdvanced();
    }
    if (_isUndefined(showContent) || _isUndefined(children) && _isUndefined(renderContent)) {
      return skeleton;
    } else {
      return this.renderWithFading(skeleton);
    }
  }
  renderNothing = () => null;
  render() {
    if (_isUndefined(LinearGradientPackage?.default) || _isUndefined(createShimmerPlaceholder)) {
      return null;
    }
    const {
      times,
      timesKey,
      renderContent,
      showContent,
      customValue,
      template,
      listProps,
      height,
      width,
      colors,
      borderRadius,
      circle,
      style,
      testID,
      ...others
    } = this.props;
    const passedProps = {
      showContent,
      renderContent,
      customValue,
      template,
      listProps,
      height,
      width,
      colors,
      borderRadius,
      circle,
      style,
      testID
    };
    if (times) {
      return <View {...others}>
          {_times(times, index => {
          const key = timesKey ? `${timesKey}-${index}` : `${index}`;
          const _listProps = {
            ...listProps,
            hideSeparator: listProps?.hideSeparator || !listProps?.showLastSeparator && index === times - 1
          };
          return <SkeletonView {...passedProps} listProps={_listProps} key={key} testID={`${testID}-${index}`} renderContent={index === 0 ? renderContent : this.renderNothing} times={undefined} />;
        })}
        </View>;
    } else {
      return this.renderSkeleton();
    }
  }
}
export default SkeletonView;
const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Spacings.s5
  }
});