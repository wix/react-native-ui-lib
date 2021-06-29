import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, Animated, Easing, StyleProp, ViewStyle} from 'react-native';
import {BorderRadiuses, Colors, Dividers, Spacings} from '../../style';
import {createShimmerPlaceholder, LinearGradientPackage} from 'optionalDeps';
import {Constants} from 'helpers';
import View from '../view';
import {asBaseComponent} from '../../commons/new';
import {extractAccessibilityProps} from '../../commons/modifiers';

const LinearGradient = LinearGradientPackage?.default;

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ANIMATION_DURATION = 400;

enum Template {
  LIST_ITEM = 'listItem',
  TEXT_CONTENT = 'content',
}

enum Size {
  SMALL = 'small',
  LARGE = 'large',
}

enum ContentType {
  AVATAR = 'avatar',
  THUMBNAIL = 'thumbnail',
}

interface SkeletonProps {
  /**
   * The content has been loaded, start fading out the skeleton and fading in the content
   */
  showContent?: boolean;
  /**
   * A function that will render the content once the content is ready (i.e. showContent is true).
   * The method will be called with the Skeleton's props (i.e. renderContent(props))
   */
  renderContent?: (props: SkeletonProps) => React.ReactNode;
  /**
   * The type of the skeleton view.
   * Types: LIST_ITEM and TEXT_CONTENT (using SkeletonView.templates.###)
   */
  template?: Template;
  /**
   * An object that holds the number of times the skeleton will appear, and (optionally) the key.
   * The key will actually be `${key}-${index}` if a key is given or `${index}` if no key is given.
   * IMPORTANT: your data (i.e. children \ renderContent) will NOT be duplicated.
   * Note: testID will be `${testID}-${index}`
   */
  times?: number;
  /**
   * A key for the duplicated SkeletonViews.
   * This is needed because the `key` prop is not accessible.
   */
  timesKey?: string;
  /**
   * The size of the skeleton view.
   * Types: SMALL and LARGE (using SkeletonView.sizes.###)
   */
  size?: Size;
  /**
   * Add content to the skeleton.
   * Types: AVATAR and THUMBNAIL (using SkeletonView.contentTypes.###)
   */
  contentType?: ContentType;
  /**
   * Whether to hide the list item template separator
   */
  hideSeparator?: boolean;
  /**
   * Whether to show the last list item template separator
   */
  showLastSeparator?: boolean;
  /**
   * The height of the skeleton view
   */
  height?: number;
  /**
   * The width of the skeleton view
   */
  width?: number;
  /**
   * The border radius of the skeleton view
   */
  borderRadius?: number;
  /**
   * Whether the skeleton is a circle (will override the borderRadius)
   */
  circle?: boolean;
  /**
   * Override container styles
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Used to locate this view in end-to-end tests
   */
  testID?: string;
}

interface SkeletonState {
  isAnimating: boolean;
  opacity: Animated.Value;
}

/**
 * @description: Allows showing a temporary skeleton view while your real view is loading.
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SkeletonViewScreen.js
 * @notes: View requires installing the 'react-native-shimmer-placeholder' and 'react-native-linear-gradient' library
 */
class SkeletonView extends Component<SkeletonProps, SkeletonState> {
  static defaultProps = {
    size: Size.SMALL,
    borderRadius: BorderRadiuses.br10
  };

  static templates = Template;
  static sizes = Size;
  static contentTypes = ContentType;

  fadeInAnimation?: Animated.CompositeAnimation;

  constructor(props: SkeletonProps) {
    super(props);

    this.state = {
      isAnimating: !_.isUndefined(props.showContent),
      opacity: new Animated.Value(0)
    };
  }

  componentDidMount() {
    if (this.state.isAnimating) {
      this.fadeInAnimation = this.fade(true);
    }
  }

  componentDidUpdate(prevProps: SkeletonProps) {
    if (this.props.showContent && !prevProps.showContent) {
      this.fadeInAnimation?.stop();
      this.fade(false, this.showChildren);
    }
  }

  fade(isFadeIn: boolean, onAnimationEnd?: Animated.EndCallback) {
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
    this.setState({isAnimating: false});
  };

  getAccessibilityProps = (accessibilityLabel: any) => {
    return {
      accessible: true,
      accessibilityLabel,
      ...extractAccessibilityProps(this.props)
    };
  };

