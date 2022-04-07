import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Constants, Spacings, View, Text, Carousel, Image, Colors} from 'react-native-ui-lib';
import {renderBooleanOption, renderSliderOption} from '../ExampleScreenPresenter';

const INITIAL_PAGE = 2;
const IMAGES = [
  'https://images.pexels.com/photos/2529159/pexels-photo-2529159.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2529158/pexels-photo-2529158.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
];
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

interface Props {}

interface State {
  orientation: typeof Constants.orientation;
  width: number;
  limitShownPages: boolean;
  numberOfPagesShown: number;
  currentPage: number;
  autoplay: boolean;
}

class CarouselScreen extends Component<Props, State> {
  carousel = React.createRef<typeof Carousel>();
  private dimensionsChangeListener: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      orientation: Constants.orientation,
      width: this.getWidth(),
      limitShownPages: false,
      numberOfPagesShown: 7,
      currentPage: INITIAL_PAGE,
      autoplay: true
    };
  }

  componentDidMount() {
    this.dimensionsChangeListener = Constants.addDimensionsEventListener(this.onOrientationChange);
  }

  componentWillUnmount() {
    Constants.removeDimensionsEventListener(this.dimensionsChangeListener || this.onOrientationChange);
  }

  onOrientationChange = () => {
    if (this.state.orientation !== Constants.orientation) {
      this.setState({
        orientation: Constants.orientation,
        width: this.getWidth()
      });
    }
  };

  getWidth = () => {
    return Constants.windowWidth - Spacings.s5 * 2;
  };

  onChangePage = (currentPage: number, _: any) => {
    this.setState({currentPage});
  };

  onPagePress = (index: number) => {
    if (this.carousel && this.carousel.current) {
      this.carousel.current.goToPage(index, true);
    }
  };

  render() {
    const {limitShownPages, numberOfPagesShown, autoplay, width} = this.state;

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text h1 margin-20 $textDefault>
          Carousel
        </Text>

        <View marginH-20 marginB-20>
          {renderBooleanOption.call(this, 'Limit number of pages shown in page control', 'limitShownPages')}
          {renderBooleanOption.call(this, 'autoplay', 'autoplay')}
          {renderSliderOption.call(this, 'Number of pages shown', 'numberOfPagesShown', {
            min: 5,
            max: 10,
            step: 1,
            initial: 7
          })}
        </View>

        <Carousel
          key={numberOfPagesShown}
          ref={this.carousel}
          //loop
          autoplay={autoplay}
          onChangePage={this.onChangePage}
          pageWidth={width}
          itemSpacings={Spacings.s3}
          containerMarginHorizontal={Spacings.s2}
          initialPage={INITIAL_PAGE}
          containerStyle={{height: 160}}
          pageControlPosition={Carousel.pageControlPositions.UNDER}
          pageControlProps={{onPagePress: this.onPagePress, limitShownPages}}
          allowAccessibleLayout
        >
          {_.map([...Array(numberOfPagesShown)], (item, index) => (
            <Page style={{backgroundColor: BACKGROUND_COLORS[index]}} key={index}>
              <Text margin-15>CARD {index}</Text>
            </Page>
          ))}
        </Carousel>

        <View marginB-30 center pointerEvents="none">
          <Text text10>{this.state.currentPage}</Text>
        </View>

        <View paddingH-page>
          <Text h3 marginB-s4>
            Looping Carousel
          </Text>
          <Carousel
            containerStyle={{
              height: 200
            }}
            loop
            pageControlProps={{
              size: 10,
              containerStyle: styles.loopCarousel
            }}
            pageControlPosition={Carousel.pageControlPositions.OVER}
            showCounter
          >
            {IMAGES.map((image, i) => {
              return (
                <View flex centerV key={i}>
                  <Image
                    overlayType={Image.overlayTypes.BOTTOM}
                    style={{flex: 1}}
                    source={{
                      uri: image
                    }}
                  />
                </View>
              );
            })}
          </Carousel>
        </View>
      </ScrollView>
    );
  }
}

// @ts-ignore
const Page = ({children, style, ...others}) => {
  return (
    <View {...others} style={[styles.page, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    marginHorizontal: 20
  },
  page: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8
  },
  loopCarousel: {
    position: 'absolute',
    bottom: 15,
    left: 10
  }
});

export default CarouselScreen;
