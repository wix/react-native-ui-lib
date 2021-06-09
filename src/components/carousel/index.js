import _ from 'lodash';
import React, { Component } from 'react';
import { Animated, ScrollView, StyleSheet } from 'react-native';
import { Constants } from "../../helpers";
import { Colors } from "../../style";
import { asBaseComponent } from "../../commons/new";
import View from "../view";
import Text from "../text";
import PageControl from "../pageControl";
import * as presenter from "./CarouselPresenter";
import { CarouselProps, PageControlPosition } from "./types";
export { CarouselProps };

/**
 * @description: Carousel for scrolling pages horizontally
 * @gif: https://user-images.githubusercontent.com/1780255/107120258-40b5bc80-6895-11eb-9596-8065d3a940ff.gif, https://user-images.githubusercontent.com/1780255/107120257-3eebf900-6895-11eb-9800-402e9e0dc692.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CarouselScreen.tsx
 * @extends: ScrollView
 * @extendsLink: https://facebook.github.io/react-native/docs/scrollview
 * @notes: This is a screen width Component
 */
class Carousel extends Component {
  static displayName = 'Carousel';
  static defaultProps = {
    initialPage: 0,
    pagingEnabled: true,
    autoplay: false,
    autoplayInterval: 4000,
    horizontal: true
  };
  static pageControlPositions = PageControlPosition;
  carousel = React.createRef();

  constructor(props) {
    super(props);
    const defaultPageWidth = props.loop || !props.pageWidth ? Constants.screenWidth : props.pageWidth;
    const pageHeight = props.pageHeight ?? Constants.screenHeight;
    this.state = {
      containerWidth: undefined,
      // @ts-ignore (defaultProps)
      currentPage: this.shouldUsePageWidth() ? this.getCalcIndex(props.initialPage) : props.initialPage,
      currentStandingPage: props.initialPage,
      pageWidth: defaultPageWidth,
      pageHeight,
      initialOffset: presenter.calcOffset(props, {
        // @ts-ignore (defaultProps)
        currentPage: props.initialPage,
        pageWidth: defaultPageWidth,
        pageHeight
      }),
      prevProps: props
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      currentPage,
      prevProps
    } = prevState;
    const {
      pageWidth,
      pageHeight
    } = prevProps;
    const {
      pageWidth: nextPageWidth,
      pageHeight: nextPageHeight
    } = nextProps;

    if (!_.isUndefined(nextPageWidth) && pageWidth !== nextPageWidth || !_.isUndefined(nextPageHeight) && pageHeight !== nextPageHeight) {
      const pageWidth = nextPageWidth;
      const pageHeight = nextPageHeight;
      return {
        pageWidth,
        initialOffset: presenter.calcOffset(prevProps, {
          currentPage,
          pageWidth,
          pageHeight
        }),
        prevProps: nextProps
      };
    } // for presenter.calcOffset() props parameter


    if (prevProps.containerMarginHorizontal !== nextProps.containerMarginHorizontal || prevProps.loop !== nextProps.loop) {
      return {
        prevProps: nextProps
      };
    }

    return null;
  }

  componentDidMount() {
    Constants.addDimensionsEventListener(this.onOrientationChanged);

    if (this.props.autoplay) {
      this.startAutoPlay();
    }
  }

  componentWillUnmount() {
    Constants.removeDimensionsEventListener(this.onOrientationChanged);

    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      autoplay
    } = this.props;

