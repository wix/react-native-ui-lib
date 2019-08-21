import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Constants, View, Text, Carousel} from 'react-native-ui-lib'; // eslint-disable-line


const INITIAL_PAGE = 0;
const WIDTH = Constants.screenWidth - 120;

class CarouselScreen extends Component {
  state = {
    currentPage: INITIAL_PAGE
  };

  onChangePage(index) {
    this.setState({currentPage: index});
  }

  render() {
    return (
      <View flex>
        <Carousel 
          migrate 
          loop 
          onChangePage={(index => this.onChangePage(index))} 
          pageWidth={WIDTH}
          // itemSpacings={20}
          // initialPage={INITIAL_PAGE}
          containerStyle={{height: 200/* , flex: 1 */}}
          pageControlPosition={'over'}
          // showCounter
        >
          <Page bg-cyan50>
            <Text margin-15>PAGE 0</Text>
          </Page>
          <Page bg-red50>
            <Text margin-15>PAGE 1</Text>
          </Page>
          <Page bg-purple50>
            <Text margin-15>PAGE 2</Text>
          </Page>
          <Page bg-green50>
            <Text margin-15>PAGE 3</Text>
          </Page>
          <Page bg-yellow20>
            <Text margin-15>PAGE 4</Text>
          </Page>
          <Page bg-purple20>
            <Text margin-15>PAGE 5</Text>
          </Page>
          <Page bg-blue70>
            <Text margin-15>PAGE 6</Text>
          </Page>
        </Carousel>
        
        <View center style={{...StyleSheet.absoluteFillObject}} pointerEvents="none">
          <Text text10>{this.state.currentPage}</Text>
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
