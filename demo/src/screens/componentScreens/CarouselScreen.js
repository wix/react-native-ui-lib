import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Constants, View, Text, Carousel, Card} from 'react-native-ui-lib'; // eslint-disable-line
import _ from 'lodash';

const INITIAL_PAGE = 0;
const WIDTH = Constants.screenWidth - 120;

class CarouselScreen extends Component {
  state = {
    currentPage: INITIAL_PAGE
  };

  onChangePage(index) {
    this.setState({currentPage: index});
  }

  onPagePress = (index) => {
    this.carousel.goToPage(index, true);
  }

  render() {
    return (
      <View flex>
        <Text text30 margin-20>Carousel</Text>
        <Carousel 
          migrate 
          ref={r => this.carousel = r}
          // loop 
          onChangePage={(index => this.onChangePage(index))} 
          pageWidth={WIDTH}
          // itemSpacings={20}
          // initialPage={INITIAL_PAGE}
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
          <Carousel test migrate containerStyle={{height: 160}}>
            {_.times(5, index => {
              return (
                <View key={index} flex padding-20>
                  <Card flex padding-20>
                    <Text text40>Card {index}</Text>
                  </Card>
                </View>
              );
            })}
          </Carousel>
        </View>
      </View>
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
    borderRadius: 4
  }
});

export default CarouselScreen;
