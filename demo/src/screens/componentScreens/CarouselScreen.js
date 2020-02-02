import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Constants, Spacings, View, Text, Carousel, Image, Switch, Picker, Colors} from 'react-native-ui-lib';

const TOP_BAR_PROPS = {title: 'Number of pages shown'};
const INITIAL_PAGE = 2;
const WIDTH = Constants.screenWidth - Spacings.s5 * 2;
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
  state = {
    limitShownPages: true, // TODO:
    numberOfPagesShown: 7,
    currentPage: INITIAL_PAGE
  };

  onChangePage = currentPage => {
    this.setState({currentPage});
  };

  onPagePress = index => {
    this.carousel.goToPage(index, true);
  };

  toggleLimitShownPages = limitShownPages => {
    this.setState({limitShownPages});
  };

  setNumberOfPagesShown = ({value: numberOfPagesShown}) => {
    this.setState({numberOfPagesShown});
  };

  render() {
    const {limitShownPages, numberOfPagesShown} = this.state;

    return (
      <ScrollView>
        <Text text30 margin-20>
          Carousel
        </Text>
        <View row marginH-20 centerV>
          <Text>Limit number of pages shown in page control:</Text>
          <Switch value={limitShownPages} onValueChange={this.toggleLimitShownPages} marginL-10/>
        </View>
        <Picker
          containerStyle={styles.picker}
          placeholder={TOP_BAR_PROPS.title}
          floatingPlaceholder
          value={numberOfPagesShown}
          onChange={this.setNumberOfPagesShown}
          topBarProps={TOP_BAR_PROPS}
        >
          {_.map([...Array(11).keys()].splice(5), item => (
            <Picker.Item key={item} value={item} label={`${item}`}/>
          ))}
        </Picker>

        <Carousel
          migrate
          ref={r => (this.carousel = r)}
          // loop
          onChangePage={this.onChangePage}
          pageWidth={WIDTH}
          // itemSpacings={Spacings.s3}
          initialPage={INITIAL_PAGE}
          containerStyle={{height: 160}}
          pageControlPosition={'under'}
          pageControlProps={{onPagePress: this.onPagePress, limitShownPages}}
          // showCounter
        >
          {_.map([...Array(numberOfPagesShown)], (item, index) => (
            <Page style={{backgroundColor: BACKGROUND_COLORS[index]}} key={index}>
              <Text margin-15>PAGE {index}</Text>
            </Page>
          ))}
        </Carousel>

        <View margin-20 center /*style={{...StyleSheet.absoluteFillObject}} */ pointerEvents="none">
          <Text text10>{this.state.currentPage}</Text>
        </View>

        <View padding-20>
          <Carousel containerStyle={{height: 160}} initialPage={INITIAL_PAGE} loop>
            {_.map(IMAGES, (image, index) => {
              return (
                <View key={index} flex padding-10 bottom>
                  <Image
                    style={StyleSheet.absoluteFillObject}
                    source={{
                      uri: image
                    }}
                  />
                  <Text white text50>
                    Image {index}
                  </Text>
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
