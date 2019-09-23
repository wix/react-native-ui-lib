import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Constants} from '../../helpers';
import {Colors} from '../../style';
import {BaseComponent} from '../../commons';
import View from '../view';
import Text from '../text';
import PageControl from '../pageControl';
import * as presenter from './CarouselPresenter';

const PAGE_CONTROL_POSITIONS = {
  OVER: 'over',
  UNDER: 'under'
};

/**
 * @description: Carousel for scrolling pages horizontally
 * @gif: https://media.giphy.com/media/l0HU7f8gjpRlMRhKw/giphy.gif, https://media.giphy.com/media/3oFzmcjX9OhpyckhcQ/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CarouselScreen.js
 * @extends: ScrollView
 * @extendsLink: https://facebook.github.io/react-native/docs/scrollview
 * @notes: This is screed width Component
 */
export default class Carousel extends BaseComponent {
  static displayName = 'Carousel';

  static propTypes = {
    /**
     * the first page to start with
     */
    initialPage: PropTypes.number,
    /**
     * the page width (all pages should have the same width).
     */
    pageWidth: PropTypes.number,
    /**
     * the spacing between the items
     */
    itemSpacings: PropTypes.number,
    /**
     * if true, will have infinite scroll
     */
    loop: PropTypes.bool,
    /**
     * callback for when page has changed
     */
    onChangePage: PropTypes.func,
    /**
     * callback for onScroll event of the internal ScrollView
     */
    onScroll: PropTypes.func,
    /**
     * the carousel style
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * PageControl component props
     */
    pageControlProps: PropTypes.shape(PageControl.propTypes),
    /**
     * The position of the PageControl component ['over', 'under'], otherwise it won't display
     */
    pageControlPosition: PropTypes.oneOf(Object.values(PAGE_CONTROL_POSITIONS)),
    /**
     * whether to show a page counter (will not work with pageWidths)
     */
    showCounter: PropTypes.bool,
    /**
     * the counter's text style
     */
    counterTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array])
  };

  static defaultProps = {
    initialPage: 0,
    itemSpacings: 12
  };

  static pageControlPositions = PAGE_CONTROL_POSITIONS;

  constructor(props) {
    super(props);

    this.carousel = React.createRef();
    const defaultPageWidth = props.pageWidth ? props.pageWidth + props.itemSpacings : Constants.screenWidth;

    this.state = {
      currentPage: props.pageWidth ? this.getCalcIndex(props.initialPage) : props.initialPage,
      currentStandingPage: props.initialPage,
      pageWidth: defaultPageWidth,
      initialOffset: {x: presenter.calcOffset(props, {currentPage: props.initialPage, pageWidth: defaultPageWidth})}
    };
  }

  componentDidMount() {
    Constants.addDimensionsEventListener(this.onOrientationChanged);
  }

  componentWillUnmount() {
    Constants.removeDimensionsEventListener(this.onOrientationChanged);
  }

  onOrientationChanged = () => {
    if (!this.props.pageWidth) {
      this.setState({pageWidth: Constants.screenWidth});
      this.goToPage(this.state.currentPage, true);
    }
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  updateOffset = (animated = false) => {
    const centerOffset =
      Constants.isIOS && this.props.pageWidth ? (Constants.screenWidth - this.state.pageWidth) / 2 : 0;
    const x = presenter.calcOffset(this.props, this.state) - centerOffset;

    if (this.carousel) {
      this.carousel.current.scrollTo({x, animated});

      if (Constants.isAndroid) {
        // this is done to handle onMomentumScrollEnd not being called in Android:
        // https://github.com/facebook/react-native/issues/11693
        // https://github.com/facebook/react-native/issues/19246
        this.onMomentumScrollEnd();
      }
    }
  };

  goToPage(pageIndex, animated = true) {
    this.setState({currentPage: this.getCalcIndex(pageIndex)}, () => this.updateOffset(animated));
  }

  getCalcIndex(index) {
    // to handle scrollView index issue in Android's RTL layout
    if (Constants.isRTL && Constants.isAndroid) {
      const length = presenter.getChildrenLength(this.props) - 1;
      return length - index;
    }
    return index;
  }

  onContentSizeChange = () => {
    // this is to handle initial scroll position (content offset)
    if (Constants.isAndroid) {
      this.updateOffset();
    }
  };

  onMomentumScrollEnd = () => {
    // finished full page scroll
    const {currentStandingPage, currentPage} = this.state;
    const index = this.getCalcIndex(currentPage);
    this.setState({currentStandingPage: index});
    if (currentStandingPage !== index) {
      _.invoke(this.props, 'onChangePage', index, currentStandingPage);
    }
  };

  onScroll = event => {
    if (!this.skippedInitialScroll) {
      this.skippedInitialScroll = true;
      return;
    }

    const {loop} = this.props;
    const {pageWidth} = this.state;
    const offsetX = event.nativeEvent.contentOffset.x;

    if (offsetX >= 0) {
      const newPage = presenter.calcPageIndex(offsetX, this.props, pageWidth);
      this.setState({currentPage: newPage});
    }

    if (loop && presenter.isOutOfBounds(offsetX, this.props, pageWidth)) {
      this.updateOffset();
    }

    _.invoke(this.props, 'onScroll', event);
  };

  renderChild = (child, key) => {
    const paddingLeft = this.props.pageWidth ? this.props.itemSpacings : undefined;

    return (
      <View style={{width: this.state.pageWidth, paddingLeft}} key={key} collapsable={false}>
        {child}
      </View>
    );
  };

  renderChildren() {
    const {children, loop} = this.props;
    const length = presenter.getChildrenLength(this.props);

    const childrenArray = React.Children.map(children, (child, index) => {
      return this.renderChild(child, `${index}`);
    });

    if (loop) {
      childrenArray.unshift(this.renderChild(children[length - 1], `${length - 1}-clone`));
      childrenArray.push(this.renderChild(children[0], `${0}-clone`));
    }

    return childrenArray;
  }

  renderPageControl() {
    const {pageControlPosition, pageControlProps} = this.props;

    if (pageControlPosition) {
      const pagesCount = presenter.getChildrenLength(this.props);
      const containerStyle =
        pageControlPosition === PAGE_CONTROL_POSITIONS.UNDER
          ? {marginVertical: 16}
          : {position: 'absolute', bottom: 16, alignSelf: 'center'};

      return (
        <PageControl
          size={6}
          containerStyle={containerStyle}
          inactiveColor={Colors.dark60}
          color={Colors.dark20}
          {...pageControlProps}
          numOfPages={pagesCount}
          currentPage={this.getCalcIndex(this.state.currentPage)}
        />
      );
    }
  }

  renderCounter() {
    const {pageWidth, showCounter, counterTextStyle} = this.props;
    const {currentPage} = this.state;
    const pagesCount = presenter.getChildrenLength(this.props);

    if (showCounter && !pageWidth) {
      return (
        <View center style={this.styles.counter}>
          <Text dark80 text90 style={[{fontWeight: 'bold'}, counterTextStyle]}>
            {currentPage + 1}/{pagesCount}
          </Text>
        </View>
      );
    }
  }

  render() {
    const {containerStyle, itemSpacings, pageWidth: pWidth, ...others} = this.props;
    const {initialOffset, pageWidth} = this.state;

    const scrollContainerStyle = pWidth ? {paddingRight: itemSpacings} : undefined;
    const spacings = pageWidth === Constants.screenWidth ? 0 : itemSpacings;
    const initialBreak = pageWidth - (Constants.screenWidth - pageWidth - spacings) / 2;
    const snapToOffsets = _.times(presenter.getChildrenLength(this.props), index => initialBreak + index * pageWidth);

    return (
      <View style={containerStyle}>
        <ScrollView
          {...others}
          ref={this.carousel}
          contentContainerStyle={scrollContainerStyle}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToOffsets={snapToOffsets}
          decelerationRate="fast"
          contentOffset={initialOffset} // iOS only
          scrollEventThrottle={200}
          onContentSizeChange={this.onContentSizeChange}
          onScroll={this.onScroll}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
        >
          {this.renderChildren()}
        </ScrollView>
        {this.renderPageControl()}
        {this.renderCounter()}
      </View>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    counter: {
      paddingHorizontal: 8,
      paddingVertical: 3, // height: 24,
      borderRadius: 20,
      backgroundColor: Colors.rgba(Colors.black, 0.6),
      position: 'absolute',
      top: 12,
      right: 12
    }
  });
}
