// TODO: consider unify this component functionality with our Image component
import PropTypes from 'prop-types';
import React from 'react';
import {Animated, View, StyleSheet} from 'react-native';
import Image from '../../components/image';
import {BaseComponent} from '../../commons';

const UIAnimatedImage = Animated.createAnimatedComponent(Image);

const deprecatedProps = [
  {old: 'imageSource', new: 'source'},
  {old: 'imageStyle', new: 'style'},
  {old: 'testId', new: 'testID'}
];

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
     * A component to render while the image is loading
     */
    loader: PropTypes.element,
    /**
     * Use to identify the avatar in tests
     */
    testId: PropTypes.string
  };

  static defaultProps = {
    animationDuration: 300
  };

  constructor(props) {
    super(props);
    this.state = {opacity: new Animated.Value(0), isLoading: true};
    this.checkForDeprecatedProps(props);
  }

  checkForDeprecatedProps(props) {
    deprecatedProps.forEach(prop => {
      if (props[prop.old]) {
        console.warn(`'${prop.old}' property is deprecated, use '${prop.new}' instead`);
      }
    });
  }

  get source() {
    const {imageSource, source} = this.props;
    return source || imageSource;
  }

  get style() {
    const {imageStyle, style} = this.props;
    return style || imageStyle;
  }

  get testID() {
    // TODO: remove testId after deprecation
    const {testId, testID} = this.props;
    return testID || testId;
  }

  onLoad = () => {
    this.setState({isLoading: false}, () => {
      const animationParams = {toValue: 1, duration: this.props.animationDuration, useNativeDriver: true};
      Animated.timing(this.state.opacity, animationParams).start();
    });
  };

  render() {
    const {containerStyle, loader, ...others} = this.props;
    return (
      <View style={containerStyle}>
        <UIAnimatedImage
          {...others}
          style={[{opacity: this.state.opacity}, this.style]}
          source={this.source}
          onLoad={() => this.onLoad()}
          testID={this.testID}
        />
        {this.state.isLoading && loader && (
          <View style={{...StyleSheet.absoluteFillObject, justifyContent: 'center'}}>{loader}</View>
        )}
      </View>
    );
  }
}

export default AnimatedImage;
