import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
// @ts-ignore
import {renderHeader, renderBooleanOption} from '../../ExampleScreenPresenter';
import FadedScrollView from './FadedScrollView';
import FadedFlatList from './FadedFlatList';

class WithScrollReachedScreen extends Component {
  state = {
    isListView: false,
    isHorizontal: false,
    contentOffsetX: undefined,
    contentOffsetY: undefined
  };

  onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {
      nativeEvent: {
        contentOffset: {x, y}
      }
    } = event;

    const {contentOffsetX, contentOffsetY} = this.state;
    if (contentOffsetX !== x || contentOffsetY !== y) {
      this.setState({contentOffsetX: x, contentOffsetY: y});
    }
  };

  renderList = () => {
    const {isListView} = this.state;
    const Container = isListView ? FadedScrollView : FadedFlatList;

    return <Container onScroll={this.onScroll} />;
  };

  renderData = () => {
    const {contentOffsetX, contentOffsetY} = this.state;
    const contentText = `Content {x, y}: ${contentOffsetX}, ${contentOffsetY}`;
    return <Text text70>{contentText}</Text>;
  };

  renderOptions = () => {
    const {isListView} = this.state;
    const listTypeText = isListView ? 'ListView' : 'FlatList';
    return (
      <>
        <View row>
          <View flex>
            {renderBooleanOption.call(this, listTypeText, 'isListView')}
          </View>
        </View>
      </>
    );
  };

  render() {
    return (
      <View margin-10>
        {renderHeader('withScrollReached', {'marginB-10': true})}
        {this.renderOptions()}
        {this.renderData()}
        {this.renderList()}
      </View>
    );
  }
}

export default WithScrollReachedScreen;
