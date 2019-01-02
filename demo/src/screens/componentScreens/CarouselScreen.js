import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Constants, View, Text, Carousel} from 'react-native-ui-lib'; // eslint-disable-line

class CarouselScreen extends Component {
  state = {
    currentPage: 1,
  };

  onChangePage(index) {
    this.setState({currentPage: index + 1});
  }

  render() {
    return (
      <View flex>
        <Carousel loop onChangePage={(index => this.onChangePage(index))}>
          <Page bg-red50>
            <Text>PAGE 1</Text>
          </Page>
          <Page bg-purple50>
            <Text>PAGE 2</Text>
          </Page>
          <Page bg-green50>
            <Text>PAGE 3</Text>
          </Page>
          <Page bg-yellow20>
            <Text>PAGE 4</Text>
          </Page>
          <Page bg-purple20>
            <Text>PAGE 5</Text>
          </Page>
          <Page bg-blue10>
            <Text>PAGE 6</Text>
          </Page>
        </Carousel>
        <View center style={{...StyleSheet.absoluteFillObject}} pointerEvents='none'>
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
    width: Constants.screenWidth,
  },
});

export default CarouselScreen;
