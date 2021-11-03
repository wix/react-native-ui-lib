// TODO: support commented props
import React, {useCallback, useContext, useEffect, useRef, useMemo, ReactElement} from 'react';
import {StyleSheet, TextStyle, LayoutChangeEvent, StyleProp, ViewStyle} from 'react-native';
import _ from 'lodash';
import Reanimated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import {Colors, Typography, Spacings} from '../../style';
import Badge, {BadgeProps} from '../badge';
import _TouchableOpacity from '../touchableOpacity';
import TabBarContext from './TabBarContext';

const TouchableOpacity = Reanimated.createAnimatedComponent(_TouchableOpacity);

const DEFAULT_LABEL_COLOR = Colors.black;
const DEFAULT_SELECTED_LABEL_COLOR = Colors.primary;

export interface TabControllerItemProps {
  /**
   * label of the tab
   */
  label?: string;
  /**
   * custom label style
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * custom selected label style
   */
  selectedLabelStyle?: StyleProp<TextStyle>;
  /**
   * the default label color
   */
  labelColor?: string;
  /**
   * the selected label color
   */
  selectedLabelColor?: string;
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
  selectedIconColor?: string;
  /**
   * Badge component props to display next the item label
   */
  badge?: BadgeProps;
  /**
   * Pass to render a leading element
   */
  leadingAccessory?: ReactElement;
  /**
   * Pass to render a trailing element
   */
  trailingAccessory?: ReactElement;
  /**
   * A fixed width for the item
   */
  width?: number;
  /**
   * ignore of the tab
   */
  ignore?: boolean;
  /**
   * callback for when pressing a tab
   */
  onPress?: (index: number) => void;
  /**
   * whether to change the text to uppercase
   */
  uppercase?: boolean;
  /**
   * The active opacity when pressing a tab
   */
  activeOpacity?: number;
  /**
   * TODO: rename to feedbackColor
   * Apply background color on press for TouchableOpacity
   */
  activeBackgroundColor?: string;
  /**
   * Pass custom style
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Used as a testing identifier
   */
  testID?: string;
}

interface Props extends TabControllerItemProps {
  index: number;
  targetPage: any; // TODO: typescript?
  currentPage: Reanimated.Adaptable<number>;
  onLayout?: (event: LayoutChangeEvent, index: number) => void;
}

/**
 * @description: TabController's TabBarItem
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx
 * @notes: Must be rendered as a direct child of TabController.TabBar.
 */
export default function TabBarItem({
  index,
  label,
  labelColor,
  selectedLabelColor,
  labelStyle,
  selectedLabelStyle,
  icon,
  badge,
  leadingAccessory,
  trailingAccessory,
  uppercase,
  activeOpacity = 0.9,
  activeBackgroundColor,
  testID,
  ignore,
  style,
  ...props
}: Props) {
  const {currentPage, setCurrentIndex} = useContext(TabBarContext);
  const itemRef = useRef();
  const itemWidth = useRef(props.width);
  // JSON.parse(JSON.stringify is due to an issue with reanimated
  const sharedLabelStyle = useSharedValue(JSON.parse(JSON.stringify(labelStyle)));
  const sharedSelectedLabelStyle = useSharedValue(JSON.parse(JSON.stringify(selectedLabelStyle)));

  useEffect(() => {
    if (itemWidth.current) {
      props.onLayout?.({nativeEvent: {layout: {x: 0, y: 0, width: itemWidth.current, height: 0}}} as LayoutChangeEvent,
        index);
    }
  }, []);

  const onPress = useCallback(() => {
    if (!ignore) {
      setCurrentIndex(index);
    }

    props.onPress?.(index);
  }, [index, props.onPress, ignore]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;

    if (!itemWidth.current && itemRef?.current) {
      itemWidth.current = width;
      // @ts-ignore
      itemRef.current?.setNativeProps({style: {width, paddingHorizontal: null, flex: null}});
      props.onLayout?.(event, index);
    }
  },
  [index, props.onLayout]);

  const animatedLabelStyle = useAnimatedStyle(() => {
    const isActive = currentPage.value === index;
    return isActive ? sharedSelectedLabelStyle.value : sharedLabelStyle.value;
  }, [currentPage]);

  const animatedLabelColorStyle = useAnimatedStyle(() => {
    const isActive = currentPage.value === index;
    const inactiveColor = labelColor || DEFAULT_LABEL_COLOR;
    const activeColor = !ignore ? selectedLabelColor || DEFAULT_SELECTED_LABEL_COLOR : inactiveColor;

    return {
      color: isActive ? activeColor : inactiveColor
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const isActive = currentPage.value === index;
    const inactiveColor = labelColor || DEFAULT_LABEL_COLOR;
    const activeColor = !ignore ? selectedLabelColor || DEFAULT_SELECTED_LABEL_COLOR : inactiveColor;

    return {
      tintColor: isActive ? activeColor : inactiveColor
    };
  });

  const _style = useMemo(() => {
    const constantWidthStyle = itemWidth.current ? {flex: 0, width: itemWidth.current} : undefined;
    return [styles.tabItem, style, constantWidthStyle];
  }, [style]);

  return (
    <TouchableOpacity
      // @ts-expect-error
      ref={itemRef}
      style={_style}
      onLayout={onLayout}
      activeBackgroundColor={activeBackgroundColor}
      activeOpacity={activeOpacity}
      onPress={onPress}
      testID={testID}
    >
      {leadingAccessory}
      {icon && (
        <Reanimated.Image
          source={icon}
          style={[!_.isUndefined(label) && styles.tabItemIconWithLabel, animatedIconStyle]}
        />
      )}
      {!_.isEmpty(label) && (
        <Reanimated.Text style={[styles.tabItemLabel, labelStyle, animatedLabelStyle, animatedLabelColorStyle]}>
          {uppercase ? _.toUpper(label) : label}
        </Reanimated.Text>
      )}
      {badge && (
        <Badge backgroundColor={Colors.red30} size={20} {...badge} containerStyle={styles.badge}/>
      )}
      {trailingAccessory}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacings.s4
  },
  tabItemLabel: {
    ...Typography.text80
  },
  tabItemIconWithLabel: {
    marginRight: 10
  },
  badge: {
    marginLeft: Spacings.s1
  }
});
