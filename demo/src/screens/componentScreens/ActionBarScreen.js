import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import _ from 'lodash';
import {View, ActionBar, Constants, Colors, Typography, PageControl} from 'react-native-ui-lib';//eslint-disable-line

import cameraSelected from '../../assets/icons/cameraSelected.png';
import video from '../../assets/icons/video.png';
import tags from '../../assets/icons/tags.png';
import collections from '../../assets/icons/collections.png';
import richText from '../../assets/icons/richText.png';

export default class ActionBarScreen extends Component {

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
      <View flex bg-dark80>
        <PageControl
          containerStyle={styles.pageControl}
          numOfPages={6}
          currentPage={this.state.currentPage}
          color={Colors.dark10}
          size={15}
        />

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            this.setCurrentPage(event.nativeEvent.contentOffset.x);
          }}
          style={{flex: 1}}
        >

          <View style={styles.page}>
            <ActionBar
              actions={[
                {label: 'Delete', onPress: () => alert('delete'), red30: true},
                {label: 'Replace Photo', onPress: () => alert('replace photo')},
                {label: 'Edit', onPress: () => alert('edit')},
              ]}
            />
          </View>

          <View style={styles.page}>
            <ActionBar
              marginB-10
              style={{backgroundColor: Colors.blue30}}
              actions={[
                {label: 'Hide', onPress: () => alert('delete'), white: true},
                {label: 'Add Discount', onPress: () => alert('replace photo'), white: true},
                {label: 'Duplicate', onPress: () => alert('edit'), white: true},
              ]}
            />
          </View>

          <View style={styles.page}>
            <ActionBar
              marginB-10
              actions={[{label: 'Delete', red30: true}, {label: 'Edit'}]}
            />

          </View>

          <View style={styles.page}>
            <ActionBar
              marginB-10
              centered
              actions={[{label: 'Send as Contact'}, {label: 'Archive Chat'}]}
            />
          </View>

          <View style={styles.page}>
            <ActionBar
              marginB-10
              centered
              actions={[
                {label: 'Bold', labelStyle: {color: Colors.dark10, ...Typography.text60, fontWeight: '400'}},
                {label: 'Italic', text60: true, labelStyle: {fontStyle: 'italic', color: Colors.dark10}},
                {label: 'Link', text60: true, labelStyle: {textDecorationLine: 'underline', color: Colors.dark10}},
              ]}
            />
          </View>

          <View style={styles.page}>
            <ActionBar
              marginB-10
              centered
              actions={_.map([cameraSelected, video, tags, collections, richText],
                iconSource => ({iconSource, iconStyle: {width: 25}}))}
            />
          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  page: {
    width: Constants.screenWidth,
    flex: 1,
  },
  pageControl: {
    position: 'absolute',
    bottom: 70,
    width: Constants.screenWidth,
  },
});
