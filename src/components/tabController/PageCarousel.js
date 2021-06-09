import React, { PureComponent } from 'react';
import _ from 'lodash';
import TabBarContext from "./TabBarContext";
import Animated from 'react-native-reanimated';
import { Constants } from "../../helpers";
const {
  Code,
  block,
  call
} = Animated;
/**
 * @description: TabController's Page Carousel
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: You must pass `asCarousel` flag to TabController and render your TabPages inside a PageCarousel
 */

class PageCarousel extends PureComponent {
  static displayName = 'TabController.PageCarousel';
  static contextType = TabBarContext;
  carousel = React.createRef();
  onScroll = Animated.event([{
    nativeEvent: {
      contentOffset: {
        x: this.context.carouselOffset
      }
    }
  }], {
    useNativeDriver: true
  });

  componentDidMount() {
    if (Constants.isAndroid) {
      setTimeout(() => {
        this.scrollToPage(this.context.selectedIndex);
      }, 0);
    }
  }

  onTabChange = ([index]) => {
    this.scrollToPage(index);
  };
  scrollToPage = pageIndex => {
    const {
      pageWidth
    } = this.context;

    const node = _.invoke(this.carousel, 'current.getNode');

    if (node) {
      node.scrollTo({
        x: pageIndex * pageWidth,
        animated: false
      });
    }
  };
  renderCodeBlock = _.memoize(() => {
    const {
      targetPage,
      containerWidth
    } = this.context;
    return <Code>
        {() => block([Animated.onChange(targetPage, [call([targetPage], this.onTabChange)]), Animated.onChange(containerWidth, [call([targetPage], this.onTabChange)])])}
      </Code>;
  });

  render() {
    const {
      selectedIndex,
      pageWidth
    } = this.context;
    return <>
        <Animated.ScrollView {...this.props} ref={this.carousel} horizontal pagingEnabled showsHorizontalScrollIndicator={false} onScroll={this.onScroll} scrollEventThrottle={16} contentOffset={{
        x: selectedIndex * pageWidth,
        y: 0
      }} // iOS only
      />

        {this.renderCodeBlock()}
      </>;
  }

}

export default PageCarousel;