import React, {useCallback, useContext, useMemo, useRef} from 'react';
import TabBarContext from './TabBarContext';
import Reanimated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler
} from 'react-native-reanimated';
import {Constants} from 'helpers';

/**
 * @description: TabController's Page Carousel
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: You must pass `asCarousel` flag to TabController and render your TabPages inside a PageCarousel
 */
function PageCarousel({...props}) {
  const carousel = useAnimatedRef();
  const {currentPage, selectedIndex = 0, pageWidth = Constants.screenWidth, carouselOffset} = useContext(TabBarContext);
  const contentOffset = useMemo(() => ({x: selectedIndex * pageWidth, y: 0}), [selectedIndex, pageWidth]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      carouselOffset.value = e.contentOffset.x;
    },
    onMomentumEnd: e => {
      const newPage = Math.round(e.contentOffset.x / pageWidth);
      currentPage.value = newPage;
    }
  });

  const scrollToItem = useCallback(index => {
    carousel.current?.scrollTo({x: index * pageWidth, animated: false});
  },
  [pageWidth]);

  useAnimatedReaction(() => {
    return currentPage.value;
  },
  pageIndex => {
    runOnJS(scrollToItem)(pageIndex);
  });

  return (
    <>
      <Reanimated.ScrollView
        {...props}
        ref={carousel}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentOffset={contentOffset} // iOS only
      />
    </>
  );
}

// class PageCarousel extends PureComponent {
//   static displayName = 'TabController.PageCarousel';
//   static contextType = TabBarContext;
//   carousel = React.createRef<Animated.ScrollView>();

//   onScroll = Animated.event([{nativeEvent: {contentOffset: {x: this.context.carouselOffset}}}], {
//     useNativeDriver: true
//   });

//   componentDidMount() {
//     if (Constants.isAndroid) {
//       setTimeout(() => {
//         this.scrollToPage(this.context.selectedIndex);
//       }, 0);
//     }
//   }

//   onTabChange = ([index]: readonly number[]) => {
//     this.scrollToPage(index);
//   };

//   scrollToPage = (pageIndex: number) => {
//     const {pageWidth} = this.context;
//     const node = _.invoke(this.carousel, 'current.getNode');
//     if (node) {
//       node.scrollTo({x: pageIndex * pageWidth, animated: false});
//     }
//   };

//   renderCodeBlock = _.memoize(() => {
//     const {targetPage, containerWidth} = this.context;

//     return (
//       <Code>
//         {() =>
//           block([
//             Animated.onChange(targetPage, [call([targetPage], this.onTabChange)]),
//             Animated.onChange(containerWidth, [call([targetPage], this.onTabChange)])
//           ])
//         }
//       </Code>
//     );
//   });

//   render() {
//     const {selectedIndex, pageWidth} = this.context;
//     return (
//       <>
//         <Animated.ScrollView
//           {...this.props}
//           ref={this.carousel}
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           onScroll={this.onScroll}
//           scrollEventThrottle={16}
//           contentOffset={{x: selectedIndex * pageWidth, y: 0}} // iOS only
//         />

//         {this.renderCodeBlock()}
//       </>
//     );
//   }
// }

export default PageCarousel;
