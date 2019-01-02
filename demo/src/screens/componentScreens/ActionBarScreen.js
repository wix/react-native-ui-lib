import _ from 'lodash';
import React, {Component} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Constants, Colors, Typography, View, ActionBar, PageControl, Carousel} from 'react-native-ui-lib'; //eslint-disable-line
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

  render() {
    return (
      <View flex bg-dark80>
        <PageControl
          containerStyle={[styles.pageControl, styles.absoluteContainer]}
          numOfPages={6}
          currentPage={this.state.currentPage}
          color={Colors.dark10}
          size={15}
        />
        <Carousel
          onChangePage={currentPage => this.setState({currentPage})}
          initialPage={this.state.currentPage}
        >
          <View style={styles.page}>
            <ActionBar
              actions={[
                {label: 'Delete', onPress: () => Alert.alert('delete'), red30: true},
                {label: 'Replace Photo', onPress: () => Alert.alert('replace photo')},
                {label: 'Edit', onPress: () => Alert.alert('edit')},
              ]}
            />
          </View>

          <View style={styles.page}>
            <ActionBar
              backgroundColor={Colors.blue30}
              actions={[
                {label: 'Hide', onPress: () => Alert.alert('hide'), white: true},
                {label: 'Add Discount', onPress: () => Alert.alert('add discount'), white: true},
                {label: 'Duplicate', onPress: () => Alert.alert('duplicate'), white: true},
              ]}
            />
          </View>

          <View style={styles.page}>
            <ActionBar
              actions={[{label: 'Delete', red30: true}, {label: 'Edit'}]}
            />
          </View>

          <View style={styles.page}>
            <ActionBar
              centered
              actions={[{label: 'Send as Contact'}, {label: 'Archive Chat'}]}
            />
          </View>

          <View style={styles.page}>
            <ActionBar
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
              centered
              actions={_.map([cameraSelected, video, tags, collections, richText],
                iconSource => ({iconSource, iconStyle: {width: 25}}))}
            />
          </View>
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    width: Constants.screenWidth,
    flex: 1,
  },
  pageControl: {
    zIndex: 1,
    width: Constants.screenWidth,
  },
  absoluteContainer: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
  },
});
