import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, Animated, Easing, StyleProp, ViewStyle, AccessibilityProps} from 'react-native';
import {BorderRadiuses, Colors, Dividers, Spacings} from '../../style';
import {createShimmerPlaceholder, LinearGradientPackage} from 'optionalDeps';
import View from '../view';
import {
  Constants,
  asBaseComponent,
  BaseComponentInjectedProps,
  AlignmentModifiers,
  PaddingModifiers,
  MarginModifiers
} from '../../commons/new';
import {extractAccessibilityProps} from '../../commons/modifiers';

const LinearGradient = LinearGradientPackage?.default;

let ShimmerPlaceholder: any;

const ANIMATION_DURATION = 400;

export enum Template {
  LIST_ITEM = 'listItem',
  TEXT_CONTENT = 'content'
}

export enum Size {
  SMALL = 'small',
  LARGE = 'large'
}

export enum ContentType {
  AVATAR = 'avatar',
  THUMBNAIL = 'thumbnail'
}

export interface SkeletonListProps {
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
   * Extra content to be rendered on the end of the list item
   */
  renderEndContent?: () => React.ReactElement | undefined;
}

export interface SkeletonViewProps extends AccessibilityProps, AlignmentModifiers, PaddingModifiers, MarginModifiers {
  /**
   * The content has been loaded, start fading out the skeleton and fading in the content
   */
  showContent?: boolean;
  /**
   * A function that will render the content once the content is ready (i.e. showContent is true).
   * The method will be called with the Skeleton's customValue (i.e. renderContent(props?.customValue))
   */
  renderContent?: (customValue?: any) => React.ReactNode;
  /**
   * Custom value of any type to pass on to SkeletonView and receive back in the renderContent callback.
   */
  customValue?: any;
  /**
   * @deprecated
   * - Please use customValue instead.
   * - Custom value of any type to pass on to SkeletonView and receive back in the renderContent callback.
   */
  contentData?: any;
  /**
   * The type of the skeleton view.
   * Types: LIST_ITEM and TEXT_CONTENT (using SkeletonView.templates.###)
   */
  template?: Template;
  /**
   * Props that are available when using template={SkeletonView.templates.LIST_ITEM}
   */
  listProps?: SkeletonListProps;
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
   * @deprecated
   * - Pass via listProps instead.
   * - The size of the skeleton view.
   * - Types: SMALL and LARGE (using SkeletonView.sizes.###)
   */
  size?: Size;
  /**
   * @deprecated
   * - Pass via listProps instead.
   * - Add content to the skeleton.
   * - Types: AVATAR and THUMBNAIL (using SkeletonView.contentTypes.###)
   */
  contentType?: ContentType;
  /**
   * @deprecated
   * - Pass via listProps instead.
   * - Whether to hide the list item template separator
   */
  hideSeparator?: boolean;
  /**
   * @deprecated
   * - Pass via listProps instead.
   * - Whether to show the last list item template separator
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
   * The colors of the skeleton view, the array length has to be >=2
   * default: [Colors.grey70, Colors.grey60, Colors.grey70]
   */
  colors?: string[];
  /**
   * The border radius of the skeleton view
   */
  borderRadius?: number;
  /**
   * Whether the skeleton is a circle (will override the borderRadius)
   */
  circle?: boolean;
  /**
   * Additional style to the skeleton view
   */
  shimmerStyle?: StyleProp<ViewStyle>;
  /**
   * Override container styles
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Used to locate this view in end-to-end tests
   */
  testID?: string;
  children?: React.ReactNode;
}

interface SkeletonState {
  isAnimating: boolean;
  opacity: Animated.Value;
}

/**
 * @description: Allows showing a temporary skeleton view while your real view is loading.
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/SkeletonViewScreen.tsx
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Skeleton/Skeleton.gif?raw=true
 * @notes: View requires installing the 'react-native-shimmer-placeholder' and 'react-native-linear-gradient' library
 */

type InternalSkeletonViewProps = SkeletonViewProps & BaseComponentInjectedProps;

class SkeletonView extends Component<InternalSkeletonViewProps, SkeletonState> {
  static defaultProps = {
    size: Size.SMALL,
    // listProps: {size: Size.SMALL}, TODO: once size is deprecated remove it and add this
    borderRadius: BorderRadiuses.br10
  };

  static templates: typeof Template = Template;
  static sizes: typeof Size = Size;
  static contentTypes: typeof ContentType = ContentType;

  fadeInAnimation?: Animated.CompositeAnimation;

