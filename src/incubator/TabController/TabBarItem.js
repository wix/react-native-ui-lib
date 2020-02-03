// TODO: support commented props
import React, {PureComponent} from 'react';
import {StyleSheet, processColor} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Reanimated from 'react-native-reanimated';
import {State} from 'react-native-gesture-handler';
import {Colors, Typography, Spacings} from '../../style';
import Text from '../../components/text';
import Badge from '../../components/badge';
import TouchableOpacity from '../TouchableOpacity';

const {cond, eq, call, block, event, and, defined} = Reanimated;

const DEFAULT_LABEL_COLOR = Colors.black;
const DEFAULT_SELECTED_LABEL_COLOR = Colors.blue30;

/**
 * @description: TabController's TabBarItem
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/incubatorScreens/TabControllerScreen/index.js
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
    labelStyle: Text.propTypes.style,
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

  state = {
    itemWidth: undefined
  };

  onStateChange = event([
    {
      nativeEvent: {state: this.props.state}
    }
  ],
  {useNativeDriver: true},);

  onLayout = ({
    nativeEvent: {
      layout: {width}
    }
  }) => {
    const {index, onLayout} = this.props;
    const {itemWidth} = this.state;
    if (!itemWidth) {
      this.setState({itemWidth: width});
      onLayout(width, index);
    }
  };

  onPress = () => {
    const {index, onPress} = this.props;
    onPress(index);
  };

  getItemStyle() {
    const {state, width} = this.props;
    const {itemWidth} = this.state;
    const opacity = block([
      cond(eq(state, State.END), call([], this.onPress)),
      cond(eq(state, State.BEGAN), this.props.activeOpacity, 1)
    ]);

    const style = {
      opacity
    };

    if (width || itemWidth) {
      style.flex = undefined;
      style.width = width || itemWidth;
      style.paddingHorizontal = undefined;
    }

    return style;
  }

  getLabelStyle() {
    const {itemWidth} = this.state;
    const {index, currentPage, labelColor, selectedLabelColor, labelStyle, ignore} = this.props;
    const fontWeight = cond(and(eq(currentPage, index), defined(itemWidth)), '700', '400');
    const activeColor = selectedLabelColor || DEFAULT_SELECTED_LABEL_COLOR;
    const inactiveColor = labelColor || DEFAULT_LABEL_COLOR;
    const color = cond(eq(currentPage, index),
      processColor(activeColor),
      processColor(ignore ? activeColor : inactiveColor),);

    return [
      {
        fontWeight,
        color
      },
      labelStyle
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
      ignore ? activeColor : inactiveColor,);

    return {
      tintColor
    };
  }

  render() {
    const {label, icon, badge, state, uppercase, activeOpacity, activeBackgroundColor, testID} = this.props;

    return (
      <TouchableOpacity
        pressState={state}
        style={[styles.tabItem, this.getItemStyle()]}
        onLayout={this.onLayout}
        feedbackColor={activeBackgroundColor}
        activeOpacity={activeOpacity}
        onPress={this.onPress}
        testID={testID}
      >
        {icon && <Reanimated.Image source={icon} style={[styles.tabItemIcon, this.getIconStyle()]}/>}
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
  tabItemIcon: {
    marginRight: 10
  },
  badge: {
    marginLeft: Spacings.s1
  }
});
