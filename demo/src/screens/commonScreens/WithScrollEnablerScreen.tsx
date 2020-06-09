import _ from 'lodash';
import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {FlatList, ScrollView, StyleSheet, LayoutChangeEvent} from 'react-native';
import memoize from 'memoize-one';
import {withScrollEnabler, Colors, Text, View} from 'react-native-ui-lib'; //eslint-disable-line
// @ts-ignore
import {renderHeader, renderBooleanOption, renderSliderOption} from '../ExampleScreenPresenter';

const LockedFlatList = withScrollEnabler(FlatList);
const LockedScrollView = withScrollEnabler(ScrollView);

class WithScrollEnablerScreen extends Component {
  state = {
    isListView: false,
    isHorizontal: false,
    numberOfItems: 3,
    contentWidth: undefined,
    contentHeight: undefined,
    layoutWidth: undefined,
    layoutHeight: undefined,
    haveRef: false
  };

  onContentSizeChange = (contentWidth: number, contentHeight: number) => {
    this.setState({contentWidth, contentHeight});
  };

  onLayout = ({
    nativeEvent: {
      layout: {width, height}
    }
  }: LayoutChangeEvent) => {
    const {layoutWidth, layoutHeight} = this.state;
    if (width !== layoutWidth || height !== layoutHeight) {
      this.setState({layoutWidth: width, layoutHeight: height});
    }
  };

  setRef = (r) => {
    if (r?.current) {
      this.setState({haveRef: true});
    }
  };

  keyExtractor = (item: number) => {
    return item.toString();
  };

  renderItem = (data: any) => {
    const {isListView} = this.state;
    const index = isListView ? data : data.index;

    return (
      <View key={index} style={styles.item}>
        <Text>{index + 1}</Text>
      </View>
    );
  };

  getData = memoize((numberOfItems: number) => {
    return [...Array(numberOfItems).keys()];
  });

  renderList = () => {
    const {isListView, isHorizontal, numberOfItems} = this.state;
    const Container = isListView ? LockedScrollView : LockedFlatList;
    const flatListData = isListView ? undefined : this.getData(numberOfItems);
    const renderItem = isListView ? undefined : this.renderItem;
    const keyExtractor = this.keyExtractor;

    return (
      <Container
        key={isHorizontal}
        ref={this.setRef}
        horizontal={isHorizontal}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={this.onContentSizeChange}
        onLayout={this.onLayout}
        data={flatListData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      >
        {isListView && _.times(numberOfItems, this.renderItem)}
      </Container>
    );
  };

  renderData = () => {
    const {contentWidth, contentHeight, layoutWidth, layoutHeight, haveRef} = this.state;
    const contentText = `Content {width, height}: ${contentWidth}, ${contentHeight}`;
    const layoutText = `Layout {width, height}: ${layoutWidth}, ${layoutHeight}`;
    const haveRefText = `Ref exists: ${haveRef}`;
    return (
      <>
        <Text text70>{contentText}</Text>
        <Text text70>{layoutText}</Text>
        <Text text70>{haveRefText}</Text>
      </>
    );
  };

  renderOptions = () => {
    const {isListView, isHorizontal} = this.state;
    const orientationText = isHorizontal ? 'Horizontal' : 'Vertical';
    const listTypeText = isListView ? 'ListView' : 'FlatList';
    return (
      <>
        <View row>
          <View flex marginR-10>
            {renderBooleanOption.call(this, orientationText, 'isHorizontal')}
          </View>
          <View flex marginL-10>
            {renderBooleanOption.call(this, listTypeText, 'isListView')}
          </View>
        </View>
        {renderSliderOption.call(this, 'Number of items shown', 'numberOfItems', {
          min: 1,
          max: 5,
          step: 1,
          initial: 3
        })}
      </>
    );
  };

  render() {
    return (
      <View margin-10>
        {renderHeader('withScrollEnabler', {'marginB-10': true})}
        {this.renderOptions()}
        {this.renderData()}
        {this.renderList()}
      </View>
    );
  }
}

export default WithScrollEnablerScreen;

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
  }
});
