import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import View from '../view';
import Text from '../text';
import {Colors, Typography} from '../../style';
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
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {
      label,
      labelStyle,
      selected,
      selectedLabelStyle,
      onPress,
      testID,
    } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={this.styles.container}
        testID={testID}
      >
        <View flex center>
          {!_.isEmpty(label) &&
            <Text
              style={[
                this.styles.label,
                labelStyle,
                selected && this.styles.labelSelected,
                selected && selectedLabelStyle,
              ]}
            >
              {label}
            </Text>}
          {this.props.children}
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
  });
}
