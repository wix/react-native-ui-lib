import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Colors, Text, View, Fader, withScrollReached, WithScrollReachedProps} from 'react-native-ui-lib';
// @ts-ignore
import {renderHeader} from '../ExampleScreenPresenter';

const numberOfItems = 3;
const faderPosition = Fader.position.BOTTOM;
const itemWidth = 100;
const itemHeight = 100;
const tintColor = undefined;

// @ts-ignore
const horizontal = faderPosition === Fader.position.START || faderPosition === Fader.position.END;

class FaderScreen extends Component<WithScrollReachedProps> {
  renderItem = (index: number) => {
    return (
      <View key={index} style={styles.item}>
        <Text $textDefault>{index + 1}</Text>
      </View>
    );
  };

  render() {
    const {scrollReachedProps} = this.props;
    const visible =
      faderPosition === Fader.position.BOTTOM || faderPosition === Fader.position.END
        ? !scrollReachedProps.isScrollAtEnd
        : !scrollReachedProps.isScrollAtStart;

    return (
      <View padding-10>
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
            <Fader visible={visible} position={faderPosition} tintColor={tintColor}/>
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
    backgroundColor: Colors.$backgroundDefault,
    borderColor: Colors.$outlineDisabled,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
