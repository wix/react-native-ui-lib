import _ from 'lodash';
import React, {PureComponent} from 'react';
import {StyleSheet, Animated, ViewStyle} from 'react-native';
import {Colors, BorderRadiuses} from '../../style';
// import {PureBaseComponent} from '../../commons';
import {Constants, asBaseComponent, forwardRef, BaseComponentInjectedProps, ForwardRefInjectedProps} from '../../commons/new';
import View, {ViewProps} from '../view';
import TouchableOpacity, {TouchableOpacityProps} from '../touchableOpacity';
import Icon from '../icon';
import CardImage from './CardImage';
import CardSection, {CardSectionProps} from './CardSection';
import {BlurViewPackage} from '../../optionalDependencies';
// @ts-ignore
import Assets from '../../assets';
import CardContext from './CardContext';
import * as CardPresenter from './CardPresenter';

const BlurView = BlurViewPackage?.BlurView;

const DEFAULT_BORDER_RADIUS = BorderRadiuses.br40;
const DEFAULT_SELECTION_PROPS = {
  borderWidth: 2,
  color: Colors.$backgroundPrimaryHeavy,
  indicatorSize: 20,
  icon: Assets.icons.checkSmall,
  iconColor: Colors.$iconDefaultLight,
  hideIndicator: false
};

export interface CardSelectionOptions {
  icon?: number;
  iconColor?: string;
  color?: string;
  borderWidth?: number;
  indicatorSize?: number;
  hideIndicator?: boolean;
}

export {CardSectionProps};
export type CardProps = ViewProps &
  TouchableOpacityProps & {
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
    onPress?: TouchableOpacityProps['onPress'];
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
    selectionOptions?: CardSelectionOptions;
  };

type PropTypes = BaseComponentInjectedProps & ForwardRefInjectedProps & CardProps;

type State = {
  animatedSelected: Animated.Value;
};

/**
 * @description: Card component
 * @extends: TouchableOpacity
 * @modifiers: margin, padding
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Card/Cards_01.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Card/Cards_02.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Card/Cards_03.png?raw=true
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Card/Card_Selecteable.gif, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Card/Cards_activeScale.gif?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.tsx
 * @notes: 'enableBlur' prop requires installing the '@react-native-community/blur' native library
 */
class Card extends PureComponent<PropTypes, State> {
  static displayName = 'Card';
  static defaultProps = {
    enableShadow: true
  };
  static Image: typeof CardImage;
  static Section: typeof CardSection;

  styles: any;

  constructor(props: PropTypes) {
    super(props);
    this.state = {
      animatedSelected: new Animated.Value(Number(this.props.selected))
    };
    this.styles = createStyles(this.props);

    if (props.enableBlur && !BlurView) {
      console.error(`RNUILib Card's "enableBlur" prop requires installing "@react-native-community/blur" dependency`);
    }
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
      useNativeDriver: true
    }).start();
  }

  getBlurOptions() {
    const {blurOptions} = this.props;
    return {
      blurType: 'light',
      blurAmount: 5,
      ...blurOptions
    };
  }

  // todo: add unit test
  calcChildPosition(childIndex: number) {
    const {row} = this.props;
    const childrenCount = React.Children.count(this.children);
    const position = [];

    const childLocation = childIndex;
    if (childLocation === 0) {
      position.push(row ? 'left' : 'top');
    }

    if (childLocation === childrenCount - 1) {
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

  get backgroundStyle() {
    const {enableBlur, backgroundColor = Colors.$backgroundElevated} = this.props;

    if (Constants.isIOS && enableBlur) {
      return {backgroundColor: Colors.rgba(backgroundColor, 0.85)};
    } else {
      return {backgroundColor};
    }
  }

  get borderRadius() {
    const {borderRadius} = this.props;

    return borderRadius === undefined ? DEFAULT_BORDER_RADIUS : borderRadius;
  }

  get children() {
    const {children} = this.props;

    return React.Children.toArray(children).filter(child => {
      return !_.isNull(child);
    });
  }

  renderSelection() {
    const {selectionOptions = {}, selected} = this.props;
    const {animatedSelected} = this.state;
    const selectionColor = selectionOptions?.color || DEFAULT_SELECTION_PROPS.color;

    if (_.isUndefined(selected)) {
      return null;
    }

    return (
      <Animated.View
        style={[
          this.styles.selectedBorder,
          {borderColor: selectionColor},
          {borderRadius: this.borderRadius},
          {opacity: animatedSelected}
        ]}
        pointerEvents="none"
      >
        {!selectionOptions.hideIndicator && (
          <View style={[this.styles.selectedIndicator, {backgroundColor: selectionColor}]}>
            <Icon
              source={selectionOptions?.icon || DEFAULT_SELECTION_PROPS.icon}
              tintColor={selectionOptions?.iconColor || DEFAULT_SELECTION_PROPS.iconColor}
            />
          </View>
        )}
      </Animated.View>
    );
  }

  renderChildren = () => {
    return React.Children.map(this.children, (child, index) => {
      const position = this.calcChildPosition(index);
      const borderStyle = CardPresenter.generateBorderRadiusStyle({
        position,
        borderRadius: this.borderRadius
      });
      return (
        <CardContext.Provider key={index} value={{position, borderStyle}}>
          {child}
        </CardContext.Provider>
      );
    });
  };

  render() {
    const {onPress, onLongPress, style, selected, containerStyle, enableBlur, forwardedRef, ...others} = this.props;
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
          this.backgroundStyle,
          containerStyle,
          style
        ]}
        onPress={onPress}
        onLongPress={onLongPress}
        delayPressIn={10}
        activeOpacity={0.6}
        accessibilityState={{selected}}
        {...others}
        ref={forwardedRef}
      >
        {Constants.isIOS && enableBlur && BlurView && (
          // @ts-ignore
          <BlurView style={[this.styles.blurView, {borderRadius: brRadius}]} {...blurOptions}/>
        )}

        {this.renderChildren()}
        {this.renderSelection()}
      </Container>
    );
  }
}

function createStyles({width, height, borderRadius, selectionOptions}: CardProps) {
  const selectionOptionsWithDefaults = {
    ...DEFAULT_SELECTION_PROPS,
    ...selectionOptions
  };
  const brRadius = borderRadius === undefined ? DEFAULT_BORDER_RADIUS : borderRadius;

  return StyleSheet.create({
    container: {
      width,
      height,
      overflow: 'visible',
      borderRadius: brRadius
    },
    containerShadow: {
      // sh30 bottom
      shadowColor: Colors.$backgroundNeutralIdle,
      shadowOpacity: 0.25,
      shadowRadius: 12,
      shadowOffset: {height: 5, width: 0}
    },
    blurView: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: brRadius
    },
    selectedBorder: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: DEFAULT_BORDER_RADIUS,
      borderWidth: selectionOptionsWithDefaults.borderWidth,
      borderColor: selectionOptionsWithDefaults.color
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
      justifyContent: 'center'
    }
  });
}

Card.Image = CardImage;
Card.Section = CardSection;

export default asBaseComponent<
  CardProps,
  {
    Image: typeof CardImage;
    Section: typeof CardSection;
  }
>(forwardRef(Card));
