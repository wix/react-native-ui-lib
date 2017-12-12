import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Constants, View, Text, Carousel} from 'react-native-ui-lib'; // eslint-disable-line

class CarouselScreen extends Component {
  state = {};

  onChangePage(index) {
    console.log('page index changed', index);
  }

  render() {
    return (
      <View flex>
        <Carousel loop onChangePage={this.onChangePage}>
          <Page bg-red50>
            <Text>PAGE 1</Text>
          </Page>
          <Page bg-purple50>
            <Text>PAGE 2</Text>
          </Page>
          <Page bg-green50>
            <Text>PAGE 3</Text>
          </Page>
        </Carousel>
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
