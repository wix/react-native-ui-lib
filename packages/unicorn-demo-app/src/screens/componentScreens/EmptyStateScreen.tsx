import React, {Component} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {StateScreen, Constants, PageControl} from 'react-native-ui-lib';
const localImageSource = require('../../assets/images/empty-state.jpg');
const remoteImageSource = {uri: 'https://cdn.pixabay.com/photo/2017/04/19/20/10/morning-2243465_1280.jpg'};

type State = {
  currentPage: number;
};

export default class EmptyStateScreen extends Component<{}, State> {
  state = {currentPage: 0};

  setCurrentPage(offsetX: number) {
    if (offsetX >= 0) {
      this.setState({
        currentPage: Math.floor(offsetX / Constants.screenWidth)
      });
    }
  }

  render() {
    return (
      <View>
        <ScrollView
          style={styles.pageView}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={event => {
            this.setCurrentPage(event.nativeEvent.contentOffset.x);
          }}
          scrollEventThrottle={200}
        >
          <View style={styles.pageView}>
            <StateScreen
              title={'Oppsie (with local image)'}
              subtitle={'Nothing to see here..'}
              ctaLabel={'OK'}
              imageSource={localImageSource}
            />
          </View>
          <View style={styles.pageView}>
            <StateScreen
              title={'Oppsie (with remote image)'}
              subtitle={'Nothing to see here..'}
              ctaLabel={'OK'}
              imageSource={remoteImageSource}
            />
          </View>
        </ScrollView>
        <PageControl
          containerStyle={{
            position: 'absolute',
            bottom: 10,
            left: 0,
            width: Constants.screenWidth
          }}
          numOfPages={2}
          currentPage={this.state.currentPage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  pageView: {
    width: Constants.screenWidth,
    height: Constants.screenHeight
  }
});
