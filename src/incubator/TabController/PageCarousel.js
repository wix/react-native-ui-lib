import React, {Component} from 'react';
import TabBarContext from './TabBarContext';
import Animated from 'react-native-reanimated';
import {Constants} from '../../helpers';

const {Code, block, call} = Animated;

class PageCarousel extends Component {
  static contextType = TabBarContext;
  carousel = React.createRef();

  onScroll = Animated.event([{nativeEvent: {contentOffset: {x: this.context.carouselOffset}}}], {
    useNativeDriver: true
  });

  onTabChange = ([index]) => {
    const node = this.carousel.current.getNode();
    node.scrollTo({x: index * Constants.screenWidth, animated: true});
  };

  render() {
    const {currentPage} = this.context;
    return (
      <>
        <Animated.ScrollView
          {...this.props}
          ref={this.carousel}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={this.onScroll}
          scrollEventThrottle={200}
        />

        <Code>
          {() => {
            return block([call([currentPage], this.onTabChange)]);
          }}
        </Code>
      </>
    );
  }
}

export default PageCarousel;
