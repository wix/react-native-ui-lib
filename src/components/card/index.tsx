import _ from 'lodash';
import React, {PureComponent} from 'react';
import {StyleSheet, Animated, ViewStyle} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {Constants} from '../../helpers';
import {Colors, BorderRadiuses} from '../../style';
// import {PureBaseComponent} from '../../commons';
import {
  asBaseComponent,
  forwardRef,
  BaseComponentInjectedProps,
  ForwardRefInjectedProps,
} from '../../commons/new';
import View, {ViewPropTypes} from '../view';
import TouchableOpacity, {TouchableOpacityProps} from '../touchableOpacity';
import Image from '../image';
import CardImage from './CardImage';
// @ts-ignore
import Assets from '../../assets';

const DEFAULT_BORDER_RADIUS = BorderRadiuses.br40;
const DEFAULT_SELECTION_PROPS = {
  borderWidth: 2,
  color: Colors.blue30,
  indicatorSize: 20,
  icon: Assets.icons.checkSmall,
  iconColor: Colors.white,
  hideIndicator: false,
};

export type CardPropTypes = ViewPropTypes & TouchableOpacityProps & {
  /**
   * card custom width
   */
  width?: number | string;
  /**
   * card custom height
   */
  height?: number | string;
  /**
   * should inner card flow direction be horizontal
   */
  row?: boolean;
  /**
   * card border radius (will be passed to inner Card.Image component)
   */
  borderRadius?: number;
  /**
   * action for when pressing the card
   */
  onPress?: () => void;
  /**
   * whether the card should have shadow or not
   */
  enableShadow?: boolean;
  /**
   * elevation value (Android only)
   */
  elevation?: number;
  /**
   * enable blur effect (iOS only)
   */
  enableBlur?: boolean;
  /**
   * blur option for blur effect according to @react-native-community/blur lib (make sure enableBlur is on)
   */
  blurOptions?: object;
  /**
   * Additional styles for the top container
   */
  containerStyle?: ViewStyle;
  /**
   * Adds visual indication that the card is selected
   */
  selected?: boolean;
  /**
   * Custom options for styling the selection indication
   */
  selectionOptions?: {
    icon?: number;
    iconColor?: string;
    color?: string;
    borderWidth?: number;
    indicatorSize?: number;
    hideIndicator?: boolean;
  };
};

type PropTypes = BaseComponentInjectedProps &
  ForwardRefInjectedProps &
  CardPropTypes;

type State = {
  animatedSelected: Animated.Value;
};

/**
 * @description: Card component
 * @extends: TouchableOpacity
 * @extendsnotes: (Touchable when passing onPress)
 * @extendslink: docs/TouchableOpacity
 * @modifiers: margin, padding
 * @gif: https://media.giphy.com/media/l0HU9SKWmv0VTOYMM/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.js
 */
class Card extends PureComponent<PropTypes, State> {
  static displayName = 'Card';
  static defaultProps = {
    enableShadow: true,
  };
  static Image: typeof CardImage;

  styles: any;

  constructor(props: PropTypes) {
    super(props);
    this.state = {
      animatedSelected: new Animated.Value(Number(this.props.selected)),
    };
    this.styles = createStyles(this.props);
  }

  componentDidUpdate(prevProps: PropTypes) {
    if (prevProps.selected !== this.props.selected) {
      this.animateSelection();
    }
  }

  animateSelection() {
    const {animatedSelected} = this.state;
    const {selected} = this.props;
    Animated.timing(animatedSelected, {
      toValue: Number(selected),
      duration: 120,
      useNativeDriver: true,
    }).start();
  }

  getBlurOptions() {
    const {blurOptions} = this.props;
    return {
      blurType: 'light',
      blurAmount: 5,
      ...blurOptions,
    };
  }

  // todo: add unit test
  calcImagePosition(childIndex: number) {
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
    const {elevation, enableShadow} = this.props;

    if (enableShadow) {
      return {elevation: elevation || 2};
    }
  }

  get shadowStyle() {
    const {enableShadow} = this.props;

    if (enableShadow) {
      return this.styles.containerShadow;
    }
  }

