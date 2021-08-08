import React, {Component} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {StateScreen, Constants, PageControl} from 'react-native-ui-lib';//eslint-disable-line
const localImageSource = require('../../assets/images/empty-state.jpg'); // eslint-disable-line
const remoteImageSource = {uri: 'https://static.pexels.com/photos/169651/pexels-photo-169651.jpeg'};

export default class EmptyStateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {currentPage: 0};
  }

  setCurrentPage(offsetX) {
    if (offsetX >= 0) {
      this.setState({
        currentPage: Math.floor(offsetX / Constants.screenWidth),
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
          onScroll={(event) => {
            this.setCurrentPage(event.nativeEvent.contentOffset.x);
          }}
          scrollEventThrottle={200}
        >
          <View style={styles.pageView}>
            <StateScreen
              title='Oppsie (with local image)'
              subtitle='Nothing to see here..'
              ctaLabel='OK'
              imageSource={localImageSource}
            />
          </View>
          <View style={styles.pageView}>
            <StateScreen
              title='Oppsie (with remote image)'
              subtitle='Nothing to see here..'
              ctaLabel='OK'
              imageSource={remoteImageSource}
            />
          </View>
        </ScrollView>
        <PageControl
          containerStyle={{
            position: 'absolute',
            bottom: 10,
            left: 0,
            width: Constants.screenWidth,
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
    flexDirection: 'column',
  },
  pageView: {
    width: Constants.screenWidth,
    height: Constants.screenHeight,
  },
});
