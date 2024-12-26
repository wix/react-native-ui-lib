---
id: Carousel
title: Carousel
sidebar_label: Carousel
---

Carousel for scrolling pages  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CarouselScreen.tsx)
:::info
This component extends **[ScrollView](https://reactnative.dev/docs/scrollview)** props.
:::
:::tip
This component support **** modifiers.
:::
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://user-images.githubusercontent.com/1780255/107120258-40b5bc80-6895-11eb-9596-8065d3a940ff.gif'}/>

<img style={{maxHeight: '420px'}} src={'https://user-images.githubusercontent.com/1780255/107120257-3eebf900-6895-11eb-9800-402e9e0dc692.gif'}/>

</div>

### Usage
``` jsx live
function Example(props) {
  const BACKGROUND_COLORS = [
    Colors.red50,
    Colors.yellow20,
    Colors.purple50,
    Colors.green50,
    Colors.cyan50,
    Colors.purple20,
    Colors.blue60,
    Colors.red10,
    Colors.green20,
    Colors.purple60
  ];

  const Page = ({children, style, ...others}) => {
    return (
      <View {...others} style={[{flex: 1, borderWidth: 1, borderRadius: 8}, style]}>
        {children}
      </View>
    );
  };

  return (
    <div>
      <View style={{width: 800}}>
        <Carousel
          autoplay
          // onChangePage={onChangePage}
          pageWidth={800 - Spacings.s5 * 2}
          itemSpacings={Spacings.s3}
          containerMarginHorizontal={Spacings.s2}
          initialPage={2}
          containerStyle={{height: 160}}
          pageControlPosition={Carousel.pageControlPositions.UNDER}
          // allowAccessibleLayout
        >
          {_.map([...Array(10)], (_item, index) => (
            <Page style={{backgroundColor: BACKGROUND_COLORS[index]}} key={index}>
              <Text margin-15>CARD {index}</Text>
            </Page>
          ))}
        </Carousel>
      </View>
    </div>
  );
}
```
## API
### allowAccessibleLayout
Whether to layout Carousel for accessibility
`boolean ` 

### animated
Should the container be animated (send the animation style via containerStyle)
`boolean ` 

### animatedScrollOffset
Pass to attach to ScrollView's Animated.event in order to animated elements base on Carousel scroll offset (pass new Animated.ValueXY())
`Animated.ValueXY ` 

### autoplay
Enable to switch automatically between the pages
`boolean ` 

### autoplayInterval
Time is ms to wait before switching to the next page (requires 'autoplay' to be enabled)
`number ` 

### containerMarginHorizontal
Horizontal margin for the carousel container
`number ` 

### containerPaddingVertical
Vertical padding for the carousel container (Sometimes needed when there are overflows that are cut in Android).
`number ` 

### containerStyle
The carousel container style
`ViewStyle ` 

### counterTextStyle
The counter's text style
`ViewStyle ` 

### horizontal
Whether pages will be rendered horizontally or vertically
`boolean ` 

### initialPage
The initial page to start at
`number ` 

### itemSpacings
The spacing between the pages
`number ` 

### loop
If true, will have infinite scroll (works only for horizontal carousel)
`boolean ` 

### onChangePage
Callback for page change event
`(pageIndex, oldPageIndex, info) => void ` 

### onScroll
Attach a callback for onScroll event of the internal ScrollView
`function ` 

### pageControlPosition
The position of the PageControl component ['over', 'under'], otherwise it won't display
`PageControlPosition ` 

### pageControlProps
PageControl component props
`PageControlProps ` 

### pageHeight
The page height (all pages should have the same height).
`number ` 

### pageWidth
The page width (all pages should have the same width). Does not work if passing 'loop' prop
`number ` 

### pagingEnabled
Will block multiple pages scroll (will not work with 'pageWidth' prop)
`boolean ` 

### showCounter
Whether to show a page counter (will not work with 'pageWidth' prop)
`boolean ` 