  getDefaultSkeletonProps = (input?: {circleOverride: boolean, style: StyleProp<ViewStyle>}) => {
    const {circleOverride, style} = input || {};
    const {circle, width = 0, height = 0} = this.props;
    let {borderRadius} = this.props;
    let size;
    if (circle || circleOverride) {
      borderRadius = BorderRadiuses.br100;
      size = Math.max(width, height);
    }

    return {
      shimmerColors: [Colors.grey70, Colors.grey60, Colors.grey70],
      isReversed: Constants.isRTL,
      style: [{borderRadius}, style],
      width: size || width,
      height: size || height
    };
  };

  getContentSize = () => {
    const {size} = this.props;
    return size === Size.LARGE ? 48 : 40;
  };

  renderListItemLeftContent = () => {
    const {contentType, size} = this.props;
    if (contentType) {
      const contentSize = this.getContentSize();
      const circleOverride = contentType === ContentType.AVATAR;
      const style = {marginRight: size === Size.LARGE ? 16 : 14};
      return (
        <ShimmerPlaceholder
          {...this.getDefaultSkeletonProps({circleOverride, style})}
          width={contentSize}
          height={contentSize}
        />
      );
    }
  };

  renderStrip = (isMain: boolean, length: number, marginTop: number) => {
    return (
      <ShimmerPlaceholder
        {...this.getDefaultSkeletonProps()}
        width={length}
        height={isMain ? 12 : 8}
        style={[{marginTop}]}
      />
    );
  };

  renderListItemContentStrips = () => {
    const {contentType, size, hideSeparator} = this.props;
    const customLengths = contentType === ContentType.AVATAR ? [undefined, 50] : undefined;
    const height = size === Size.LARGE ? 95 : 75;
    const lengths = _.merge([90, 180, 160], customLengths);
    const topMargins = [0, size === Size.LARGE ? 16 : 8, 8];
    return (
      <View width={'100%'} height={height} centerV style={!hideSeparator && Dividers.d10}>
        {this.renderStrip(true, lengths[0], topMargins[0])}
        {this.renderStrip(false, lengths[1], topMargins[1])}
        {size === Size.LARGE && this.renderStrip(false, lengths[2], topMargins[2])}
      </View>
    );
  };

  renderListItemTemplate = () => {
    const {style, ...others} = this.props;

    return (
      <View style={[styles.listItem, style]} {...this.getAccessibilityProps('Loading list item')} {...others}>
        {this.renderListItemLeftContent()}
        {this.renderListItemContentStrips()}
      </View>
    );
  };

  renderTextContentTemplate = () => {
    return (
      <View {...this.getAccessibilityProps('Loading content')} {...this.props}>
        {this.renderStrip(true, 235, 0)}
        {this.renderStrip(true, 260, 12)}
        {this.renderStrip(true, 190, 12)}
      </View>
    );
  };

  renderTemplate = () => {
    const {template} = this.props;
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
    const {children, renderContent, showContent, style, ...others} = this.props;
    const data = showContent && _.isFunction(renderContent) ? renderContent(this.props) : children;
    return (
      <View style={style} {...this.getAccessibilityProps('Loading content')}>
        <ShimmerPlaceholder {...this.getDefaultSkeletonProps()} {...others}>
          {showContent && data}
        </ShimmerPlaceholder>
      </View>
    );
  };

  renderWithFading = (skeleton: any) => {
    const {isAnimating} = this.state;
    const {children, renderContent} = this.props;

    if (isAnimating) {
      return (
        <Animated.View
          style={{
            opacity: this.state.opacity
          }}
          pointerEvents="none"
        >
          {skeleton}
        </Animated.View>
      );
    } else if (_.isFunction(renderContent)) {
      return renderContent(this.props);
    } else {
      return children;
    }
  };

  renderSkeleton() {
    const {template, showContent, children, renderContent} = this.props;
    let skeleton;
    if (template) {
      skeleton = this.renderTemplate();
    } else {
      skeleton = this.renderAdvanced();
    }

    if (_.isUndefined(showContent) || (_.isUndefined(children) && _.isUndefined(renderContent))) {
      return skeleton;
    } else {
      return this.renderWithFading(skeleton);
    }
  }

  renderNothing = () => null

  render() {
    const {times, timesKey, showLastSeparator, hideSeparator, renderContent, testID} = this.props;

    if (times) {
      return (
        _.times(times, index => {
          const key = timesKey ? `${timesKey}-${index}` : `${index}`;
          return (
            <SkeletonView
              {...this.props}
              key={key}
              testID={`${testID}-${index}`}
              renderContent={index === 0 ? renderContent : this.renderNothing}
              hideSeparator={hideSeparator || (!showLastSeparator && index === times - 1)}
              times={undefined}
            />
          );
        })
      );
    } else {
      return this.renderSkeleton();
    }
  }
}

export default asBaseComponent<SkeletonProps>(SkeletonView);

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Spacings.s5
  }
});
