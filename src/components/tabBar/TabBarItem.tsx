import _ from 'lodash';
import React from 'react';
import {StyleSheet, Animated, Easing, LayoutChangeEvent, LayoutRectangle, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {Constants} from '../../helpers';
import {Colors, Typography, Spacings} from '../../style';
import {PureBaseComponent} from '../../commons';
import View from '../view';
import TouchableOpacity from '../touchableOpacity';
import Text from '../text';
import Image from '../image';
import Badge, {BadgeProps} from '../badge';


const INDICATOR_HEIGHT = 2;
const INDICATOR_BG_COLOR = Colors.primary;
const HORIZONTAL_PADDING = Constants.isTablet ? Spacings.s7 : Spacings.s5;

interface Props extends ThemeComponent {
  /**
   * icon of the tab
   */
  icon?: number;
  /**
   * icon tint color
   */
  iconColor?: string;
  /**
   * icon selected tint color
   */
  iconSelectedColor?: string;
  /**
   * label of the tab
   */
  label?: string;
  /**
   * custom label style
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Badge component props to display next the item label
   */
  badge?: BadgeProps; //TODO: remove after deprecation
  badgeProps?: BadgeProps;
  /**
   * maximun number of lines the label can break
   */
  maxLines?: number;
  /**
   * custom selected tab label style
   */
  selectedLabelStyle?: StyleProp<TextStyle>;
  /**
   * whether the tab is selected or not
   */
  selected?: boolean;
  /**
   * whether the tab will have a divider on its right
   */
  showDivider?: boolean;
  /**
   * A fixed width for the item
   */
  width?: number;
  /**
   * set darkTheme style
   */
  darkTheme?: boolean;
  /**
   * tabBar's background color
   */
  backgroundColor?: string;
  /**
   * ignore of the tab
   */
  ignore?: boolean;
  /**
   * callback for when pressing a tab
   */
  onPress?: () => void;
  /**
   * whether to change the text to uppercase
   */
  uppercase?: boolean;
  /**
   * Apply background color on press for TouchableOpacity
   */
  activeBackgroundColor?: string;
  accessibilityLabel?: string;
  indicatorStyle?: StyleProp<ViewStyle>; // for inner use
  style?: ViewStyle;
  testID?: string;
}

interface State {
  indicatorOpacity: Animated.Value;
  selected: boolean;
}

export type TabBarItemProps = Props;

/**
 * @description: TabBar.Item, inner component of TabBar for configuring the tabs
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabBarScreen.tsx
 * @extends: TouchableOpacity
 * @extendsLink: https://facebook.github.io/react-native/docs/touchableopacity
 */
export default class TabBarItem extends PureBaseComponent<Props, State> {
  static displayName = 'TabBar.Item';

  static defaultProps: Partial<Props> = {
    maxLines: 1
  };

  layout?: LayoutRectangle;
  styles: ReturnType<typeof createStyles>;

  constructor(props: Props) {
    super(props);

    this.state = {
      indicatorOpacity: props.selected ? new Animated.Value(1) : new Animated.Value(0),
      selected: props.selected
    };

    if (!_.isEmpty(props.badge)) {
      console.warn(`TabBarItem's 'badge' prop is deprecated. Please use 'badgeProps' prop instead`);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected) {
      this.animate(nextProps.selected);
    }
  }

  animate(newValue) {
    Animated.timing(this.state.indicatorOpacity, {
      toValue: newValue ? 1 : 0,
      easing: Easing.ease,
      duration: 150,
      useNativeDriver: true
    }).start(this.onAnimateCompleted);
  }

  onAnimateCompleted = () => {
    this.setState({selected: this.props.selected});
  };

  generateStyles() {
    this.styles = createStyles();
  }

  getFlattenStyle(style) {
    return StyleSheet.flatten(style);
  }

  getStylePropValue(flattenStyle, propName) {
    let prop;
    if (flattenStyle) {
      const propObject = _.pick(flattenStyle, [propName]);
      prop = propObject[propName];
    }
    return prop;
  }

  getColorFromStyle(style) {
    const flattenStyle = this.getFlattenStyle(style);
    return this.getStylePropValue(flattenStyle, 'color');
  }

  getLayout() {
    return this.layout;
  }

  onLayout = (event: LayoutChangeEvent) => {
    this.layout = event.nativeEvent.layout;
  };

  render() {
    const {indicatorOpacity, selected} = this.state;
    const {
      children,
      indicatorStyle,
      icon,
      iconColor,
      iconSelectedColor,
      label,
      labelStyle,
      badgeProps,
      badge,
      uppercase,
      maxLines,
      selectedLabelStyle,
      showDivider,
      width,
      onPress,
      activeBackgroundColor,
      backgroundColor,
      testID,
      accessibilityLabel,
      style
    } = this.getThemeProps();

    const iconTint = iconColor || this.getColorFromStyle(labelStyle) || this.getColorFromStyle(this.styles.label);
    const iconSelectedTint =
      iconSelectedColor ||
      this.getColorFromStyle(selectedLabelStyle) ||
      this.getColorFromStyle(this.styles.selectedLabel);
    const badgeFinalProps = badgeProps || badge;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={[width ? {width} : {flex: 1}, style]}
        testID={testID}
        backgroundColor={backgroundColor}
        activeBackgroundColor={activeBackgroundColor}
        onLayout={this.onLayout}
        accessibilityState={selected ? {selected: true} : undefined}
        accessibilityRole={'tab'}
        accessibilityLabel={accessibilityLabel}
      >
        <View row flex center style={[showDivider && this.styles.divider, {paddingHorizontal: HORIZONTAL_PADDING}]}>
          {icon && (
            <Image
              style={!_.isEmpty(label) && {marginRight: 6}}
              source={icon}
              tintColor={selected ? iconSelectedTint : iconTint}
            />
          )}
          {!_.isEmpty(label) && (
            <Text
              numberOfLines={maxLines}
              uppercase={uppercase}
              style={[labelStyle || this.styles.label, selected && (selectedLabelStyle || this.styles.selectedLabel)]}
            >
              {label}
            </Text>
          )}
          {children}
          {!_.isNil(badgeFinalProps) && (
            <Badge
              backgroundColor={Colors.red30}
              size={'small'}
              {...badgeFinalProps}
              containerStyle={[this.styles.badge, badgeFinalProps.containerStyle]}
            />
          )}
        </View>
        <Animated.View style={[{opacity: indicatorOpacity}, this.styles.indicator, indicatorStyle]}/>
      </TouchableOpacity>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    label: {
      color: Colors.primary,
      ...Typography.bodySmall
    },
    selectedLabel: {
      color: Colors.primary,
      ...Typography.bodySmallBold
    },
    divider: {
      borderRightWidth: 1,
      borderRightColor: Colors.dark70,
      marginVertical: 14 // NOTE: will not cut long text at the top and bottom in iOS if TabBar not high enough
    },
    indicator: {
      backgroundColor: INDICATOR_BG_COLOR,
      height: INDICATOR_HEIGHT,
      marginHorizontal: HORIZONTAL_PADDING
    },
    badge: {
      marginLeft: Spacings.s1
    }
  });
}
