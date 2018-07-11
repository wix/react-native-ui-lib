import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import View from '../view';
import Text from '../text';
import {Colors, Typography, Spacings} from '../../style';
import {BaseComponent} from '../../commons';
import {Constants} from '../../helpers';
import TouchableOpacity from '../touchableOpacity';

/**
 * @description: TabBar.Item, inner component of TabBar for configuring the tabs
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabBarScreen.js
 */
export default class TabBarItem extends BaseComponent {
  static displayName = 'TabBar.Item';

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
     * maximun number of lines the label can break
     */
    maxLines: PropTypes.number,
    /**
     * custom selected tab label style
     */
    selectedLabelStyle: Text.propTypes.style,
    /**
     * whether the tab is selected or not
     */
    selected: PropTypes.bool,
    /**
     * callback for when pressing a tab
     */
    onPress: PropTypes.func,
    /**
     * whether the tab will have a divider on its right
     */
    showDivider: PropTypes.bool,
    /**
     * A fixed width for the item
     */
    width: PropTypes.number,
    /**
     * A callback to invoke for onLayout event
     */
    onLayout: PropTypes.func,
  };

  static defaultProps = {
    maxLines: 1,
  };

  constructor(props) {
    super(props);

    this.state = {
      // HACK: for indicator width in TabBar
      fontStyle: this.getFontStyle(this.getThemeProps()),
    };
  }

  // HACK: for indicator width in TabBar
  getFontStyle(props) {
    return props.selectedLabelStyle || this.styles.labelSelected;
  }

  generateStyles() {
    this.styles = createStyles(this.getThemeProps());
  }

  onLayout = (event) => {
    _.invoke(this.props, 'onLayout', event);
    // HACK: for indicator width in TabBar
    this.setState({fontStyle: {}});
  }

  render() {   
    const {
      children,
      label,
      labelStyle,
      maxLines,
      selected,
      selectedLabelStyle,
      showDivider,
      width,
      onPress,
      testID,
    } = this.getThemeProps();
    
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={width ? {width} : this.styles.container}
        testID={testID}
        onLayout={this.onLayout}
      >
        <View flex center style={[showDivider && this.styles.divider, {paddingHorizontal: Spacings.s4}]}>
          {!_.isEmpty(label) &&
            <Text
              numberOfLines={maxLines}
              style={[
                this.styles.label,
                labelStyle,
                selected && this.styles.labelSelected,
                selected && selectedLabelStyle,
                this.state.fontStyle, // HACK: for indicator width in TabBar
              ]}
            >
              {label}
            </Text>}
          {children}
        </View>
      </TouchableOpacity>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    label: {
      color: Colors.dark10,
      ...Typography.text90,
    },
    labelSelected: {
      color: Colors.blue30,
      fontWeight: Constants.isIOS ? '600' : '700',
    },
    divider: {
      borderRightWidth: 1,
      borderRightColor: Colors.dark70,
      marginVertical: 14, // NOTE: will not cut long text at the top and bottom in iOS if TabBar not height enough
    },
  });
}
