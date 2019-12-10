import React, {Component} from 'react';
import Carousel from '../../components/carousel';
import TabBarContext from './TabBarContext';
import Animated from 'react-native-reanimated';

const {Code, block, call} = Animated;

class PageCarousel extends Component {
  static contextType = TabBarContext;
  state = {
    scrollOffset: new Animated.Value(0)
  };

  onChangePage = (index) => {
  };
  
  onTabChange = ([index]) => {
    this.carousel.goToPage(index, true);
  };

  onScroll = Animated.event([{nativeEvent: {contentOffset: {x: this.context.carouselOffset}}}], {
    useNativeDriver: true
    // listener: event => {
    // }
  });

  render() {
    const {currentPage} = this.context;
    return (
      <>
        <Carousel
          ref={r => (this.carousel = r)}
          {...this.props}
          onChangePage={this.onChangePage}
          containerStyle={{flex: 1}}
          onScroll={this.onScroll}
          scrollEventThrottle={100}
        />
        <Code>
          {() => {
            return block([
              call([currentPage], this.onTabChange)
            ]);
          }}
        </Code>
      </>
    );
  }
}

export default PageCarousel;
