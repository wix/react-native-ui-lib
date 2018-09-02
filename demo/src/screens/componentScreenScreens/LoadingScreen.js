import React, {Component} from 'react';
import {View, Text, LoaderScreen, Colors} from 'react-native-ui-lib';//eslint-disable-line

export default class LoadingScreen extends Component {

  state = {
    loading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        animationConfig: {
          animation: 'fadeOut',
          onAnimationEnd: () => this.setState({loading: false}),
        },
      });
    }, 2500);
  }

  render() {
    const {loading, animationConfig} = this.state;
    return (
      <View flex bg-orange70 center>
        <Text text10>
          Content Content Content
        </Text>
        {loading &&
        <LoaderScreen
          color={Colors.blue60}
          message="Loading..."
          overlay
          // backgroundColor={Colors.rgba(Colors.dark80, 0.85)}
          {...animationConfig}
        />}
      </View>
    );
  }
}
