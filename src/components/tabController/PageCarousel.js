import React, {PureComponent} from 'react';
import _ from 'lodash';
import TabBarContext from './TabBarContext';
import Animated from 'react-native-reanimated';
import {Constants} from '../../helpers';

const {Code, block, call} = Animated;

/**
 * @description: TabController's Page Carousel
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.js
 * @notes: You must pass `asCarousel` flag to TabController and render your TabPages inside a PageCarousel
 */
class PageCarousel extends PureComponent {
  static displayName = 'TabController.PageCarousel';
  static contextType = TabBarContext;
  carousel = React.createRef();

  onScroll = Animated.event([{nativeEvent: {contentOffset: {x: this.context.carouselOffset}}}], {
    useNativeDriver: true
  });

  componentDidMount() {
    if (Constants.isAndroid) {
      setTimeout(() => {
        this.scrollToPage(this.context.selectedIndex, false);
      }, 0);
    }
  }

  onTabChange = ([index]) => {
    this.scrollToPage(index, true);
  };

  scrollToPage = (pageIndex, animated) => {
    const {pageWidth} = this.context;
    const node = _.invoke(this.carousel, 'current.getNode');
    if (node) {
      node.scrollTo({x: pageIndex * pageWidth, animated: false});
    }
  };

  renderCodeBlock = () => {
    const {targetPage, containerWidth} = this.context;
    return block([
      Animated.onChange(targetPage, [call([targetPage], this.onTabChange)]),
      Animated.onChange(containerWidth, [call([targetPage], this.onTabChange)])
    ]);
  };

  render() {
    const {selectedIndex, pageWidth} = this.context;
    return (
      <>
        <Animated.ScrollView
          {...this.props}
          ref={this.carousel}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={this.onScroll}
          scrollEventThrottle={16}
          contentOffset={{x: selectedIndex * pageWidth}} // iOS only
        />

        <Code>{this.renderCodeBlock}</Code>
      </>
    );
  }
}

export default PageCarousel;
