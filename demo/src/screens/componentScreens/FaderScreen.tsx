import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {
  Colors,
  Text,
  View,
  Fader,
  withScrollReached,
  WithScrollReachedProps
} from 'react-native-ui-lib';
import {renderHeader} from '../ExampleScreenPresenter';

const numberOfItems = 3;
const faderLocation = Fader.location.BOTTOM;
const itemWidth = 100;
const itemHeight = 100;
const tintColor = undefined;

const horizontal =
  faderLocation === Fader.location.LEFT ||
  faderLocation === Fader.location.RIGHT;
// const setToStart = faderLocation === Fader.location.LEFT || Fader.location.TOP;

class FaderScreen extends Component<WithScrollReachedProps> {
  renderItem = (index: number) => {
    return (
      <View key={index} style={styles.item}>
        <Text>{index + 1}</Text>
      </View>
    );
  };

  render() {
    const {scrollReachedProps} = this.props;
    const visible =
      faderLocation === Fader.location.BOTTOM ||
      faderLocation === Fader.location.RIGHT
        ? !scrollReachedProps.isScrollAtEnd
        : !scrollReachedProps.isScrollAtStart;

    return (
      <View margin-10>
        {renderHeader('Fader', {'marginB-10': true})}
        <View center>
          <View style={styles.container}>
            <ScrollView
              horizontal={horizontal}
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={scrollReachedProps.onScroll}
            >
              {_.times(numberOfItems, this.renderItem)}
            </ScrollView>
            <Fader
              visible={visible}
              location={faderLocation}
              tintColor={tintColor}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default withScrollReached(FaderScreen, {
  horizontal
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
