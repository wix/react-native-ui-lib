import isUndefined from 'lodash/isUndefined';
import React, {PureComponent} from 'react';
import {Animated, Easing, StyleSheet, StyleProp, ViewStyle, LayoutChangeEvent} from 'react-native';
import {Constants, asBaseComponent} from '../../commons/new';
import {extractAccessibilityProps} from '../../commons/modifiers';
import View from '../view';
import {Colors, BorderRadiuses, Spacings} from '../../style';

const CONTAINER_HEIGHT = Spacings.s2;
const FULL_WIDTH_CONTAINER_HEIGHT = Spacings.s1;
const TABLET_CONTAINER_HEIGHT = 6;
const TABLET_FULL_WIDTH_CONTAINER_HEIGHT = 10;
const DEFAULT_COLOR = Colors.$backgroundPrimaryHeavy;

/**
 * @description: Progress bar
 * @example:https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ProgressBarScreen.tsx
 */
interface Props {
  /**
   * The progress of the bar from 0 to 100
   */
  progress?: number;
  /**
   *  FullWidth Ui preset
   */
  fullWidth?: boolean;
  /**
   * Override container style
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Progress color
   */
  progressColor?: string;
  /**
   * Custom element to render on top of the animated progress
   */
  customElement?: JSX.Element;
  /**
   * Custom border radius for the progress bar
   */
  borderRadius?: number;
  testID?: string;
}
export type ProgressBarProps = Props;

interface State {
  containerWidth?: number;
}

class ProgressBar extends PureComponent<Props, State> {
  static displayName = 'ProgressBar';

  static defaultProps: Partial<Props> = {
    progress: 0,
    borderRadius: BorderRadiuses.br100
  };

  progressAnimation: Animated.Value;

  constructor(props: Props) {
    super(props);
    this.progressAnimation = new Animated.Value(props.progress || 0);

    this.state = {
      containerWidth: undefined
    };
  }

  componentDidUpdate(prevProps: Props) {
    const {progress} = this.props;

    if (prevProps.progress !== progress) {
      this.animateProgress(progress);
    }
  }

  getContainerWidth = (event: LayoutChangeEvent) => {
    if (!this.state.containerWidth) {
      this.setState({containerWidth: event.nativeEvent.layout.width});
    }
  };

  animateProgress(toValue?: number) {
    if (!isUndefined(toValue)) {
      Animated.timing(this.progressAnimation, {
        duration: 220,
        easing: Easing.ease,
        toValue,
        useNativeDriver: true
      }).start();
    }
  }

  getAccessibilityProps() {
    const {progress} = this.props;
    if (progress) {
      return {
        accessible: true,
        accessibilityLabel: `progress bar. ${Math.round(progress)}%`,
        ...extractAccessibilityProps()
      };
    }
  }

  getContainerStyle() {
    const {fullWidth, borderRadius} = this.props;
    const containerHeight = fullWidth ? FULL_WIDTH_CONTAINER_HEIGHT : CONTAINER_HEIGHT;
    const tabletContainerHeight = fullWidth ? TABLET_FULL_WIDTH_CONTAINER_HEIGHT : TABLET_CONTAINER_HEIGHT;

    return {
      height: Constants.isTablet ? tabletContainerHeight : containerHeight,
      borderRadius
    };
  }

  getProgressStyle() {
    const {fullWidth, progressColor, borderRadius} = this.props;
    const progressStyle = {
      right: Constants.isRTL ? undefined : this.state.containerWidth,
      backgroundColor: progressColor || DEFAULT_COLOR,
      borderRadius: fullWidth ? undefined : borderRadius,
      borderBottomRightRadius: fullWidth ? borderRadius : undefined,
      borderTopRightRadius: fullWidth ? borderRadius : undefined
    };

    return progressStyle;
  }

  renderCustomElement() {
    const {customElement} = this.props;

    if (customElement) {
      return React.cloneElement(customElement, {
        style: [customElement.props.style, styles.customElement]
      });
    }
  }

  render() {
    const {style, testID} = this.props;
    const {containerWidth = 0} = this.state;
    const outputRange = Constants.isRTL ? [containerWidth, 0] : [0, containerWidth];
    const newProgress = this.progressAnimation.interpolate({
      inputRange: [0, 100],
      outputRange
    });

    return (
      <View
        onLayout={this.getContainerWidth}
        style={[styles.container, this.getContainerStyle(), style]}
        {...this.getAccessibilityProps()}
        testID={testID}
      >
        {!!containerWidth && (
          <Animated.View style={[styles.progress, this.getProgressStyle(), {transform: [{translateX: newProgress}]}]}>
            {this.renderCustomElement()}
          </Animated.View>
        )}
      </View>
    );
  }
}

export {ProgressBar}; // For tests
export default asBaseComponent<ProgressBarProps, typeof ProgressBar>(ProgressBar);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.$backgroundNeutralMedium,
    overflow: 'hidden'
  },
  progress: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  customElement: {
    height: '100%',
    width: '100%'
  }
});
