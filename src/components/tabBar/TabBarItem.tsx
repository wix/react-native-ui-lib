import _ from 'lodash';
import React, {PureComponent} from 'react';
import {StyleSheet, Animated, Easing, LayoutChangeEvent} from 'react-native';
import {Colors, Typography} from '../../style';
import {BaseComponent} from '../../commons';
import {asBaseComponent, BaseComponentInjectedProps} from '../../commons/new';
import Image from '../image';
import TouchableOpacity from '../touchableOpacity';
import View, {ViewPropTypes} from '../view';
import Text, {TextPropTypes} from '../text';
import Badge, {BadgeProps} from '../badge';


export type TabBarItemProps = BaseComponentInjectedProps & ViewPropTypes & {
  /**
   * icon of the tab
   */
  icon?: number,
  /**
   * icon tint color
   */
  iconColor?: string,
  /**
   * icon selected tint color
   */
  iconSelectedColor?: string,
  /**
   * label of the tab
   */
  label?: string,
  /**
   * custom label style
   */
  labelStyle: TextPropTypes['style'],
  /**
   * Badge component props to display next the item label
   */
  badge: BadgeProps,
  /**
   * maximum number of lines the label can break
   */
  maxLines?: number,
  /**
   * custom selected tab label style
   */
  selectedLabelStyle: TextPropTypes['style'],
  /**
   * whether the tab is selected or not
   */
  selected?: boolean,
  /**
   * whether the tab will have a divider on its right
   */
  showDivider?: boolean,
  /**
   * A fixed width for the item
   */
  width?: number,
  /**
   * ignore of the tab
   */
  ignore?: boolean,
  /**
   * callback for when pressing a tab
   */
  onPress?: (props: any) => void,
  /**
   * whether to change the text to uppercase
   */
  uppercase?: boolean,
  /**
   * Apply background color on press for TouchableOpacity
   */
  activeBackgroundColor?: string
};

export type State = {
  indicatorOpacity?: Animated.Value
}


const INDICATOR_BG_COLOR = Colors.blue30;
const INDICATOR_HEIGHT = 2;
const INDICATOR_SPACINGS = 16;

/**
 * @description: TabBar.Item, inner component of TabBar for configuring the tabs
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabBarScreen.js
 * @extends: TouchableOpacity
 * @extendsLink: https://facebook.github.io/react-native/docs/touchableopacity
 */
class TabBarItem extends PureComponent<TabBarItemProps, State> {
  static displayName = 'TabBar.Item';

  static defaultProps = {
    test: true, // this will enable by the new tab bar design
    maxLines: 1
  };

  constructor(props: TabBarItemProps) {
    super(props);

    this.state = {
      indicatorOpacity: props.selected ? new Animated.Value(1) : new Animated.Value(0)
    };
  }

  styles = createStyles();
  layout: any = undefined;

  UNSAFE_componentWillReceiveProps(nextProps: TabBarItemProps) {
    if (this.props.selected !== nextProps.selected) {
      this.animate(nextProps.selected);
    }
  }

  animate(newValue?: boolean) {
    if (this.state.indicatorOpacity) {
      Animated.timing(this.state.indicatorOpacity, {
        toValue: newValue ? 1 : 0,
        easing: Easing.ease,
        duration: 150,
        useNativeDriver: true
      }).start();
    }
  }

  getFlattenStyle(style: object) {
    return StyleSheet.flatten(style);
  }

  getStylePropValue(flattenStyle: object, propName: string) {
    let prop;
    if (flattenStyle) {
      const propObject: any = _.pick(flattenStyle, [propName]);
      prop = propObject[propName];
    }
    return prop;
  }

  getColorFromStyle(style: any) {
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
    const {indicatorOpacity} = this.state;
    const {
      children,
      indicatorStyle,
      icon,
      iconColor,
      iconSelectedColor,
      label,
      labelStyle,
      badge,
      uppercase,
      maxLines,
      selected,
      selectedLabelStyle,
      showDivider,
      width,
      onPress,
      activeBackgroundColor,
      testID
    } = this.props;

    const iconTint = iconColor || this.getColorFromStyle(labelStyle) || this.getColorFromStyle(this.styles.label);
    const iconSelectedTint =
      iconSelectedColor ||
      this.getColorFromStyle(selectedLabelStyle) ||
      this.getColorFromStyle(this.styles.selectedLabel);

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={width ? {width} : {flex: 1}}
        testID={testID}
        activeBackgroundColor={activeBackgroundColor}
        onLayout={this.onLayout}
        accessibilityStates={selected ? ['selected'] : []}
      >
        <View row flex center style={[showDivider && this.styles.divider, {paddingHorizontal: 16}]}>
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
              accessibilityLabel={`${label} tab`}
            >
              {label}
            </Text>
          )}
          {children}
          {badge && (
            <Badge
              backgroundColor={Colors.red30}
              size={'small'}
              {...badge}
              containerStyle={[this.styles.badge, badge.containerStyle]}
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
      color: Colors.dark30,
      ...Typography.text80
    },
    selectedLabel: {
      color: Colors.blue30,
      ...Typography.text80,
      fontWeight: 'bold'
    },
    divider: {
      borderRightWidth: 1,
      borderRightColor: Colors.dark70,
      marginVertical: 14 // NOTE: will not cut long text at the top and bottom in iOS if TabBar not high enough
    },
    indicator: {
      backgroundColor: INDICATOR_BG_COLOR,
      height: INDICATOR_HEIGHT,
      marginHorizontal: INDICATOR_SPACINGS
    },
    badge: {
      marginLeft: 4
    }
  });
}

export default asBaseComponent<TabBarItemProps, State>(TabBarItem);
