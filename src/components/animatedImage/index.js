// TODO: consider unify this component functionality with our Image component
import PropTypes from 'prop-types';
import React from 'react';
import {Animated, View, StyleSheet} from 'react-native';
import Image from '../../components/image';
import {BaseComponent} from '../../commons';

const UIAnimatedImage = Animated.createAnimatedComponent(Image);

/**
 * @description: Image component that fades-in the image with animation once it's loaded
 * @extends: Animated.Image
 * @gif: https://media.giphy.com/media/l0HU7jj0ivEFyZIA0/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/AnimatedImageScreen.js
 */
class AnimatedImage extends BaseComponent {
  static displayName = 'AnimatedImage';
  static propTypes = {
    /**
     * Image prop Types
     */
    ...Image.propTypes,
    /**
     * Additional spacing styles for the container
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * Duration for the fade animation when the image is loaded
     */
    animationDuration: PropTypes.number,
    /**
     * A component to render while the image is loading
     */
    loader: PropTypes.element
  };

  static defaultProps = {
    animationDuration: 300
  };

  constructor(props) {
    super(props);
    this.state = {opacity: new Animated.Value(0), isLoading: true};
  }

  onLoad = () => {
    this.setState({isLoading: false}, () => {
      const animationParams = {toValue: 1, duration: this.props.animationDuration, useNativeDriver: true};
      Animated.timing(this.state.opacity, animationParams).start();
    });
  };

  render() {
    const {containerStyle, source, loader, style, testID, ...others} = this.props;
    return (
      <View style={containerStyle}>
        <UIAnimatedImage
          {...others}
          style={[{opacity: this.state.opacity}, style]}
          source={source}
          onLoad={() => this.onLoad()}
          testID={testID}
        />
        {this.state.isLoading && loader && (
          <View style={{...StyleSheet.absoluteFillObject, justifyContent: 'center'}}>{loader}</View>
        )}
      </View>
    );
  }
}

export default AnimatedImage;
