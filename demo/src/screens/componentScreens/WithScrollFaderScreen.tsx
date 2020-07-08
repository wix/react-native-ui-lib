import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {
  Colors,
  Text,
  View,
  withScrollFader,
  // eslint-disable-next-line no-unused-vars
  WithScrollFaderProps
} from 'react-native-ui-lib';
// @ts-ignore
import {renderHeader} from '../ExampleScreenPresenter';

const numberOfItems = 3;
const horizontal = false;
const setToStart = false;
const itemWidth = 100;
const itemHeight = 100;

class WithScrollReachedScreen extends Component<WithScrollFaderProps> {
  renderItem = (index: number) => {
    return (
      <View key={index} style={styles.item}>
        <Text>{index + 1}</Text>
      </View>
    );
  };

  render() {
    return (
      <View margin-10 center>
        {renderHeader('withScrollFader', {'marginB-10': true})}
        <View style={styles.container}>
          <ScrollView
            horizontal={horizontal}
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={this.props.scrollFaderProps.onScroll}
          >
            {_.times(numberOfItems, this.renderItem)}
          </ScrollView>
          {this.props.scrollFaderProps.renderFader()}
        </View>
      </View>
    );
  }
}

export default withScrollFader(WithScrollReachedScreen, {
  horizontal,
  setToStart
});

const styles = StyleSheet.create({
  container: {
    width: horizontal ? undefined : itemWidth,
    height: horizontal ? itemHeight : undefined
  },
  scrollView: {
    width: horizontal ? 240 : undefined,
    height: horizontal ? undefined : 240
  },
  item: {
    height: itemHeight,
    width: itemWidth,
    backgroundColor: Colors.grey60,
    borderColor: Colors.grey40,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
