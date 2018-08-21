import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet} from 'react-native';
import {BlurView} from 'react-native-blur';
import {Constants} from '../../helpers';
import {Colors, BorderRadiuses} from '../../style';
import {BaseComponent} from '../../commons';
import View from '../view';
import TouchableOpacity from '../touchableOpacity';
import CardSection from './CardSection';
import CardItem from './CardItem';
import CardImage from './CardImage';


const DEFAULT_BORDER_RADIUS = BorderRadiuses.br40;

/**
 * @description: Card component
 * @extends: TouchableOpacity
 * @extendsnotes: (when passing onPress)
 * @extendslink: docs/TouchableOpacity
 * @modifiers: margin, padding
 * @gif: https://media.giphy.com/media/l0HU9SKWmv0VTOYMM/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.js
 */
class Card extends BaseComponent {
  static displayName = 'Card';

  static propTypes = {
    /**
     * card custom width
     */
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * card custom height
     */
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * should inner card flow direction be horizontal
     */
    row: PropTypes.bool,
    /**
     * card border radius (will be passed to inner Card.Image component)
     */
    borderRadius: PropTypes.number,
    /**
     * action for when pressing the card
     */
    onPress: PropTypes.func,
    /**
     * whether the card should have shadow or not
     */
    enableShadow: PropTypes.bool,
    /**
     * elevation value (Android only)
     */
    elevation: PropTypes.number,
    /**
     * enable blur effect (iOS only)
     */
    enableBlur: PropTypes.bool,
    /**
     * blur option for blur effect according to react-native-blur lib (make sure enableBlur is on)
     */
    blurOptions: PropTypes.object,
    /**
     * Additional styles for the top container
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * Use to identify the component in tests
     */
    testID: PropTypes.string,
  };

  static defaultProps = {
    enableShadow: true,
  };

  constructor(props) {
    super(props);

    if (props.containerStyle !== undefined) {
      console.warn('Card\'s "containerStyle" prop will be deprecated soon. Please use style prop instead');
    }
  }

  generateStyles() {
    this.styles = createStyles(this.getThemeProps());
  }

  getBlurOptions() {
    const {blurOptions} = this.getThemeProps();
    return {
      blurType: 'light',
      amount: 5,
      ...blurOptions,
    };
  }

  // todo: add unit test
  calcImagePosition(childIndex) {
    const {row, children} = this.props;
    const childrenCount = React.Children.count(children);
    const position = [];

    if (childIndex === 0) {
      position.push(row ? 'left' : 'top');
    }

    if (childIndex === childrenCount - 1) {
      position.push(row ? 'right' : 'bottom');
    }

    return position;
  }

  get elevationStyle() {
    const {elevation, enableShadow} = this.getThemeProps();
    if (enableShadow) {
      return {elevation: elevation || 2};
    }
  }

  get shadowStyle() {
    const {enableShadow} = this.getThemeProps();
    if (enableShadow) {
      return this.styles.containerShadow;
    }
  }

  get blurBgStyle() {
    const {enableBlur} = this.getThemeProps();
    if (Constants.isIOS && enableBlur) {
      return {backgroundColor: Colors.rgba(Colors.white, 0.85)}; 
    } else {
      return {backgroundColor: Colors.white}; 
    }
  }

  renderChildren() {
    const {borderRadius} = this.getThemeProps();
    const children = React.Children.map(this.props.children, (child, index) => {
      if (_.get(child, 'type') === CardImage) {
        const position = this.calcImagePosition(index);
        return React.cloneElement(child, {key: index, position, borderRadius});
      }
      return child;
    });
    
    return children;
  }

  render() {
    const {
      row,
      width,
      height,
      onPress,
      style,
      containerStyle,
      enableShadow,
      borderRadius,
      enableBlur,
      testID,
      ...others
    } = this.getThemeProps();
    const blurOptions = this.getBlurOptions();
    const Container = onPress ? TouchableOpacity : View;
    const brRadius = borderRadius || DEFAULT_BORDER_RADIUS;
    
    return (
      <Container
        style={[
          this.styles.container,
          {borderRadius: brRadius},
          this.elevationStyle,
          this.shadowStyle,
          this.blurBgStyle,
          containerStyle,
          style,
        ]}
        onPress={onPress}
        delayPressIn={10}
        activeOpacity={0.6}
        testID={testID}
        {...others}
      >
        {Constants.isIOS && enableBlur && <BlurView style={[this.styles.blurView, {borderRadius: brRadius}]} {...blurOptions}/>}
        <View width={width} height={height} row={row} style={[this.styles.innerContainer, {borderRadius: brRadius}]}>
          {this.renderChildren()}
        </View>
      </Container>
    );
  }
}

function createStyles({width, height, borderRadius = DEFAULT_BORDER_RADIUS}) {
  return StyleSheet.create({
    container: {
      width,
      height,
      overflow: 'visible',
      borderRadius,
    },
    containerShadow: { // sh30 bottom
      shadowColor: Colors.dark40,
      shadowOpacity: 0.25,
      shadowRadius: 12,
      shadowOffset: {height: 5, width: 0},
    },
    innerContainer: {
      borderRadius,
      overflow: 'hidden',
      flexGrow: 1,
    },
    blurView: {
      ...StyleSheet.absoluteFillObject,
      borderRadius,
    },
  });
}

Card.Section = CardSection;
Card.Item = CardItem;
Card.Image = CardImage;

export default Card;