    if (autoplay && !prevProps.autoplay) {
      this.startAutoPlay();
    } else if (!autoplay && prevProps.autoplay) {
      this.stopAutoPlay();
    }
  }

  onOrientationChanged = () => {
    const {
      pageWidth,
      loop
    } = this.props;

    if (!pageWidth || loop) {
      this.orientationChange = true; // HACK: setting to containerWidth for Android's call when view disappear

      this.setState({
        pageWidth: this.state.containerWidth || Constants.screenWidth
      });
    }
  };

  getItemSpacings(props) {
    const {
      itemSpacings = 16
    } = props;
    return itemSpacings;
  }

  getContainerMarginHorizontal = () => {
    const {
      containerMarginHorizontal = 0
    } = this.props;
    return containerMarginHorizontal;
  }; // TODO: RN 61.5 - try to remove this from the children and move to the ScrollView's contentContainerStyle
  // style={{overflow: 'visible'}} does not work in ScrollView on Android, maybe it will be fixed in the future

  getContainerPaddingVertical = () => {
    const {
      containerPaddingVertical = 0
    } = this.props;
    return containerPaddingVertical;
  };
  updateOffset = (animated = false) => {
    const {
      x,
      y
    } = presenter.calcOffset(this.props, this.state);

    if (this.carousel?.current) {
      this.carousel.current.scrollTo({
        x,
        y,
        animated
      });

      if (Constants.isAndroid) {
        // this is done to handle onMomentumScrollEnd not being called in Android:
        // https://github.com/facebook/react-native/issues/11693
        // https://github.com/facebook/react-native/issues/19246
        this.onMomentumScrollEnd();
      }
    }
  };

  startAutoPlay() {
    this.autoplayTimer = setInterval(() => {
      this.goToNextPage();
    }, this.props.autoplayInterval);
  }

  stopAutoPlay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  goToPage(pageIndex, animated = true) {
    this.setState({
      currentPage: this.getCalcIndex(pageIndex)
    }, () => this.updateOffset(animated));
  }

  getCalcIndex(index) {
    // to handle scrollView index issue in Android's RTL layout
    if (Constants.isRTL && Constants.isAndroid) {
      const length = presenter.getChildrenLength(this.props) - 1;
      return length - index;
    }

    return index;
  }

  getSnapToOffsets = () => {
    const {
      containerWidth,
      pageWidth
    } = this.state;

    if (this.shouldEnablePagination()) {
      return undefined;
    }

    if (containerWidth) {
      const spacings = pageWidth === containerWidth ? 0 : this.getItemSpacings(this.props);
      const initialBreak = pageWidth - (containerWidth - pageWidth - spacings) / 2;

      const snapToOffsets = _.times(presenter.getChildrenLength(this.props), index => initialBreak + index * pageWidth + this.getContainerMarginHorizontal());

      return snapToOffsets;
    }
  };

  shouldUsePageWidth() {
    const {
      loop,
      pageWidth
    } = this.props;
    return !loop && pageWidth;
  }

  shouldEnablePagination() {
    const {
      pagingEnabled,
      horizontal
    } = this.props;
    return horizontal ? pagingEnabled && !this.shouldUsePageWidth() : true;
  }

  onContainerLayout = ({
    nativeEvent: {
      layout: {
        width: containerWidth,
        height: containerHeight
      }
    }
  }) => {
    const {
      pageWidth = containerWidth,
      pageHeight = containerHeight
    } = this.props;
    const initialOffset = presenter.calcOffset(this.props, {
      currentPage: this.state.currentPage,
      pageWidth,
      pageHeight
    });
    this.setState({
      containerWidth,
      pageWidth,
      pageHeight,
      initialOffset
    });
  };

  shouldAllowAccessibilityLayout() {
    const {
      allowAccessibleLayout
    } = this.props;
    return allowAccessibleLayout && Constants.accessibility.isScreenReaderEnabled;
  }

  onContentSizeChange = () => {
    // this is to handle initial scroll position (content offset)
    if (Constants.isAndroid) {
      this.updateOffset();
    }
  };
  onMomentumScrollEnd = () => {
    // finished full page scroll
    const {
      currentStandingPage,
      currentPage
    } = this.state;
    const index = this.getCalcIndex(currentPage);
    const pagesCount = presenter.getChildrenLength(this.props);

    if (index < pagesCount) {
      this.setState({
        currentStandingPage: index
      });

      if (currentStandingPage !== index) {
        _.invoke(this.props, 'onChangePage', index, currentStandingPage);
      }
    }
  };

  goToNextPage() {
    const {
      currentPage
    } = this.state;
    const pagesCount = presenter.getChildrenLength(this.props);
    const {
      loop
    } = this.props;
    let nextPageIndex;

    if (loop) {
      nextPageIndex = currentPage + 1;
    } else {
      nextPageIndex = Math.min(pagesCount - 1, currentPage + 1);
    }

    this.goToPage(nextPageIndex, true); // in case of a loop, after we advanced right to the cloned first page,
    // we return silently to the real first page

    if (loop && currentPage === pagesCount) {
      this.goToPage(0, false);
    }
  }

  onScroll = event => {
    if (!this.skippedInitialScroll) {
      this.skippedInitialScroll = true;
      return;
    }

    const {
      loop,
      autoplay,
      horizontal
    } = this.props;
    const {
      pageWidth,
      pageHeight
    } = this.state;
    const offsetX = event.nativeEvent.contentOffset.x;
    const offsetY = event.nativeEvent.contentOffset.y;
    const offset = horizontal ? offsetX : offsetY;
    const pageSize = horizontal ? pageWidth : pageHeight;

    if (offset >= 0) {
      if (!this.orientationChange) {
        // Avoid new calculation on orientation change
        const newPage = presenter.calcPageIndex(offset, this.props, pageSize);
        this.setState({
          currentPage: newPage
        });
      }

      this.orientationChange = false;
    }

    if (loop && presenter.isOutOfBounds(offsetX, this.props, pageWidth)) {
      this.updateOffset();
    }

    if (autoplay) {
      // reset the timer to avoid auto scroll immediately after manual one
      this.resetAutoPlay();
    }

    _.invoke(this.props, 'onScroll', event);
  }; // @ts-ignore

  onScrollEvent = Animated.event([{
    nativeEvent: {
      contentOffset: {
        y: this.props?.animatedScrollOffset?.y,
        x: this.props?.animatedScrollOffset?.x
      }
    }
  }], {
    useNativeDriver: true,
    listener: this.onScroll
  });
  renderChild = (child, key) => {
    if (child) {
      const {
        pageWidth,
        pageHeight
      } = this.state;
      const {
        horizontal
      } = this.props;
      const paddingLeft = horizontal ? this.shouldUsePageWidth() ? this.getItemSpacings(this.props) : undefined : 0;
      const index = Number(key);
      const length = presenter.getChildrenLength(this.props);
      const containerMarginHorizontal = this.getContainerMarginHorizontal();
      const marginLeft = index === 0 ? containerMarginHorizontal : 0;
      const marginRight = index === length - 1 ? containerMarginHorizontal : 0;
      const paddingVertical = this.getContainerPaddingVertical();
      return <View style={{
        width: pageWidth,
        height: !horizontal ? pageHeight : undefined,
        paddingLeft,
        marginLeft,
        marginRight,
        paddingVertical
      }} key={key} collapsable={false}>
          {this.shouldAllowAccessibilityLayout() && !Number.isNaN(index) && <View style={styles.hiddenText}>
              <Text>{`page ${index + 1} out of ${length}`}</Text>
            </View>}
          {child}
        </View>;
    }
  };

  renderChildren() {
    const {
      children,
      loop
    } = this.props;
    const length = presenter.getChildrenLength(this.props);
    const childrenArray = React.Children.map(children, (child, index) => {
      return this.renderChild(child, `${index}`);
    });

    if (loop && childrenArray) {
      // @ts-ignore
      childrenArray.unshift(this.renderChild(children[length - 1], `${length - 1}-clone`)); // @ts-ignore

      childrenArray.push(this.renderChild(children[0], `${0}-clone`));
    }

    return childrenArray;
  }

  renderPageControl() {
    const {
      pageControlPosition,
      pageControlProps = {}
    } = this.props;

    if (pageControlPosition) {
      const {
        size = 6,
        spacing = 8,
        color = Colors.dark20,
        inactiveColor = Colors.dark60,
        ...others
      } = pageControlProps;
      const pagesCount = presenter.getChildrenLength(this.props);
      const containerStyle = pageControlPosition === PageControlPosition.UNDER ? {
        marginVertical: 16 - this.getContainerPaddingVertical()
      } : styles.pageControlContainerStyle;
      return <PageControl size={size} spacing={spacing} containerStyle={containerStyle} inactiveColor={inactiveColor} color={color} {...others} numOfPages={pagesCount} currentPage={this.getCalcIndex(this.state.currentPage)} />;
    }
  }

  renderCounter() {
    const {
      pageWidth,
      showCounter,
      counterTextStyle
    } = this.props;
    const {
      currentPage
    } = this.state;
    const pagesCount = presenter.getChildrenLength(this.props);

    if (showCounter && !pageWidth) {
      return <View center style={styles.counter}>
          <Text dark80 text90 style={[{
          fontWeight: 'bold'
        }, counterTextStyle]}>
            {currentPage + 1}/{pagesCount}
          </Text>
        </View>;
    }
  }

  renderAccessibleLayout() {
    const {
      containerStyle,
      children
    } = this.props;
    return <View style={containerStyle} onLayout={this.onContainerLayout}>
        <ScrollView ref={this.carousel} showsVerticalScrollIndicator={false} pagingEnabled onContentSizeChange={this.onContentSizeChange} onScroll={this.onScroll} onMomentumScrollEnd={this.onMomentumScrollEnd}>
          {React.Children.map(children, (child, index) => {
          return this.renderChild(child, `${index}`);
        })}
        </ScrollView>
      </View>;
  }

  renderCarousel() {
    const {
      containerStyle,
      animated,
      horizontal,
      animatedScrollOffset,
      ...others
    } = this.props;
    const {
      initialOffset
    } = this.state;
    const scrollContainerStyle = this.shouldUsePageWidth() ? {
      paddingRight: this.getItemSpacings(this.props)
    } : undefined;
    const snapToOffsets = this.getSnapToOffsets();
    const marginBottom = Math.max(0, this.getContainerPaddingVertical() - 16);
    const ScrollContainer = animatedScrollOffset ? Animated.ScrollView : ScrollView;
    return <View animated={animated} style={[{
      marginBottom
    }, containerStyle]} onLayout={this.onContainerLayout}>
        <ScrollContainer showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} decelerationRate="fast" scrollEventThrottle={200} {...others} ref={this.carousel} onScroll={animatedScrollOffset ? this.onScrollEvent : this.onScroll} contentContainerStyle={scrollContainerStyle} horizontal={horizontal} pagingEnabled={this.shouldEnablePagination()} snapToOffsets={snapToOffsets} contentOffset={initialOffset} // iOS only
      onContentSizeChange={this.onContentSizeChange} onMomentumScrollEnd={this.onMomentumScrollEnd}>
          {this.renderChildren()}
        </ScrollContainer>
        {this.renderPageControl()}
        {this.renderCounter()}
      </View>;
  }

  render() {
    return this.shouldAllowAccessibilityLayout() ? this.renderAccessibleLayout() : this.renderCarousel();
  }

}

export { Carousel }; // For tests

export default asBaseComponent(Carousel);
const styles = StyleSheet.create({
  counter: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    // height: 24,
    borderRadius: 20,
    backgroundColor: Colors.rgba(Colors.black, 0.6),
    position: 'absolute',
    top: 12,
    right: 12
  },
  pageControlContainerStyle: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center'
  },
  hiddenText: {
    position: 'absolute',
    width: 1
  }
});