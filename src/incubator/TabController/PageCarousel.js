import React, {PureComponent} from 'react';
import TabBarContext from './TabBarContext';
import Animated from 'react-native-reanimated';
import {Constants} from '../../helpers';

const {Code, block, call} = Animated;

class PageCarousel extends PureComponent {
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
    const node = this.carousel.current.getNode();
    node.scrollTo({x: pageIndex * Constants.screenWidth, animated});
  };

  renderCodeBlock = () => {
    const {currentPage} = this.context;
    return block([Animated.onChange(currentPage, call([currentPage], this.onTabChange))]);
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
