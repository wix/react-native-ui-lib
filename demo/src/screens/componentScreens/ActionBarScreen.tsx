import _ from 'lodash';
import React, {Component} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Colors, Typography, View, ActionBar, PageControl, Carousel} from 'react-native-ui-lib'; //eslint-disable-line
import cameraSelected from '../../assets/icons/cameraSelected.png';
import video from '../../assets/icons/video.png';
import tags from '../../assets/icons/tags.png';
import collections from '../../assets/icons/collections.png';
import richText from '../../assets/icons/richText.png';

export default class ActionBarScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0
    };
  }

  render() {
    return (
      <View flex bg-$backgroundNeutralLight>
        <PageControl
          containerStyle={[styles.pageControl, styles.absoluteContainer]}
          numOfPages={6}
          currentPage={this.state.currentPage}
          color={Colors.$backgroundInverted}
          size={15}
        />
        <Carousel
          containerStyle={{flex: 1}}
          onChangePage={currentPage => this.setState({currentPage})}
          initialPage={this.state.currentPage}
        >
          <View style={styles.page}>
            <ActionBar
              actions={[
                {label: 'Delete', onPress: () => Alert.alert('delete'), $textDangerLight: true},
                {label: 'Replace Photo', onPress: () => Alert.alert('replace photo')},
                {label: 'Edit', onPress: () => Alert.alert('edit')}
              ]}
            />
          </View>

          <View style={styles.page}>
            <ActionBar
              backgroundColor={Colors.$backgroundPrimaryHeavy}
              actions={[
                {label: 'Hide', onPress: () => Alert.alert('hide'), $textDefaultLight: true},
                {label: 'Add Discount', onPress: () => Alert.alert('add discount'), $textDefaultLight: true},
                {label: 'Duplicate', onPress: () => Alert.alert('duplicate'), $textDefaultLight: true}
              ]}
            />
          </View>

          <View style={styles.page}>
            <ActionBar actions={[{label: 'Delete', $textDangerLight: true}, {label: 'Edit'}]}/>
          </View>

          <View style={styles.page}>
            <ActionBar centered actions={[{label: 'Send as Contact'}, {label: 'Archive Chat'}]}/>
          </View>

          <View style={styles.page}>
            <ActionBar
              centered
              actions={[
                {label: 'Bold', labelStyle: {color: Colors.$textDefault, ...Typography.text60, fontWeight: '400'}},
                {label: 'Italic', text60: true, labelStyle: {fontStyle: 'italic', color: Colors.$textDefault}},
                {label: 'Link', text60: true, labelStyle: {textDecorationLine: 'underline', color: Colors.$textDefault}}
              ]}
            />
          </View>

          <View style={styles.page}>
            <ActionBar
              centered
              actions={_.map([cameraSelected, video, tags, collections, richText], iconSource => ({
                iconSource,
                iconStyle: {width: 25}
              }))}
            />
          </View>
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1
  },
  pageControl: {
    zIndex: 1
  },
  absoluteContainer: {
    position: 'absolute',
    bottom: 150,
    left: 0,
    right: 0
  }
});
