// TODO: support commented props
import React, {PureComponent} from 'react';
import {StyleSheet, /* processColor, */ Text as RNText} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Reanimated from 'react-native-reanimated';
import {State} from 'react-native-gesture-handler';
import {interpolateColor} from 'react-native-redash';
import {Colors, Typography, Spacings} from '../../style';
import Badge from '../../components/badge';
import {TouchableOpacity} from '../../incubator';

const {cond, eq, call, block, event, and} = Reanimated;

const DEFAULT_LABEL_COLOR = Colors.black;
const DEFAULT_SELECTED_LABEL_COLOR = Colors.blue30;

/**
 * @description: TabController's TabBarItem
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.js
 * @notes: Must be rendered as a direct child of TabController.TabBar.
 */
export default class TabBarItem extends PureComponent {
  static displayName = 'TabController.TabBarItem';

  static propTypes = {
    /**
     * label of the tab
     */
    label: PropTypes.string,
    /**
     * custom label style
     */
    labelStyle: RNText.propTypes.style,
    /**
     * custom selected label style
     */
    selectedLabelStyle: RNText.propTypes.style,
    /**
     * the default label color
     */
    labelColor: PropTypes.string,
    /**
     * the selected label color
     */
    selectedLabelColor: PropTypes.string,
    /**
     * icon of the tab
     */
    icon: PropTypes.number,
    /**
     * icon tint color
     */
    iconColor: PropTypes.string,
    /**
     * icon selected tint color
     */
    selectedIconColor: PropTypes.string,
    /**
     * Badge component props to display next the item label
     */
    badge: PropTypes.shape(Badge.propTypes),
    // /**
    //  * maximun number of lines the label can break
    //  */
    // maxLines: PropTypes.number,
    // /**
    //  * whether the tab will have a divider on its right
    //  */
    // showDivider: PropTypes.bool,
    /**
     * A fixed width for the item
     */
    width: PropTypes.number,
    /**
     * ignore of the tab
     */
    ignore: PropTypes.bool, // eslint-disable-line
    /**
     * callback for when pressing a tab
     */
    onPress: PropTypes.func,
    /**
     * whether to change the text to uppercase
     */
    uppercase: PropTypes.bool,
    /**
     * The active opacity when pressing a tab
     */
    activeOpacity: PropTypes.number,
    /**
     * TODO: rename to feedbackColor
     * Apply background color on press for TouchableOpacity
     */
    activeBackgroundColor: PropTypes.string,

    // INTERNAL PROPS
    index: PropTypes.number,
    state: PropTypes.object,
    currentPage: PropTypes.object,
    onLayout: PropTypes.func
  };

  static defaultProps = {
    activeOpacity: 1,
    onPress: _.noop
  };

  constructor(props) {
    super(props);

    this.itemWidth = this.props.width;
    this.state = {};
    this.itemRef = React.createRef();

    if (this.itemWidth) {
      const {index, onLayout} = this.props;
      onLayout({width: this.itemWidth}, index);
    }
  }


  onStateChange = event([
    {
      nativeEvent: {state: this.props.state}
    }
  ],
  {useNativeDriver: true});

  onLayout = ({
    nativeEvent: {
      layout: {width, x}
    }
  }) => {
    const {index, onLayout} = this.props;
    if (!this.itemWidth) {
      this.itemWidth = width;
      this.itemRef.current.setNativeProps({style: {width, paddingHorizontal: null, flex: null}});
      if (onLayout) {
        onLayout({width}, index);
      }
    }
  };

  onPress = () => {
    const {index, onPress} = this.props;
    onPress(index);
  };

  getItemStyle() {
    const {state, style: propsStyle} = this.props;
    const opacity = block([
      cond(eq(state, State.END), call([], this.onPress)),
      cond(eq(state, State.BEGAN), this.props.activeOpacity, 1)
    ]);

    const style = {
      opacity
    };

    if (this.props.width) {
      style.flex = undefined;
      style.width = this.itemWidth;
      style.paddingHorizontal = undefined;
    }

    return [style, propsStyle];
  }

  getLabelStyle() {
    const {index, currentPage, targetPage, labelColor, selectedLabelColor, ignore} = this.props;

    const labelStyle = this.props.labelStyle;
    const selectedLabelStyle = this.props.selectedLabelStyle;
    let fontWeight, letterSpacing, fontFamily;

    if (labelStyle.fontWeight || selectedLabelStyle.fontWeight) {
      fontWeight = cond(and(eq(targetPage, index) /* , defined(itemWidth) */),
        selectedLabelStyle.fontWeight || 'normal',
        labelStyle.fontWeight || 'normal');
    }

    if (labelStyle.letterSpacing || selectedLabelStyle.letterSpacing) {
      letterSpacing = cond(and(eq(targetPage, index) /* , defined(itemWidth) */),
        selectedLabelStyle.letterSpacing || 0,
        labelStyle.letterSpacing || 0);
    }

    if (labelStyle.fontFamily || selectedLabelStyle.fontFamily) {
      fontFamily = cond(and(eq(targetPage, index) /* , defined(itemWidth) */),
        selectedLabelStyle.fontFamily,
        labelStyle.fontFamily);
    }

    const inactiveColor = labelColor || DEFAULT_LABEL_COLOR;
    const activeColor = !ignore ? selectedLabelColor || DEFAULT_SELECTED_LABEL_COLOR : inactiveColor;

    // Animated color
    const color = interpolateColor(currentPage, {
      inputRange: [index - 1, index, index + 1],
      outputRange: [inactiveColor, activeColor, inactiveColor]
    });

    return [
      labelStyle,
      _.omitBy({
        fontFamily,
        fontWeight,
        letterSpacing,
        color
      },
      _.isUndefined)
    ];
  }

  getIconStyle() {
    const {index, currentPage, iconColor, selectedIconColor, labelColor, selectedLabelColor, ignore} = this.props;

    const activeColor = selectedIconColor || selectedLabelColor || DEFAULT_SELECTED_LABEL_COLOR;
    const inactiveColor = iconColor || labelColor || DEFAULT_LABEL_COLOR;

    const tintColor = cond(eq(currentPage, index),
      // TODO: using processColor here broke functionality,
      // not using it seem to not be very performant
      activeColor,
      ignore ? activeColor : inactiveColor);

    return {
      tintColor
    };
  }

  render() {
    const {label, icon, badge, state, uppercase, activeOpacity, activeBackgroundColor, testID} = this.props;

    return (
      <TouchableOpacity
        ref={this.itemRef}
        pressState={state}
        style={[styles.tabItem, this.getItemStyle()]}
        onLayout={this.onLayout}
        feedbackColor={activeBackgroundColor}
        activeOpacity={activeOpacity}
        onPress={this.onPress}
        testID={testID}
      >
        {icon && <Reanimated.Image source={icon} style={[label && styles.tabItemIconWithLabel, this.getIconStyle()]}/>}
        {!_.isEmpty(label) && (
          <Reanimated.Text style={[styles.tabItemLabel, this.getLabelStyle()]}>
            {uppercase ? _.toUpper(label) : label}
          </Reanimated.Text>
        )}
        {badge && <Badge backgroundColor={Colors.red30} size={'default'} {...badge} containerStyle={styles.badge}/>}
      </TouchableOpacity>
    );
  }
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
