import React, {Component} from 'react';
// import {StyleSheet} from 'react-native';
import {StateScreen} from 'react-native-ui-lib';//eslint-disable-line
const imageSource = require('../../assets/images/empty-state.jpg'); // eslint-disable-line
// const imageSource = {uri: 'https://static.pexels.com/photos/169651/pexels-photo-169651.jpeg'};

export default class EmptyStateScreen extends Component {

  render() {
    return (
      <StateScreen
        title="Oppsie"
        subtitle="Nothing to see here.."
        ctaLabel="OK"
        imageSource={imageSource}
      />
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 25,
//   },
// });
