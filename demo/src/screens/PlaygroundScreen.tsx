import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Card, TextField, Carousel, Colors, Button} from 'react-native-ui-lib';

const BACKGROUND_COLORS = [...Array(5)].map(item => Colors[`grey${(item + 1) * 10}`]);

export default class PlaygroundScreen extends Component {
  render() {
    return (
      <View bg-grey80 flex padding-20>
        <Carousel
          initialPage={0}
          pageControlPosition={Carousel.pageControlPositions.UNDER}
          containerStyle={{height: 150}}
        >
          {_.map([...Array(5)], (_item, index) => (
            <Page style={{backgroundColor: BACKGROUND_COLORS[index]}} key={index}>
              <Text margin-15>CARD {index}</Text>
            </Page>
          ))}
        </Carousel>
      </View>
    );
  }
}
const Page = ({children, style, ...others}: any) => {
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
