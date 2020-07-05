import _ from 'lodash';
import React, {Component, useCallback, memo} from 'react';
import {
  StyleSheet,
  ScrollView,
  // eslint-disable-next-line no-unused-vars
  NativeSyntheticEvent,
  // eslint-disable-next-line no-unused-vars
  NativeScrollEvent
} from 'react-native';
import {
  Colors,
  Text,
  View,
  Image,
  // eslint-disable-next-line no-unused-vars
  withScrollReached,
  // eslint-disable-next-line no-unused-vars
  WithScrollReachedProps
} from 'react-native-ui-lib';
// @ts-ignore
import {renderHeader} from '../ExampleScreenPresenter';

type FadedScrollViewProps = WithScrollReachedProps & {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  scrollEnabled?: boolean;
};

const FADE_OUT_HEIGHT = 100;
const fadeImage = require('../../assets/images/FadeOut.png');
const WithScrollReached = (props: FadedScrollViewProps) => {
  const renderItem = useCallback((index: number) => {
    return (
      <View key={index} style={styles.item}>
        <Text>{index + 1}</Text>
      </View>
    );
  }, []);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      _.invoke(props, 'onScroll', event);
      _.invoke(props, 'scrollReachedProps.onScroll', event);
    },
    [props.onScroll, props.scrollReachedProps.onScroll]
  );

  const renderFade = useCallback(() => {
    if (!props.scrollReachedProps.isScrollAtEnd) {
      return <Image style={styles.fadeOutImage} source={fadeImage} />;
    }
  }, [props.scrollReachedProps.isScrollAtEnd]);

  return (
    <View>
      <ScrollView
        {...props}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {_.times(3, renderItem)}
      </ScrollView>
      {renderFade()}
    </View>
  );
};

const FadedScrollView = memo(withScrollReached(WithScrollReached));

class WithScrollReachedScreen extends Component {
  state = {
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

  renderData = () => {
    const {contentOffsetX, contentOffsetY} = this.state;
    const contentText = `Content {x, y}: ${contentOffsetX}, ${contentOffsetY}`;
    return <Text text70>{contentText}</Text>;
  };

  render() {
    return (
      <View margin-10>
        {renderHeader('withScrollReached', {'marginB-10': true})}
        {this.renderData()}
        <FadedScrollView onScroll={this.onScroll} />
      </View>
    );
  }
}

export default WithScrollReachedScreen;

const styles = StyleSheet.create({
  scrollView: {
    height: 240
  },
  scrollViewContainer: {
    alignItems: 'center'
  },
  item: {
    width: 100,
    height: 100,
    margin: 9,
    backgroundColor: Colors.grey40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fadeOutImage: {
    position: 'absolute',
    bottom: 0,
    height: FADE_OUT_HEIGHT,
    width: '100%'
  }
});
