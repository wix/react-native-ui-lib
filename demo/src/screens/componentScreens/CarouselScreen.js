import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Constants, Spacings, View, Text, Carousel, Image, Colors} from 'react-native-ui-lib';
import {renderBooleanOption, renderSliderOption} from '../ExampleScreenPresenter';


const INITIAL_PAGE = 2;
const IMAGES = [
  'https://images.pexels.com/photos/1212487/pexels-photo-1212487.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1477459/pexels-photo-1477459.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
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

class CarouselScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orientation: Constants.orientation,
      width: this.getWidth(),
      limitShownPages: false,
      numberOfPagesShown: 7,
      currentPage: INITIAL_PAGE,
      autoplay: false
    };
  }

  componentDidMount() {
    Constants.addDimensionsEventListener(this.onOrientationChange);
  }

  componentWillUnmount() {
    Constants.removeDimensionsEventListener(this.onOrientationChange);
  }

  onOrientationChange = () => {
    if (this.state.orientation !== Constants.orientation) {
      this.setState({orientation: Constants.orientation, width: this.getWidth()});
    }
  };

  getWidth = () => {
    return Constants.windowWidth - Spacings.s5 * 2;
  }

  onChangePage = currentPage => {
    this.setState({currentPage});
  };

  onPagePress = index => {
    this.carousel.goToPage(index, true);
  };

  render() {
    const {limitShownPages, numberOfPagesShown, autoplay, width} = this.state;

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text text30 margin-20>Carousel</Text>

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
          migrate
          ref={r => (this.carousel = r)}
          //loop
          autoplay={autoplay}          
          onChangePage={this.onChangePage}
          pageWidth={width}
          itemSpacings={Spacings.s3}
          containerMarginHorizontal={Spacings.s2}
          initialPage={INITIAL_PAGE}
          containerStyle={{height: 160}}
          pageControlPosition={'under'}
          pageControlProps={{onPagePress: this.onPagePress, limitShownPages}}
          // showCounter
          allowAccessibleLayout
        >
          {_.map([...Array(numberOfPagesShown)], (item, index) => (
            <Page style={{backgroundColor: BACKGROUND_COLORS[index]}} key={index}>
              <Text margin-15>CARD {index}</Text>
            </Page>
          ))}
        </Carousel>

        <View marginB-30 center /*style={{...StyleSheet.absoluteFillObject}} */ pointerEvents="none">
          <Text text10>{this.state.currentPage}</Text>
        </View>
        
        <View padding-20>
          <Carousel containerStyle={{height: 160}} initialPage={INITIAL_PAGE} loop allowAccessibleLayout autoplay={autoplay}>
            {_.map(IMAGES, (image, index) => {
              return (
                <View key={index} flex padding-10 bottom>
                  <Image
                    style={StyleSheet.absoluteFillObject}
                    source={{uri: image}}
                  />
                  <Text white text50>Image {index}</Text>
                </View>
              );
            })}
          </Carousel>
        </View>
      </ScrollView>
    );
  }
}

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
  }
});

export default CarouselScreen;
