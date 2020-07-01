import React, {Component} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {
  renderHeader,
  renderBooleanOption,
  renderSliderOption
} from '../../ExampleScreenPresenter';
import AutoLockScrollView from './AutoLockScrollView';
import AutoLockFlatList from './AutoLockFlatList';

class WithScrollEnablerScreen extends Component {
  state = {
    isListView: false,
    isHorizontal: false,
    numberOfItems: 3,
    contentWidth: undefined,
    contentHeight: undefined,
    layoutWidth: undefined,
    layoutHeight: undefined
  };

  onContentSizeChange = (contentWidth: number, contentHeight: number) => {
    const {
      contentWidth: currentContentWidth,
      contentHeight: currentContentHeight
    } = this.state;
    if (
      currentContentWidth !== contentWidth ||
      currentContentHeight !== contentHeight
    ) {
      this.setState({contentWidth, contentHeight});
    }
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

  renderList = () => {
    const {isListView, isHorizontal, numberOfItems} = this.state;
    const Container = isListView ? AutoLockScrollView : AutoLockFlatList;

    return (
      // @ts-ignore
      <Container
        key={`${isHorizontal}`}
        horizontal={isHorizontal}
        numberOfItems={numberOfItems}
        onContentSizeChange={this.onContentSizeChange}
        onLayout={this.onLayout}
      />
    );
  };

  renderData = () => {
    const {contentWidth, contentHeight, layoutWidth, layoutHeight} = this.state;
    const contentText = `Content {width, height}: ${contentWidth}, ${contentHeight}`;
    const layoutText = `Layout {width, height}: ${layoutWidth}, ${layoutHeight}`;
    return (
      <>
        <Text text70>{contentText}</Text>
        <Text text70>{layoutText}</Text>
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
        {renderSliderOption.call(
          this,
          'Number of items shown',
          'numberOfItems',
          {
            min: 1,
            max: 5,
            step: 1,
            initial: 3
          }
        )}
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
