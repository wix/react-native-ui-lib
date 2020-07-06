import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {
  Colors,
  Text,
  View,
  Image,
  withScrollReached,
  // eslint-disable-next-line no-unused-vars
  WithScrollReachedProps
} from 'react-native-ui-lib';
// @ts-ignore
import {renderHeader} from '../ExampleScreenPresenter';

const FADE_OUT_HEIGHT = 100;
const fadeImage = require('../../assets/images/FadeOut.png');
class WithScrollReachedScreen extends Component<WithScrollReachedProps> {
  renderItem = (index: number) => {
    return (
      <View key={index} style={styles.item}>
        <Text>{index + 1}</Text>
      </View>
    );
  };

  render() {
    return (
      <View margin-10>
        {renderHeader('withScrollReached', {'marginB-10': true})}
        <View>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContainer}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={this.props.scrollReachedProps.onScroll}
          >
            {_.times(3, this.renderItem)}
          </ScrollView>
          {!this.props.scrollReachedProps.isScrollAtEnd && (
            <Image style={styles.fadeOutImage} source={fadeImage} />
          )}
        </View>
      </View>
    );
  }
}

export default withScrollReached(WithScrollReachedScreen);

const styles = StyleSheet.create({
  scrollView: {
    height: 240
  },
  scrollViewContainer: {
    alignItems: 'center'
  },
  item: {
    width: 100,
    height: 100,
    margin: 9,
    backgroundColor: Colors.grey40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fadeOutImage: {
    position: 'absolute',
    bottom: 0,
    height: FADE_OUT_HEIGHT,
    width: '100%'
  }
});
