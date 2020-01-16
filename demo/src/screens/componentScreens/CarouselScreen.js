import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Constants, Spacings, View, Text, Carousel, Image} from 'react-native-ui-lib'; // eslint-disable-line


const INITIAL_PAGE = 2;
const WIDTH = Constants.screenWidth - (Spacings.s5 * 2);
const IMAGES = [
  'https://images.pexels.com/photos/1212487/pexels-photo-1212487.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1477459/pexels-photo-1477459.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
];

class CarouselScreen extends Component {
  state = {
    currentPage: INITIAL_PAGE
  };

  onChangePage(index) {
    this.setState({currentPage: index});
  }

  onPagePress = index => {
    this.carousel.goToPage(index, true);
  };

  render() {
    return (
      <ScrollView>
        <Text text30 margin-20>Carousel</Text>

        <Carousel
          migrate
          ref={r => (this.carousel = r)}
          // loop
          onChangePage={index => this.onChangePage(index)}
          pageWidth={WIDTH}
          // itemSpacings={Spacings.s3}
          initialPage={INITIAL_PAGE}
          containerStyle={{height: 160/* , flex: 1 */}}
          pageControlPosition={'under'}
          pageControlProps={{onPagePress: this.onPagePress}}
          // showCounter
        >
          <Page bg-red50>
            <Text margin-15>PAGE 0</Text>
          </Page>
          <Page bg-yellow20>
            <Text margin-15>PAGE 1</Text>
          </Page>
          <Page bg-purple50>
            <Text margin-15>PAGE 2</Text>
          </Page>
          <Page bg-green50>
            <Text margin-15>PAGE 3</Text>
          </Page>
          <Page bg-cyan50>
            <Text margin-15>PAGE 4</Text>
          </Page>
          <Page bg-purple20>
            <Text margin-15>PAGE 5</Text>
          </Page>
          <Page bg-blue60>
            <Text margin-15>PAGE 6</Text>
          </Page>
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

const Page = ({children, ...others}) => {
  return (
    <View {...others} style={styles.page}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8
  }
});

export default CarouselScreen;
