import React, {Component} from 'react';
import {StyleSheet, processColor} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Reanimated from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import {Colors, Typography, Spacings} from '../../style';
import Text from '../../components/text';
import Badge from '../../components/badge';

const {cond, eq, call, block, event, and, defined} = Reanimated;

const DEFAULT_LABEL_COLOR = Colors.black;
const DEFAULT_SELECTED_LABEL_COLOR = Colors.blue30;

export default class TabBarItem extends Component {
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
    /**
     * maximun number of lines the label can break
     */
    maxLines: PropTypes.number,
    /**
     * whether the tab will have a divider on its right
     */
    showDivider: PropTypes.bool,
    /**
     * A fixed width for the item
     */
    width: PropTypes.number,
    /**
     * ignore of the tab
     */
    ignore: PropTypes.bool,
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
     * Apply background color on press for TouchableOpacity
     */
    activeBackgroundColor: PropTypes.string,

    // INTERNAL PROPS
    index: PropTypes.number,
    state: PropTypes.object,
    currentPage: PropTypes.object,
    onLayout: PropTypes.func,
  };

  static defaultProps = {
    activeOpacity: 1,
    onPress: _.noop,
  };

  state = {
    itemWidth: undefined,
  };

  onStateChange = event([
    {
      nativeEvent: {state: this.props.state},
    },
  ]);

  onLayout = ({
    nativeEvent: {
      layout: {width},
    },
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
    _.invoke(this.props, 'onChangeIndex', index);
    onPress(index);
  };

  getItemStyle() {
    const {state, width} = this.props;
    const {itemWidth} = this.state;
    const opacity = block([
      cond(eq(state, State.END), call([], this.onPress)),
      cond(eq(state, State.BEGAN), this.props.activeOpacity, 1),
    ]);

    const style = {
      opacity,
    };

    if (width || itemWidth) {
      style.width = width || itemWidth;
      style.paddingHorizontal = undefined;
    }

    return style;
  }

  getLabelStyle() {
    const {itemWidth} = this.state;
    const {index, currentPage, labelColor, selectedLabelColor, labelStyle} = this.props;
    const fontWeight = cond(and(eq(currentPage, index), defined(itemWidth)), '700', '300');
    const color = cond(
      eq(currentPage, index),
      processColor(selectedLabelColor || DEFAULT_SELECTED_LABEL_COLOR),
      processColor(labelColor || DEFAULT_LABEL_COLOR),
    );

    return [
      labelStyle,
      {
        fontWeight,
        color,
      },
    ];
  }

  getIconStyle() {
    const {index, currentPage, iconColor, selectedIconColor, labelColor, selectedLabelColor} = this.props;
    const tintColor = cond(
      eq(currentPage, index),
      // TODO: using processColor here broke functionality,
      // not using it seem to not be very performant
      selectedIconColor || selectedLabelColor || DEFAULT_SELECTED_LABEL_COLOR,
      iconColor || labelColor || DEFAULT_LABEL_COLOR,
    );

    return {
      tintColor,
    };
  }

  render() {
    const {label, icon, state, uppercase} = this.props;
    const opacity = block([
      cond(eq(state, State.END), call([], () => this.onChangeIndex(this.props.index))),
      cond(eq(state, State.BEGAN), this.props.activeOpacity, 1),
    ]);

    return (
      <TapGestureHandler onHandlerStateChange={this.onStateChange} shouldCancelWhenOutside>
        <Reanimated.View style={[styles.tabItem, {opacity}, this.getItemStyle()]} onLayout={this.onLayout}>
          {icon && <Reanimated.Image source={icon} style={[this.getIconStyle()]} />}
          {label && (
            <Reanimated.Text style={[styles.tabItemLabel, this.getLabelStyle()]}>
              {uppercase ? _.toUpper(label) : label}
            </Reanimated.Text>
          )}
        </Reanimated.View>
      </TapGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacings.s4,
  },
  tabItemLabel: {
    ...Typography.text80,
  },
});
