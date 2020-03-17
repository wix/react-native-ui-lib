import React, {Component} from 'react';
import {View as AnimatableView} from 'react-native-animatable';
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
        <AnimatableView {...animationConfig}>
          <LoaderScreen
            color={Colors.blue30}
            message="Loading..."
            overlay
          />
        </AnimatableView>
        }
      </View>
    );
  }
}
