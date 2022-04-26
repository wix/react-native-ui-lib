import _ from 'lodash';
import React, {PureComponent, ReactElement} from 'react';
import {
  StyleSheet,
  Animated,
  Easing,
  LayoutChangeEvent,
  LayoutRectangle,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native';
import {Colors, Typography, Spacings} from '../../style';
import {Constants, asBaseComponent} from '../../commons/new';
import View from '../view';
import TouchableOpacity from '../touchableOpacity';
import Text from '../text';
import Image from '../image';
import Badge, {BadgeProps} from '../badge';

const INDICATOR_HEIGHT = 2;
const INDICATOR_BG_COLOR = Colors.primary;
const HORIZONTAL_PADDING = Constants.isTablet ? Spacings.s7 : Spacings.s5;

export interface TabBarItemProps {
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
   * Badge component's props to display next the item label
   */
  badgeProps?: BadgeProps;
  /**
   * Pass to render a leading element
   */
  leadingAccessory?: ReactElement;
  /**
   * Pass to render a trailing element
   */
  trailingAccessory?: ReactElement;
  /**
   * maximum number of lines the label can break
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
  children?: React.ReactNode;
}

interface State {
  indicatorOpacity: Animated.Value;
  selected?: boolean;
}

/**
 * @description: TabBar.Item, inner component of TabBar for configuring the tabs
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabBarScreen.tsx
 * @extends: TouchableOpacity
 * @extendsLink: https://reactnative.dev/docs/touchableopacity
 */
class TabBarItem extends PureComponent<TabBarItemProps, State> {
  static displayName = 'TabBar.Item';

  static defaultProps: Partial<TabBarItemProps> = {
    maxLines: 1
  };

  layout?: LayoutRectangle;

  constructor(props: TabBarItemProps) {
    super(props);

    this.state = {
      indicatorOpacity: props.selected ? new Animated.Value(1) : new Animated.Value(0),
      selected: props.selected
    };
  }

  componentDidUpdate(prevProps: TabBarItemProps) {
    if (prevProps.selected !== this.props.selected) {
      this.animate(this.props.selected);
    }
  }

  animate(newValue?: boolean) {
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

  getFlattenStyle(style: StyleProp<TextStyle>) {
    return StyleSheet.flatten(style);
  }

  getStylePropValue(flattenStyle: StyleProp<TextStyle>, propName: string) {
    let prop;
    if (flattenStyle) {
      const propObject: any = _.pick(flattenStyle, [propName]);
      prop = propObject[propName];
    }
    return prop;
  }

  getColorFromStyle(style: StyleProp<TextStyle>) {
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
      leadingAccessory,
      trailingAccessory,
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
    } = this.props;

    const iconTint = iconColor || this.getColorFromStyle(labelStyle) || this.getColorFromStyle(styles.label);
    const iconSelectedTint =
      iconSelectedColor || this.getColorFromStyle(selectedLabelStyle) || this.getColorFromStyle(styles.selectedLabel);
    const badgeSize = _.get(badgeProps, 'size', 16);

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
        <View row flex center style={[showDivider && styles.divider, styles.contentContainer]}>
          {leadingAccessory}
          {icon && (
            <Image
              style={!_.isEmpty(label) && styles.icon}
              source={icon}
              tintColor={selected ? iconSelectedTint : iconTint}
            />
          )}
          {!_.isEmpty(label) && (
            <Text
              numberOfLines={maxLines}
              uppercase={uppercase}
              style={[labelStyle || styles.label, selected && (selectedLabelStyle || styles.selectedLabel)]}
            >
              {label}
            </Text>
          )}
          {children}
          {!_.isNil(badgeProps) && (
            <Badge
              backgroundColor={Colors.red30}
              {...badgeProps}
              size={badgeSize}
              containerStyle={[styles.badge, badgeProps.containerStyle]}
            />
          )}
          {trailingAccessory}
        </View>
        <Animated.View style={[{opacity: indicatorOpacity}, styles.indicator, indicatorStyle]}/>
      </TouchableOpacity>
    );
  }
}

export default asBaseComponent<TabBarItemProps>(TabBarItem);

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: HORIZONTAL_PADDING
  },
  label: {
    color: Colors.primary,
    ...Typography.text80
  },
  selectedLabel: {
    color: Colors.primary,
    ...Typography.text80,
    fontWeight: 'bold'
  },
  divider: {
    borderRightWidth: 1,
    borderRightColor: Colors.grey70,
    marginVertical: 14 // NOTE: will not cut long text at the top and bottom in iOS if TabBar not high enough
  },
  indicator: {
    backgroundColor: INDICATOR_BG_COLOR,
    height: INDICATOR_HEIGHT,
    marginHorizontal: HORIZONTAL_PADDING
  },
  badge: {
    marginLeft: Spacings.s1
  },
  icon: {
    marginRight: 6
  }
});
