import {Carousel, Constants, Text, View, Colors} from 'react-native-ui-lib';
import React, {Component} from 'react';
import {StyleSheet, Animated, TextStyle} from 'react-native';
import _ from 'lodash';
import {renderBooleanOption, renderSliderOption} from '../ExampleScreenPresenter';

interface State {
  numberOfPagesShown: number;
  autoplay: boolean;
}

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

const pageHeight = Constants.windowHeight / 3;

class CarouselVerticalScreen extends Component<{}, State> {
  carousel = React.createRef<typeof Carousel>();
  animatedScrollOffset = new Animated.ValueXY();

  constructor(props: {}) {
    super(props);

    this.state = {
      numberOfPagesShown: 5,
      autoplay: false
    };
  }

  renderAnimatedCounter = () => {
    const {numberOfPagesShown} = this.state;
    const animatedStyles = _.times(numberOfPagesShown, page => {
      return {
        opacity: this.animatedScrollOffset.y.interpolate({
          inputRange: [pageHeight * page - 50, pageHeight * page, pageHeight * page + 50],
          outputRange: [0, 1, 0]
        }),
        transform: [
          {
            translateX: this.animatedScrollOffset.y.interpolate({
              inputRange: [pageHeight * page - 50, pageHeight * page, pageHeight * page + 50],
              outputRange: [-50, 0, 50]
            })
          }
        ]
      };
    });
    return (
      <View absT>
        {_.times(numberOfPagesShown, page => (
          <Text key={page} h1 animated style={[styles.animatedPageCounter, animatedStyles[page]] as TextStyle}>
            {page}
          </Text>
        ))}
      </View>
    );
  };

  render() {
    const {numberOfPagesShown, autoplay} = this.state;
    return (
      <View flex paddingT-20>
        <View marginH-20 marginB-20>
          {renderBooleanOption.call(this, 'autoplay', 'autoplay')}
          {renderSliderOption.call(this, 'Number of pages shown', 'numberOfPagesShown', {
            min: 3,
            max: 10,
            step: 1,
            initial: 5
          })}
        </View>
        <View>
          <Carousel
            key={'carousel'}
            ref={this.carousel}
            animatedScrollOffset={this.animatedScrollOffset}
            scrollEventThrottle={16}
            autoplay={autoplay}
            pageWidth={Constants.windowWidth}
            pageHeight={pageHeight}
            initialPage={0}
            containerStyle={{height: pageHeight}}
            allowAccessibleLayout
            horizontal={false}
          >
            {_.map([...Array(numberOfPagesShown)], (_, index) => (
              <Page style={{backgroundColor: BACKGROUND_COLORS[index]}} key={index}>
                <Text style={styles.pageText}>{index}</Text>
              </Page>
            ))}
          </Carousel>
          {this.renderAnimatedCounter()}
        </View>

        <View centerH flex marginT-s3>
          <Text h3 marginB-s2>
            iOS Widgets Carousel
          </Text>
          <Carousel horizontal={false} containerStyle={styles.widgetsCarousel}>
            <View flex bg-blue30/>
            <View flex bg-orange30/>
            <View flex bg-green30/>
          </Carousel>
        </View>
      </View>
    );
  }
}

// @ts-ignore
const Page = ({children, style, ...others}) => {
  return (
    <View center {...others} style={[styles.page, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  page: {
    flex: 1,
    height: pageHeight,
    width: Constants.windowWidth
  },
  pageText: {
    fontSize: 40,
    color: 'white'
  },
  animatedPageCounter: {
    position: 'absolute',
    top: 20,
    left: 20
  },
  widgetsCarousel: {
    height: 150,
    width: 300,
    backgroundColor: Colors.grey60,
    borderRadius: 24,
    overflow: 'hidden'
  }
});

export default CarouselVerticalScreen;