  get blurBgStyle() {
    const {enableBlur} = this.props;

    if (Constants.isIOS && enableBlur) {
      return {backgroundColor: Colors.rgba(Colors.white, 0.85)};
    } else {
      return {backgroundColor: Colors.white};
    }
  }

  get borderRadius() {
    const {borderRadius} = this.props;

    return borderRadius === undefined ? DEFAULT_BORDER_RADIUS : borderRadius;
  }

  renderSelection() {
    const {selectionOptions = {}, selected} = this.props;
    const {animatedSelected} = this.state;
    const selectionColor = _.get(
      selectionOptions,
      'color',
      DEFAULT_SELECTION_PROPS.color
    );

    if (_.isUndefined(selected)) {
      return null;
    }

    return (
      <Animated.View
        style={[
          this.styles.selectedBorder,
          {borderColor: selectionColor},
          {borderRadius: this.borderRadius},
          {opacity: animatedSelected},
        ]}
        pointerEvents="none"
      >
        {!selectionOptions.hideIndicator && (
          <View
            style={[
              this.styles.selectedIndicator,
              {backgroundColor: selectionColor},
            ]}
          >
            <Image
              style={this.styles.selectedIcon}
              source={_.get(
                selectionOptions,
                'icon',
                DEFAULT_SELECTION_PROPS.icon
              )}
            />
          </View>
        )}
      </Animated.View>
    );
  }

  renderChildren() {
    const children = React.Children.map(this.props.children, (child, index) => {
      if (_.get(child, 'type.displayName') === CardImage.displayName) {
        const position = this.calcImagePosition(index);
        // @ts-ignore
        return React.cloneElement(child, {
          position,
          borderRadius: this.borderRadius,
        });
      }
      return child;
    });
    return children;
  }

  render() {
    const {
      onPress,
      onLongPress,
      style,
      selected,
      containerStyle,
      enableBlur,
      forwardedRef,
      ...others
    } = this.props;
    const blurOptions = this.getBlurOptions();
    const Container = onPress || onLongPress ? TouchableOpacity : View;
    const brRadius = this.borderRadius;

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
        onLongPress={onLongPress}
        delayPressIn={10}
        activeOpacity={0.6}
        accessibilityState={{selected}}
        {...others}
        ref={forwardedRef}
      >
        {Constants.isIOS && enableBlur && (
          // @ts-ignore
          <BlurView
            style={[this.styles.blurView, {borderRadius: brRadius}]}
            {...blurOptions}
          />
        )}

        {this.renderChildren()}
        {this.renderSelection()}
      </Container>
    );
  }
}

function createStyles({
  width,
  height,
  borderRadius,
  selectionOptions,
}: CardPropTypes) {
  const selectionOptionsWithDefaults = {
    ...DEFAULT_SELECTION_PROPS,
    ...selectionOptions,
  };
  const brRadius =
    borderRadius === undefined ? DEFAULT_BORDER_RADIUS : borderRadius;

  return StyleSheet.create({
    container: {
      width,
      height,
      overflow: 'visible',
      borderRadius: brRadius,
    },
    containerShadow: {
      // sh30 bottom
      shadowColor: Colors.dark40,
      shadowOpacity: 0.25,
      shadowRadius: 12,
      shadowOffset: {height: 5, width: 0},
    },
    blurView: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: brRadius,
    },
    selectedBorder: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: DEFAULT_BORDER_RADIUS,
      borderWidth: selectionOptionsWithDefaults.borderWidth,
      borderColor: selectionOptionsWithDefaults.color,
    },
    selectedIndicator: {
      borderRadius: BorderRadiuses.br100,
      position: 'absolute',
      top: -selectionOptionsWithDefaults.indicatorSize / 2 + 2,
      right: -selectionOptionsWithDefaults.indicatorSize / 2 + 1,
      width: selectionOptionsWithDefaults.indicatorSize,
      height: selectionOptionsWithDefaults.indicatorSize,
      backgroundColor: selectionOptionsWithDefaults.color,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedIcon: {
      tintColor: selectionOptionsWithDefaults.iconColor,
    },
  });
}

Card.Image = CardImage;

export default asBaseComponent<CardPropTypes>(forwardRef(Card));