  constructor(props: InternalSkeletonViewProps) {
    super(props);

    this.state = {
      isAnimating: props.showContent === false,
      opacity: new Animated.Value(0)
    };

    if (_.isUndefined(LinearGradientPackage?.default)) {
      console.error(`RNUILib SkeletonView's requires installing "react-native-linear-gradient" dependency`);
    } else if (_.isUndefined(createShimmerPlaceholder)) {
      console.error(`RNUILib SkeletonView's requires installing "react-native-shimmer-placeholder" dependency`);
    } else {
      ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
    }
  }

  componentDidMount() {
    if (this.state.isAnimating) {
      this.fadeInAnimation = this.fade(true);
    }
  }

  componentDidUpdate(prevProps: InternalSkeletonViewProps) {
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

  getDefaultSkeletonProps = (input?: {circleOverride: boolean; style: StyleProp<ViewStyle>}) => {
    const {circleOverride, style} = input || {};
    const {circle, colors, width, height = 0, shimmerStyle} = this.props;
    let {borderRadius} = this.props;
    let size;

    if (circle || circleOverride) {
      borderRadius = BorderRadiuses.br100;
      size = Math.max(width || 0, height);
    }

    return {
      shimmerColors: colors || [Colors.$backgroundNeutral, Colors.$backgroundNeutralMedium, Colors.$backgroundNeutral],
      isReversed: Constants.isRTL,
      style: [{borderRadius}, style],
      width: size || width,
      height: size || height,
      shimmerStyle
    };
  };

  get size() {
    const {listProps, size} = this.props;
    return listProps?.size || size;
  }

  get contentSize() {
    return this.size === Size.LARGE ? 48 : 40;
  }

  get contentType() {
    const {listProps, contentType} = this.props;
    return listProps?.contentType || contentType;
  }

  get hideSeparator() {
    const {listProps, hideSeparator} = this.props;
    return listProps?.hideSeparator || hideSeparator;
  }

  get showLastSeparator() {
    const {listProps, showLastSeparator} = this.props;
    return listProps?.showLastSeparator || showLastSeparator;
  }

  renderListItemLeftContent = () => {
    const contentType = this.contentType;
    if (contentType) {
      const contentSize = this.contentSize;
      const circleOverride = contentType === ContentType.AVATAR;
      const style = {marginRight: this.size === Size.LARGE ? 16 : 14};
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
    const {listProps} = this.props;
    const contentType = this.contentType;
    const size = this.size;
    const hideSeparator = this.hideSeparator;
    const customLengths = contentType === ContentType.AVATAR ? [undefined, 50] : undefined;
    const height = size === Size.LARGE ? 95 : 75;
    const lengths = _.merge([90, 180, 160], customLengths);
    const topMargins = [0, size === Size.LARGE ? 16 : 8, 8];
    return (
      <View flex height={height} centerV style={!hideSeparator && Dividers.d10} row>
        <View>
          {this.renderStrip(true, lengths[0], topMargins[0])}
          {this.renderStrip(false, lengths[1], topMargins[1])}
          {size === Size.LARGE && this.renderStrip(false, lengths[2], topMargins[2])}
        </View>
        {listProps?.renderEndContent?.()}
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
      <View style={style} {...this.getAccessibilityProps('Loading content')} {...others}>
        <ShimmerPlaceholder {...this.getDefaultSkeletonProps()} {...others}>
          {showContent && data}
        </ShimmerPlaceholder>
      </View>
    );
  };

  renderWithFading = (skeleton: any) => {
    const {isAnimating} = this.state;
    const {children, renderContent, customValue, contentData} = this.props;

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
      const _customValue = customValue || contentData;
      return renderContent(_customValue);
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

  renderNothing = () => null;

  render() {
    if (_.isUndefined(LinearGradientPackage?.default) || _.isUndefined(createShimmerPlaceholder)) {
      return null;
    }

    const {
      times,
      timesKey,
      renderContent,
      showContent,
      customValue,
      contentData,
      template,
      listProps,
      size,
      contentType,
      hideSeparator,
      showLastSeparator,
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
      contentData,
      template,
      listProps,
      size,
      contentType,
      hideSeparator,
      showLastSeparator,
      height,
      width,
      colors,
      borderRadius,
      circle,
      style,
      testID
    };

    if (times) {
      return (
        <View {...others}>
          {_.times(times, index => {
            const key = timesKey ? `${timesKey}-${index}` : `${index}`;
            return (
              <SkeletonView
                modifiers={{}}
                {...passedProps}
                key={key}
                testID={`${testID}-${index}`}
                renderContent={index === 0 ? renderContent : this.renderNothing}
                hideSeparator={this.hideSeparator || (!this.showLastSeparator && index === times - 1)}
                times={undefined}
              />
            );
          })}
        </View>
      );
    } else {
      return this.renderSkeleton();
    }
  }
}

export default asBaseComponent<SkeletonViewProps, typeof SkeletonView>(SkeletonView);

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Spacings.s5
  }
});
