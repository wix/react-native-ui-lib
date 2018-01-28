import React from 'react';
import PropTypes from 'prop-types';
import {Animated, View} from 'react-native';
import {BaseComponent} from '../../commons';

/**
 * @description: Image component that fades-in the image with animation once it's loaded
 * @extends: Animated.Image
 * @extendslink: https://github.com/oblador/react-native-animatable
 * @gif: https://media.giphy.com/media/l0HU7jj0ivEFyZIA0/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/AnimatedImageScreen.js
 */
export default class AnimatedImage extends BaseComponent {
  static displayName = 'AnimatedImage';
  static propTypes = {
    /**
     * Additional spacing styles for the container
     */
    containerStyle: PropTypes.object,
    /**
     * Style for the image component
     */
    imageStyle: PropTypes.object,
    /**
     * The image source (external or assets)
     */
    imageSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * Duration for the fade animation when the image is loaded
     */
    animationDuration: PropTypes.number,
    /**
     * Use to identify the avatar in tests
     */
    testId: PropTypes.string,
    /**
     * A component to render while the image is loading
     */
    loader: PropTypes.element,
  };

  static defaultProps = {
    animationDuration: 300,
  };

  constructor(props) {
    super(props);
    this.state = {opacity: new Animated.Value(0), isLoading: true};
  }

  onLoad() {
    this.setState({isLoading: false}, () => {
      const animationParams = {toValue: 1, duration: this.props.animationDuration, useNativeDriver: false};
      Animated.timing(this.state.opacity, animationParams).start();
    });
  }

  render() {
    const {testId, containerStyle, imageStyle, imageSource, loader} = this.props;
    return (
      <View testID={testId} style={containerStyle}>
        <Animated.Image
          style={[{opacity: this.state.opacity}, imageStyle]}
          source={imageSource}
          onLoad={() => this.onLoad()}
        />
        {
          (this.state.isLoading && loader) &&
            <View style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, alignItems: 'center'}}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                {loader}
              </View>
            </View>
        }
      </View>
    );
  }
}
