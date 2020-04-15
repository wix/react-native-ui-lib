import React, {PureComponent} from 'react';
import _ from 'lodash';
import TabBarContext from './TabBarContext';
import Animated from 'react-native-reanimated';
import {Constants} from '../../helpers';

const {Code, block, call} = Animated;

/**
 * @description: TabController's Page Carousel
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.js
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
    const node = _.invoke(this.carousel, 'current.getNode');
    if (node) {
      node.scrollTo({x: pageIndex * Constants.screenWidth, animated: false});
    }
  };

  renderCodeBlock = () => {
    const {targetPage} = this.context;
    return block([Animated.onChange(targetPage, [call([targetPage], this.onTabChange)])]);
  };

  render() {
    const {selectedIndex} = this.context;
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
          contentOffset={{x: selectedIndex * Constants.screenWidth}} // iOS only
        />

        <Code>{this.renderCodeBlock}</Code>
      </>
    );
  }
}

export default PageCarousel;
